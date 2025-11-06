// Contenido de vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [react()] habilita el soporte de react (jsx, fast refresh) en vite.
  plugins: [react()],
  
  // --- configuración de vitest ---
  // esta sección configura vitest, el entorno de pruebas integrado.
  test: {
    // 'globals: true' evita tener que importar 'it', 'describe', 'expect', etc. en cada test.
    globals: true,
    // 'environment' simula un entorno de navegador (con jsdom) para poder testear componentes de react.
    environment: 'jsdom',
    // 'setupFiles' es un archivo que se ejecuta antes de todas las suites de test.
    // lo usamos para configurar jest-dom globalmente a través de nuestro archivo setupTests.js.
    setupFiles: './src/setupTests.js', 
  },
  // --- fin de la configuración de vitest ---
})