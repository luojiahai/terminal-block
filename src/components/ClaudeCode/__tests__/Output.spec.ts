import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import Output from '../Output.vue'
import { TB_APP_KEY, type AppConfig } from '@/apps'

const config: AppConfig = {
  id: 'claude-code',
  inputTurn: { glyph: '❯', glyphColor: '--terminal-block-secondary', textColor: '--terminal-block-text', blockBg: true },
  outputTurn: { glyph: '⏺', glyphColor: '--terminal-block-text', textColor: '--terminal-block-text', blockBg: false },
}

function mountOutput(slot = 'output text') {
  return mount(Output, {
    global: { provide: { [TB_APP_KEY as symbol]: ref(config) } },
    slots: { default: slot },
  })
}

describe('ClaudeCode Output', () => {
  it('renders the ⏺ glyph', () => {
    expect(mountOutput().find('.claude-code-glyph').text()).toBe('⏺')
  })

  it('renders slot content', () => {
    expect(mountOutput('response text').text()).toContain('response text')
  })
})
