import { describe, it, expect } from "vitest";
import { ref } from "vue";
import { mount } from "@vue/test-utils";
import ClaudeCodeComponent from "../ClaudeCode.vue";
import { TERMINAL_BLOCK_TITLE_KEY } from "@/components/TerminalBlock.vue";

function mountClaudeCode(props: { version?: string; subtitle?: string; cwd?: string; title?: string } = {}, slot = "") {
  const titleRef = ref("");
  const wrapper = mount(ClaudeCodeComponent, {
    global: { provide: { [TERMINAL_BLOCK_TITLE_KEY as symbol]: titleRef } },
    props,
    slots: slot ? { default: slot } : undefined,
  });
  return { wrapper, titleRef };
}

describe("ClaudeCode", () => {
  it('writes "✳ Claude Code" to TERMINAL_BLOCK_TITLE_KEY by default', () => {
    const { titleRef } = mountClaudeCode();
    expect(titleRef.value).toBe("✳ Claude Code");
  });

  it("writes custom title to TERMINAL_BLOCK_TITLE_KEY when title prop is set", () => {
    const { titleRef } = mountClaudeCode({ title: "my-project" });
    expect(titleRef.value).toBe("my-project");
  });

  it("shows header with version", () => {
    const { wrapper } = mountClaudeCode({ version: "v2.1.0" });
    expect(wrapper.find(".claude-code-header").exists()).toBe(true);
    expect(wrapper.find(".claude-code-label").text()).toBe("Claude Code");
    expect(wrapper.find(".claude-code-version").text()).toBe("v2.1.0");
  });

  it("shows header with subtitle", () => {
    const { wrapper } = mountClaudeCode({ subtitle: "Sonnet 4.6" });
    expect(wrapper.find(".claude-code-header").exists()).toBe(true);
    expect(wrapper.find(".claude-code-subtitle").text()).toBe("Sonnet 4.6");
  });

  it("shows header with cwd", () => {
    const { wrapper } = mountClaudeCode({ cwd: "~/workplace" });
    expect(wrapper.find(".claude-code-header").exists()).toBe(true);
    expect(wrapper.find(".claude-code-cwd").text()).toBe("~/workplace");
  });

  it("always renders the bottom prompt", () => {
    const { wrapper } = mountClaudeCode();
    expect(wrapper.find(".claude-code-waiting-prompt").exists()).toBe(true);
  });

  it("renders slot content", () => {
    const { wrapper } = mountClaudeCode({}, '<div class="test-turn">turn</div>');
    expect(wrapper.find(".test-turn").exists()).toBe(true);
  });

  it("does not throw when used without TERMINAL_BLOCK_TITLE_KEY (no TerminalBlock parent)", () => {
    expect(() => mount(ClaudeCodeComponent, { props: {} })).not.toThrow();
  });
});
