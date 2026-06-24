# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Fixed

- **CI lint errors** — replaced dead `createClient` stub in `supabase.ts` with inline type alias to
  eliminate unused-variable violations
- **CI lint errors** — split `useAnnounce.tsx` into `announce-context.ts` (context + hook) and
  `useAnnounce.tsx` (Provider only) to satisfy `react-refresh/only-export-components`
- **CI lint errors** — split `useAccessibility.tsx` into `accessibility-context.ts` (types, helpers,
  hook) and `useAccessibility.tsx` (Provider only); added `// ignore` comments to empty catch
  blocks to satisfy `no-empty`
- **CI lint errors** — removed unused `ReactNode` import from `accessibility-context.ts`
- **GitHub Actions deprecation** — upgraded `actions/checkout` to `v7`, `actions/setup-node` to
  `v6`, `actions/configure-pages` to `v6`, `actions/upload-pages-artifact` to `v5`,
  `actions/deploy-pages` to `v5` to resolve Node 20 deprecation warnings

### Added

- **Accessibility settings panel** — floating `A11yToggle` button (bottom-right) opens a popover
  panel (`A11yPanel`) with controls for text scale (100%/125%/150%), line height, letter spacing,
  dyslexia font, high contrast, dark mode, reduce motion, and focus outlines
- **Accessibility context** — `AccessibilityProvider` / `useAccessibility` hook with `localStorage`
  persistence
- **A11yStyles** — applies `data-a11y-*` attributes to `<html>`, consumed by CSS rules in
  `index.css` for all accessibility overrides
- **Unit tests** — `useAccessibility.test.tsx` (18 tests covering defaults, toggles, reset,
  persistence), `A11yPanel.test.tsx` (7 tests covering rendering, toggle interaction, text scale,
  reset), `A11yToggle.test.tsx` (2 tests covering button render and panel open)

### Changed

- **`main.tsx`** — wrapped `<App />` in `<AccessibilityProvider>`
- **`Layout.tsx`** — added `<A11yStyles />` and `<A11yToggle />`
- **`App.test.tsx`** — wrapped renders in `<AccessibilityProvider>` to match provider hierarchy

## [0.1.0] — 2026-06-22

### Added

- Initial release: accessible CPA revision SPA with React, TypeScript, Vite, Tailwind CSS,
  Radix UI, and React Router
- Pages: Dashboard, Papers, Topics, Questions, 404
- Live region announcements via `AnnounceProvider` / `useAnnounce`
- Skip link, keyboard-accessible navigation, focus management
- CI/CD: GitHub Actions (CI with lint, test, build) + GitHub Pages deploy + Docker multi-stage
  build
