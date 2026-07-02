# Contributing

Thanks for your interest in contributing!

## Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Make your changes
4. Run tests and lint: `npm run test && npm run lint`
5. Commit using [Conventional Commits](#commit-conventions)
6. Push and open a Pull Request

## Development Setup

See [README.md](./README.md#getting-started) for setup instructions. Both
Docker and npm-based development are supported.

## Commit Conventions

This project uses [Conventional Commits](https://www.conventionalcommits.org/).
Every commit message must follow the format:

```
<type>: <short description>

[optional body]
```

| Type       | Usage                                   |
|------------|-----------------------------------------|
| `feat`     | A new feature                           |
| `fix`      | A bug fix                               |
| `docs`     | Documentation changes                   |
| `refactor` | Code refactoring (no feature/bug change)|
| `test`     | Adding or fixing tests                  |
| `chore`    | Tooling, deps, config changes           |
| `style`    | Formatting, missing semicolons          |

## Pull Request Process

1. Ensure all CI checks pass (lint, test, build)
2. Update documentation if needed
3. Reference any related issues in the PR description
4. PRs require at least one review before merging

## Code Style

- TypeScript strict mode
- ESLint + Prettier conventions (see project config)
- Prefer named exports over default exports
- Keep components focused: one concern per file
