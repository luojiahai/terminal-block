import { registerApp, type AppConfig } from './index'

export const bash: AppConfig = {
  id: 'bash',
  supportedTurns: ['InputTurn', 'OutputTurn'],
  inputTurn: {
    glyph: '$',
    glyphColor: '--tb-secondary',
    textColor: '--tb-text',
    blockBg: false,
  },
  outputTurn: {
    glyph: null,
    glyphColor: '--tb-text',
    textColor: '--tb-text',
    blockBg: false,
  },
  header: {
    logo: null,
    logoColor: '--tb-accent',
  },
}

registerApp(bash)
