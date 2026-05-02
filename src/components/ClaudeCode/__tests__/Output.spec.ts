import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Output from '../Output.vue'

function mountOutput(slot = 'output text') {
  return mount(Output, { slots: { default: slot } })
}

describe('ClaudeCode Output', () => {
  it('renders the ⏺ glyph', () => {
    expect(mountOutput().find('.claude-code-glyph').text()).toBe('⏺')
  })

  it('renders slot content', () => {
    expect(mountOutput('response text').text()).toContain('response text')
  })
})
