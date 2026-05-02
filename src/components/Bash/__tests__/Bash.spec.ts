import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import BashComponent from '../Bash.vue'
import { TERMINAL_BLOCK_TITLE_KEY } from '@/components/TerminalBlock.vue'

function mountBash(props: { title?: string } = {}, slot = '') {
  const titleRef = ref('')
  const wrapper = mount(BashComponent, {
    global: { provide: { [TERMINAL_BLOCK_TITLE_KEY as symbol]: titleRef } },
    props,
    slots: slot ? { default: slot } : undefined,
  })
  return { wrapper, titleRef }
}

describe('Bash', () => {
  it('writes "bash" to TERMINAL_BLOCK_TITLE_KEY by default', () => {
    const { titleRef } = mountBash()
    expect(titleRef.value).toBe('bash')
  })

  it('writes custom title to TERMINAL_BLOCK_TITLE_KEY when title prop is set', () => {
    const { titleRef } = mountBash({ title: 'zsh' })
    expect(titleRef.value).toBe('zsh')
  })

  it('renders slot content', () => {
    const { wrapper } = mountBash({}, '<div class="test-turn">turn</div>')
    expect(wrapper.find('.test-turn').exists()).toBe(true)
  })

  it('does not throw when used without TERMINAL_BLOCK_TITLE_KEY (no TerminalBlock parent)', () => {
    expect(() => mount(BashComponent, { props: {} })).not.toThrow()
  })
})
