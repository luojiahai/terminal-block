import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Thinking from '../Thinking.vue'

function mountThinking(props: { done?: boolean; verbs?: string[] } = {}, slot?: string) {
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
