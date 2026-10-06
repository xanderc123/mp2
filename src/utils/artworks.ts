import type { Artwork, SortDirection, SortKey } from '../types/artwork'

function normalize(value: string | null | undefined): string {
  return value?.trim().toLocaleLowerCase() ?? ''
}

export function matchesKeyword(artwork: Artwork, keyword: string): boolean {
  const query = normalize(keyword)
  if (!query) return true

  return [
    artwork.title,
    artwork.artist_display,
    artwork.date_display,
    artwork.place_of_origin,
    artwork.medium_display,
    artwork.department_title,
    artwork.classification_title,
  ].some((value) => normalize(value).includes(query))
}

export function sortArtworks(
  artworks: Artwork[],
  key: SortKey,
  direction: SortDirection,
): Artwork[] {
  const multiplier = direction === 'asc' ? 1 : -1

  return [...artworks].sort((left, right) => {
    if (key === 'date') {
      const leftDate = left.date_start ?? Number.MAX_SAFE_INTEGER
      const rightDate = right.date_start ?? Number.MAX_SAFE_INTEGER
      return (leftDate - rightDate) * multiplier
    }

    const leftValue = key === 'title' ? left.title : left.artist_display
    const rightValue = key === 'title' ? right.title : right.artist_display
    return normalize(leftValue).localeCompare(normalize(rightValue)) * multiplier
  })
}

export function artistName(artwork: Artwork): string {
  return artwork.artist_display?.split('\n')[0] || 'Artist unknown'
}
