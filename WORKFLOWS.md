# CI/CD Workflows

This project uses two GitHub Actions workflows that chain together automatically.

## 1. CI (`ci.yml`)

| Trigger | Runs on |
|---|---|
| Push to `main` | Every commit |
| Pull request targeting `main` | Every PR |

**Job: `check`** — runs in the `frontend/` directory.

| Step | What it does |
|---|---|
| `actions/checkout@v7` | Pulls the repo |
| `actions/setup-node@v6` | Installs Node 22, caches `node_modules` |
| `npm ci` | Clean installs dependencies from lockfile |
| `npm run lint` | Runs ESLint |
| `npm run test` | Runs Vitest (unit tests) |
| `npm run build` | Type-checks with `tsc`, builds with Vite |

If any step fails, the workflow fails and the commit gets a red ❌ — no release or deploy happens.

## 2. Release & Deploy (`release.yml`)

**Triggers automatically** after CI passes on `main`.

Two jobs run sequentially:

### Job 1: `release`

Runs `semantic-release` which:
- Analyzes commits since the last tag
- Bumps the version (patch/minor/major)
- Updates `CHANGELOG.md`
- Creates a git tag
- Publishes a GitHub Release

### Job 2: `deploy`

Runs only after `release` succeeds. Builds the frontend and deploys to GitHub Pages.

| Step | What it does |
|---|---|
| `actions/checkout@v7` | Pulls the latest code (with version bump) |
| `actions/setup-node@v6` | Installs Node 22, caches |
| `npm ci` | Clean installs |
| `npm run build` | Type-checks + Vite build |
| `actions/configure-pages@v6` | Configures GitHub Pages settings |
| `actions/upload-pages-artifact@v5` | Uploads `frontend/dist/` as a deploy artifact |
| `actions/deploy-pages@v5` | Deploys artifact to GitHub Pages |

### Full pipeline

```
Commit → CI → Release → Deploy
```

One push to `main` runs lint, tests, and build. If all pass, semantic-release creates a new version, then the site is automatically deployed to `https://g-njeru.github.io/past-paper-project/`.

### Manual deploy (emergency trigger)

If you need to redeploy without a new release (e.g., rollback), run:
```bash
gh workflow run "Release & Deploy"
```
