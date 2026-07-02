# CPA Revision

[![CI](https://github.com/g-njeru/past-paper-project/actions/workflows/ci.yml/badge.svg)](https://github.com/g-njeru/past-paper-project/actions/workflows/ci.yml)
[![Release](https://github.com/g-njeru/past-paper-project/actions/workflows/release.yml/badge.svg)](https://github.com/g-njeru/past-paper-project/actions/workflows/release.yml)
[![Deploy](https://github.com/g-njeru/past-paper-project/actions/workflows/deploy.yml/badge.svg)](https://github.com/g-njeru/past-paper-project/actions/workflows/deploy.yml)
[![License](https://img.shields.io/github/license/g-njeru/past-paper-project)](LICENSE)
[![Version](https://img.shields.io/github/v/release/g-njeru/past-paper-project?include_prereleases&label=version)](https://github.com/g-njeru/past-paper-project/releases)
[![semantic-release](https://img.shields.io/badge/commits-semantic--release-e10079?logo=commitsdotfun)](https://www.conventionalcommits.org)

A professional **CPA (Certified Public Accountant) revision SPA** for practicing past papers. Features phone-based authentication, whitelist access control, and a modern CI/CD pipeline with automated semantic versioning.

## Tech Stack

| Layer          | Technology                                      |
|----------------|-------------------------------------------------|
| Frontend       | React 19, TypeScript, Vite 8, Tailwind CSS 4    |
| UI Components  | Radix UI (NavigationMenu, Dialog, Popover, etc) |
| Backend        | Supabase (Auth, PostgreSQL, RLS)                |
| Auth           | Phone + Password (no SMS costs)                 |
| CI/CD          | GitHub Actions (3 chained workflows)            |
| Versioning     | semantic-release + Conventional Commits         |
| Container      | Docker multi-stage (dev & nginx prod)           |
| Deployment     | GitHub Pages (manual trigger)                   |

## Getting Started

### Prerequisites

- Node.js 22+
- Docker Desktop (optional, for containerized dev)
- A Supabase project (see [Supabase setup](#supabase-setup))

### Quick Start (npm)

```bash
cd frontend
cp .env.example .env   # fill in your Supabase URL + anon key
npm install
npm run dev
```

### Quick Start (Docker)

```bash
cp .env.example frontend/.env   # fill in your Supabase URL + anon key
docker compose up
```

Both serve on `http://localhost:5173` (configurable via `HOST_PORT`).

## Project Structure

```
.
├── .github/workflows/       # CI, Release, Deploy workflows
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── hooks/           # Auth, accessibility, focus management
│   │   ├── lib/             # Supabase client
│   │   ├── pages/           # Dashboard, Papers, Topics, Questions, Auth
│   │   ├── test/            # Test files
│   │   └── types/           # Database type definitions
│   ├── .env.example         # Documented env vars
│   ├── Dockerfile           # Multi-stage: dev, build, prod
│   └── vite.config.ts       # Vite + Vitest config
├── supabase/
│   └── migration.sql        # Full schema + RLS + signup trigger
├── docker-compose.yml       # Dev and prod services
├── nginx.conf               # Production nginx config
└── .releaserc               # semantic-release config
```

## CI/CD Pipeline

| Workflow         | Trigger                  | What it does                                      |
|------------------|--------------------------|---------------------------------------------------|
| **CI**           | Push/PR to `main`        | Lint → Test → Build. Blocks bad code.             |
| **Release**      | Auto after CI passes     | Runs semantic-release → version bump + changelog + tag + GitHub Release. Never deploys. |
| **Deploy**       | Manual (`workflow_dispatch`) | Builds and deploys `frontend/dist/` to GitHub Pages. |

### Commit Conventions

| Prefix            | Version bump | Example                                      |
|-------------------|-------------|----------------------------------------------|
| `fix:`            | Patch       | `fix: correct login error on empty phone`    |
| `feat:`           | Minor       | `feat: add admin whitelist management page`  |
| `feat:\n\nBREAKING CHANGE:` | Major | `feat: redesign auth flow\n\nBREAKING CHANGE: drops email auth` |
| `docs:`, `chore:`, `refactor:` | None | `docs: add workflow trigger table` |

## Environment Variables

| Variable                    | Required | Description                    |
|-----------------------------|----------|--------------------------------|
| `VITE_SUPABASE_URL`         | Yes      | Supabase project URL           |
| `VITE_SUPABASE_ANON_KEY`    | Yes      | Supabase anon key (public)     |
| `HOST_PORT`                 | No       | Docker host port (default 5173)|

Copy `frontend/.env.example` to `frontend/.env` and fill in your values.

## Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Enable **Phone + Password** provider at Auth → Providers → Phone (no SMS needed)
3. Run `supabase/migration.sql` in the SQL Editor
4. Copy `VITE_SUPABASE_URL` (Project Settings → API) and `VITE_SUPABASE_ANON_KEY` to `frontend/.env`

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
