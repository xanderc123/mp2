import { Link } from 'react-router-dom'
import { ArtworkImage } from '../components/ArtworkImage'
import { ErrorState, LoadingState } from '../components/AsyncState'
import { useArtworks } from '../context/ArtworksContext'

export function HomePage() {
  const { artworks, isLoading, error, retry } = useArtworks()
  const featured = artworks.find((artwork) => artwork.image_id)

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">A museum without the map</p>
          <h1>Look closer.<br />Find your favorite.</h1>
          <p className="hero-intro">
            Explore one hundred works from the Art Institute of Chicago. Search the
            collection, compare details, or wander through a visual gallery.
          </p>
          <div className="hero-actions">
            <Link className="button button-light" to="/gallery">
              Enter the gallery
            </Link>
            <Link className="text-link text-link-light" to="/list">
              Browse the list <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className="hero-art" aria-label="Featured artwork">
          {isLoading && <LoadingState label="Selecting a featured artwork" />}
          {error && <ErrorState message={error} onRetry={retry} />}
          {featured && (
            <>
              <ArtworkImage artwork={featured} size={1000} eager />
              <div className="hero-caption">
                <span>{featured.title}</span>
                <span>{featured.artist_display?.split('\n')[0] || 'Artist unknown'}</span>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="choose-view" aria-labelledby="choose-heading">
        <div>
          <p className="eyebrow">Two ways in</p>
          <h2 id="choose-heading">Choose how you explore</h2>
        </div>
        <div className="view-options">
          <Link className="view-option" to="/list">
            <span className="view-number">01</span>
            <h3>Study the list</h3>
            <p>Search every field and sort by title, artist, or date.</p>
            <span className="view-arrow" aria-hidden="true">↗</span>
          </Link>
          <Link className="view-option view-option-accent" to="/gallery">
            <span className="view-number">02</span>
            <h3>Wander the walls</h3>
            <p>Filter by department and let the images lead.</p>
            <span className="view-arrow" aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </>
  )
}
