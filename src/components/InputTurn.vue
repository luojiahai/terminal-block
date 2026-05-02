<script setup lang="ts">
import { computed, inject } from 'vue'
import { TB_APP_KEY, TB_THEME_KEY } from '@/apps'

const app = inject(TB_APP_KEY)!
const theme = inject(TB_THEME_KEY)!

const turnConfig = computed(() => app.value.inputTurn)
const glyphStyle = computed(() => ({ color: `var(${turnConfig.value.glyphColor})` }))
const textStyle = computed(() => ({ color: `var(${turnConfig.value.textColor})` }))
</script>

<template>
  <div class="tb-input-turn" :class="{ 'tb-input-turn--block': turnConfig.blockBg }">
    <span v-if="turnConfig.glyph" class="tb-glyph" :style="glyphStyle">{{ turnConfig.glyph }}</span>
    <span class="tb-input-text" :style="textStyle"><slot /></span>
  </div>
</template>

<style scoped>
.tb-input-turn {
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: 4px 0;
}

.tb-input-turn--block {
  background-color: var(--tb-input-bg);
  padding: 6px 12px;
  border-radius: 4px;
  margin: 4px 0;
}

.tb-glyph {
  flex-shrink: 0;
  user-select: none;
}
</style>
