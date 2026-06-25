# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

# [0.4.0](https://github.com/g-njeru/past-paper-project/compare/v0.3.2...v0.4.0) (2026-06-25)


### Bug Fixes

* add mock Supabase env vars to vitest config for CI ([8fac2f1](https://github.com/g-njeru/past-paper-project/commit/8fac2f1733fe3fd63f7698760e16981718c2b879))
* move fetchWhitelist before useEffect and suppress react-refresh in useAuth ([c3a8f03](https://github.com/g-njeru/past-paper-project/commit/c3a8f03e209fd2ed2159308b4ac7cb630d98214e))
* suppress react-hooks/set-state-in-effect lint error in Admin.tsx ([831a369](https://github.com/g-njeru/past-paper-project/commit/831a3690f1fece65576add31a73295fec1417594))
* suppress react-hooks/set-state-in-effect on fetchWhitelist in useEffect ([5b9c308](https://github.com/g-njeru/past-paper-project/commit/5b9c30871bddfd7a21afda9164d1d2d11a142524))


### Features

* add Supabase backend with phone auth and whitelist gating ([f7a5a43](https://github.com/g-njeru/past-paper-project/commit/f7a5a438aa945f88337a13d910a9a1692fc70de9))

## [0.3.2](https://github.com/g-njeru/past-paper-project/compare/v0.3.1...v0.3.2) (2026-06-25)


### Bug Fixes

* make dev server host port configurable via HOST_PORT env var ([ddaac5d](https://github.com/g-njeru/past-paper-project/commit/ddaac5d8e335f42ca61b0523d556aed0c642d333))

## [0.3.1](https://github.com/g-njeru/past-paper-project/compare/v0.3.0...v0.3.1) (2026-06-25)


### Bug Fixes

* separate deploy from release workflow, keep deploy manual ([7d9fe3a](https://github.com/g-njeru/past-paper-project/commit/7d9fe3af0c82b1adbbfa65977f8262a8eee94018))

# [0.3.0](https://github.com/g-njeru/past-paper-project/compare/v0.2.0...v0.3.0) (2026-06-25)


### Features

* add Docker dev stage with docker-compose for consistent dev environment ([f2997cb](https://github.com/g-njeru/past-paper-project/commit/f2997cb2efefabc3a448f8b0c625de2af370707f))

# [0.2.0](https://github.com/g-njeru/past-paper-project/compare/v0.1.0...v0.2.0) (2026-06-24)


### Features

* merge deploy into release workflow for automatic deployment ([7c6fcfd](https://github.com/g-njeru/past-paper-project/commit/7c6fcfd1f130958e3601c3d3c2da242baa4a6804))

## [0.1.0] — 2026-06-22

### Added

- Initial release: accessible CPA revision SPA with React, TypeScript, Vite, Tailwind CSS,
  Radix UI, and React Router
- Pages: Dashboard, Papers, Topics, Questions, 404
- Live region announcements via `AnnounceProvider` / `useAnnounce`
- Skip link, keyboard-accessible navigation, focus management
- CI/CD: GitHub Actions (CI with lint, test, build) + GitHub Pages deploy + Docker multi-stage
  build
