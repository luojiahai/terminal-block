import { describe, it, expect } from "vitest";
import { loadItermColorsFile } from "../load-iterm";

function makeXmlFile(entries: Record<string, { r: number; g: number; b: number }>): File {
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
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>${inner}
</dict>
</plist>`;

  return new File([xml], "test.itermcolors", { type: "text/xml" });
}

describe("loadItermColorsFile", () => {
  it("resolves with parsed theme tokens", async () => {
    const file = makeXmlFile({
      "Background Color": {
        r: 0.00392156862745098,
        g: 0.01568627450980392,
        b: 0.03529411764705882,
      },
      "Ansi 1 Color": { r: 1, g: 0.48235294117647065, b: 0.44705882352941173 },
    });
    const theme = await loadItermColorsFile(file);
    expect(theme.bg).toBe("#010409");
    expect(theme.headerBg).toBe("#010409");
    expect(theme.ansiRed).toBe("#ff7b72");
  });

  it("rejects when the XML has no root dict", async () => {
    const file = new File(['<plist version="1.0"></plist>'], "bad.itermcolors", {
      type: "text/xml",
    });
    await expect(loadItermColorsFile(file)).rejects.toThrow("[terminal-block] Invalid .itermcolors XML");
  });
});
