<script setup lang="ts">
import { computed, inject } from 'vue'
import { TB_THEME_KEY } from '@/themes'

const theme = inject(TB_THEME_KEY)!
const style = computed(() => ({
  '--tb-color': theme.value.ansiCyan,
  color: 'var(--tb-color)',
}))
</script>

<template>
  <span :style="style"><slot /></span>
</template>
