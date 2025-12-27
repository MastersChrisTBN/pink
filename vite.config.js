import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Ganti 'NAMA_REPO_ANDA' dengan nama repository di GitHub
export default defineConfig({
  plugins: [react()],
  base: '/NAMA_REPO_ANDA/', 
})