import { describe, it, expect } from 'vitest'
import { resolveApp, type AppConfig } from '../index'

const customApp: AppConfig = {
  id: 'custom',
  supportedTurns: ['InputTurn', 'OutputTurn'],
  inputTurn: { glyph: '>', glyphColor: '--tb-secondary', textColor: '--tb-text', blockBg: false },
  outputTurn: { glyph: null, glyphColor: '--tb-text', textColor: '--tb-text', blockBg: false },
}

describe('resolveApp', () => {
  it('resolves "bash" to bash AppConfig', () => {
    const app = resolveApp('bash')
    expect(app.id).toBe('bash')
  })

  it('resolves "claude-code" to claude-code AppConfig', () => {
    const app = resolveApp('claude-code')
    expect(app.id).toBe('claude-code')
  })

  it('passes through an AppConfig object unchanged', () => {
    expect(resolveApp(customApp)).toBe(customApp)
  })

  it('throws for unknown string keys', () => {
    expect(() => resolveApp('unknown-app')).toThrow('[terminal-block] Unknown app: "unknown-app"')
  })
})
