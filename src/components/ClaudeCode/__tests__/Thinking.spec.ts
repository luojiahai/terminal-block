import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Thinking from '../Thinking.vue'

function mountThinking(props: { done?: boolean; verb?: string } = {}, slot?: string) {
  return mount(Thinking, {
    props,
    slots: slot ? { default: slot } : undefined,
  })
}

describe('ClaudeCode Thinking — not done', () => {
  it('renders ✻ glyph', () => {
    expect(mountThinking().text()).toContain('✻')
  })

  it('renders "Thinking..."', () => {
    expect(mountThinking().text()).toContain('Thinking...')
  })

  it('does not render slot content when not done', () => {
    expect(mountThinking({}, '5s').text()).not.toContain('5s')
  })

  it('capitalises a custom verb', () => {
    expect(mountThinking({ verb: 'analyzing' }).text()).toContain('Analyzing...')
  })
})

describe('ClaudeCode Thinking — done', () => {
  it('renders "Thought for Xs" with slot', () => {
    expect(mountThinking({ done: true }, '3s').text()).toContain('Thought for 3s')
  })

  it('does not render "..." when done', () => {
    expect(mountThinking({ done: true }, '3s').text()).not.toContain('...')
  })
})
