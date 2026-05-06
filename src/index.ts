// components
export { default as TerminalBlock } from "./components/TerminalBlock.vue";
export { ClaudeCode } from "./components/ClaudeCode";
export { Bash } from "./components/Bash";

// theme system
export { defaultTheme, resolveTheme } from "./themes";
export type { ThemeTokens } from "./themes";

// iTerm2 parser
export { parseItermColors } from "./themes/parse-iterm";
export { loadItermColorsFile } from "./themes/load-iterm";
