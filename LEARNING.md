# Learning Resources

Resources for learning professional software development practices — CI/CD, testing, workflows, and DevOps. All free.

## Roadmaps & Guides

| Resource | What it covers |
|---|---|
| [roadmap.sh/devops](https://roadmap.sh/devops) | Step-by-step DevOps roadmap — CI/CD, automation, testing, containers, cloud |
| [roadmap.sh/guides/ci-cd](https://roadmap.sh/guides/ci-cd) | Visual guide explaining CI vs CD with GitHub Actions walkthrough video |
| [roadmap.sh/best-practices/code-review](https://roadmap.sh/best-practices/code-review) | Code review best practices |
| [roadmap.sh/projects/dockerized-service-deployment](https://roadmap.sh/projects/dockerized-service-deployment) | Hands-on project: Dockerize a service + deploy with GitHub Actions |

## GitHub Actions

| Resource | What it covers |
|---|---|
| [GitHub Actions Zero to Hero](https://github.com/TrainWithShubham/github-actions-zero-to-hero) | 14 progressive workflows — basic triggers to full DevSecOps pipelines |
| [GitHub Actions Training Labs](https://github.com/waelkdouh/GitHub---Actions-Training) | 8 hands-on labs — hello world to environments, caching, self-hosted runners |
| [Complete Guide to GitHub Actions CI/CD (2026)](https://devopsil.com/articles/2026-03-23-complete-guide-github-actions-cicd) | Production-ready patterns: lint, test, security scan, staged deploy, rollback |
| [GitHub Actions Certification Study Guide](https://learn.github.com/certification/ACTIONS) | Official GitHub learning path + practice exam (free) |

## Testing & Quality

| Resource | What it covers |
|---|---|
| [CI/CD Pipeline Testing Guide (2026)](https://helpmetest.com/blog/cicd-testing-guide/) | Quality gates, parallel execution, test strategy in CI/CD |
| [GitHub Actions for Test Automation (2026)](https://aitestingguide.com/github-actions-for-test-automation/) | SDET-focused guide — running tests in CI pipelines |

## Project Takeaways

Practical lessons learned building this project.

### CI/CD Pipeline Design

- **CI runs on every push** — lint, test, build. Fast feedback, blocks bad code.
- **Release runs after CI** — semantic-release analyzes conventional commits, bumps version, updates
  CHANGELOG, creates git tag + GitHub Release. Never deploys.
- **Deploy is manual** — `workflow_dispatch` only. Production doesn't change without explicit intent.
- **Chain workflows** with `workflow_run` trigger (Release waits for CI, no recursive loops).

### Conventional Commits

| Prefix | Effect |
|---|---|
| `fix: ...` | Patch bump (0.3.0 → 0.3.1) |
| `feat: ...` | Minor bump (0.3.0 → 0.4.0) |
| `feat: ...\n\nBREAKING CHANGE: ...` | Major bump (1.0.0) |
| `docs:`, `chore:`, `refactor:` | No release |

### When to run each workflow

| Workflow | Trigger | When to use |
|---|---|---|
| **CI** | Push/PR to `main` | **Always.** Every `main` push automatically lints → tests → builds. No exceptions. |
| **Release** | Auto after CI passes on `main` | **Automatic.** Creates version tag, CHANGELOG, GitHub Release. Does not deploy. |
| **Deploy** | Manual (`workflow_dispatch`) | **Only when you want the live site to update.** Never automatic by design. |

### Common scenarios

| What you want | What to do |
|---|---|
| Quick fix (e.g. typo) | `fix: ...` → push → CI → Release → **Deploy manually** |
| New feature | `feat: ...` → push → CI → Release (minor bump) → **Deploy manually** |
| Just experiment | Push to a feature branch. No CI unless you open a PR. |
| Update live site | `gh workflow run "Deploy to GitHub Pages"` (only after CI+Release on `main`) |
| No version bump needed | Use `docs:`, `chore:`, `refactor:` commit types |

### When to commit

Every commit should be a **logical unit of change** with a conventional commit
prefix. Think of each commit as a mini-changelog entry:

| You just did this | Commit message |
|---|---|
| Fixed a bug | `git commit -m "fix: fix login error when phone is empty"` |
| Added a feature | `git commit -m "feat: add admin whitelist management page"` |
| Updated docs | `git commit -m "docs: add workflow trigger table to LEARNING.md"` |
| Refactored code | `git commit -m "refactor: extract auth guard into separate file"` |
| Chore (deps, config) | `git commit -m "chore: upgrade vitest to v4"` |

Don't commit after every file save. Bundle related changes into one commit.
Don't commit `.env` (it's gitignored). Push to `main` when you're ready for CI.

### When version tags are created

**Automatically by the Release workflow**, not by you. Here's the sequence:

1. You push commits to `main` (e.g. `feat: add X`, `fix: fix Y`)
2. **CI** runs lint → test → build. If it passes, CI succeeds.
3. **Release** runs next (via `workflow_run` trigger).
4. `semantic-release` scans all new commits since the last tag:
   - If any commit has `BREAKING CHANGE` → **major** bump (e.g. 1.0.0)
   - If any commit has `feat:` → **minor** bump (e.g. 0.4.0 → 0.5.0)
   - If any commit has `fix:` → **patch** bump (e.g. 0.4.0 → 0.4.1)
   - Only `docs:`, `chore:`, `refactor:` → **no release** (no tag created)
5. `semantic-release` updates version in `package.json`, updates `CHANGELOG.md`,
   commits those changes with `[skip ci]`, creates a git tag (`v0.5.0`), and
   publishes a GitHub Release.
6. **You never manually tag.** If you push a tag yourself, semantic-release will
   skip (it only processes commits between the last tag and HEAD).

### Summary

- **Commit** → you do it, every logical change
- **Tag** → semantic-release does it automatically, after CI passes on `main`
- **Deploy** → you trigger it manually when ready to publish to GitHub Pages

### Debugging CI Failures

1. Check GitHub Actions logs first — annotations show exact line numbers and errors
2. Reproduce locally with the same commands CI runs (`npm run lint`, `npm run test`, `npm run build`)
3. Fix lint errors before test/build errors
4. Upgrade action versions (`@v4` → `@v6`/`@v7`) when Node deprecation warnings appear
5. Check default `path` changes when upgrading actions (e.g., `upload-pages-artifact@v5` defaults to
   `_site/`, not `dist/`)

### Docker for Development

- Multi-stage Dockerfile: `base` (deps) → `dev` (hot reload) → `build` → `prod` (nginx)
- docker-compose with volume mounts for live code sync
- Anonymous volume for `node_modules` prevents host from overwriting container deps
- Containerization ensures consistent environment across machines but doesn't prevent supply chain
  attacks — need `npm audit` + image scanning (Trivy) + SBOM for that
- **Starting the dev server**
  - `docker compose up` — Requires Docker Desktop running. Slower startup (builds
    container) but fully isolated environment. Hot reload works.
  - `npm run dev` (from `frontend/`) — No Docker needed. Instant startup. Uses host
    Node version. Hot reload works.
  - Both serve on `localhost:5174` (configurable via `HOST_PORT` in `.env`).

### Supabase Backend

- **Auth setup**: Phone + Password provider (not SMS OTP). No Twilio needed —
  dummy values work since no SMS is sent. Enable at Auth → Providers → Phone.
- **Whitelist gating**: A `whitelist` table holds allowed phone numbers. A
  database trigger on `auth.users` insert checks the phone against the whitelist
  and rejects signup with a clear error if not found.
- **Row Level Security**: All tables have RLS policies. `whitelist` is
  admin-only (INSERT/DELETE via `profiles.is_admin`). `papers`/`topics`/`questions`
  are readable by any authenticated user. `profiles` is self-readable + admin-read-all.
- **Admin flow**: You sign up → set `is_admin = true` in `profiles` (via Supabase
  Table Editor) → `/admin` page appears in nav with whitelist management UI.
- **Env config**: `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` in `.env`. Never
  committed — `.env` is gitignored. `.env.example` documents the shape.
  Must be in `frontend/.env` (Vite only reads from the project root, not repo root).
- **Whoops moment**: `sb_publishable_` keys are NOT anon keys. Real anon keys are
  JWT tokens starting with `eyJ`. Found at Project Settings → API.

### Code Organization

- Split context/hooks from provider components to satisfy `react-refresh/only-export-components`
- Keep files focused: one export type per file (components or hooks, not both)
- Empty catch blocks need `// ignore` comments to pass `no-empty` lint rule

### Learning Log Protocol

At the end of each session (after completing a significant task or reaching a
natural stopping point), I will ask "Should I add anything to LEARNING.md?"
before signing off. You decide what goes in — key decisions, discoveries,
gotchas, or nothing at all.

### Merge Conflicts with semantic-release

`semantic-release` bumps the version in `package.json` and commits it to
`main` via the Release workflow. If your local `main` doesn't have that
commit, you'll get a merge conflict when you try to push. The fix:

```bash
git fetch origin
git stash                              # save your local changes
git pull --rebase origin main           # rebase on the release commit
git stash pop                          # restore your changes
# resolve conflict in package.json:
#   keep the version from remote (0.4.0, 0.5.0, etc.)
#   keep your other changes (description, keywords, etc.)
git add package.json
git commit -m "..." && git push
```

The key rule: **always keep the remote's version number** since
semantic-release already computed the correct bump. Your other changes
(description, keywords, etc.) merge normally.
