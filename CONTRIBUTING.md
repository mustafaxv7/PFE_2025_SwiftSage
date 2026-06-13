# Contributing to SwiftSage

Thank you for contributing! This guide covers code style, workflow, and PR expectations.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/PFE_2025_SwiftSage.git`
3. Create a branch: `git checkout -b feature/your-feature`
4. Install dependencies: `npm install && npm install --prefix client`
5. Copy `.env.example` to `.env` and configure

## Code Style

- **Formatter**: Prettier (enforced via pre-commit hook)
- **Linter**: ESLint with zero-warnings policy
- Run before committing:
  ```bash
  npm run lint
  ```

### Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Files (server) | camelCase | `authService.js` |
| Files (client) | PascalCase | `LoginForm.jsx` |
| Directories | kebab-case | `dashboard/admin/` |
| Variables | camelCase | `userId` |
| Constants | UPPER_SNAKE | `MAX_RETRIES` |
| Classes | PascalCase | `AuthService` |
| React Components | PascalCase | `LoginForm` |

### Server Module Structure

Each feature module follows this pattern:
```
modules/feature/
├── feature.routes.js        # Express router
├── feature.controller.js    # HTTP handlers
├── feature.service.js       # Business logic
├── feature.repository.js    # Database queries
├── feature.validation.js    # Joi schemas
└── __tests__/               # Unit tests
```

### Client Component Structure

- Components in `components/` are PascalCase `.jsx` files
- Shared utilities in `utils/` are camelCase `.js` files
- Use `fetchWithAuth()` for all API calls
- Never store secrets in client code

## Git Workflow

1. **Branch naming**: `feature/`, `fix/`, `chore/`, `docs/`
2. **Commit messages**: imperative mood, lowercase, max 72 chars
   ```
   feat: add user profile page
   fix: resolve login redirect loop
   chore: update dependencies
   docs: add API endpoint documentation
   ```
3. **Before pushing**: `npm run lint && npm run test`
4. **PR title**: matches commit style, describes the change

## Pull Request Template

```markdown
## What
Brief description of the change.

## Why
Link to issue or explain the motivation.

## How
Key implementation decisions.

## Testing
- [ ] Unit tests pass (`npm run test`)
- [ ] Lint passes (`npm run lint`)
- [ ] Manual testing done (describe steps)
```

## Environment Variables

Never commit `.env` files. Use `.env.example` as reference.
Run `npm run check-env` to validate your configuration.

## Questions?

Open a GitHub issue with the `question` label.
