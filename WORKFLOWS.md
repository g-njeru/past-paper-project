# CI/CD Workflows

This project uses three GitHub Actions workflows that form a complete pipeline.

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

If any step fails, the workflow fails and the commit gets a red ❌ — no release happens.

## 2. Release (`release.yml`)

**Triggers automatically** after CI passes on `main`.

| Step | What it does |
|---|---|
| `semantic-release` | Analyzes commits → bumps version → updates `CHANGELOG.md` → creates git tag → publishes GitHub Release |

Does **not** deploy. Only versions the code.

## 3. Deploy to GitHub Pages (`deploy.yml`)

| Trigger | How |
|---|---|
| `workflow_dispatch` | Manual only — GitHub UI or CLI |

| Step | What it does |
|---|---|
| `actions/checkout@v7` | Pulls the repo |
| `actions/setup-node@v6` | Installs Node 22, caches |
| `npm ci` | Clean installs |
| `npm run build` | Type-checks + Vite build |
| `actions/configure-pages@v6` | Configures GitHub Pages settings |
| `actions/upload-pages-artifact@v5` | Uploads `frontend/dist/` as a deploy artifact |
| `actions/deploy-pages@v5` | Deploys artifact to GitHub Pages |

## Development workflow

```
docker compose up  →  localhost:5173  (test changes locally)
      ↓
git push           →  CI  →  Release (version bump + tag)
      ↓
Verify on :5173, then manually trigger deploy when ready
```

### How to trigger a deploy

```bash
gh workflow run "Deploy to GitHub Pages"
```

Or via GitHub UI: **Actions** → **Deploy to GitHub Pages** → **Run workflow**.

Live URL: `https://g-njeru.github.io/past-paper-project/`
