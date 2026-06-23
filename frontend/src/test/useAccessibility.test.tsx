import { render, screen, renderHook, act } from '@testing-library/react'
import { AccessibilityProvider, useAccessibility } from '../hooks/useAccessibility'
import type { ReactNode } from 'react'

function wrapper({ children }: { children: ReactNode }) {
  return <AccessibilityProvider>{children}</AccessibilityProvider>
}

describe('AccessibilityProvider', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('provides default values', () => {
    const { result } = renderHook(() => useAccessibility(), { wrapper })
    expect(result.current.textScale).toBe(100)
    expect(result.current.lineHeight).toBe(false)
    expect(result.current.letterSpacing).toBe(false)
    expect(result.current.dyslexiaFont).toBe(false)
    expect(result.current.highContrast).toBe(false)
    expect(result.current.darkMode).toBe(false)
    expect(result.current.reduceMotion).toBe(false)
    expect(result.current.focusOutlines).toBe(false)
  })

  it('renders children', () => {
    render(
      <AccessibilityProvider>
        <p>child</p>
      </AccessibilityProvider>,
    )
    expect(screen.getByText('child')).toBeInTheDocument()
  })

  it('setTextScale updates the scale', () => {
    const { result } = renderHook(() => useAccessibility(), { wrapper })
    act(() => result.current.setTextScale(125))
    expect(result.current.textScale).toBe(125)
  })

  it('toggleHighContrast flips the value', () => {
    const { result } = renderHook(() => useAccessibility(), { wrapper })
    act(() => result.current.toggleHighContrast())
    expect(result.current.highContrast).toBe(true)
    act(() => result.current.toggleHighContrast())
    expect(result.current.highContrast).toBe(false)
  })

  it('toggleDarkMode flips the value', () => {
    const { result } = renderHook(() => useAccessibility(), { wrapper })
    act(() => result.current.toggleDarkMode())
    expect(result.current.darkMode).toBe(true)
  })

  it('toggleLineHeight flips the value', () => {
    const { result } = renderHook(() => useAccessibility(), { wrapper })
    act(() => result.current.toggleLineHeight())
    expect(result.current.lineHeight).toBe(true)
  })

  it('toggleLetterSpacing flips the value', () => {
    const { result } = renderHook(() => useAccessibility(), { wrapper })
    act(() => result.current.toggleLetterSpacing())
    expect(result.current.letterSpacing).toBe(true)
  })

  it('toggleDyslexiaFont flips the value', () => {
    const { result } = renderHook(() => useAccessibility(), { wrapper })
    act(() => result.current.toggleDyslexiaFont())
    expect(result.current.dyslexiaFont).toBe(true)
  })

  it('toggleReduceMotion flips the value', () => {
    const { result } = renderHook(() => useAccessibility(), { wrapper })
    act(() => result.current.toggleReduceMotion())
    expect(result.current.reduceMotion).toBe(true)
  })

  it('toggleFocusOutlines flips the value', () => {
    const { result } = renderHook(() => useAccessibility(), { wrapper })
    act(() => result.current.toggleFocusOutlines())
    expect(result.current.focusOutlines).toBe(true)
  })

  it('resetAll restores defaults', () => {
    const { result } = renderHook(() => useAccessibility(), { wrapper })
    act(() => {
      result.current.setTextScale(150)
      result.current.toggleHighContrast()
      result.current.toggleDarkMode()
    })
    act(() => result.current.resetAll())
    expect(result.current.textScale).toBe(100)
    expect(result.current.highContrast).toBe(false)
    expect(result.current.darkMode).toBe(false)
  })

  it('persists settings to localStorage', () => {
    const { result } = renderHook(() => useAccessibility(), { wrapper })
    act(() => {
      result.current.setTextScale(125)
      result.current.toggleHighContrast()
    })
    const saved = JSON.parse(localStorage.getItem('cpa-a11y-settings') || '{}')
    expect(saved.textScale).toBe(125)
    expect(saved.highContrast).toBe(true)
  })

  it('restores settings from localStorage', () => {
    localStorage.setItem('cpa-a11y-settings', JSON.stringify({ textScale: 150, highContrast: true }))
    const { result } = renderHook(() => useAccessibility(), { wrapper })
    expect(result.current.textScale).toBe(150)
    expect(result.current.highContrast).toBe(true)
  })

  it('throws when used outside provider', () => {
    expect(() => renderHook(() => useAccessibility())).toThrow()
  })
})
