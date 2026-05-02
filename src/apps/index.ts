import type { InjectionKey, Ref } from 'vue'

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
}

export const TB_APP_KEY: InjectionKey<Ref<AppConfig>> = Symbol('tbApp')
export const TB_TITLE_KEY: InjectionKey<Ref<string>> = Symbol('tbTitle')
