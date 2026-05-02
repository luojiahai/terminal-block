# Development

## Setup

```sh
pnpm install
```

## Dev server

Runs a local Vite dev server with the demo `App.vue`:

```sh
pnpm run dev
```

## Build

Type-checks and compiles the library to `dist/`:

```sh
pnpm run build
```

Output:
- `dist/terminal-block.js` — ESM bundle
- `dist/terminal-block.umd.cjs` — CJS bundle
- `dist/index.d.ts` — type declarations

## Tests

### Unit tests (Vitest + jsdom)

```sh
pnpm run test:unit
```

Run a single file:

```sh
pnpm run test:unit src/components/__tests__/TerminalBlock.spec.ts
```

### End-to-end tests (Playwright)

Requires a production build first:

```sh
pnpm run build
pnpm run test:e2e
```

Other options:

```sh
# Chromium only
pnpm run test:e2e -- --project=chromium

# Specific file
pnpm run test:e2e -- tests/example.spec.ts

# Debug mode
pnpm run test:e2e -- --debug

# Install browsers (first run)
npx playwright install
```

## Lint & format

```sh
pnpm run lint    # oxlint then eslint (both with --fix)
pnpm run format  # prettier on src/
```

## Architecture notes

See `CLAUDE.md` for a full architectural overview of the component system, theme tokens, and build output.
