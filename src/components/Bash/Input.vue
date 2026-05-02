<template>
  <div class="bash-input">
    <span class="bash-glyph">$</span>
    <span class="bash-input-text"><slot /></span>
  </div>
</template>

<style scoped>
.bash-input {
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: 4px 0;
}

.bash-glyph {
  flex-shrink: 0;
  color: var(--terminal-block-secondary);
}

.bash-input-text {
  color: var(--terminal-block-text);
}
</style>
