export interface Artwork {
  id: number
  title: string
  artist_display: string | null
  date_display: string | null
  date_start: number | null
  place_of_origin: string | null
  medium_display: string | null
  dimensions: string | null
  image_id: string | null
  department_title: string | null
  classification_title: string | null
  credit_line: string | null
  gallery_title: string | null
  artwork_type_title: string | null
  thumbnail: {
    alt_text: string | null
  } | null
}

export interface ApiListResponse {
  data: Artwork[]
  config: {
    iiif_url: string
  }
}

export interface ApiDetailResponse {
  data: Artwork
  config: {
    iiif_url: string
  }
}

export type SortKey = 'title' | 'artist' | 'date'
export type SortDirection = 'asc' | 'desc'
