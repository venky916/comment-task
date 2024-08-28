import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: 'window', // Add this line to define 'global' as 'window'
  },
  plugins: [react()],
})
