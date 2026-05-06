import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Output from "../Output.vue";

function mountOutput(slot = "output text") {
  return mount(Output, { slots: { default: slot } });
}

describe("Bash Output", () => {
  it("renders no glyph", () => {
    expect(mountOutput().find(".bash-glyph").exists()).toBe(false);
  });

  it("renders slot content", () => {
    expect(mountOutput("total 24").text()).toContain("total 24");
  });
});
