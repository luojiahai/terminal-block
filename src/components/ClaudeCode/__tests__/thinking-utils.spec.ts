import { describe, it, expect } from 'vitest'
import { formatTime, formatTokens } from '../thinking-utils'

describe('formatTime', () => {
  it('formats 0s', () => expect(formatTime(0)).toBe('0s'))
  it('formats 42s', () => expect(formatTime(42)).toBe('42s'))
  it('formats 59s', () => expect(formatTime(59)).toBe('59s'))
  it('formats 60s as 1m', () => expect(formatTime(60)).toBe('1m'))
  it('formats 61s as 1m 1s', () => expect(formatTime(61)).toBe('1m 1s'))
  it('formats 120s as 2m', () => expect(formatTime(120)).toBe('2m'))
  it('formats 228s as 3m 48s', () => expect(formatTime(228)).toBe('3m 48s'))
})

describe('formatTokens', () => {
  it('formats 0', () => expect(formatTokens(0)).toBe('0 tokens'))
  it('formats 999', () => expect(formatTokens(999)).toBe('999 tokens'))
  it('formats 1000 as 1.0k', () => expect(formatTokens(1000)).toBe('1.0k tokens'))
  it('formats 6900 as 6.9k', () => expect(formatTokens(6900)).toBe('6.9k tokens'))
  it('formats 9500 as 9.5k', () => expect(formatTokens(9500)).toBe('9.5k tokens'))
  it('formats 10000 as 10k', () => expect(formatTokens(10000)).toBe('10k tokens'))
  it('formats 999000 as 999k', () => expect(formatTokens(999000)).toBe('999k tokens'))
  it('formats 1000000 as 1.0m', () => expect(formatTokens(1000000)).toBe('1.0m tokens'))
  it('formats 9900000 as 9.9m', () => expect(formatTokens(9900000)).toBe('9.9m tokens'))
  it('formats 10000000 as 10m', () => expect(formatTokens(10000000)).toBe('10m tokens'))
})
