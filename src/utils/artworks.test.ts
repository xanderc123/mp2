import { describe, expect, it } from 'vitest'
import type { Artwork } from '../types/artwork'
import { matchesKeyword, sortArtworks } from './artworks'

const baseArtwork: Artwork = {
  id: 1,
  title: 'Blue Landscape',
  artist_display: 'Ada Artist',
  date_display: '1925',
  date_start: 1925,
  place_of_origin: 'Chicago',
  medium_display: 'Oil on canvas',
  dimensions: null,
  image_id: null,
  department_title: 'Modern Art',
  classification_title: 'Painting',
  credit_line: null,
  gallery_title: null,
  artwork_type_title: 'Painting',
  thumbnail: null,
}

describe('artwork utilities', () => {
  it('matches keywords across useful artwork fields', () => {
    expect(matchesKeyword(baseArtwork, 'chicago')).toBe(true)
    expect(matchesKeyword(baseArtwork, 'sculpture')).toBe(false)
  })

  it('sorts in both directions without mutating the source', () => {
    const source = [baseArtwork, { ...baseArtwork, id: 2, title: 'Amber Study' }]
    expect(sortArtworks(source, 'title', 'asc').map((item) => item.id)).toEqual([2, 1])
    expect(sortArtworks(source, 'title', 'desc').map((item) => item.id)).toEqual([1, 2])
    expect(source[0].id).toBe(1)
  })

  it('sorts by artist and date in both directions', () => {
    const source = [
      baseArtwork,
      {
        ...baseArtwork,
        id: 2,
        artist_display: 'Zora Painter',
        date_start: 1888,
      },
    ]

    expect(sortArtworks(source, 'artist', 'asc').map((item) => item.id)).toEqual([1, 2])
    expect(sortArtworks(source, 'artist', 'desc').map((item) => item.id)).toEqual([2, 1])
    expect(sortArtworks(source, 'date', 'asc').map((item) => item.id)).toEqual([2, 1])
    expect(sortArtworks(source, 'date', 'desc').map((item) => item.id)).toEqual([1, 2])
  })
})
