import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from "url";
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: '@data', replacement: fileURLToPath(new URL('./src/data', import.meta.url)) },
    ],
  },
  plugins: [vue(),
  vuetify({ configFile: 'src/scss/style.scss' })
  ],
})
