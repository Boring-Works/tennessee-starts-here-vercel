# Contributing to Tennessee Starts Here

This guide covers development standards and workflows for the project.

## Quick Start

```bash
# Install dependencies (also sets up git hooks)
npm install

# Start development server
npm run dev

# Run linting
npm run lint

# Format code
npm run format
```

## Pre-Commit Hooks

This project uses **Husky** and **lint-staged** to automatically run checks before each commit.

### What Happens on Commit

1. **ESLint** runs on all staged `.ts` and `.tsx` files
2. **Prettier** formats all staged files
3. If either fails, the commit is blocked

### Bypassing Hooks (Not Recommended)

```bash
# Only use in emergencies
git commit --no-verify -m "emergency fix"
```

## Code Quality Rules

### No Raw Console Statements

**ESLint enforces `no-console`** - you cannot use `console.log`, `console.error`, etc. directly.

#### Use the Logger Instead

```typescript
import { logger } from '@/lib/logger'

// Available methods:
logger.debug('Verbose development info', { data })
logger.info('General information')
logger.warn('Potential issue')
logger.error('Something failed', error)
```

#### Why?

- **Production-safe**: Logger only outputs in development
- **Consistent format**: All logs have prefixes like `[DEBUG]`, `[ERROR]`
- **Extensible**: Easy to add error tracking (Sentry) later
- **No cleanup needed**: Nothing to remember to remove before deploy

#### The Only Exception

The `lib/logger.ts` file itself is the only place allowed to use raw `console.*` (it has an ESLint disable comment).

## File Structure

```
app/                    # Next.js App Router pages
  (main)/               # Main site layout group
  (almanac)/            # Almanac layout group
components/             # React components
  almanac/              # Almanac-specific components
lib/                    # Utilities and helpers
  almanac/              # Almanac-specific utilities
  logger.ts             # Centralized logging utility
data/                   # Static JSON data
public/                 # Static assets
docs/                   # Documentation
```

## Code Style

### TypeScript

- Use strict TypeScript (`strict: true` in tsconfig)
- Prefer `interface` over `type` for object shapes
- Use explicit return types for exported functions

### Components

- Use CSS Modules for styling (`.module.css`)
- Prefer Server Components unless client interactivity is needed
- Add `'use client'` directive only when necessary

### Imports

```typescript
// External packages first
import { useState } from 'react'
import Link from 'next/link'

// Internal imports second
import { logger } from '@/lib/logger'
import styles from './Component.module.css'
```

## Scripts Reference

| Command                | Description                     |
| ---------------------- | ------------------------------- |
| `npm run dev`          | Start development server        |
| `npm run build`        | Production build                |
| `npm run start`        | Start production server         |
| `npm run lint`         | Run ESLint                      |
| `npm run lint:fix`     | Run ESLint with auto-fix        |
| `npm run format`       | Format all files with Prettier  |
| `npm run format:check` | Check formatting without fixing |

## Troubleshooting

### Pre-commit Hook Failing

```bash
# Check what's failing
npm run lint

# Auto-fix what's possible
npm run lint:fix
npm run format

# Try committing again
git add .
git commit -m "your message"
```

### Console Statement Errors

If you see `Unexpected console statement`:

1. Import the logger: `import { logger } from '@/lib/logger'`
2. Replace `console.log(x)` with `logger.debug('message', { x })`
3. Replace `console.error(e)` with `logger.error('message', e)`

## Need Help?

- Check `docs/` folder for detailed guides
- Review existing code for patterns
- Ask before making architectural changes
