import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Input from '../Input.vue'

function mountInput(slot = 'ls -la') {
  return mount(Input, { slots: { default: slot } })
}

describe('Bash Input', () => {
  it('renders the $ glyph', () => {
    expect(mountInput().find('.bash-glyph').text()).toBe('$')
  })

  it('renders slot content', () => {
    expect(mountInput('ls -la').text()).toContain('ls -la')
  })
})
