<script setup lang="ts">
import { inject, provide, ref, watchEffect } from 'vue'
import { TB_APP_KEY, TB_TITLE_KEY, type AppConfig } from '@/apps'

const BASH_CONFIG: AppConfig = {
  id: 'bash',
  inputTurn: { glyph: '$', glyphColor: '--terminal-block-secondary', textColor: '--terminal-block-text', blockBg: false },
  outputTurn: { glyph: null, glyphColor: '--terminal-block-text', textColor: '--terminal-block-text', blockBg: false },
}

const props = defineProps<{ title?: string }>()

const titleLabel = inject(TB_TITLE_KEY)
watchEffect(() => {
  if (titleLabel) titleLabel.value = props.title ?? 'bash'
})

provide(TB_APP_KEY, ref(BASH_CONFIG))
</script>

<template>
  <div class="bash">
    <div class="bash-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.bash-body {
  padding: 8px 16px;
}
</style>
