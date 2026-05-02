import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import dts from 'vite-plugin-dts'

export default defineConfig(({ command }) => ({
  plugins: [
    vue(),
    vueJsx(),
    command === 'serve' ? vueDevTools() : null,
    dts({ include: ['src'], exclude: ['src/**/__tests__/**', 'src/App.vue', 'src/main.ts'] }),
  ].filter(Boolean),
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'TerminalBlock',
      fileName: 'terminal-block',
    },
    rollupOptions: {
      external: ['vue'],
      output: { globals: { vue: 'Vue' } },
    },
  },
}))
