# CI/CD Pipeline

## Continuous Integration (CI) — Automatic

**File:** `.github/workflows/ci.yml`

**Trigger:** Every push or pull request to the `main` branch.

**Steps:**
1. **Checkout** — pull the latest code from the repository
2. **Setup Node 22** — install Node.js v22 with npm caching for faster subsequent runs
3. **`npm ci`** — clean install dependencies (exact versions from `package-lock.json`)
4. **`npm run lint`** — run ESLint to catch code style and type errors
5. **`npm run test`** — run Vitest (unit tests with React Testing Library + jsdom)
6. **`npm run build`** — TypeScript compilation (`tsc -b`) → Vite production build → copy `index.html` to `404.html`

**If any step fails** → the entire workflow fails with a red ❌, blocking the PR or commit.

---

## Continuous Deployment (CD) — Manual

**File:** `.github/workflows/deploy.yml`

**Trigger:** Manual only — click "Run workflow" in the GitHub Actions tab.

**Steps:**
1. **Checkout + Setup + `npm ci`** — same as CI
2. **`npm run build`** — produces the production bundle in `frontend/dist/`
3. **`actions/configure-pages`** — configure GitHub Pages for the deployment action
4. **`actions/upload-pages-artifact`** — upload `frontend/dist/` as a deploy artifact
5. **`actions/deploy-pages`** — deploy the artifact to GitHub Pages

**Live URL:** `https://g-njeru.github.io/past-paper-project/`

---

## SPA Routing on GitHub Pages (The "404 Trick")

GitHub Pages only serves static files and doesn't support server-side routing. Client-side routes like `/questions` or `/topics` would normally return 404.

**Solution:** The build script includes `cp dist/index.html dist/404.html`. When GitHub Pages gets a 404, it serves `404.html` (which is a copy of `index.html`), and React Router handles the routing client-side.

---

## Pipeline Flow Diagram

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Push/PR     │     │  npm ci     │     │  npm run    │
│  to main     │ ──→ │  (clean     │ ──→ │  lint +     │
│              │     │  install)   │     │  test       │
└─────────────┘     └─────────────┘     └──────┬──────┘
                                               │
                                        ┌──────▼──────┐
                                        │  npm run    │
                                        │  build      │
                                        └──────┬──────┘
                                               │
                                   CI passes?  │
                                  ┌────────────┴────────────┐
                                  │                         │
                                  ▼                         ▼
                           ┌─────────────┐          ┌─────────────┐
                           │  PR merges  │          │  ❌ Fix     │
                           │  safely     │          │  & retry    │
                           └─────────────┘          └─────────────┘

  Manual deploy:
  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
  │  "Run       │     │  Build +    │     │  Deploy to  │
  │  workflow"  │ ──→ │  Upload     │ ──→ │  GitHub     │
  │  button     │     │  artifact   │     │  Pages      │
  └─────────────┘     └─────────────┘     └─────────────┘
```

## Key Design Decisions

| Decision | Why |
|----------|-----|
| **Manual deploy** | Gives control — no surprise deploys on every push |
| **Separate CI + CD workflows** | CI runs on every push (fast feedback); CD only when ready |
| **npm ci not npm install** | Deterministic installs — exactly matches `package-lock.json` |
| **Node 22** | Matches local development version |
| **Debian/Ubuntu runner** | Fast, standard, well-supported |
| **404.html trick** | Enables SPA client-side routing on static GitHub Pages |
