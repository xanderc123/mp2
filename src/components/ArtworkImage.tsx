import { useState } from 'react'
import { artworkImageUrl } from '../api/artInstitute'
import type { Artwork } from '../types/artwork'

interface ArtworkImageProps {
  artwork: Artwork
  size?: number
  eager?: boolean
}

export function ArtworkImage({ artwork, size = 843, eager = false }: ArtworkImageProps) {
  const src = artworkImageUrl(artwork.image_id, size)
  const [failedSrc, setFailedSrc] = useState<string | null>(null)

  if (!src || failedSrc === src) {
    return (
      <div className="image-placeholder" role="img" aria-label="Image unavailable">
        <span aria-hidden="true">No image</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={artwork.thumbnail?.alt_text || artwork.title}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailedSrc(src)}
    />
  )
}
