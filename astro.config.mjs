import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://watidy.com.br',
  integrations: [vue()],
  vite: {
    plugins: [tailwindcss()],
    server: { host: '0.0.0.0', port: 5173 },
  },
})
