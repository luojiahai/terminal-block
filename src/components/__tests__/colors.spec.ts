import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Red from '../colors/Red.vue'
import Green from '../colors/Green.vue'
import Yellow from '../colors/Yellow.vue'
import Blue from '../colors/Blue.vue'
import Magenta from '../colors/Magenta.vue'
import Cyan from '../colors/Cyan.vue'
import White from '../colors/White.vue'

function mountColor(Component: object, slot = 'text') {
  return mount(Component as Parameters<typeof mount>[0], { slots: { default: slot } })
}

describe('color components', () => {
  it('<Red> renders span with --tb-ansi-red var', () => {
    const wrapper = mountColor(Red, 'error')
    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.element.getAttribute('style')).toContain('--tb-ansi-red')
    expect(wrapper.text()).toBe('error')
  })

  it('<Green> renders span with --tb-ansi-green var', () => {
    expect(mountColor(Green).element.getAttribute('style')).toContain('--tb-ansi-green')
  })

  it('<Yellow> renders span with --tb-ansi-yellow var', () => {
    expect(mountColor(Yellow).element.getAttribute('style')).toContain('--tb-ansi-yellow')
  })

  it('<Blue> renders span with --tb-ansi-blue var', () => {
    expect(mountColor(Blue).element.getAttribute('style')).toContain('--tb-ansi-blue')
  })

  it('<Magenta> renders span with --tb-ansi-magenta var', () => {
    expect(mountColor(Magenta).element.getAttribute('style')).toContain('--tb-ansi-magenta')
  })

  it('<Cyan> renders span with --tb-ansi-cyan var', () => {
    expect(mountColor(Cyan).element.getAttribute('style')).toContain('--tb-ansi-cyan')
  })

  it('<White> renders span with --tb-ansi-white var', () => {
    expect(mountColor(White).element.getAttribute('style')).toContain('--tb-ansi-white')
  })
})
