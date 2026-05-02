import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import Output from '../Output.vue'
import { TB_APP_KEY, type AppConfig } from '@/apps'

const config: AppConfig = {
  id: 'bash',
  inputTurn: { glyph: '$', glyphColor: '--tb-secondary', textColor: '--tb-text', blockBg: false },
  outputTurn: { glyph: null, glyphColor: '--tb-text', textColor: '--tb-text', blockBg: false },
}

function mountOutput(slot = 'output text') {
  return mount(Output, {
    global: { provide: { [TB_APP_KEY as symbol]: ref(config) } },
    slots: { default: slot },
  })
}

describe('Bash Output', () => {
  it('renders no glyph', () => {
    expect(mountOutput().find('.bash-glyph').exists()).toBe(false)
  })

  it('renders slot content', () => {
    expect(mountOutput('total 24').text()).toContain('total 24')
  })
})
