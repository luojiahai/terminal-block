<script setup lang="ts">
import { computed, inject, provide, ref, watchEffect } from 'vue'
import { TB_APP_KEY, TB_TITLE_KEY, type AppConfig } from '@/apps'

const LOGO = ` ▐▛███▜▌
▝▜█████▛▘
  ▘▘ ▝▝`

const APP_CONFIG: AppConfig = {
  id: 'claude-code',
  inputTurn: { glyph: '❯', glyphColor: '--terminal-block-secondary', textColor: '--terminal-block-text', blockBg: true },
  outputTurn: { glyph: '⏺', glyphColor: '--terminal-block-text', textColor: '--terminal-block-text', blockBg: false },
}

const props = defineProps<{
  version?: string
  subtitle?: string
  cwd?: string
  title?: string
}>()

const titleLabel = inject(TB_TITLE_KEY)
watchEffect(() => {
  if (titleLabel) titleLabel.value = props.title ?? '✳ Claude Code'
})

provide(TB_APP_KEY, ref(APP_CONFIG))

const showHeader = computed(() => !!(props.version || props.subtitle || props.cwd))
</script>

<template>
  <div class="claude-code">
    <div v-if="showHeader" class="claude-code-header">
      <pre class="claude-code-logo">{{ LOGO }}</pre>
      <div class="claude-code-meta">
        <div class="claude-code-title-line">
          <span class="claude-code-label">Claude Code</span>
          <span v-if="version" class="claude-code-version">{{ version }}</span>
        </div>
        <span v-if="subtitle" class="claude-code-subtitle">{{ subtitle }}</span>
        <span v-if="cwd" class="claude-code-cwd">{{ cwd }}</span>
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
  padding: 8px;
}

.claude-code-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.claude-code-logo {
  margin: 0;
  white-space: pre;
  color: var(--terminal-block-accent);
}

.claude-code-meta {
  display: flex;
  flex-direction: column;
}

.claude-code-title-line {
  display: flex;
  gap: 4px;
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
