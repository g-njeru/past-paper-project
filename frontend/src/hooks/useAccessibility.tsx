import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
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
  } catch {}
  return { ...defaults }
}

function saveSettings(settings: AccessibilitySettings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  } catch {}
}

const AccessibilityContext = createContext<AccessibilityContextType | null>(null)

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(loadSettings)

  const update = useCallback((patch: Partial<AccessibilitySettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch }
      saveSettings(next)
      return next
    })
  }, [])

  const toggle = useCallback(
    (key: keyof AccessibilitySettings) => {
      setSettings((prev) => {
        const next = { ...prev, [key]: !prev[key as keyof AccessibilitySettings] }
        saveSettings(next)
        return next
      })
    },
    [],
  )

  const resetAll = useCallback(() => {
    setSettings({ ...defaults })
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {}
  }, [])

  const value: AccessibilityContextType = {
    ...settings,
    setTextScale: (scale: 100 | 125 | 150) => update({ textScale: scale }),
    toggleLineHeight: () => toggle('lineHeight'),
    toggleLetterSpacing: () => toggle('letterSpacing'),
    toggleDyslexiaFont: () => toggle('dyslexiaFont'),
    toggleHighContrast: () => toggle('highContrast'),
    toggleDarkMode: () => toggle('darkMode'),
    toggleReduceMotion: () => toggle('reduceMotion'),
    toggleFocusOutlines: () => toggle('focusOutlines'),
    resetAll,
  }

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext)
  if (!ctx) {
    throw new Error('useAccessibility must be used within AccessibilityProvider')
  }
  return ctx
}
