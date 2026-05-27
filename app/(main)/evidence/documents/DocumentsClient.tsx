'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { Document } from '@/lib/evidence/types'
import type { SearchIndex } from '@/lib/evidence/search'
import { SearchBar, FilterPanel } from '@/components/evidence'
import './documents.css'

interface DocumentsClientProps {
  documents: Document[]
  searchIndex: SearchIndex
}

type ViewMode = 'list' | 'grid' | 'table'
type SortColumn = 'date' | 'title' | 'collection' | 'type'
type SortDirection = 'asc' | 'desc'

const COLLECTION_LABELS: Record<string, string> = {
  'blount-papers': 'The Blount Papers',
  treaties: 'Treaties & Proclamations',
  'federal-correspondence': 'Federal Correspondence',
  'knoxville-gazette': 'The Knoxville Gazette',
  maps: 'Maps & Visual',
}

const COLLECTION_DESCRIPTIONS: Record<string, string> = {
  'blount-papers':
    "Governor Blount's correspondence with the War Department, chronicling the establishment of territorial government.",
  treaties:
    'Treaties, proclamations, and legal documents that established federal authority in the Southwest Territory.',
  'federal-correspondence':
    'Letters between Washington, Knox, Jefferson, and other federal officials regarding the territory.',
  'knoxville-gazette':
    'Selected issues from the first newspaper west of the Appalachians in Tennessee.',
  maps: 'Maps, inventories, and visual documents from the territorial period.',
}

// Sort indicator component - defined outside render to avoid recreating on each render
function SortIndicator({
  column,
  sortColumn,
  sortDirection,
}: {
  column: SortColumn
  sortColumn: SortColumn
  sortDirection: SortDirection
}) {
  if (sortColumn !== column) {
    return <span className="sortIndicator sortIndicatorInactive">↕</span>
  }
  return (
    <span className="sortIndicator sortIndicatorActive">{sortDirection === 'asc' ? '↑' : '↓'}</span>
  )
}

