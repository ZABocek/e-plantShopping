import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // IMPORTANT: Must match your GitHub repo name exactly, with trailing slash
  base: '/e-plantShopping/',
  plugins: [react()],
})
