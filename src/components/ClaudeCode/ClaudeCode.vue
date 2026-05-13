<script setup lang="ts">
import { computed, inject, watchEffect } from "vue";
import { TERMINAL_BLOCK_TITLE_KEY } from "@/components/TerminalBlock.vue";

const LOGO = ` ▐▛███▜▌
▝▜█████▛▘
  ▘▘ ▝▝`;

const props = withDefaults(
  defineProps<{
    version?: string;
    subtitle?: string;
    cwd?: string;
    title?: string;
    prompt?: string;
  }>(),
  {
    version: "v2.1.88",
    subtitle: "Opus 4.7 (1M context) · Claude Max",
    cwd: "~",
  },
);

const promptText = computed(() => props.prompt ?? "█");
const promptBlink = computed(() => props.prompt === undefined);

const titleLabel = inject(TERMINAL_BLOCK_TITLE_KEY);
watchEffect(() => {
  if (titleLabel) titleLabel.value = props.title ?? "✳ Claude Code";
});
</script>

<template>
  <div class="claude-code">
    <div class="claude-code-header">
      <pre class="claude-code-logo">{{ LOGO }}</pre>
      <div class="claude-code-meta">
        <div class="claude-code-title-line">
          <span class="claude-code-label">Claude Code</span>
          <span class="claude-code-version">{{ version }}</span>
        </div>
        <span class="claude-code-subtitle">{{ subtitle }}</span>
        <span class="claude-code-cwd">{{ cwd }}</span>
      </div>
    </div>
    <div class="claude-code-body">
      <slot />
    </div>
    <div class="claude-code-divider-line" />
    <div class="claude-code-prompt">
      <span class="claude-code-glyph">❯</span>
      <span class="claude-code-prompt-text" :class="{ 'claude-code-prompt-text--blink': promptBlink }">{{
        promptText
      }}</span>
    </div>
    <div class="claude-code-divider-line" />
  </div>
</template>

<style scoped>
.claude-code {
  --terminal-block-accent: #d97757;
}

.claude-code-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.claude-code-logo {
  white-space: pre;
  color: var(--terminal-block-accent);
}

.claude-code-meta {
  display: flex;
  flex-direction: column;
}

.claude-code-title-line {
  display: flex;
  gap: 1ch;
}
.claude-code-label {
  color: var(--terminal-block-text);
}
.claude-code-version {
  color: var(--terminal-block-muted);
}
.claude-code-subtitle {
  color: var(--terminal-block-secondary);
}
.claude-code-cwd {
  color: var(--terminal-block-muted);
}

.claude-code-body {
  display: flex;
  flex-direction: column;
  gap: 1lh;
  padding: 1lh 0;
}

.claude-code-divider-line {
  border-top: 1px solid var(--terminal-block-muted);
}

.claude-code-prompt {
  display: flex;
  align-items: baseline;
  gap: 8px;
  color: var(--terminal-block-secondary);
  padding: 0.5lh 0;
}

.claude-code-prompt-text {
  color: var(--terminal-block-text);
}

.claude-code-prompt-text--blink {
  animation: blink 1s step-start infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
