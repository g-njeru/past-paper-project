import { useState, useCallback, type ReactNode } from 'react'
import {
  AccessibilityContext,
  defaults,
  loadSettings,
  saveSettings,
  type AccessibilitySettings,
  type AccessibilityContextType,
} from './accessibility-context'

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
      localStorage.removeItem('cpa-a11y-settings')
    } catch {
      // ignore
    }
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
