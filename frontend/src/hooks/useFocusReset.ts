import { useEffect, useRef } from 'react'

export function useFocusReset(dependency: string) {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    requestAnimationFrame(() => {
      headingRef.current?.focus()
    })
  }, [dependency])

  return headingRef
}
