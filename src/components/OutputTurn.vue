<script setup lang="ts">
import { computed, inject } from 'vue'
import { TB_APP_KEY } from '@/apps'
import { TB_THEME_KEY } from '@/themes'

const app = inject(TB_APP_KEY)!

const turnConfig = computed(() => app.value.outputTurn)
const glyphStyle = computed(() => ({ color: `var(${turnConfig.value.glyphColor})` }))
const textStyle = computed(() => ({ color: `var(${turnConfig.value.textColor})` }))
</script>

<template>
  <div class="tb-output-turn">
    <span v-if="turnConfig.glyph" class="tb-glyph" :style="glyphStyle">{{ turnConfig.glyph }}</span>
    <span class="tb-output-text" :style="textStyle"><slot /></span>
  </div>
</template>

<style scoped>
.tb-output-turn {
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: 4px 0;
}

.tb-glyph {
  flex-shrink: 0;
  user-select: none;
}
</style>
