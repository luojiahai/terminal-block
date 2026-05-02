<script setup lang="ts">
import { computed, inject } from 'vue'
import { TB_APP_KEY } from '@/apps'

const app = inject(TB_APP_KEY)!
const turnConfig = computed(() => app.value.inputTurn)
const glyphStyle = computed(() => ({ color: `var(${turnConfig.value.glyphColor})` }))
const textStyle = computed(() => ({ color: `var(${turnConfig.value.textColor})` }))
</script>

<template>
  <div class="claude-code-input" :class="{ 'claude-code-input-block': turnConfig.blockBg }">
    <span v-if="turnConfig.glyph" class="claude-code-glyph" :style="glyphStyle">{{ turnConfig.glyph }}</span>
    <span class="claude-code-input-text" :style="textStyle"><slot /></span>
  </div>
</template>

<style scoped>
.claude-code-input {
  display: flex;
  align-items: center;
  gap: 8px;
}

.claude-code-input-block {
  background-color: color-mix(in srgb, var(--terminal-block-input-bg), transparent 50%);
}

.claude-code-glyph {
  flex-shrink: 0;
  user-select: none;
}
</style>
