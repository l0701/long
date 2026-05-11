import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['pyodide']
  },
  build: {
    rollupOptions: {
      external: ['node-fetch', 'pyodide']
    }
  }
})
