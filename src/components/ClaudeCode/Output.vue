<script setup lang="ts">
import { computed, inject } from 'vue'
import { TB_APP_KEY } from '@/apps'

const app = inject(TB_APP_KEY)!
const turnConfig = computed(() => app.value.outputTurn)
const glyphStyle = computed(() => ({ color: `var(${turnConfig.value.glyphColor})` }))
const textStyle = computed(() => ({ color: `var(${turnConfig.value.textColor})` }))
</script>

<template>
  <div class="cc-output">
    <span v-if="turnConfig.glyph" class="cc-glyph" :style="glyphStyle">{{ turnConfig.glyph }}</span>
    <span class="cc-output-text" :style="textStyle"><slot /></span>
  </div>
</template>

<style scoped>
.cc-output {
  display: flex;
  align-items: center;
  gap: 16px;
}

.cc-glyph {
  flex-shrink: 0;
  user-select: none;
}
</style>
