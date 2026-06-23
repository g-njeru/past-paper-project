import { useEffect } from 'react'
import { useAccessibility } from '../../hooks/useAccessibility'

function setAttr(name: string, value: string | null) {
  if (value === null) {
    document.documentElement.removeAttribute(name)
  } else {
    document.documentElement.setAttribute(name, value)
  }
}

export default function A11yStyles() {
  const {
    textScale,
    lineHeight,
    letterSpacing,
    dyslexiaFont,
    highContrast,
    darkMode,
    reduceMotion,
    focusOutlines,
  } = useAccessibility()

  useEffect(() => {
    setAttr('data-a11y-text-scale', String(textScale))
  }, [textScale])

  useEffect(() => {
    setAttr('data-a11y-line-height', lineHeight ? 'true' : null)
  }, [lineHeight])

  useEffect(() => {
    setAttr('data-a11y-letter-spacing', letterSpacing ? 'true' : null)
  }, [letterSpacing])

  useEffect(() => {
    setAttr('data-a11y-dyslexia-font', dyslexiaFont ? 'true' : null)
  }, [dyslexiaFont])

  useEffect(() => {
    setAttr('data-a11y-high-contrast', highContrast ? 'true' : null)
  }, [highContrast])

  useEffect(() => {
    setAttr('data-a11y-dark-mode', darkMode ? 'true' : null)
  }, [darkMode])

  useEffect(() => {
    setAttr('data-a11y-reduce-motion', reduceMotion ? 'true' : null)
  }, [reduceMotion])

  useEffect(() => {
    setAttr('data-a11y-focus-outlines', focusOutlines ? 'true' : null)
  }, [focusOutlines])

  return null
}
