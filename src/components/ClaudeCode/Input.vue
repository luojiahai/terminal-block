<template>
  <div class="claude-code-input">
    <span class="claude-code-glyph">❯</span>
    <span class="claude-code-input-text"><slot /></span>
  </div>
</template>

<style scoped>
.claude-code-input {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: color-mix(in srgb, var(--terminal-block-input-bg), transparent 50%);
}

.claude-code-glyph {
  flex-shrink: 0;
  color: var(--terminal-block-secondary);
}

.claude-code-input-text {
  color: var(--terminal-block-text);
}
</style>
