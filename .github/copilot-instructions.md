# Monorepo Development Instructions

## General Rules

- Always follow the existing monorepo architecture and folder structure.
- Keep implementation clean, modular, and scalable.
- Prefer reusable logic over duplication.
- Write code that is easy to understand and maintain by junior developers.
- Avoid overengineering unless explicitly required.

---

# Runtime & Package Manager Rules

## Bun Standardization

Always use:

```txt
Bun
```

as the primary:
- runtime
- package manager
- script runner

Do not use:
- npm
- yarn
- pnpm

unless explicitly required by the project.

---

## Bun Features

Always prefer Bun-native features whenever possible.

Examples:
- `bun install`
- `bun run`
- `bun test`
- `bunx`
- Bun runtime APIs
- Bun package manager
- Bun workspace support

Prefer Bun solutions over third-party alternatives when suitable.

Example:

```txt
bun run dev
bun test
bunx prisma generate
```

---

## Dependency Management

- Keep dependencies minimal.
- Prefer lightweight and modern packages.
- Avoid unnecessary libraries if Bun already provides native support.
- Reuse shared packages inside the monorepo whenever possible.

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

All workspace packages and apps MUST use the following naming format:

```txt
@repo/<package-or-project-name>
```

Example:

```txt
@repo/auth
@repo/database
@repo/api-client
@repo/ui
@repo/mobile
@repo/backend
```

Rules:
- Always use the `@repo/` scope.
- Package or project names must be lowercase.
- Use kebab-case (`-`) when needed.
- Names should be descriptive and consistent.

Never use:
- relative local naming
- random package names
- inconsistent scope names
- camelCase naming
- PascalCase naming

Invalid examples:

```txt
auth
myPackage
@repo/Auth
@repo/authService
```

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

# File Naming Convention

Always use kebab-case (`-`) for file and folder naming.

Example:

```txt
auth-route.ts
user-service.ts
create-user.dto.ts
auth-middleware.ts
database-client.ts
```

Never use:
- camelCase file names
- PascalCase file names
- snake_case file names
- inconsistent naming formats

Examples of invalid naming:

```txt
authRoute.ts
AuthRoute.ts
auth_route.ts
```

This rule applies to:
- routes
- services
- controllers
- utilities
- hooks
- components
- configs
- DTOs
- schemas
- middleware
- tests

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
