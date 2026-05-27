'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import Link from 'next/link'
import type { SearchIndex, SearchResult } from '@/lib/evidence/search'
import { search, highlightTerms, getSnippet } from '@/lib/evidence/search'
import styles from './SearchBar.module.css'

interface SearchBarProps {
  index: SearchIndex
  collection?: string
  contentType?: string
  placeholder?: string
  onResultClick?: () => void
}

export function SearchBar({
  index,
  collection,
  contentType,
  placeholder = 'Search documents...',
  onResultClick,
}: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Compute results synchronously based on query
  const results: SearchResult[] = useMemo(() => {
    if (!query.trim()) {
      return []
    }
    return search(index, query, {
      collection,
      content_type: contentType,
      limit: 10,
    })
  }, [query, index, collection, contentType])

  // Handle query change
  const handleQueryChange = useCallback((newQuery: string) => {
    setQuery(newQuery)
    setSelectedIndex(-1)
    setIsOpen(newQuery.trim().length > 0)
  }, [])

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1))
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex((prev) => Math.max(prev - 1, -1))
          break
        case 'Enter':
          e.preventDefault()
          if (selectedIndex >= 0 && results[selectedIndex]) {
            window.location.href = results[selectedIndex].url
            onResultClick?.()
          }
          break
        case 'Escape':
          setIsOpen(false)
          inputRef.current?.blur()
          break
      }
    },
    [isOpen, results, selectedIndex, onResultClick]
  )

  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 1)

  return (
    <div className={styles.searchContainer}>
      <div className={styles.inputWrapper}>
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={styles.input}
          aria-label="Search documents"
          aria-expanded={isOpen}
          aria-controls="search-results"
          aria-autocomplete="list"
          aria-haspopup="listbox"
        />
        <span className={styles.searchIcon} aria-hidden="true">
          &#x1F50D;
        </span>
        {query && (
          <button
            type="button"
            onClick={() => {
              handleQueryChange('')
              setIsOpen(false)
              inputRef.current?.focus()
            }}
            className={styles.clearButton}
            aria-label="Clear search"
          >
            &times;
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div
          ref={resultsRef}
          id="search-results"
          className={styles.results}
          role="listbox"
          aria-label="Search results"
        >
          {results.map((result, i) => (
            <Link
              key={result.passage_id || result.doc_id}
              href={result.url}
              onClick={() => {
                setIsOpen(false)
                setQuery('')
                onResultClick?.()
              }}
              className={`${styles.result} ${i === selectedIndex ? styles.resultSelected : ''}`}
              role="option"
              aria-selected={i === selectedIndex}
            >
              <div className={styles.resultHeader}>
                <span className={styles.resultTitle}>{result.title}</span>
                <span className={styles.resultDate}>{result.date}</span>
              </div>
              <p
                className={styles.resultPreview}
                dangerouslySetInnerHTML={{
                  __html: highlightTerms(getSnippet(result.preview, terms), terms),
                }}
              />
              <div className={styles.resultMeta}>
                <span className={styles.resultCollection}>{result.collection}</span>
                {result.passage_id && <span className={styles.resultPassage}>Passage match</span>}
              </div>
            </Link>
          ))}
        </div>
      )}

      {isOpen && query && results.length === 0 && (
        <div className={styles.noResults} role="status" aria-live="polite">
          No documents found for &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  )
}
