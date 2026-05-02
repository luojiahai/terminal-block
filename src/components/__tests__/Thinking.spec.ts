import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import Thinking from '../Thinking.vue'
import { bash } from '@/apps/bash'
import { claudeCode } from '@/apps/claude-code'
import { defaultTheme } from '@/themes'
import { TB_APP_KEY, TB_THEME_KEY } from '@/apps'

function mountThinking(
  app: typeof bash | typeof claudeCode,
  props: { done?: boolean; verb?: string } = {},
  slot?: string,
) {
  return mount(Thinking, {
    global: {
      provide: {
        [TB_APP_KEY as symbol]: ref(app),
        [TB_THEME_KEY as symbol]: ref(defaultTheme),
      },
    },
    props,
    slots: slot ? { default: slot } : undefined,
  })
}

describe('Thinking — claude-code, not done', () => {
  it('renders ✻ glyph', () => {
    const wrapper = mountThinking(claudeCode)
    expect(wrapper.text()).toContain('✻')
  })

  it('renders "Thinking..."', () => {
    const wrapper = mountThinking(claudeCode)
    expect(wrapper.text()).toContain('Thinking...')
  })

  it('does not render duration when not done', () => {
    const wrapper = mountThinking(claudeCode, {}, '5s')
    expect(wrapper.text()).not.toContain('5s')
  })
})

describe('Thinking — claude-code, done', () => {
  it('renders "Thought for Xs" with slot duration', () => {
    const wrapper = mountThinking(claudeCode, { done: true }, '3s')
    expect(wrapper.text()).toContain('Thought for 3s')
  })

  it('does not render "..." when done', () => {
    const wrapper = mountThinking(claudeCode, { done: true }, '3s')
    expect(wrapper.text()).not.toContain('...')
  })
})

describe('Thinking — unsupported app', () => {
  let warnSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    warnSpy.mockRestore()
  })

  it('renders nothing for bash', () => {
    const wrapper = mountThinking(bash)
    expect(wrapper.text()).toBe('')
  })

  it('emits a console warning for bash in dev mode', () => {
    mountThinking(bash)
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('<Thinking> is not supported in app="bash"'),
    )
  })
})
