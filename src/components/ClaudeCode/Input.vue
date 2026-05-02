<script setup lang="ts">
import { computed, inject } from 'vue'
import { TB_APP_KEY } from '@/apps'

const app = inject(TB_APP_KEY)!
const turnConfig = computed(() => app.value.inputTurn)
const glyphStyle = computed(() => ({ color: `var(${turnConfig.value.glyphColor})` }))
const textStyle = computed(() => ({ color: `var(${turnConfig.value.textColor})` }))
</script>

<template>
  <div class="cc-input" :class="{ 'cc-input--block': turnConfig.blockBg }">
    <span v-if="turnConfig.glyph" class="cc-glyph" :style="glyphStyle">{{ turnConfig.glyph }}</span>
    <span class="cc-input-text" :style="textStyle"><slot /></span>
  </div>
</template>

<style scoped>
.cc-input {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cc-input--block {
  background-color: var(--tb-input-bg);
  padding: 6px 12px;
  border-radius: 4px;
  margin: 4px 0;
}

.cc-glyph {
  flex-shrink: 0;
  user-select: none;
}
</style>
