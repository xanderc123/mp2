import axios from 'axios'
import type { ApiDetailResponse, ApiListResponse, Artwork } from '../types/artwork'

const FIELDS = [
  'id',
  'title',
  'artist_display',
  'date_display',
  'date_start',
  'place_of_origin',
  'medium_display',
  'dimensions',
  'image_id',
  'department_title',
  'classification_title',
  'credit_line',
  'gallery_title',
  'artwork_type_title',
  'thumbnail',
].join(',')

const api = axios.create({
  baseURL: 'https://api.artic.edu/api/v1',
  timeout: 12_000,
})

export async function getArtworks(signal?: AbortSignal): Promise<Artwork[]> {
  const response = await api.get<ApiListResponse>('/artworks/search', {
    params: {
      q: 'painting',
      limit: 100,
      fields: FIELDS,
    },
    signal,
  })

  return response.data.data
}

export async function getArtwork(
  id: number,
  signal?: AbortSignal,
): Promise<Artwork> {
  const response = await api.get<ApiDetailResponse>(`/artworks/${id}`, {
    params: { fields: FIELDS },
    signal,
  })

  return response.data.data
}

export function artworkImageUrl(
  imageId: string | null,
  width = 843,
): string | null {
  if (!imageId) return null
  return `https://www.artic.edu/iiif/2/${imageId}/full/${width},/0/default.jpg`
}
