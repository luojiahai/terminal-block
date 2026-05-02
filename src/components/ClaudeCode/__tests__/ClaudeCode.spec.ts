import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import ClaudeCodeComponent from '../ClaudeCode.vue'
import { TB_TITLE_KEY } from '@/apps'

function mountClaudeCode(
  props: { version?: string; subtitle?: string; cwd?: string; title?: string } = {},
  slot = '',
) {
  const titleRef = ref('')
  const wrapper = mount(ClaudeCodeComponent, {
    global: { provide: { [TB_TITLE_KEY as symbol]: titleRef } },
    props,
    slots: slot ? { default: slot } : undefined,
  })
  return { wrapper, titleRef }
}

describe('ClaudeCode', () => {
  it('writes "claude-code" to TB_TITLE_KEY by default', () => {
    const { titleRef } = mountClaudeCode()
    expect(titleRef.value).toBe('claude-code')
  })

  it('writes custom title to TB_TITLE_KEY when title prop is set', () => {
    const { titleRef } = mountClaudeCode({ title: 'my-project' })
    expect(titleRef.value).toBe('my-project')
  })

  it('hides header when no version/subtitle/cwd', () => {
    const { wrapper } = mountClaudeCode()
    expect(wrapper.find('.cc-header').exists()).toBe(false)
  })

  it('shows header with version', () => {
    const { wrapper } = mountClaudeCode({ version: 'v2.1.0' })
    expect(wrapper.find('.cc-header').exists()).toBe(true)
    expect(wrapper.find('.cc-version').text()).toBe('Claude Code v2.1.0')
  })

  it('shows header with subtitle', () => {
    const { wrapper } = mountClaudeCode({ subtitle: 'Sonnet 4.6' })
    expect(wrapper.find('.cc-header').exists()).toBe(true)
    expect(wrapper.find('.cc-subtitle').text()).toBe('Sonnet 4.6')
  })

  it('shows header with cwd', () => {
    const { wrapper } = mountClaudeCode({ cwd: '~/workplace' })
    expect(wrapper.find('.cc-header').exists()).toBe(true)
    expect(wrapper.find('.cc-cwd').text()).toBe('~/workplace')
  })

  it('always renders the bottom prompt', () => {
    const { wrapper } = mountClaudeCode()
    expect(wrapper.find('.cc-waiting-prompt').exists()).toBe(true)
  })

  it('renders slot content', () => {
    const { wrapper } = mountClaudeCode({}, '<div class="test-turn">turn</div>')
    expect(wrapper.find('.test-turn').exists()).toBe(true)
  })

  it('does not throw when used without TB_TITLE_KEY (no TerminalBlock parent)', () => {
    expect(() => mount(ClaudeCodeComponent, { props: {} })).not.toThrow()
  })
})
