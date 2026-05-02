import type { ThemeTokens } from './index'

function floatToHex(value: number): string {
  return Math.round(value * 255)
    .toString(16)
    .padStart(2, '0')
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${floatToHex(r)}${floatToHex(g)}${floatToHex(b)}`
}

function parseColorDict(dict: Element): { r: number; g: number; b: number } {
  const keys = dict.querySelectorAll('key')
  const result: Record<string, number> = {}
  for (const key of keys) {
    const name = key.textContent ?? ''
    const sibling = key.nextElementSibling
    if (sibling && (name.includes('Red') || name.includes('Green') || name.includes('Blue'))) {
      result[name] = parseFloat(sibling.textContent ?? '0')
    }
  }
  return {
    r: result['Red Component'] ?? 0,
    g: result['Green Component'] ?? 0,
    b: result['Blue Component'] ?? 0,
  }
}

export function parseItermColors(xml: string): Partial<ThemeTokens> {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xml, 'text/xml')
  const root = doc.querySelector('plist > dict')
  if (!root) throw new Error('[terminal-block] Invalid .itermcolors XML')

  const result: Partial<ThemeTokens> = {}
  const children = root.children

  for (let i = 0; i < children.length - 1; i += 2) {
    const key = children[i]
    const value = children[i + 1]
    if (!key || !value || key.tagName !== 'key' || value.tagName !== 'dict') continue

    const name = key.textContent ?? ''
    const { r, g, b } = parseColorDict(value)
    const hex = rgbToHex(r, g, b)

    switch (name) {
      case 'Background Color':
        result.bg = hex
        result.headerBg = hex
        break
      case 'Foreground Color':
        result.text = hex
        break
      case 'Ansi 7 Color':
        result.secondary = hex
        result.ansiWhite = hex
        break
      case 'Ansi 8 Color':
        result.muted = hex
        result.divider = hex
        break
      case 'Ansi 0 Color':
        result.inputBg = hex
        result.codeBg = hex
        break
      case 'Ansi 1 Color':
        result.ansiRed = hex
        break
      case 'Ansi 2 Color':
        result.ansiGreen = hex
        break
      case 'Ansi 3 Color':
        result.accent = hex
        result.ansiYellow = hex
        break
      case 'Ansi 4 Color':
        result.ansiBlue = hex
        break
      case 'Ansi 5 Color':
        result.ansiMagenta = hex
        break
      case 'Ansi 6 Color':
        result.ansiCyan = hex
        break
    }
  }

  return result
}
