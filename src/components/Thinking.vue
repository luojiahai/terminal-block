<script setup lang="ts">
import { computed, inject, onMounted } from 'vue'
import { TB_APP_KEY } from '@/apps'
import { TB_THEME_KEY } from '@/themes'

const props = withDefaults(
  defineProps<{
    done?: boolean
    verb?: string
  }>(),
  { done: false, verb: 'thinking' },
)

const app = inject(TB_APP_KEY)!
// const theme = inject(TB_THEME_KEY)!

const isSupported = computed(() => app.value.supportedTurns.includes('Thinking'))

onMounted(() => {
  if (!isSupported.value) {
    console.warn(`[terminal-block] <Thinking> is not supported in app="${app.value.id}"`)
  }
})

const presentText = computed(() => `${props.verb.charAt(0).toUpperCase() + props.verb.slice(1)}...`)
</script>

<template>
  <div v-if="isSupported" class="tb-thinking">
    <span class="tb-thinking-glyph">✻</span>
    <span v-if="!done" class="tb-thinking-text">{{ presentText }}</span>
    <span v-else class="tb-thinking-text">
      Thought for <slot />
    </span>
  </div>
</template>

<style scoped>
.tb-thinking {
  display: flex;
  align-items: baseline;
  gap: 6px;
  padding: 4px 0;
}

.tb-thinking-glyph {
  color: #444;
  flex-shrink: 0;
}

.tb-thinking-text {
  color: #555;
}
</style>
