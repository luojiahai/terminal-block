import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Thinking from '../Thinking.vue'

function mountThinking(
  props: { done?: boolean; verbs?: string[]; statusText?: string } = {},
  slot?: string,
) {
  return mount(Thinking, {
    props,
    slots: slot ? { default: slot } : undefined,
  })
}

describe('ClaudeCode Thinking — not done', () => {
  beforeEach(() => { vi.useFakeTimers() })
  afterEach(() => { vi.useRealTimers() })

  it('renders glyph span with active class', () => {
    const wrapper = mountThinking()
    const glyph = wrapper.find('.claude-code-thinking-glyph')
    expect(glyph.exists()).toBe(true)
    expect(glyph.classes()).toContain('active')
  })

  it('renders first verb on mount', () => {
    const wrapper = mountThinking()
    expect(wrapper.text()).toContain('Thinking...')
  })

  it('cycles to second verb after 3s', async () => {
    const wrapper = mountThinking()
    vi.advanceTimersByTime(3000)
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Flibbertigibbeting...')
  })

  it('cycles to third verb after 6s', async () => {
    const wrapper = mountThinking()
    vi.advanceTimersByTime(6000)
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Combobulating...')
  })

  it('wraps back to first verb after 9s', async () => {
    const wrapper = mountThinking()
    vi.advanceTimersByTime(9000)
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Thinking...')
  })

  it('does not render slot content when not done', () => {
    expect(mountThinking({}, '5s').text()).not.toContain('5s')
  })

  it('cycles custom verbs', async () => {
    const wrapper = mountThinking({ verbs: ['analyzing', 'computing'] })
    expect(wrapper.text()).toContain('Analyzing...')
    vi.advanceTimersByTime(3000)
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Computing...')
  })
})

describe('ClaudeCode Thinking — done', () => {
  it('renders "Thought for Xs" with slot', () => {
    expect(mountThinking({ done: true }, '3s').text()).toContain('Thought for 3s')
  })

  it('does not render "..." when done', () => {
    expect(mountThinking({ done: true }, '3s').text()).not.toContain('...')
  })

  it('renders glyph span without active class when done', () => {
    const wrapper = mountThinking({ done: true })
    const glyph = wrapper.find('.claude-code-thinking-glyph')
    expect(glyph.exists()).toBe(true)
    expect(glyph.classes()).not.toContain('active')
  })
})

describe('ClaudeCode Thinking — stats', () => {
  beforeEach(() => { vi.useFakeTimers() })
  afterEach(() => { vi.useRealTimers() })

  it('renders stats when done=false', () => {
    const wrapper = mountThinking()
    expect(wrapper.text()).toMatch(/\(\d+s · ↓ \d+ tokens\)/)
  })

  it('does not render stats when done=true', () => {
    expect(mountThinking({ done: true }).text()).not.toMatch(/\(.*tokens.*\)/)
  })

  it('appends statusText when provided', () => {
    const wrapper = mountThinking({ statusText: 'almost done thinking' })
    expect(wrapper.text()).toContain('almost done thinking')
    expect(wrapper.text()).toMatch(/\(.*· almost done thinking\)/)
  })

  it('does not include statusText separator when statusText is absent', () => {
    const wrapper = mountThinking()
    expect(wrapper.text()).toMatch(/\(\d+s · ↓ \d+ tokens\)$/)
  })

  it('increments seconds after 1s', async () => {
    const wrapper = mountThinking()
    vi.advanceTimersByTime(1000)
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('1s')
  })

  it('shows 1m after 60s', async () => {
    const wrapper = mountThinking()
    vi.advanceTimersByTime(60000)
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toMatch(/\(1m · ↓/)
  })

  it('increments tokens after 50ms', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0) // 3 tokens/tick
    const wrapper = mountThinking()
    vi.advanceTimersByTime(50)
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('3 tokens')
  })

  it('resets counters when done flips false after true', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const wrapper = mountThinking()
    vi.advanceTimersByTime(5000)
    await wrapper.vm.$nextTick()
    await wrapper.setProps({ done: true })
    await wrapper.setProps({ done: false })
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('(0s · ↓ 0 tokens)')
  })
})
