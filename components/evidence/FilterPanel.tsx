'use client'

import { useMemo } from 'react'
import type { SearchIndex, FilterOption } from '@/lib/evidence/search'
import {
  getCollectionsWithCounts,
  getContentTypesWithCounts,
  getYearsWithCounts,
  getAuthorsWithCounts,
} from '@/lib/evidence/search'
import styles from './FilterPanel.module.css'

interface FilterPanelProps {
  index: SearchIndex
  selectedCollection: string | null
  selectedContentType: string | null
  selectedAuthor: string | null
  selectedYear: number | null
  onCollectionChange: (collection: string | null) => void
  onContentTypeChange: (contentType: string | null) => void
  onAuthorChange: (author: string | null) => void
  onYearChange: (year: number | null) => void
  onClearAll: () => void
}

const COLLECTION_LABELS: Record<string, string> = {
  'blount-papers': 'Blount Papers',
  treaties: 'Treaties',
  'federal-correspondence': 'Federal Correspondence',
  'knoxville-gazette': 'Knoxville Gazette',
  maps: 'Maps & Visual',
}

const CONTENT_TYPE_LABELS: Record<string, string> = {
  letter: 'Letters',
  treaty: 'Treaties',
  proclamation: 'Proclamations',
  newspaper: 'Newspapers',
  legal: 'Legal Documents',
  inventory: 'Inventories',
  report: 'Reports',
}

const AUTHOR_LABELS: Record<string, string> = {
  'william-blount': 'William Blount',
  'george-washington': 'George Washington',
  'henry-knox': 'Henry Knox',
  'thomas-jefferson': 'Thomas Jefferson',
  'james-robertson': 'James Robertson',
  'john-sevier': 'John Sevier',
}

function getLabel(value: string, labels: Record<string, string>): string {
  return labels[value] || value.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export function FilterPanel({
  index,
  selectedCollection,
  selectedContentType,
  selectedAuthor,
  selectedYear,
  onCollectionChange,
  onContentTypeChange,
  onAuthorChange,
  onYearChange,
  onClearAll,
}: FilterPanelProps) {
  // Compute filter options with counts
  const collections = useMemo(() => getCollectionsWithCounts(index), [index])
  const contentTypes = useMemo(() => getContentTypesWithCounts(index), [index])
  const years = useMemo(() => getYearsWithCounts(index), [index])
  const authors = useMemo(() => getAuthorsWithCounts(index), [index])

  const _hasActiveFilters = selectedCollection || selectedContentType || selectedAuthor || selectedYear

  // Applied filters for chips
  const appliedFilters: Array<{ key: string; label: string; onRemove: () => void }> = []
  if (selectedCollection) {
    appliedFilters.push({
      key: 'collection',
      label: getLabel(selectedCollection, COLLECTION_LABELS),
      onRemove: () => onCollectionChange(null),
    })
  }
  if (selectedContentType) {
    appliedFilters.push({
      key: 'type',
      label: getLabel(selectedContentType, CONTENT_TYPE_LABELS),
      onRemove: () => onContentTypeChange(null),
    })
  }
  if (selectedAuthor) {
    appliedFilters.push({
      key: 'author',
      label: getLabel(selectedAuthor, AUTHOR_LABELS),
      onRemove: () => onAuthorChange(null),
    })
  }
  if (selectedYear) {
    appliedFilters.push({
      key: 'year',
      label: String(selectedYear),
      onRemove: () => onYearChange(null),
    })
  }

  return (
    <aside className={styles.filterPanel} aria-label="Filter documents">
      <h2 className={styles.filterTitle}>Refine Results</h2>

      {/* Applied Filters Chips */}
      {appliedFilters.length > 0 && (
        <div className={styles.appliedFilters}>
          <span className={styles.appliedLabel}>Active:</span>
          <div className={styles.filterChips}>
            {appliedFilters.map((filter) => (
              <button
                key={filter.key}
                type="button"
                onClick={filter.onRemove}
                className={styles.filterChip}
                aria-label={`Remove ${filter.label} filter`}
              >
                <span className={styles.chipX}>×</span>
                {filter.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={onClearAll}
            className={styles.clearAllButton}
          >
            Clear All
          </button>
        </div>
      )}

      {/* Year Filter */}
      <FilterGroup
        legend="Year"
        options={years}
        selected={selectedYear ? String(selectedYear) : null}
        onChange={(val) => onYearChange(val ? parseInt(val, 10) : null)}
        labels={{}}
      />

      {/* Document Type Filter */}
      <FilterGroup
        legend="Type"
        options={contentTypes}
        selected={selectedContentType}
        onChange={onContentTypeChange}
        labels={CONTENT_TYPE_LABELS}
      />

      {/* Author Filter */}
      {authors.length > 0 && (
        <FilterGroup
          legend="Creator"
          options={authors}
          selected={selectedAuthor}
          onChange={onAuthorChange}
          labels={AUTHOR_LABELS}
        />
      )}

      {/* Collection Filter */}
      <FilterGroup
        legend="Collection"
        options={collections}
        selected={selectedCollection}
        onChange={onCollectionChange}
        labels={COLLECTION_LABELS}
      />
    </aside>
  )
}

// Checkbox-style filter group
function FilterGroup({
  legend,
  options,
  selected,
  onChange,
  labels,
}: {
  legend: string
  options: FilterOption[]
  selected: string | null
  onChange: (value: string | null) => void
  labels: Record<string, string>
}) {
  if (options.length === 0) return null

  return (
    <fieldset className={styles.filterGroup}>
      <legend className={styles.filterLegend}>{legend}</legend>
      <div className={styles.filterOptions}>
        {options.map((option) => {
          const isSelected = selected === option.value
          const label = getLabel(option.value, labels)
          const id = `filter-${legend.toLowerCase()}-${option.value}`

          return (
            <label key={option.value} className={styles.filterOption} htmlFor={id}>
              <input
                type="checkbox"
                id={id}
                checked={isSelected}
                onChange={() => onChange(isSelected ? null : option.value)}
                className={styles.filterCheckbox}
              />
              <span className={styles.filterLabel}>{label}</span>
              <span className={styles.filterCount}>({option.count})</span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
