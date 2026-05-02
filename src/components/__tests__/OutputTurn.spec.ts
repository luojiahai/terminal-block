import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import OutputTurn from '../OutputTurn.vue'
import { bash } from '@/apps/bash'
import { claudeCode } from '@/apps/claude-code'
import { defaultTheme } from '@/themes'
import { TB_APP_KEY, TB_THEME_KEY } from '@/apps'

function mountOutputTurn(app: typeof bash | typeof claudeCode, slot = 'output text') {
  return mount(OutputTurn, {
    global: {
      provide: {
        [TB_APP_KEY as symbol]: ref(app),
        [TB_THEME_KEY as symbol]: ref(defaultTheme),
      },
    },
    slots: { default: slot },
  })
}

describe('OutputTurn — bash', () => {
  it('renders slot content', () => {
    const wrapper = mountOutputTurn(bash, 'total 24')
    expect(wrapper.text()).toContain('total 24')
  })

  it('renders no glyph for bash', () => {
    const wrapper = mountOutputTurn(bash)
    expect(wrapper.find('.tb-glyph').exists()).toBe(false)
  })
})

describe('OutputTurn — claude-code', () => {
  it('renders ⏺ glyph', () => {
    const wrapper = mountOutputTurn(claudeCode)
    expect(wrapper.find('.tb-glyph').text()).toBe('⏺')
  })

  it('renders slot content', () => {
    const wrapper = mountOutputTurn(claudeCode, 'Hello! How can I help?')
    expect(wrapper.text()).toContain('Hello! How can I help?')
  })
})
