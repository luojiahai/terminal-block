<script setup lang="ts">
import { inject, watchEffect } from 'vue'
import { TB_TITLE_KEY } from '@/apps'

const props = defineProps<{ title?: string }>()

const titleLabel = inject(TB_TITLE_KEY)
watchEffect(() => {
  if (titleLabel) titleLabel.value = props.title ?? 'bash'
})
</script>

<template>
  <div class="bash">
    <div class="bash-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
</style>
