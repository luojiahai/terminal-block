import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import Input from '../Input.vue'
import { TB_APP_KEY, type AppConfig } from '@/apps'

const config: AppConfig = {
  id: 'bash',
  inputTurn: { glyph: '$', glyphColor: '--tb-secondary', textColor: '--tb-text', blockBg: false },
  outputTurn: { glyph: null, glyphColor: '--tb-text', textColor: '--tb-text', blockBg: false },
}

function mountInput(slot = 'ls -la') {
  return mount(Input, {
    global: { provide: { [TB_APP_KEY as symbol]: ref(config) } },
    slots: { default: slot },
  })
}

describe('Bash Input', () => {
  it('renders the $ glyph', () => {
    expect(mountInput().find('.bash-glyph').text()).toBe('$')
  })

  it('does not apply block background class', () => {
    expect(mountInput().find('.bash-input').classes()).not.toContain('bash-input--block')
  })

  it('renders slot content', () => {
    expect(mountInput('ls -la').text()).toContain('ls -la')
  })
})
