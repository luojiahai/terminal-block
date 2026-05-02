import githubDarkRaw from './github-dark.itermcolors?raw'
import { parseItermColors } from './parse-iterm'

export interface ThemeTokens {
  bg: string
  titlebarBg: string
  inputBg: string
  codeBg: string
  text: string
  secondary: string
  muted: string
  accent: string
  divider: string
  ansiRed: string
  ansiGreen: string
  ansiYellow: string
  ansiBlue: string
  ansiMagenta: string
  ansiCyan: string
  ansiWhite: string
}

const parsedDefault = parseItermColors(githubDarkRaw)
const REQUIRED_KEYS: (keyof ThemeTokens)[] = [
  'bg', 'titlebarBg', 'inputBg', 'codeBg', 'text', 'secondary',
  'muted', 'accent', 'divider', 'ansiRed', 'ansiGreen', 'ansiYellow',
  'ansiBlue', 'ansiMagenta', 'ansiCyan', 'ansiWhite',
]
const missing = REQUIRED_KEYS.filter((k) => parsedDefault[k] == null)
if (missing.length) {
  throw new Error(`[terminal-block] github-dark.itermcolors is missing keys: ${missing.join(', ')}`)
}
export const defaultTheme = parsedDefault as ThemeTokens

const NAMED_THEMES: Record<string, Partial<ThemeTokens>> = {
  default: defaultTheme,
}

export function resolveTheme(theme: string | Partial<ThemeTokens>): Partial<ThemeTokens> {
  if (typeof theme !== 'string') return theme
  const found = NAMED_THEMES[theme]
  if (!found) throw new Error(`[terminal-block] Unknown theme: "${theme}"`)
  return found
}
