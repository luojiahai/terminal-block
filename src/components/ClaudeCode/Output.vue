<template>
  <div class="claude-code-output">
    <span class="claude-code-glyph">⏺</span>
    <span class="claude-code-output-text"><slot /></span>
  </div>
</template>

<style scoped>
.claude-code-output {
  display: flex;
  align-items: center;
  gap: 8px;
}

.claude-code-glyph {
  flex-shrink: 0;
  color: var(--terminal-block-text);
}

.claude-code-output-text {
  color: var(--terminal-block-text);
}
</style>
