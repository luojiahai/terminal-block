<script setup lang="ts">
import { computed, inject, provide, ref, watchEffect } from 'vue'
import { TB_APP_KEY, TB_TITLE_KEY, type AppConfig } from '@/apps'

const LOGO = `  ╭──────────╮
  │ ◆ claude │
  ╰──────────╯`

const APP_CONFIG: AppConfig = {
  id: 'claude-code',
  supportedTurns: ['InputTurn', 'OutputTurn', 'Thinking'],
  inputTurn: { glyph: '❯', glyphColor: '--tb-secondary', textColor: '--tb-text', blockBg: true },
  outputTurn: { glyph: '⏺', glyphColor: '--tb-text', textColor: '--tb-text', blockBg: false },
}

const props = defineProps<{
  version?: string
  subtitle?: string
  cwd?: string
  title?: string
}>()

const titleLabel = inject(TB_TITLE_KEY)
watchEffect(() => {
  if (titleLabel) titleLabel.value = props.title ?? 'claude-code'
})

provide(TB_APP_KEY, ref(APP_CONFIG))

const showHeader = computed(() => !!(props.version || props.subtitle || props.cwd))
</script>

<template>
  <div class="claude-code">
    <div v-if="showHeader" class="cc-header">
      <pre class="cc-logo">{{ LOGO }}</pre>
      <div class="cc-meta">
        <span v-if="version" class="cc-version">{{ version }}</span>
        <span v-if="subtitle" class="cc-subtitle">{{ subtitle }}</span>
        <span v-if="cwd" class="cc-cwd">{{ cwd }}</span>
      </div>
    </div>
    <div class="cc-body">
      <slot />
    </div>
    <div class="cc-divider-line">────────────────────────────────────────</div>
    <div class="cc-waiting-prompt">❯</div>
    <div class="cc-divider-line">────────────────────────────────────────</div>
  </div>
</template>

<style scoped>
.cc-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--tb-divider);
}

.cc-logo {
  margin: 0;
  font-size: 11px;
  line-height: 1.4;
  white-space: pre;
  color: var(--tb-accent);
}

.cc-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 12px;
}

.cc-version { color: var(--tb-muted); }
.cc-subtitle { color: var(--tb-secondary); }
.cc-cwd { color: var(--tb-muted); }

.cc-body {
  padding: 8px 16px;
}

.cc-divider-line {
  color: var(--tb-muted);
  padding: 0 16px;
  font-size: 12px;
}

.cc-waiting-prompt {
  color: var(--tb-secondary);
  padding: 4px 16px;
}
</style>
