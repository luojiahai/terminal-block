<script setup lang="ts">
import { computed, inject } from 'vue'
import { TB_APP_KEY } from '@/apps'

const app = inject(TB_APP_KEY)!
const turnConfig = computed(() => app.value.outputTurn)
const textStyle = computed(() => ({ color: `var(${turnConfig.value.textColor})` }))
</script>

<template>
  <div class="bash-output">
    <span class="bash-output-text" :style="textStyle"><slot /></span>
  </div>
</template>

<style scoped>
.bash-output {
  display: flex;
  align-items: baseline;
  padding: 4px 0;
}
</style>
