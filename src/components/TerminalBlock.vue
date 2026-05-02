<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import { TB_TITLE_KEY } from '@/apps'
import { defaultTheme, resolveTheme, type ThemeTokens } from '@/themes'

const props = defineProps<{
  theme?: string | Partial<ThemeTokens>
}>()

const titleLabel = ref('')
provide(TB_TITLE_KEY, titleLabel)

const mergedTheme = computed((): ThemeTokens => ({
  ...defaultTheme,
  ...(props.theme ? resolveTheme(props.theme) : {}),
}))

const cssVars = computed(() => ({
  '--tb-bg': mergedTheme.value.bg,
  '--tb-titlebar-bg': mergedTheme.value.titlebarBg,
  '--tb-input-bg': mergedTheme.value.inputBg,
  '--tb-code-bg': mergedTheme.value.codeBg,
  '--tb-text': mergedTheme.value.text,
  '--tb-secondary': mergedTheme.value.secondary,
  '--tb-muted': mergedTheme.value.muted,
  '--tb-accent': mergedTheme.value.accent,
  '--tb-divider': mergedTheme.value.divider,
  '--tb-ansi-red': mergedTheme.value.ansiRed,
  '--tb-ansi-green': mergedTheme.value.ansiGreen,
  '--tb-ansi-yellow': mergedTheme.value.ansiYellow,
  '--tb-ansi-blue': mergedTheme.value.ansiBlue,
  '--tb-ansi-magenta': mergedTheme.value.ansiMagenta,
  '--tb-ansi-cyan': mergedTheme.value.ansiCyan,
  '--tb-ansi-white': mergedTheme.value.ansiWhite,
}))
</script>

<template>
  <div class="terminal-block" :style="cssVars">
    <div class="tb-titlebar">
      <span class="tb-dot tb-dot--red" />
      <span class="tb-dot tb-dot--yellow" />
      <span class="tb-dot tb-dot--green" />
      <span class="tb-app-name">{{ titleLabel }}</span>
    </div>
    <slot />
  </div>
</template>

<style scoped>
.terminal-block {
  background-color: var(--tb-bg);
  color: var(--tb-text);
  font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1;
  border-radius: 8px;
  overflow: hidden;
}

.tb-titlebar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  background-color: var(--tb-titlebar-bg);
}

.tb-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.tb-dot--red { background-color: #ff5f57; }
.tb-dot--yellow { background-color: #febc2e; }
.tb-dot--green { background-color: #28c840; }

.tb-app-name {
  color: var(--tb-muted);
  margin-left: 8px;
  font-size: 12px;
}

.terminal-block :deep(code) {
  background: var(--tb-code-bg);
  color: var(--tb-accent);
  padding: 1px 5px;
  border-radius: 3px;
  font-size: 0.9em;
}
</style>
