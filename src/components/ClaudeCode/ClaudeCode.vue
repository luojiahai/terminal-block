<script setup lang="ts">
import { inject, watchEffect } from 'vue'
import { TERMINAL_BLOCK_TITLE_KEY } from '@/components/TerminalBlock.vue'

const LOGO = ` ▐▛███▜▌
▝▜█████▛▘
  ▘▘ ▝▝`

const props = withDefaults(defineProps<{
  version?: string
  subtitle?: string
  cwd?: string
  title?: string
}>(), {
  version: 'v2.1.88',
  subtitle: 'Opus 4.6 · Max 100x',
  cwd: '~',
})

const titleLabel = inject(TERMINAL_BLOCK_TITLE_KEY)
watchEffect(() => {
  if (titleLabel) titleLabel.value = props.title ?? '✳ Claude Code'
})

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
    <div class="claude-code-divider-line">
      ──────────────────────────────────────────────────────────────────────────────
    </div>
    <div class="claude-code-waiting-prompt">❯</div>
    <div class="claude-code-divider-line">
      ──────────────────────────────────────────────────────────────────────────────
    </div>
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
  color: var(--terminal-block-muted);
  overflow: hidden;
  white-space: nowrap;
}

.claude-code-waiting-prompt {
  color: var(--terminal-block-secondary);
}
</style>
