<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import { TB_TITLE_KEY } from '@/apps'
import { defaultTheme, resolveTheme, type ThemeTokens } from '@/themes'

const props = defineProps<{
  theme?: string | Partial<ThemeTokens>
}>()

const titleLabel = ref('')
provide(TB_TITLE_KEY, titleLabel)

const mergedTheme = computed(
  (): ThemeTokens => ({
    ...defaultTheme,
    ...(props.theme ? resolveTheme(props.theme) : {}),
  }),
)

const cssVars = computed(() => ({
  '--terminal-block-bg': mergedTheme.value.bg,
  '--terminal-block-header-bg': mergedTheme.value.headerBg,
  '--terminal-block-input-bg': mergedTheme.value.inputBg,
  '--terminal-block-code-bg': mergedTheme.value.codeBg,
  '--terminal-block-text': mergedTheme.value.text,
  '--terminal-block-secondary': mergedTheme.value.secondary,
  '--terminal-block-muted': mergedTheme.value.muted,
  '--terminal-block-accent': mergedTheme.value.accent,
  '--terminal-block-divider': mergedTheme.value.divider,
  '--terminal-block-ansi-red': mergedTheme.value.ansiRed,
  '--terminal-block-ansi-green': mergedTheme.value.ansiGreen,
  '--terminal-block-ansi-yellow': mergedTheme.value.ansiYellow,
  '--terminal-block-ansi-blue': mergedTheme.value.ansiBlue,
  '--terminal-block-ansi-magenta': mergedTheme.value.ansiMagenta,
  '--terminal-block-ansi-cyan': mergedTheme.value.ansiCyan,
  '--terminal-block-ansi-white': mergedTheme.value.ansiWhite,
}))
</script>

<template>
  <div class="terminal-block" :style="cssVars">
    <div class="terminal-block-header">
      <span class="terminal-block-dot terminal-block-dot--red" />
      <span class="terminal-block-dot terminal-block-dot--yellow" />
      <span class="terminal-block-dot terminal-block-dot--green" />
      <span class="terminal-block-app-name">{{ titleLabel }}</span>
    </div>
    <div class="terminal-block-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.terminal-block {
  background-color: var(--terminal-block-bg);
  color: var(--terminal-block-text);
  font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1;
  border-radius: 8px;
  overflow: hidden;
}

.terminal-block-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 1lh;
  background-color: var(--terminal-block-header-bg);
}

.terminal-block-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.terminal-block-dot--red {
  background-color: #ff5f57;
}
.terminal-block-dot--yellow {
  background-color: #febc2e;
}
.terminal-block-dot--green {
  background-color: #28c840;
}

.terminal-block-app-name {
  color: var(--terminal-block-muted);
  margin-left: 8px;
}

.terminal-block-body {
  padding: 8px 1lh 1lh;
}
</style>
