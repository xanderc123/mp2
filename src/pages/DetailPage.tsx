import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { getArtwork } from '../api/artInstitute'
import { ArtworkImage } from '../components/ArtworkImage'
import { ErrorState, LoadingState } from '../components/AsyncState'
import { useArtworks } from '../context/ArtworksContext'
import type { Artwork } from '../types/artwork'
import { artistName } from '../utils/artworks'

export function DetailPage() {
  const { id } = useParams()
  const artworkId = Number(id)
  const { artworks } = useArtworks()
  const cachedArtwork = artworks.find((item) => item.id === artworkId)
  const [artwork, setArtwork] = useState<Artwork | null>(cachedArtwork || null)
  const [isLoading, setIsLoading] = useState(!cachedArtwork)
  const [error, setError] = useState<string | null>(null)
  const [requestVersion, setRequestVersion] = useState(0)

  useEffect(() => {
    if (!Number.isInteger(artworkId) || artworkId <= 0) {
      setError('This artwork address is not valid.')
      setIsLoading(false)
      return
    }

    const fromCollection = artworks.find((item) => item.id === artworkId)
    if (fromCollection) {
      setArtwork(fromCollection)
      setError(null)
      setIsLoading(false)
      return
    }

    const controller = new AbortController()
    setIsLoading(true)
    setError(null)

    getArtwork(artworkId, controller.signal)
      .then(setArtwork)
      .catch((requestError) => {
        if (!axios.isCancel(requestError)) {
          setError('That artwork could not be loaded. It may have moved or the API may be unavailable.')
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false)
      })

    return () => controller.abort()
  }, [artworkId, artworks, requestVersion])

  const navigation = useMemo(() => {
    const index = artworks.findIndex((item) => item.id === artworkId)
    if (index < 0) return { previous: null, next: null }
    return {
      previous: index > 0 ? artworks[index - 1] : null,
      next: index < artworks.length - 1 ? artworks[index + 1] : null,
    }
  }, [artworkId, artworks])

  if (isLoading) return <LoadingState label="Loading artwork details" />
  if (error) {
    return (
      <section className="page detail-state">
        <ErrorState message={error} onRetry={() => setRequestVersion((value) => value + 1)} />
        <Link className="text-link" to="/gallery">Return to gallery</Link>
      </section>
    )
  }
  if (!artwork) return null

  const details = [
    ['Date', artwork.date_display],
    ['Origin', artwork.place_of_origin],
    ['Medium', artwork.medium_display],
    ['Dimensions', artwork.dimensions],
    ['Department', artwork.department_title],
    ['Classification', artwork.classification_title],
    ['Gallery', artwork.gallery_title],
    ['Credit line', artwork.credit_line],
  ].filter((entry): entry is [string, string] => Boolean(entry[1]))

  return (
    <article className="detail-page">
      <div className="detail-image-panel">
        <Link className="back-link" to="/gallery">← Back to gallery</Link>
        <div className="detail-image">
          <ArtworkImage artwork={artwork} size={1686} eager />
        </div>
      </div>

      <div className="detail-copy">
        <p className="eyebrow">{artwork.artwork_type_title || 'Artwork'}</p>
        <h1>{artwork.title}</h1>
        <p className="detail-artist">{artistName(artwork)}</p>
        <dl className="detail-list">
          {details.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <nav className="detail-navigation" aria-label="Artwork navigation">
          {navigation.previous ? (
            <Link to={`/artwork/${navigation.previous.id}`}>
              <span aria-hidden="true">←</span>
              <span><small>Previous</small>{navigation.previous.title}</span>
            </Link>
          ) : (
            <span className="nav-disabled">Beginning of collection</span>
          )}
          {navigation.next ? (
            <Link to={`/artwork/${navigation.next.id}`}>
              <span><small>Next</small>{navigation.next.title}</span>
              <span aria-hidden="true">→</span>
            </Link>
          ) : (
            <span className="nav-disabled">End of collection</span>
          )}
        </nav>
      </div>
    </article>
  )
}
