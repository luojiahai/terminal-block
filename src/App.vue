<script setup lang="ts">
import { TerminalBlock, ClaudeCode, Bash } from 'terminal-block'
</script>

<template>
  <div
    style="
      padding: 32px;
      background: #1a1a2e;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      gap: 24px;
    "
  >
    <TerminalBlock>
      <ClaudeCode>
        <ClaudeCode.Input>hello</ClaudeCode.Input>
        <ClaudeCode.Output>Hey! How can I help you today?</ClaudeCode.Output>
        <ClaudeCode.Thinking></ClaudeCode.Thinking>
      </ClaudeCode>
    </TerminalBlock>

    <TerminalBlock>
      <Bash>
        <Bash.Input>ls -la</Bash.Input>
        <Bash.Output>total 24 drwxr-xr-x 8 user staff 256</Bash.Output>
        <Bash.Input>npm run build</Bash.Input>
        <Bash.Output>Build failed: module not found</Bash.Output>
      </Bash>
    </TerminalBlock>
  </div>
</template>
