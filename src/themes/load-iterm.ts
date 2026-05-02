import { parseItermColors } from './parse-iterm'
import type { ThemeTokens } from './index'

export function loadItermColorsFile(file: File): Promise<Partial<ThemeTokens>> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        resolve(parseItermColors(reader.result as string))
      } catch (err) {
        reject(err)
      }
    }
    reader.onerror = () => reject(reader.error)
    reader.readAsText(file)
  })
}
