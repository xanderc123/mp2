import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArtworkImage } from '../components/ArtworkImage'
import { EmptyState, ErrorState, LoadingState } from '../components/AsyncState'
import { useArtworks } from '../context/ArtworksContext'
import type { SortDirection, SortKey } from '../types/artwork'
import { artistName, matchesKeyword, sortArtworks } from '../utils/artworks'

export function ListPage() {
  const { artworks, isLoading, error, retry } = useArtworks()
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('title')
  const [direction, setDirection] = useState<SortDirection>('asc')

  const visibleArtworks = useMemo(() => {
    const filtered = artworks.filter((artwork) => matchesKeyword(artwork, query))
    return sortArtworks(filtered, sortKey, direction)
  }, [artworks, direction, query, sortKey])

  return (
    <section className="page page-list">
      <header className="page-heading">
        <div>
          <p className="eyebrow">Collection index</p>
          <h1>Read the room</h1>
        </div>
        <p>
          Search across artists, titles, dates, places, and media. Then reorder the
          results to spot new connections.
        </p>
      </header>

      <div className="controls" aria-label="List controls">
        <label className="search-field">
          <span>Search collection</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try ‘Chicago’ or ‘painting’"
          />
        </label>
        <label>
          <span>Sort by</span>
          <select value={sortKey} onChange={(event) => setSortKey(event.target.value as SortKey)}>
            <option value="title">Title</option>
            <option value="artist">Artist</option>
            <option value="date">Date</option>
          </select>
        </label>
        <label>
          <span>Direction</span>
          <select
            value={direction}
            onChange={(event) => setDirection(event.target.value as SortDirection)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>

      {!isLoading && !error && (
        <p className="result-count" aria-live="polite">
          {visibleArtworks.length} {visibleArtworks.length === 1 ? 'work' : 'works'}
        </p>
      )}

      {isLoading && <LoadingState />}
      {error && <ErrorState message={error} onRetry={retry} />}
      {!isLoading && !error && visibleArtworks.length === 0 && (
        <EmptyState message="No works match that search. Try a broader term." />
      )}

      <div className="artwork-list">
        {visibleArtworks.map((artwork) => (
          <Link className="artwork-row" key={artwork.id} to={`/artwork/${artwork.id}`}>
            <div className="row-image">
              <ArtworkImage artwork={artwork} size={300} />
            </div>
            <div className="row-title">
              <h2>{artwork.title}</h2>
              <p>{artistName(artwork)}</p>
            </div>
            <p className="row-date">{artwork.date_display || 'Date unknown'}</p>
            <p className="row-origin">{artwork.place_of_origin || 'Origin unknown'}</p>
            <span className="row-arrow" aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
