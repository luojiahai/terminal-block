import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Input from "../Input.vue";

function mountInput(slot = "test command") {
  return mount(Input, { slots: { default: slot } });
}

describe("ClaudeCode Input", () => {
  it("renders the ❯ glyph", () => {
    expect(mountInput().find(".claude-code-glyph").text()).toBe("❯");
  });

  it("renders slot content", () => {
    expect(mountInput("hello world").text()).toContain("hello world");
  });
});
