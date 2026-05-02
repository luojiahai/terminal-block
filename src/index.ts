// components
export { default as TerminalBlock } from './components/TerminalBlock.vue'
export { default as InputTurn } from './components/InputTurn.vue'
export { default as OutputTurn } from './components/OutputTurn.vue'
export { default as Thinking } from './components/Thinking.vue'

// color components
export { default as Red } from './components/colors/Red.vue'
export { default as Green } from './components/colors/Green.vue'
export { default as Yellow } from './components/colors/Yellow.vue'
export { default as Blue } from './components/colors/Blue.vue'
export { default as Magenta } from './components/colors/Magenta.vue'
export { default as Cyan } from './components/colors/Cyan.vue'
export { default as White } from './components/colors/White.vue'

// app configs and types
export { bash } from './apps/bash'
export { claudeCode } from './apps/claude-code'
export { resolveApp } from './apps'
export type { AppConfig, TurnConfig } from './apps'

// theme system
export { defaultTheme, resolveTheme } from './themes'
export type { ThemeTokens } from './themes'

// iTerm2 parser
export { parseItermColors } from './themes/parse-iterm'
