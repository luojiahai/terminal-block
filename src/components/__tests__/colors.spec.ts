import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import { defaultTheme, TB_THEME_KEY } from '@/themes'
import Red from '../colors/Red.vue'
import Green from '../colors/Green.vue'
import Yellow from '../colors/Yellow.vue'
import Blue from '../colors/Blue.vue'
import Magenta from '../colors/Magenta.vue'
import Cyan from '../colors/Cyan.vue'
import White from '../colors/White.vue'

function mountColor(Component: object, slot = 'text') {
  return mount(Component as Parameters<typeof mount>[0], {
    global: {
      provide: { [TB_THEME_KEY as symbol]: ref(defaultTheme) },
    },
    slots: { default: slot },
  })
}

describe('color components', () => {
  it('<Red> renders span with ansiRed color', () => {
    const wrapper = mountColor(Red, 'error')
    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.element.getAttribute('style')).toContain(defaultTheme.ansiRed)
    expect(wrapper.text()).toBe('error')
  })

  it('<Green> renders span with ansiGreen color', () => {
    const wrapper = mountColor(Green)
    expect(wrapper.element.getAttribute('style')).toContain(defaultTheme.ansiGreen)
  })

  it('<Yellow> renders span with ansiYellow color', () => {
    const wrapper = mountColor(Yellow)
    expect(wrapper.element.getAttribute('style')).toContain(defaultTheme.ansiYellow)
  })

  it('<Blue> renders span with ansiBlue color', () => {
    const wrapper = mountColor(Blue)
    expect(wrapper.element.getAttribute('style')).toContain(defaultTheme.ansiBlue)
  })

  it('<Magenta> renders span with ansiMagenta color', () => {
    const wrapper = mountColor(Magenta)
    expect(wrapper.element.getAttribute('style')).toContain(defaultTheme.ansiMagenta)
  })

  it('<Cyan> renders span with ansiCyan color', () => {
    const wrapper = mountColor(Cyan)
    expect(wrapper.element.getAttribute('style')).toContain(defaultTheme.ansiCyan)
  })

  it('<White> renders span with ansiWhite color', () => {
    const wrapper = mountColor(White)
    expect(wrapper.element.getAttribute('style')).toContain(defaultTheme.ansiWhite)
  })

  it('adapts to a custom theme token', () => {
    const customTheme = { ...defaultTheme, ansiRed: '#ff1111' }
    const wrapper = mount(Red as Parameters<typeof mount>[0], {
      global: { provide: { [TB_THEME_KEY as symbol]: ref(customTheme) } },
      slots: { default: 'x' },
    })
    expect(wrapper.element.getAttribute('style')).toContain('#ff1111')
  })
})
