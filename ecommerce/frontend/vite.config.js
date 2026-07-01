import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  build: {
    outDir: '../static/dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './src/main.jsx',
        admin: './src/admin/main.jsx'   // ← Entry point do admin
      },
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
      }
    }
  },

  base: '/static/dist/',
})