<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<{ done?: boolean; verbs?: string[] }>(), {
  done: false,
  verbs: () => ['thinking', 'flibbertigibbeting', 'combobulating'],
})

const verbIndex = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

function startCycling() {
  if (timer) return
  timer = setInterval(() => {
    verbIndex.value = (verbIndex.value + 1) % props.verbs.length
  }, 3000)
}

function stopCycling() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

onMounted(() => { if (!props.done) startCycling() })
watch(() => props.done, (done) => { done ? stopCycling() : startCycling() })
onUnmounted(stopCycling)

const presentText = computed(() => {
  const v = props.verbs[verbIndex.value] ?? 'thinking'
  return v.charAt(0).toUpperCase() + v.slice(1) + '...'
})
</script>

<template>
  <div class="claude-code-thinking">
    <span :class="['claude-code-thinking-glyph', { active: !done }]"></span>
    <span v-if="!done" :class="['claude-code-thinking-text', 'active']">{{ presentText }}</span>
    <span v-else class="claude-code-thinking-text">Thought for <slot /></span>
  </div>
</template>

<style scoped>
.claude-code-thinking {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.claude-code-thinking-glyph::before {
  content: '✻';
  color: var(--terminal-block-muted);
}

@keyframes claude-code-thinking-glyph {
  0%     { content: '·' }
  8.33%  { content: '✢' }
  16.67% { content: '✳' }
  25%    { content: '✶' }
  33.33% { content: '✻' }
  41.67% { content: '✽' }
  50%    { content: '✽' }
  58.33% { content: '✻' }
  66.67% { content: '✶' }
  75%    { content: '✳' }
  83.33% { content: '✢' }
  91.67% { content: '·' }
}

.claude-code-thinking-glyph.active::before {
  color: #d97757;
  animation: claude-code-thinking-glyph 1440ms steps(12, start) infinite;
}

.claude-code-thinking-text {
  color: var(--terminal-block-secondary);
}

@keyframes claude-code-thinking-pulse {
  0%, 100% { color: #d97757; }
  50%       { color: rgb(245, 149, 117); }
}

.claude-code-thinking-text.active {
  color: #d97757;
  animation: claude-code-thinking-pulse 2s ease-in-out 3s infinite;
}
</style>
