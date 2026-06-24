import {
  createContext,
  useContext,
} from 'react'

interface AnnounceContextType {
  message: string
  announce: (msg: string) => void
}

const AnnounceContext = createContext<AnnounceContextType | null>(null)

export function useAnnounce() {
  const ctx = useContext(AnnounceContext)
  if (!ctx) {
    throw new Error('useAnnounce must be used within AnnounceProvider')
  }
  return ctx
}

export type { AnnounceContextType }
export { AnnounceContext }
