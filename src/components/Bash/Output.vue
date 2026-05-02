<template>
  <div class="bash-output">
    <span class="bash-output-text"><slot /></span>
  </div>
</template>

<style scoped>
.bash-output {
  display: flex;
  align-items: baseline;
  padding: 4px 0;
}

.bash-output-text {
  color: var(--terminal-block-text);
}
</style>
