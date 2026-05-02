import { describe, it, expect } from 'vitest'
import { parseItermColors } from '../parse-iterm'

function makeXml(entries: Record<string, { r: number; g: number; b: number }>): string {
  const inner = Object.entries(entries)
    .map(
      ([key, { r, g, b }]) => `
    <key>${key}</key>
    <dict>
      <key>Red Component</key><real>${r}</real>
      <key>Green Component</key><real>${g}</real>
      <key>Blue Component</key><real>${b}</real>
      <key>Alpha Component</key><real>1</real>
      <key>Color Space</key><string>sRGB</string>
    </dict>`,
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>${inner}
</dict>
</plist>`
}

describe('parseItermColors', () => {
  it('maps Background Color to bg and titlebarBg', () => {
    const xml = makeXml({
      'Background Color': {
        r: 0.00392156862745098,
        g: 0.01568627450980392,
        b: 0.03529411764705882,
      },
    })
    const theme = parseItermColors(xml)
    expect(theme.bg).toBe('#010409')
    expect(theme.titlebarBg).toBe('#010409')
  })

  it('maps Foreground Color to text', () => {
    const xml = makeXml({
      'Foreground Color': { r: 0.9019607843137255, g: 0.9294117647058824, b: 0.9529411764705882 },
    })
    const theme = parseItermColors(xml)
    expect(theme.text).toBe('#e6edf3')
  })

  it('maps Ansi 7 Color to secondary and ansiWhite', () => {
    const xml = makeXml({
      'Ansi 7 Color': { r: 0.6941176470588235, g: 0.7294117647058823, b: 0.7686274509803922 },
    })
    const theme = parseItermColors(xml)
    expect(theme.secondary).toBe('#b1bac4')
    expect(theme.ansiWhite).toBe('#b1bac4')
  })

  it('maps Ansi 8 Color to muted and divider', () => {
    const xml = makeXml({
      'Ansi 8 Color': { r: 0.43137254901960786, g: 0.4627450980392157, b: 0.5058823529411764 },
    })
    const theme = parseItermColors(xml)
    expect(theme.muted).toBe('#6e7681')
    expect(theme.divider).toBe('#6e7681')
  })

  it('maps Ansi 0 Color to inputBg and codeBg', () => {
    const xml = makeXml({
      'Ansi 0 Color': { r: 0.2823529411764706, g: 0.30980392156862746, b: 0.3450980392156863 },
    })
    const theme = parseItermColors(xml)
    expect(theme.inputBg).toBe('#484f58')
    expect(theme.codeBg).toBe('#484f58')
  })

  it('maps Ansi 3 Color to accent and ansiYellow', () => {
    const xml = makeXml({
      'Ansi 3 Color': { r: 0.8235294117647058, g: 0.6, b: 0.13333333333333333 },
    })
    const theme = parseItermColors(xml)
    expect(theme.accent).toBe('#d29922')
    expect(theme.ansiYellow).toBe('#d29922')
  })

  it('maps all ANSI colors', () => {
    const xml = makeXml({
      'Ansi 1 Color': { r: 1, g: 0.48235294117647065, b: 0.44705882352941173 },
      'Ansi 2 Color': { r: 0.24705882352941178, g: 0.7254901960784313, b: 0.3137254901960784 },
      'Ansi 4 Color': { r: 0.34509803921568627, g: 0.6509803921568628, b: 1 },
      'Ansi 5 Color': { r: 0.7372549019607844, g: 0.5490196078431373, b: 1 },
      'Ansi 6 Color': { r: 0.2235294117647059, g: 0.7725490196078432, b: 0.8117647058823529 },
    })
    const theme = parseItermColors(xml)
    expect(theme.ansiRed).toBe('#ff7b72')
    expect(theme.ansiGreen).toBe('#3fb950')
    expect(theme.ansiBlue).toBe('#58a6ff')
    expect(theme.ansiMagenta).toBe('#bc8cff')
    expect(theme.ansiCyan).toBe('#39c5cf')
  })

  it('ignores unknown color keys', () => {
    const xml = makeXml({ 'Cursor Color': { r: 1, g: 1, b: 1 } })
    expect(() => parseItermColors(xml)).not.toThrow()
  })

  it('throws on invalid XML with no root dict', () => {
    expect(() => parseItermColors('<plist version="1.0"></plist>')).toThrow(
      '[terminal-block] Invalid .itermcolors XML',
    )
  })
})
