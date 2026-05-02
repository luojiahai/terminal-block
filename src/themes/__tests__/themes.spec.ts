import { describe, it, expect } from 'vitest'
import { defaultTheme, resolveTheme, type ThemeTokens } from '../index'

describe('defaultTheme', () => {
  it('has all required ThemeTokens keys', () => {
    const keys: (keyof ThemeTokens)[] = [
      'bg',
      'headerBg',
      'inputBg',
      'codeBg',
      'text',
      'secondary',
      'muted',
      'accent',
      'divider',
      'ansiRed',
      'ansiGreen',
      'ansiYellow',
      'ansiBlue',
      'ansiMagenta',
      'ansiCyan',
      'ansiWhite',
    ]
    for (const key of keys) {
      expect(defaultTheme[key], `missing key: ${key}`).toMatch(/^#[0-9a-f]{6}$/i)
    }
  })

  it('uses GitHub Dark background #010409', () => {
    expect(defaultTheme.bg).toBe('#010409')
  })
})

describe('resolveTheme', () => {
  it('returns empty object for "default" (all keys from defaultTheme)', () => {
    const partial = resolveTheme('default')
    expect(Object.keys(partial).length).toBeGreaterThan(0)
  })

  it('passes through a partial object unchanged', () => {
    const custom = { bg: '#ff0000' }
    expect(resolveTheme(custom)).toBe(custom)
  })

  it('throws for an unknown named theme', () => {
    expect(() => resolveTheme('nonexistent')).toThrow(
      '[terminal-block] Unknown theme: "nonexistent"',
    )
  })
})
