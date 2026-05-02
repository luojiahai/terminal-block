import type { InjectionKey, Ref } from 'vue'
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

export const TB_THEME_KEY: InjectionKey<Ref<ThemeTokens>> = Symbol('tbTheme')

const parsedDefault = parseItermColors(githubDarkRaw)
export const defaultTheme: ThemeTokens = {
  inputBg: '#484f58',
  codeBg: '#484f58',
  ...parsedDefault,
} as ThemeTokens

const NAMED_THEMES: Record<string, Partial<ThemeTokens>> = {
  default: defaultTheme,
}

export function resolveTheme(theme: string | Partial<ThemeTokens>): Partial<ThemeTokens> {
  if (typeof theme !== 'string') return theme
  const found = NAMED_THEMES[theme]
  if (!found) throw new Error(`[terminal-block] Unknown theme: "${theme}"`)
  return found
}
