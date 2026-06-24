import {
  createContext,
  useContext,
} from 'react'

const STORAGE_KEY = 'cpa-a11y-settings'

export interface AccessibilitySettings {
  textScale: 100 | 125 | 150
  lineHeight: boolean
  letterSpacing: boolean
  dyslexiaFont: boolean
  highContrast: boolean
  darkMode: boolean
  reduceMotion: boolean
  focusOutlines: boolean
}

interface AccessibilityContextType extends AccessibilitySettings {
  setTextScale: (scale: 100 | 125 | 150) => void
  toggleLineHeight: () => void
  toggleLetterSpacing: () => void
  toggleDyslexiaFont: () => void
  toggleHighContrast: () => void
  toggleDarkMode: () => void
  toggleReduceMotion: () => void
  toggleFocusOutlines: () => void
  resetAll: () => void
}

const defaults: AccessibilitySettings = {
  textScale: 100,
  lineHeight: false,
  letterSpacing: false,
  dyslexiaFont: false,
  highContrast: false,
  darkMode: false,
  reduceMotion: false,
  focusOutlines: false,
}

function loadSettings(): AccessibilitySettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return { ...defaults, ...JSON.parse(stored) }
    }
  } catch {
    // ignore
  }
  return { ...defaults }
}

function saveSettings(settings: AccessibilitySettings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  } catch {
    // ignore
  }
}

const AccessibilityContext = createContext<AccessibilityContextType | null>(null)

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext)
  if (!ctx) {
    throw new Error('useAccessibility must be used within AccessibilityProvider')
  }
  return ctx
}

export type { AccessibilityContextType }
export { AccessibilityContext, defaults, loadSettings, saveSettings }
