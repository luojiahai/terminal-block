import { registerApp, type AppConfig } from './index'

const LOGO = `  ╭──────────╮
  │ ◆ claude │
  ╰──────────╯`

export const claudeCode: AppConfig = {
  id: 'claude-code',
  supportedTurns: ['InputTurn', 'OutputTurn', 'Thinking'],
  inputTurn: {
    glyph: '❯',
    glyphColor: '--tb-secondary',
    textColor: '--tb-text',
    blockBg: true,
  },
  outputTurn: {
    glyph: '⏺',
    glyphColor: '--tb-text',
    textColor: '--tb-text',
    blockBg: false,
  },
  header: {
    logo: LOGO,
    logoColor: '--tb-accent',
  },
}

registerApp(claudeCode)
