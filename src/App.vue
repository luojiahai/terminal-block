<script setup lang="ts">
import TerminalBlock from './components/TerminalBlock.vue'
import { ClaudeCode } from './components/ClaudeCode'
import { Bash } from './components/Bash'
import Yellow from './components/colors/Yellow.vue'
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
      <ClaudeCode
        version="v2.1.126"
        subtitle="Sonnet 4.6 · API Billing"
        cwd="~/workplace"
      >
        <ClaudeCode.Input>hello</ClaudeCode.Input>
        <ClaudeCode.Output>Hey! How can I help you today?</ClaudeCode.Output>
        <ClaudeCode.Thinking done>3s</ClaudeCode.Thinking>
        <ClaudeCode.Output>Build completed in <Yellow>2.3s</Yellow></ClaudeCode.Output>
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
