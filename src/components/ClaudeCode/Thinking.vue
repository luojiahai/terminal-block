<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { formatTime, formatTokens } from "./thinking-utils";

const props = withDefaults(defineProps<{ done?: boolean; verbs?: string[]; statusText?: string }>(), {
  done: false,
  verbs: () => ["thinking", "flibbertigibbeting", "combobulating"],
});

const verbIndex = ref(0);
const seconds = ref(0);
const tokens = ref(0);
let timer: ReturnType<typeof setInterval> | null = null;
let tokenTimer: ReturnType<typeof setInterval> | null = null;

function startCycling() {
  if (timer) return;
  seconds.value = 0;
  tokens.value = 0;
  verbIndex.value = 0;
  let verbTick = 0;
  timer = setInterval(() => {
    seconds.value += 1;
    verbTick = (verbTick + 1) % 3;
    if (verbTick === 0) {
      verbIndex.value = (verbIndex.value + 1) % props.verbs.length;
    }
  }, 1000);
  tokenTimer = setInterval(() => {
    tokens.value += Math.floor(Math.random() * 23) + 3;
    if (tokens.value >= 100000) tokens.value = 0;
  }, 50);
}

function stopCycling() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  if (tokenTimer) {
    clearInterval(tokenTimer);
    tokenTimer = null;
  }
}

onMounted(() => {
  if (!props.done) startCycling();
});
watch(
  () => props.done,
  (done) => {
    if (done) stopCycling();
    else startCycling();
  },
);
onUnmounted(stopCycling);

const presentText = computed(() => {
  const v = props.verbs[verbIndex.value] ?? "thinking";
  return v.charAt(0).toUpperCase() + v.slice(1) + "...";
});

const statsText = computed(() => {
  const base = `${formatTime(seconds.value)} · ↓ ${formatTokens(tokens.value)}`;
  return props.statusText ? `(${base} · ${props.statusText})` : `(${base})`;
});
</script>

<template>
  <div class="claude-code-thinking">
    <span :class="['claude-code-thinking-glyph', { active: !done }]"></span>
    <span v-if="!done" :class="['claude-code-thinking-text', 'active']">{{ presentText }}</span>
    <span v-else class="claude-code-thinking-text">Thought for <slot /></span>
    <span v-if="!done" class="claude-code-thinking-text">{{ statsText }}</span>
  </div>
</template>

<style scoped>
.claude-code-thinking {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.claude-code-thinking-glyph::before {
  content: "✻";
  color: var(--terminal-block-muted);
}

@keyframes claude-code-thinking-glyph {
  0% {
    content: "·";
  }
  9% {
    content: "✢";
  }
  18% {
    content: "✳";
  }
  27% {
    content: "✶";
  }
  36% {
    content: "✻";
  }
  45% {
    content: "✽";
  }
  55% {
    content: "✽";
  }
  64% {
    content: "✻";
  }
  73% {
    content: "✶";
  }
  82% {
    content: "✳";
  }
  91% {
    content: "✢";
  }
  100% {
    content: "·";
  }
}

.claude-code-thinking-glyph.active::before {
  color: #d97757;
  animation: claude-code-thinking-glyph 1440ms steps(12, start) infinite;
}

.claude-code-thinking-text {
  color: var(--terminal-block-secondary);
}

@keyframes claude-code-thinking-pulse {
  0%,
  100% {
    color: #d97757;
  }
  50% {
    color: rgb(245, 149, 117);
  }
}

.claude-code-thinking-text.active {
  color: #d97757;
  animation: claude-code-thinking-pulse 2s ease-in-out 3s infinite;
}
</style>
