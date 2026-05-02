<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ done?: boolean; verb?: string }>(), {
  done: false,
  verb: 'thinking',
})

const presentText = computed(() => `${props.verb.charAt(0).toUpperCase() + props.verb.slice(1)}...`)
</script>

<template>
  <div class="claude-code-thinking">
    <span class="claude-code-thinking-glyph">✻</span>
    <span v-if="!done" class="claude-code-thinking-text">{{ presentText }}</span>
    <span v-else class="claude-code-thinking-text">Thought for <slot /></span>
  </div>
</template>

<style scoped>
.claude-code-thinking {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.claude-code-thinking-glyph {
  color: var(--terminal-block-muted);
  flex-shrink: 0;
}

.claude-code-thinking-text {
  color: var(--terminal-block-secondary);
}
</style>
