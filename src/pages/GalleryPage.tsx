import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArtworkImage } from '../components/ArtworkImage'
import { EmptyState, ErrorState, LoadingState } from '../components/AsyncState'
import { useArtworks } from '../context/ArtworksContext'
import { artistName } from '../utils/artworks'

export function GalleryPage() {
  const { artworks, isLoading, error, retry } = useArtworks()
  const [department, setDepartment] = useState('All departments')

  const departments = useMemo(
    () => [
      'All departments',
      ...Array.from(
        new Set(
          artworks
            .map((artwork) => artwork.department_title)
            .filter((value): value is string => Boolean(value)),
        ),
      ).sort(),
    ],
    [artworks],
  )

  const visibleArtworks = useMemo(
    () =>
      artworks.filter(
        (artwork) =>
          artwork.image_id &&
          (department === 'All departments' || artwork.department_title === department),
      ),
    [artworks, department],
  )

  return (
    <section className="page page-gallery">
      <header className="gallery-heading">
        <div>
          <p className="eyebrow">Visual collection</p>
          <h1>Wander the walls</h1>
        </div>
        <label className="filter-field">
          <span>Filter by department</span>
          <select value={department} onChange={(event) => setDepartment(event.target.value)}>
            {departments.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      </header>

      {isLoading && <LoadingState />}
      {error && <ErrorState message={error} onRetry={retry} />}
      {!isLoading && !error && visibleArtworks.length === 0 && (
        <EmptyState message="No image-based works are available in this department." />
      )}

      <p className="result-count result-count-light" aria-live="polite">
        {!isLoading && !error && `${visibleArtworks.length} works on view`}
      </p>

      <div className="gallery-grid">
        {visibleArtworks.map((artwork, index) => (
          <Link
            className={`gallery-card gallery-card-${(index % 6) + 1}`}
            key={artwork.id}
            to={`/artwork/${artwork.id}`}
          >
            <div className="gallery-image">
              <ArtworkImage artwork={artwork} size={843} />
            </div>
            <div className="gallery-meta">
              <h2>{artwork.title}</h2>
              <p>{artistName(artwork)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
