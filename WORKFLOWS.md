# CI/CD Workflows

This project uses two GitHub Actions workflows.

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

If any step fails, the whole workflow fails and the commit gets a red ❌.

## 2. Deploy to GitHub Pages (`deploy.yml`)

| Trigger | Runs on |
|---|---|
| `workflow_dispatch` | Only when triggered manually |

**Permissions:** `pages: write`, `id-token: write` — needed to deploy to GitHub Pages.

**Job: `build-and-deploy`** — runs in the `frontend/` directory.

| Step | What it does |
|---|---|
| `actions/checkout@v7` | Pulls the repo |
| `actions/setup-node@v6` | Installs Node 22, caches |
| `npm ci` | Clean installs |
| `npm run build` | Type-checks + Vite build |
| `actions/configure-pages@v6` | Configures GitHub Pages settings |
| `actions/upload-pages-artifact@v5` | Uploads `frontend/dist/` as a deploy artifact |
| `actions/deploy-pages@v5` | Deploys artifact to GitHub Pages |

### How to trigger a deploy

**Option A — via CLI:**
```bash
gh workflow run "Deploy to GitHub Pages"
```

**Option B — via GitHub UI:**
1. Go to your repo → **Actions** tab
2. Click **Deploy to GitHub Pages** in the left sidebar
3. Click the **Run workflow** button on the right
4. Click the green **Run workflow** button in the dropdown

The website updates at `https://g-njeru.github.io/past-paper-project/` after the deploy completes (~1–2 min).