export function DocumentsClient({ documents, searchIndex }: DocumentsClientProps) {
  // Filter state
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null)
  const [selectedContentType, setSelectedContentType] = useState<string | null>(null)
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null)
  const [selectedYear, setSelectedYear] = useState<number | null>(null)

  // View state
  const [viewMode, setViewMode] = useState<ViewMode>('list')

  // Sort state (for table view)
  const [sortColumn, setSortColumn] = useState<SortColumn>('date')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  // Clear all filters
  const handleClearAll = () => {
    setSelectedCollection(null)
    setSelectedContentType(null)
    setSelectedAuthor(null)
    setSelectedYear(null)
  }

  // Handle column sort
  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      // Toggle direction if same column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      // New column, default to ascending
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  // Filter documents
  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      if (selectedCollection && doc.collection !== selectedCollection) return false
      if (selectedContentType && doc.content_type !== selectedContentType) return false
      if (selectedAuthor && doc.author !== selectedAuthor) return false
      if (selectedYear) {
        const docYear = parseInt(doc.date.split('-')[0], 10)
        if (docYear !== selectedYear) return false
      }
      return true
    })
  }, [documents, selectedCollection, selectedContentType, selectedAuthor, selectedYear])

  // Sort documents (for table view)
  const sortedDocuments = useMemo(() => {
    const sorted = [...filteredDocuments]

    sorted.sort((a, b) => {
      let comparison = 0

      switch (sortColumn) {
        case 'date':
          comparison = a.date.localeCompare(b.date)
          break
        case 'title':
          comparison = a.title.localeCompare(b.title)
          break
        case 'collection':
          comparison = a.collection.localeCompare(b.collection)
          break
        case 'type':
          comparison = a.content_type.localeCompare(b.content_type)
          break
      }

      return sortDirection === 'asc' ? comparison : -comparison
    })

    return sorted
  }, [filteredDocuments, sortColumn, sortDirection])

  // Screen reader announcement
  const resultAnnouncement = useMemo(() => {
    const count = filteredDocuments.length
    return `${count} document${count !== 1 ? 's' : ''} found`
  }, [filteredDocuments.length])

  // Group by collection for list view
  const filteredCollections = useMemo(() => {
    const grouped = new Map<string, Document[]>()
    for (const doc of filteredDocuments) {
      const existing = grouped.get(doc.collection) || []
      existing.push(doc)
      grouped.set(doc.collection, existing)
    }
    return Object.fromEntries(grouped)
  }, [filteredDocuments])

  const hasActiveFilters =
    selectedCollection || selectedContentType || selectedAuthor || selectedYear

  return (
    <div className="documentsPage">
      <div className="documentsContainer">
        {/* Header */}
        <header className="documentsHeader">
          <h1 className="documentsTitle">Document Archive</h1>
          <p className="documentsSubtitle">
            {documents.length} primary source documents from the founding of Tennessee
          </p>
        </header>

        {/* Search - Full Width */}
        <div className="documentsSearch">
          <SearchBar
            index={searchIndex}
            collection={selectedCollection || undefined}
            contentType={selectedContentType || undefined}
            placeholder="Search documents and passages..."
          />
        </div>

        {/* Main Layout: Sidebar + Content */}
        <div className="documentsLayout">
          {/* Filter Sidebar */}
          <FilterPanel
            index={searchIndex}
            selectedCollection={selectedCollection}
            selectedContentType={selectedContentType}
            selectedAuthor={selectedAuthor}
            selectedYear={selectedYear}
            onCollectionChange={setSelectedCollection}
            onContentTypeChange={setSelectedContentType}
            onAuthorChange={setSelectedAuthor}
            onYearChange={setSelectedYear}
            onClearAll={handleClearAll}
          />

          {/* Documents Content */}
          <main className="documentsContent">
            <div role="status" aria-live="polite" className="sr-only">
              {resultAnnouncement}
            </div>

            {/* View Toggle Bar */}
            <div className="documentsViewToggle">
              <span className="documentsResultCount">
                {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''}
                {hasActiveFilters && ' (filtered)'}
              </span>
              <div className="documentsViewButtons">
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`documentsViewButton ${viewMode === 'list' ? 'active' : ''}`}
                  aria-pressed={viewMode === 'list'}
                >
                  List
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`documentsViewButton ${viewMode === 'grid' ? 'active' : ''}`}
                  aria-pressed={viewMode === 'grid'}
                >
                  Grid
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  className={`documentsViewButton ${viewMode === 'table' ? 'active' : ''}`}
                  aria-pressed={viewMode === 'table'}
                >
                  Table
                </button>
              </div>
            </div>

            {/* Document Display */}
            {filteredDocuments.length === 0 ? (
              <div className="documentsEmpty">
                <p className="documentsEmptyText">No documents match your current filters.</p>
                <button type="button" onClick={handleClearAll} className="documentsEmptyButton">
                  Clear all filters
                </button>
              </div>
            ) : viewMode === 'table' ? (
              /* Table View */
              <div className="documentsTableWrapper">
                <table className="documentsTable">
                  <thead>
                    <tr>
                      <th>
                        <button
                          type="button"
                          onClick={() => handleSort('date')}
                          className="tableSortButton"
                          aria-label={`Sort by date ${sortColumn === 'date' ? (sortDirection === 'asc' ? 'descending' : 'ascending') : 'ascending'}`}
                        >
                          Date{' '}
                          <SortIndicator
                            column="date"
                            sortColumn={sortColumn}
                            sortDirection={sortDirection}
                          />
                        </button>
                      </th>
                      <th>
                        <button
                          type="button"
                          onClick={() => handleSort('title')}
                          className="tableSortButton"
                          aria-label={`Sort by title ${sortColumn === 'title' ? (sortDirection === 'asc' ? 'descending' : 'ascending') : 'ascending'}`}
                        >
                          Title{' '}
                          <SortIndicator
                            column="title"
                            sortColumn={sortColumn}
                            sortDirection={sortDirection}
                          />
                        </button>
                      </th>
                      <th className="tableColHideMobile">
                        <button
                          type="button"
                          onClick={() => handleSort('collection')}
                          className="tableSortButton"
                          aria-label={`Sort by collection ${sortColumn === 'collection' ? (sortDirection === 'asc' ? 'descending' : 'ascending') : 'ascending'}`}
                        >
                          Collection{' '}
                          <SortIndicator
                            column="collection"
                            sortColumn={sortColumn}
                            sortDirection={sortDirection}
                          />
                        </button>
                      </th>
                      <th className="tableColHideMobile">
                        <button
                          type="button"
                          onClick={() => handleSort('type')}
                          className="tableSortButton"
                          aria-label={`Sort by type ${sortColumn === 'type' ? (sortDirection === 'asc' ? 'descending' : 'ascending') : 'ascending'}`}
                        >
                          Type{' '}
                          <SortIndicator
                            column="type"
                            sortColumn={sortColumn}
                            sortDirection={sortDirection}
                          />
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedDocuments.map((doc) => (
                      <tr key={doc.id}>
                        <td className="tableColDate">{doc.date}</td>
                        <td className="tableColTitle">
                          <Link href={`/evidence/documents/${doc.id}`} className="tableDocLink">
                            {doc.title}
                          </Link>
                        </td>
                        <td className="tableColHideMobile tableColCollection">
                          {COLLECTION_LABELS[doc.collection] || doc.collection}
                        </td>
                        <td className="tableColHideMobile tableColType">{doc.content_type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : viewMode === 'list' ? (
              /* List View */
              <div className="documentsListView">
                {Object.entries(filteredCollections).map(([collection, docs]) => (
                  <section key={collection} className="documentsCollection">
                    <h2 className="documentsCollectionTitle">
                      {COLLECTION_LABELS[collection] || collection}
                      <span className="documentsCollectionCount">{docs.length}</span>
                    </h2>
                    {COLLECTION_DESCRIPTIONS[collection] && (
                      <p className="documentsCollectionDesc">
                        {COLLECTION_DESCRIPTIONS[collection]}
                      </p>
                    )}
                    <ul className="documentsList">
                      {docs.map((doc) => (
                        <li key={doc.id} className="documentsItem">
                          <Link href={`/evidence/documents/${doc.id}`} className="documentsLink">
                            <span className="documentsItemTitle">{doc.title}</span>
                            <span className="documentsItemMeta">
                              <span className="documentsItemDate">{doc.date}</span>
                              <span className="documentsItemType">{doc.content_type}</span>
                              {doc.passages.length > 0 && (
                                <span className="documentsItemPassages">
                                  {doc.passages.length} passage
                                  {doc.passages.length !== 1 ? 's' : ''}
                                </span>
                              )}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            ) : (
              /* Grid View */
              <div className="documentsGridView">
                {filteredDocuments.map((doc) => (
                  <Link
                    key={doc.id}
                    href={`/evidence/documents/${doc.id}`}
                    className="documentsGridCard"
                  >
                    <span className="documentsGridCollection">
                      {COLLECTION_LABELS[doc.collection] || doc.collection}
                    </span>
                    <h3 className="documentsGridTitle">{doc.title}</h3>
                    <span className="documentsGridDate">{doc.date}</span>
                    <span className="documentsGridType">{doc.content_type}</span>
                  </Link>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
