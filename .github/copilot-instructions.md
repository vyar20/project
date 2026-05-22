# Monorepo Development Instructions

## General Rules

- Always follow the existing monorepo architecture and folder structure.
- Keep implementation clean, modular, and scalable.
- Prefer reusable logic over duplication.
- Write code that is easy to understand and maintain by junior developers.
- Avoid overengineering unless explicitly required.

---

# Workspace Rules

## New Apps or Packages

Whenever creating a new app or package inside:

```txt
apps/*
packages/*
```

always follow these rules:

### Package Naming

All workspace packages MUST use:

```txt
@repo/*
```

Example:

```txt
@repo/auth
@repo/database
@repo/api-client
@repo/ui
```

Never use:

- relative local naming
- random package names
- inconsistent scope names

---

# Shared Config Usage

Every new app or package MUST reuse shared configuration from:

```txt
@repo/config
```

Always add and configure:

- `.prettierrc.js`
- `eslint.config.js`
- `tsconfig.json`

using the shared config provided by `@repo/config`.

Do not duplicate configuration logic manually unless absolutely necessary.

---

# Shared Utility Usage

Every new app or package MUST include and use:

```txt
@repo/utils
```

Prefer using shared utilities instead of recreating:

- helper functions
- error handling
- async wrappers
- common utilities
- shared constants

---

# Code Quality

- Keep instructions and implementations high level and easy to follow.
- Do not create overly complex abstractions.
- Prefer readability and maintainability.
- Structure code so it can be implemented by junior developers or lower-cost AI models.

---

# Architecture Rules

- Keep apps isolated.
- Keep reusable logic inside `packages/*`.
- Avoid circular dependencies.
- Avoid direct app-to-app imports.
- Shared logic belongs in reusable packages.

---

# Development Standards

- Use TypeScript.
- Follow existing linting and formatting rules.
- Reuse existing patterns before introducing new ones.
- Keep folder structures consistent across apps and packages.

---

# Completion Rules

After completing implementation:

1. Run linting and type checking.
2. Ensure the project builds successfully.
3. Commit changes using a clear commit message.
4. Create a Pull Request with a concise summary of changes.

Always include:

- what was changed
- why it was changed
- affected apps/packages
- important notes if needed
