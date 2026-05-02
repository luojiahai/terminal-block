<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{ done?: boolean; verb?: string }>(),
  { done: false, verb: 'thinking' },
)

const presentText = computed(
  () => `${props.verb.charAt(0).toUpperCase() + props.verb.slice(1)}...`,
)
</script>

<template>
  <div class="cc-thinking">
    <span class="cc-thinking-glyph">✻</span>
    <span v-if="!done" class="cc-thinking-text">{{ presentText }}</span>
    <span v-else class="cc-thinking-text">Thought for <slot /></span>
  </div>
</template>

<style scoped>
.cc-thinking {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.cc-thinking-glyph {
  color: var(--tb-muted);
  flex-shrink: 0;
}

.cc-thinking-text {
  color: var(--tb-secondary);
}
</style>
