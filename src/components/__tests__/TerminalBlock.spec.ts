import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import '@/apps/bash'
import '@/apps/claude-code'
import TerminalBlock from '../TerminalBlock.vue'

describe('TerminalBlock', () => {
  it('renders the macOS title bar', () => {
    const wrapper = mount(TerminalBlock, { props: { app: 'bash' } })
    expect(wrapper.find('.tb-titlebar').exists()).toBe(true)
  })

  it('renders 3 traffic-light dots', () => {
    const wrapper = mount(TerminalBlock, { props: { app: 'bash' } })
    expect(wrapper.findAll('.tb-dot')).toHaveLength(3)
  })

  it('shows app id in title bar', () => {
    const wrapper = mount(TerminalBlock, { props: { app: 'bash' } })
    expect(wrapper.find('.tb-titlebar').text()).toContain('bash')
  })

  it('hides header block when no version/subtitle/cwd', () => {
    const wrapper = mount(TerminalBlock, { props: { app: 'bash' } })
    expect(wrapper.find('.tb-header').exists()).toBe(false)
  })

  it('shows header block when version is set', () => {
    const wrapper = mount(TerminalBlock, { props: { app: 'bash', version: 'v1.0.0' } })
    expect(wrapper.find('.tb-header').exists()).toBe(true)
    expect(wrapper.find('.tb-header').text()).toContain('v1.0.0')
  })

  it('shows header block when subtitle is set', () => {
    const wrapper = mount(TerminalBlock, { props: { app: 'bash', subtitle: 'test sub' } })
    expect(wrapper.find('.tb-header').exists()).toBe(true)
  })

  it('shows header block when cwd is set', () => {
    const wrapper = mount(TerminalBlock, { props: { app: 'bash', cwd: '~/workplace' } })
    expect(wrapper.find('.tb-header').exists()).toBe(true)
    expect(wrapper.find('.tb-header').text()).toContain('~/workplace')
  })

  it('applies CSS custom properties as inline style', () => {
    const wrapper = mount(TerminalBlock, { props: { app: 'bash' } })
    const style = wrapper.attributes('style') ?? ''
    expect(style).toContain('--tb-bg')
    expect(style).toContain('--tb-text')
  })

  it('renders the bottom prompt for claude-code', () => {
    const wrapper = mount(TerminalBlock, { props: { app: 'claude-code' } })
    expect(wrapper.find('.tb-waiting-prompt').exists()).toBe(true)
  })

  it('does not render bottom prompt for bash', () => {
    const wrapper = mount(TerminalBlock, { props: { app: 'bash' } })
    expect(wrapper.find('.tb-waiting-prompt').exists()).toBe(false)
  })

  it('renders slot content', () => {
    const wrapper = mount(TerminalBlock, {
      props: { app: 'bash' },
      slots: { default: '<div class="test-turn">turn</div>' },
    })
    expect(wrapper.find('.test-turn').exists()).toBe(true)
  })

  it('throws when resolving unknown app', () => {
    expect(() => mount(TerminalBlock, { props: { app: 'nonexistent' } })).toThrow()
  })

  it('accepts a custom AppConfig object', () => {
    const custom = {
      id: 'custom',
      supportedTurns: ['InputTurn' as const, 'OutputTurn' as const],
      inputTurn: { glyph: '>', glyphColor: '--tb-secondary', textColor: '--tb-text', blockBg: false },
      outputTurn: { glyph: null, glyphColor: '--tb-text', textColor: '--tb-text', blockBg: false },
    }
    const wrapper = mount(TerminalBlock, { props: { app: custom } })
    expect(wrapper.find('.tb-titlebar').text()).toContain('custom')
  })
})
