import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import Input from '../Input.vue'
import { TB_APP_KEY, type AppConfig } from '@/apps'

const config: AppConfig = {
  id: 'claude-code',
  supportedTurns: ['InputTurn', 'OutputTurn', 'Thinking'],
  inputTurn: { glyph: '❯', glyphColor: '--tb-secondary', textColor: '--tb-text', blockBg: true },
  outputTurn: { glyph: '⏺', glyphColor: '--tb-text', textColor: '--tb-text', blockBg: false },
}

function mountInput(slot = 'test command') {
  return mount(Input, {
    global: { provide: { [TB_APP_KEY as symbol]: ref(config) } },
    slots: { default: slot },
  })
}

describe('ClaudeCode Input', () => {
  it('renders the ❯ glyph', () => {
    expect(mountInput().find('.cc-glyph').text()).toBe('❯')
  })

  it('applies block background class', () => {
    expect(mountInput().find('.cc-input').classes()).toContain('cc-input--block')
  })

  it('renders slot content', () => {
    expect(mountInput('hello world').text()).toContain('hello world')
  })
})
