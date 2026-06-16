import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react'

interface AnnounceContextType {
  message: string
  announce: (msg: string) => void
}

const AnnounceContext = createContext<AnnounceContextType | null>(null)

export function AnnounceProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState('')

  const announce = useCallback((msg: string) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), 3000)
  }, [])

  return (
    <AnnounceContext.Provider value={{ message, announce }}>
      {children}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {message}
      </div>
    </AnnounceContext.Provider>
  )
}

export function useAnnounce() {
  const ctx = useContext(AnnounceContext)
  if (!ctx) {
    throw new Error('useAnnounce must be used within AnnounceProvider')
  }
  return ctx
}
