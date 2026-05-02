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

export const defaultTheme: ThemeTokens = {
  bg: '#010409',
  titlebarBg: '#010409',
  inputBg: '#484f58',
  codeBg: '#484f58',
  text: '#e6edf3',
  secondary: '#b1bac4',
  muted: '#6e7681',
  accent: '#d29922',
  divider: '#6e7681',
  ansiRed: '#ff7b72',
  ansiGreen: '#3fb950',
  ansiYellow: '#d29922',
  ansiBlue: '#58a6ff',
  ansiMagenta: '#bc8cff',
  ansiCyan: '#39c5cf',
  ansiWhite: '#b1bac4',
}

export function resolveTheme(_theme: string | Partial<ThemeTokens>): Partial<ThemeTokens> {
  return {}
}
