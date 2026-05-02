<script setup lang="ts">
import TerminalBlock from './components/TerminalBlock.vue'
import InputTurn from './components/InputTurn.vue'
import OutputTurn from './components/OutputTurn.vue'
import Thinking from './components/Thinking.vue'
import Green from './components/colors/Green.vue'
import Yellow from './components/colors/Yellow.vue'
import Red from './components/colors/Red.vue'
// Register built-in app configs
import './apps/bash'
import './apps/claude-code'
</script>

<template>
  <div style="padding: 32px; background: #1a1a2e; min-height: 100vh; display: flex; flex-direction: column; gap: 24px;">
    <TerminalBlock
      app="claude-code"
      version="v2.1.126"
      subtitle="Sonnet 4.6 · API Billing"
      cwd="~/workplace"
    >
      <InputTurn>hello</InputTurn>
      <OutputTurn>Hey! How can I help you today?</OutputTurn>
      <Thinking done>3s</Thinking>
      <OutputTurn>
        <Green>✔</Green> Build completed in <Yellow>2.3s</Yellow>
      </OutputTurn>
    </TerminalBlock>

    <TerminalBlock app="bash" cwd="~/workplace">
      <InputTurn>ls -la</InputTurn>
      <OutputTurn>total 24 drwxr-xr-x 8 user staff 256</OutputTurn>
      <InputTurn>npm run build</InputTurn>
      <OutputTurn>
        <Red>✘</Red> Build failed: module not found
      </OutputTurn>
    </TerminalBlock>
  </div>
</template>
