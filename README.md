# Terminal Block

A Vue 3 component library for rendering macOS-style terminal windows. Supports `ClaudeCode` and `Bash` app layouts with a themeable design.

## Installation

```sh
npm install terminal-block
# or
pnpm add terminal-block
```

`vue` (^3.5.0) is a peer dependency and must be installed separately.

## Usage

### Basic terminal window

Wrap any content in `TerminalBlock` to get the macOS window chrome (traffic-light dots + title bar).

```vue
<script setup>
import { TerminalBlock, Bash } from 'terminal-block'
</script>

<template>
  <TerminalBlock>
    <Bash>
      <Bash.Input>ls -la</Bash.Input>
      <Bash.Output>total 24 drwxr-xr-x 8 user staff 256</Bash.Output>
      <Bash.Input>npm run build</Bash.Input>
      <Bash.Output>Build failed: module not found</Bash.Output>
    </Bash>
  </TerminalBlock>
</template>
```

### Claude Code terminal

```vue
<script setup>
import { TerminalBlock, ClaudeCode } from 'terminal-block'
</script>

<template>
  <TerminalBlock>
    <ClaudeCode version="v2.1.88" subtitle="Opus 4.6 · Max 100x" cwd="~/my-project">
      <ClaudeCode.Input>hello</ClaudeCode.Input>
      <ClaudeCode.Thinking>2s</ClaudeCode.Thinking>
      <ClaudeCode.Output>Hey! How can I help you today?</ClaudeCode.Output>
      <ClaudeCode.Output
        >Build completed in
        <span style="color: var(--terminal-block-ansi-yellow)">2.3s</span></ClaudeCode.Output
      >
    </ClaudeCode>
  </TerminalBlock>
</template>
```

### In-progress thinking state

```vue
<ClaudeCode.Thinking :done="false" verb="analyzing" />
<!-- renders: "Analyzing..." -->

<ClaudeCode.Thinking done>5s</ClaudeCode.Thinking>
<!-- renders: "Thought for 5s" -->
```

## Components

### `TerminalBlock`

The outer window shell. Provides the title bar and applies the theme.

| Prop    | Type                             | Default     | Description                           |
| ------- | -------------------------------- | ----------- | ------------------------------------- |
| `theme` | `string \| Partial<ThemeTokens>` | `"default"` | Named theme or partial token override |

### `ClaudeCode`

Renders a Claude Code session layout with logo, metadata header, and a slot for turns.

| Prop       | Type     | Default                 | Description                                  |
| ---------- | -------- | ----------------------- | -------------------------------------------- |
| `version`  | `string` | `"v2.1.88"`             | Version string shown in the header           |
| `subtitle` | `string` | `"Opus 4.6 · Max 100x"` | Subtitle line below the title                |
| `cwd`      | `string` | `"~"`                   | Working directory displayed in the header    |
| `title`    | `string` | `"✳ Claude Code"`       | Label shown in the `TerminalBlock` title bar |

Sub-components (compound component pattern):

- `ClaudeCode.Input` — user prompt line, rendered with `❯` glyph
- `ClaudeCode.Output` — assistant response line, rendered with `⏺` glyph
- `ClaudeCode.Thinking` — thinking indicator

#### `ClaudeCode.Thinking` props

| Prop   | Type      | Default      | Description                                                      |
| ------ | --------- | ------------ | ---------------------------------------------------------------- |
| `done` | `boolean` | `false`      | `false` shows "Verb...", `true` shows "Thought for &lt;slot&gt;" |
| `verb` | `string`  | `"thinking"` | Action verb used in the in-progress state                        |

### `Bash`

Renders a plain bash session.

| Prop    | Type     | Default  | Description                                  |
| ------- | -------- | -------- | -------------------------------------------- |
| `title` | `string` | `"bash"` | Label shown in the `TerminalBlock` title bar |

Sub-components:

- `Bash.Input` — command line, rendered with `$` glyph
- `Bash.Output` — command output, no glyph

### Inline color styling

The named color components (`Red`, `Green`, `Yellow`, `Blue`, `Magenta`, `Cyan`, `White`) were removed in v2.0.0. Use a `<span>` with the corresponding theme CSS variable instead:

```vue
<!-- Before (v1.x) -->
<ClaudeCode.Output>Status: <Green>OK</Green></ClaudeCode.Output>

<!-- After (v2.0+) -->
<ClaudeCode.Output>Status: <span style="color: var(--terminal-block-ansi-green)">OK</span></ClaudeCode.Output>
```

Available ANSI color variables: `--terminal-block-ansi-red`, `--terminal-block-ansi-green`, `--terminal-block-ansi-yellow`, `--terminal-block-ansi-blue`, `--terminal-block-ansi-magenta`, `--terminal-block-ansi-cyan`, `--terminal-block-ansi-white`.

## Theming

### Default theme

The default theme is based on GitHub Dark. You can import it directly:

```ts
import { defaultTheme } from 'terminal-block'
```

### Custom theme tokens

Pass a partial `ThemeTokens` object to override specific colors:

```vue
<TerminalBlock :theme="{ bg: '#0d1117', text: '#e6edf3', accent: '#58a6ff' }">
  ...
</TerminalBlock>
```

Available `ThemeTokens` keys:

| Token         | Description             |
| ------------- | ----------------------- |
| `bg`          | Window background       |
| `headerBg`    | Title bar background    |
| `inputBg`     | Input row background    |
| `codeBg`      | Code block background   |
| `text`        | Primary text color      |
| `secondary`   | Secondary text color    |
| `muted`       | Muted/dimmed text color |
| `accent`      | Accent color            |
| `divider`     | Divider line color      |
| `ansiRed`     | ANSI red                |
| `ansiGreen`   | ANSI green              |
| `ansiYellow`  | ANSI yellow             |
| `ansiBlue`    | ANSI blue               |
| `ansiMagenta` | ANSI magenta            |
| `ansiCyan`    | ANSI cyan               |
| `ansiWhite`   | ANSI white              |

### Named themes

```vue
<TerminalBlock theme="default">
  ...
</TerminalBlock>
```

### iTerm2 color schemes

You can convert an iTerm2 `.itermcolors` file into theme tokens:

```ts
import { parseItermColors } from 'terminal-block'

const xml = `<?xml version="1.0" ...>...</xml>` // .itermcolors file contents
const theme = parseItermColors(xml)
```

In a Node.js environment (e.g. build-time or SSR), use `loadItermColorsFile` to read from disk:

```ts
import { loadItermColorsFile } from 'terminal-block'

const theme = await loadItermColorsFile('./my-theme.itermcolors')
```

Then pass the result as the `theme` prop:

```vue
<TerminalBlock :theme="theme">
  ...
</TerminalBlock>
```

### `resolveTheme`

Resolve a named theme string or a partial token object into a `Partial<ThemeTokens>`:

```ts
import { resolveTheme } from 'terminal-block'

const tokens = resolveTheme('default')
```

## License

MIT
