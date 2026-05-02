// components
export { default as TerminalBlock } from './components/TerminalBlock.vue'
export { ClaudeCode } from './components/ClaudeCode'
export { Bash } from './components/Bash'

// color components
export { default as Red } from './components/colors/Red.vue'
export { default as Green } from './components/colors/Green.vue'
export { default as Yellow } from './components/colors/Yellow.vue'
export { default as Blue } from './components/colors/Blue.vue'
export { default as Magenta } from './components/colors/Magenta.vue'
export { default as Cyan } from './components/colors/Cyan.vue'
export { default as White } from './components/colors/White.vue'

// theme system
export { defaultTheme, resolveTheme } from './themes'
export type { ThemeTokens } from './themes'

// iTerm2 parser
export { parseItermColors } from './themes/parse-iterm'
export { loadItermColorsFile } from './themes/load-iterm'
