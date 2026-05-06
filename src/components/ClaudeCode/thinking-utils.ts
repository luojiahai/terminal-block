export function formatTime(s: number): string {
  if (s < 60) return `${s}s`
  const m = Math.floor(s / 60)
  const rem = s % 60
  return rem === 0 ? `${m}m` : `${m}m ${rem}s`
}

export function formatTokens(t: number): string {
  if (t < 1000) return `${t} tokens`
  if (t < 10000) return `${(Math.floor(t / 100) / 10).toFixed(1)}k tokens`
  if (t < 1_000_000) return `${Math.floor(t / 1000)}k tokens`
  if (t < 10_000_000) return `${(Math.floor(t / 100_000) / 10).toFixed(1)}m tokens`
  return `${Math.floor(t / 1_000_000)}m tokens`
}
