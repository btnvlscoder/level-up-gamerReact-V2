// Contenido de vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // --- AÑADE ESTA SECCIÓN ---
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js', // Archivo de setup que crearemos
  },
  // --- FIN DE LA SECCIÓN ---
})