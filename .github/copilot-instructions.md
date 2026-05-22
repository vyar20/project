# Monorepo Development Instructions

## General Rules

- Always follow the existing monorepo architecture and folder structure.
- Keep implementation clean, modular, and scalable.
- Prefer reusable logic over duplication.
- Write code that is easy to understand and maintain by junior developers.
- Avoid overengineering unless explicitly required.

---

# Communication Rules

## Clarification Questions

Before implementing large changes, unclear requirements, or new architecture decisions, always ask short clarification questions using a simple Yes/No format.

The goal is to:
- reduce ambiguity
- avoid incorrect implementation
- align with the expected architecture
- make instructions easier for junior developers or lower-cost AI models

Examples:

```txt
Should authentication be shared across all apps? (Yes/No)

Should this package support server-side usage only? (Yes/No)

Should this feature use Bun-native APIs? (Yes/No)

Should the new package be reusable across apps? (Yes/No)
```

Rules:
- Keep questions short and direct.
- Prefer Yes/No questions whenever possible.
- Avoid overly complex discussions unless necessary.
- Ask only the minimum number of questions required for implementation clarity.

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

## Dependency Installation Rules

Always install dependencies directly inside the related app or package whenever possible.

Example:

```txt
apps/backend
packages/auth
packages/database
```

Install dependencies only where they are actually used.

Do NOT install dependencies in the root workspace unless:
- the dependency is shared across multiple apps/packages
- the dependency is used for monorepo tooling
- the dependency is required globally for development workflows

Examples of valid root dependencies:
- turbo
- typescript
- prettier
- eslint
- husky
- lint-staged

Avoid unnecessary root-level dependencies to keep the workspace clean and isolated.

---

# GitHub CLI Rules

Always use the installed GitHub CLI:

```txt
gh
```

for GitHub-related operations whenever possible.

Examples:
- creating pull requests
- viewing PRs
- creating issues
- authentication
- repository workflows

Example commands:

```txt
gh pr create
gh pr view
gh issue create
```

Prefer GitHub CLI over manual browser-based workflows when applicable.

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

## Promise Handling Standard

Whenever handling async operations or promises, always use the shared `p` helper from:

```txt
@repo/utils/utils
```

Example:

```ts
const [err, result] = await p(fetcher("some-url"))
```

Variable naming should follow the related function or business context.

Examples:

```ts
const [userError, user] = await p(getUser())

const [createUserError, createdUser] = await p(createUser())

const [fetchProductsError, products] = await p(fetchProducts())
```

Rules:
- Prefer tuple-based async handling over repetitive try/catch blocks.
- Keep error handling readable and consistent.
- Use descriptive variable names based on the executed function.
- Avoid deeply nested try/catch logic unless absolutely necessary.

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

Always use:
- git
- gh CLI
- Bun commands

for all development and repository workflows whenever possible.
