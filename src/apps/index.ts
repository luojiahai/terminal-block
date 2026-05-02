import type { InjectionKey, Ref } from 'vue'
import type { ThemeTokens } from '@/themes'

export interface TurnConfig {
  glyph: string | null
  glyphColor: string
  textColor: string
  blockBg: boolean
}

export interface AppConfig {
  id: string
  inputTurn: TurnConfig
  outputTurn: TurnConfig
  supportedTurns: ('InputTurn' | 'OutputTurn' | 'Thinking')[]
  header?: {
    logo: string | null
    logoColor: string
  }
  themeOverrides?: Partial<ThemeTokens>
}

export const TB_APP_KEY: InjectionKey<Ref<AppConfig>> = Symbol('tbApp')

const registry: Record<string, AppConfig> = {}

export function registerApp(config: AppConfig): void {
  registry[config.id] = config
}

export function resolveApp(app: string | AppConfig): AppConfig {
  if (typeof app !== 'string') return app
  const found = registry[app]
  if (!found) throw new Error(`[terminal-block] Unknown app: "${app}"`)
  return found
}

