import { parseItermColors } from "./parse-iterm";
import type { ThemeTokens } from "./index";

export function loadItermColorsFile(file: File): Promise<Partial<ThemeTokens>> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    // readAsText always sets result to string (never ArrayBuffer) in onload
    reader.onload = () => {
      try {
        resolve(parseItermColors(reader.result as string));
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(reader.error ?? new Error("[terminal-block] FileReader error"));
    reader.onabort = () => reject(new Error("[terminal-block] FileReader aborted"));
    reader.readAsText(file);
  });
}
