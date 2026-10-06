import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import axios from 'axios'
import { getArtworks } from '../api/artInstitute'
import type { Artwork } from '../types/artwork'

interface ArtworksContextValue {
  artworks: Artwork[]
  isLoading: boolean
  error: string | null
  retry: () => void
}

const ArtworksContext = createContext<ArtworksContextValue | null>(null)

export function ArtworksProvider({ children }: { children: ReactNode }) {
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [requestVersion, setRequestVersion] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadArtworks() {
      setIsLoading(true)
      setError(null)

      try {
        const data = await getArtworks(controller.signal)
        setArtworks(data)
      } catch (requestError) {
        if (axios.isCancel(requestError)) return
        setError('The museum collection could not be loaded. Check your connection and try again.')
      } finally {
        if (!controller.signal.aborted) setIsLoading(false)
      }
    }

    void loadArtworks()
    return () => controller.abort()
  }, [requestVersion])

  const retry = useCallback(() => {
    setRequestVersion((version) => version + 1)
  }, [])

  const value = useMemo(
    () => ({ artworks, isLoading, error, retry }),
    [artworks, error, isLoading, retry],
  )

  return (
    <ArtworksContext.Provider value={value}>
      {children}
    </ArtworksContext.Provider>
  )
}

export function useArtworks() {
  const context = useContext(ArtworksContext)
  if (!context) {
    throw new Error('useArtworks must be used within ArtworksProvider')
  }
  return context
}
