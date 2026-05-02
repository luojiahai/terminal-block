import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import InputTurn from '../InputTurn.vue'
import { bash } from '@/apps/bash'
import { claudeCode } from '@/apps/claude-code'
import { defaultTheme } from '@/themes'
import { TB_APP_KEY, TB_THEME_KEY } from '@/apps'

function mountInputTurn(app: typeof bash | typeof claudeCode, slot = 'ls -la') {
  return mount(InputTurn, {
    global: {
      provide: {
        [TB_APP_KEY as symbol]: ref(app),
        [TB_THEME_KEY as symbol]: ref(defaultTheme),
      },
    },
    slots: { default: slot },
  })
}

describe('InputTurn — bash', () => {
  it('renders the $ glyph', () => {
    const wrapper = mountInputTurn(bash)
    expect(wrapper.find('.tb-glyph').text()).toBe('$')
  })

  it('renders slot content', () => {
    const wrapper = mountInputTurn(bash, 'ls -la')
    expect(wrapper.text()).toContain('ls -la')
  })

  it('does not apply block background class', () => {
    const wrapper = mountInputTurn(bash)
    expect(wrapper.find('.tb-input-turn').classes()).not.toContain('tb-input-turn--block')
  })
})

describe('InputTurn — claude-code', () => {
  it('renders the ❯ glyph', () => {
    const wrapper = mountInputTurn(claudeCode)
    expect(wrapper.find('.tb-glyph').text()).toBe('❯')
  })

  it('applies block background class', () => {
    const wrapper = mountInputTurn(claudeCode)
    expect(wrapper.find('.tb-input-turn').classes()).toContain('tb-input-turn--block')
  })
})
