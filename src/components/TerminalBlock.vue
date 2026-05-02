<script setup lang="ts">
import { computed, provide } from 'vue'
import { resolveApp, TB_APP_KEY, type AppConfig } from '@/apps'
import { defaultTheme, resolveTheme, TB_THEME_KEY, type ThemeTokens } from '@/themes'

const props = withDefaults(
  defineProps<{
    app?: string | AppConfig
    theme?: string | Partial<ThemeTokens>
    version?: string
    subtitle?: string
    cwd?: string
  }>(),
  { app: 'bash' },
)

const resolvedApp = computed(() => resolveApp(props.app!))

const mergedTheme = computed((): ThemeTokens => {
  const userOverrides = props.theme ? resolveTheme(props.theme) : {}
  return {
    ...defaultTheme,
    ...(resolvedApp.value.themeOverrides ?? {}),
    ...userOverrides,
  }
})

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

const showHeader = computed(() => !!(props.version || props.subtitle || props.cwd))
const showBottomPrompt = computed(() =>
  resolvedApp.value.supportedTurns.includes('Thinking'),
)

provide(TB_APP_KEY, resolvedApp)
provide(TB_THEME_KEY, mergedTheme)
</script>

<template>
  <div class="terminal-block" :style="cssVars">
    <div class="tb-titlebar">
      <span class="tb-dot tb-dot--red" />
      <span class="tb-dot tb-dot--yellow" />
      <span class="tb-dot tb-dot--green" />
      <span class="tb-app-name">{{ resolvedApp.id }}</span>
    </div>

    <div v-if="showHeader" class="tb-header">
      <pre
        v-if="resolvedApp.header?.logo"
        class="tb-logo"
        :style="{ color: `var(${resolvedApp.header.logoColor})` }"
      >{{ resolvedApp.header.logo }}</pre>
      <div class="tb-meta">
        <span v-if="version" class="tb-version">{{ version }}</span>
        <span v-if="subtitle" class="tb-subtitle">{{ subtitle }}</span>
        <span v-if="cwd" class="tb-cwd">{{ cwd }}</span>
      </div>
    </div>

    <div class="tb-body">
      <slot />
    </div>

    <template v-if="showBottomPrompt">
      <div class="tb-divider-line">────────────────────────────────────────</div>
      <div class="tb-waiting-prompt">❯</div>
      <div class="tb-divider-line">────────────────────────────────────────</div>
    </template>
  </div>
</template>

<style scoped>
.terminal-block {
  background-color: var(--tb-bg);
  color: var(--tb-text);
  font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
  font-size: 14px;
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

.tb-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--tb-divider);
}

.tb-logo {
  margin: 0;
  font-size: 11px;
  line-height: 1.4;
  white-space: pre;
}

.tb-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 12px;
}

.tb-version { color: var(--tb-muted); }
.tb-subtitle { color: var(--tb-secondary); }
.tb-cwd { color: var(--tb-muted); }

.tb-body {
  padding: 8px 16px;
}

.tb-divider-line {
  color: var(--tb-muted);
  padding: 0 16px;
  font-size: 12px;
}

.tb-waiting-prompt {
  color: var(--tb-secondary);
  padding: 4px 16px;
}

.terminal-block :deep(code) {
  background: var(--tb-code-bg);
  color: var(--tb-accent);
  padding: 1px 5px;
  border-radius: 3px;
  font-size: 0.9em;
}
</style>
