export function formatTime(s: number): string {
  if (s < 60) return `${s}s`
  const m = Math.floor(s / 60)
  const rem = s % 60
  return rem === 0 ? `${m}m` : `${m}m ${rem}s`
}

export function formatTokens(t: number): string {
  if (t < 1000) return `${t} tokens`
  if (t < 10000) return `${(t / 1000).toFixed(1)}k tokens`
  if (t < 1_000_000) return `${Math.floor(t / 1000)}k tokens`
  const m = t / 1_000_000
  return m < 10 ? `${m.toFixed(1)}m tokens` : `${Math.floor(m)}m tokens`
}
