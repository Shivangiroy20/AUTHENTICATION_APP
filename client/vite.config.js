import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // or '0.0.0.0' if you need external access
    port: 3001,
    open: true // opens the browser automatically
  }
})
