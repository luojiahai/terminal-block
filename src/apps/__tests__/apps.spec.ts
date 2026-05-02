import { describe, it, expect } from 'vitest'
import { resolveApp, type AppConfig } from '../index'
import { bash } from '../bash'
import { claudeCode } from '../claude-code'

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

describe('bash app config', () => {
  it('has id "bash"', () => expect(bash.id).toBe('bash'))
  it('uses $ as input glyph', () => expect(bash.inputTurn.glyph).toBe('$'))
  it('has no input blockBg', () => expect(bash.inputTurn.blockBg).toBe(false))
  it('has no output glyph', () => expect(bash.outputTurn.glyph).toBeNull())
  it('does not support Thinking', () => expect(bash.supportedTurns).not.toContain('Thinking'))
})

describe('claude-code app config', () => {
  it('has id "claude-code"', () => expect(claudeCode.id).toBe('claude-code'))
  it('uses ❯ as input glyph', () => expect(claudeCode.inputTurn.glyph).toBe('❯'))
  it('has input blockBg', () => expect(claudeCode.inputTurn.blockBg).toBe(true))
  it('uses ⏺ as output glyph', () => expect(claudeCode.outputTurn.glyph).toBe('⏺'))
  it('supports Thinking', () => expect(claudeCode.supportedTurns).toContain('Thinking'))
  it('has an ASCII logo in header', () => expect(claudeCode.header?.logo).toBeTruthy())
})

describe('resolveApp with registry', () => {
  it('"bash" resolves after import', () => {
    const app = resolveApp('bash')
    expect(app).toBe(bash)
  })
  it('"claude-code" resolves after import', () => {
    const app = resolveApp('claude-code')
    expect(app).toBe(claudeCode)
  })
})
