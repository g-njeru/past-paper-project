import { useState, useCallback, type ReactNode } from 'react'
import { AnnounceContext } from './announce-context'

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
