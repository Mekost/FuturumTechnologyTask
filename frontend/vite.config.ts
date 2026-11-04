import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // forward API calls to the Spring backend, so no CORS config is needed
    proxy: {
      '/campaigns': 'http://localhost:8080',
      '/balance': 'http://localhost:8080',
      '/towns': 'http://localhost:8080',
      '/keywords': 'http://localhost:8080',
    },
  },
})
