import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import Output from '../Output.vue'
import { TB_APP_KEY, type AppConfig } from '@/apps'

const config: AppConfig = {
  id: 'claude-code',
  supportedTurns: ['InputTurn', 'OutputTurn', 'Thinking'],
  inputTurn: { glyph: '❯', glyphColor: '--tb-secondary', textColor: '--tb-text', blockBg: true },
  outputTurn: { glyph: '⏺', glyphColor: '--tb-text', textColor: '--tb-text', blockBg: false },
}

function mountOutput(slot = 'output text') {
  return mount(Output, {
    global: { provide: { [TB_APP_KEY as symbol]: ref(config) } },
    slots: { default: slot },
  })
}

describe('ClaudeCode Output', () => {
  it('renders the ⏺ glyph', () => {
    expect(mountOutput().find('.cc-glyph').text()).toBe('⏺')
  })

  it('renders slot content', () => {
    expect(mountOutput('response text').text()).toContain('response text')
  })
})
