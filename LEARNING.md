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

### Code Organization

- Split context/hooks from provider components to satisfy `react-refresh/only-export-components`
- Keep files focused: one export type per file (components or hooks, not both)
- Empty catch blocks need `// ignore` comments to pass `no-empty` lint rule
