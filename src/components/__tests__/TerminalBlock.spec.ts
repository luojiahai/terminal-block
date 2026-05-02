import { describe, it, expect } from 'vitest'
import { defineComponent, inject, ref } from 'vue'
import { mount } from '@vue/test-utils'
import TerminalBlock from '../TerminalBlock.vue'
import { TB_TITLE_KEY } from '@/apps'

describe('TerminalBlock', () => {
  it('renders the macOS title bar', () => {
    const wrapper = mount(TerminalBlock)
    expect(wrapper.find('.tb-titlebar').exists()).toBe(true)
  })

  it('renders 3 traffic-light dots', () => {
    const wrapper = mount(TerminalBlock)
    expect(wrapper.findAll('.tb-dot')).toHaveLength(3)
  })

  it('shows title written by child via TB_TITLE_KEY', async () => {
    const TitleWriter = defineComponent({
      setup() {
        const title = inject(TB_TITLE_KEY)
        if (title) title.value = 'test-app'
        return () => null
      },
    })
    const wrapper = mount(TerminalBlock, { slots: { default: TitleWriter } })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.tb-app-name').text()).toBe('test-app')
  })

  it('renders slot content', () => {
    const wrapper = mount(TerminalBlock, {
      slots: { default: '<div class="test-child">content</div>' },
    })
    expect(wrapper.find('.test-child').exists()).toBe(true)
  })

  it('applies CSS custom properties as inline style', () => {
    const wrapper = mount(TerminalBlock)
    const style = wrapper.attributes('style') ?? ''
    expect(style).toContain('--tb-bg')
    expect(style).toContain('--tb-text')
  })

  it('has the terminal-block root class (line-height: 1 applied via CSS)', () => {
    const wrapper = mount(TerminalBlock)
    // scoped styles are not applied in jsdom; verify the class is present and trust the CSS rule
    expect(wrapper.find('.terminal-block').exists()).toBe(true)
  })
})
