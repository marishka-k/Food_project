import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// CSS Modules работают из коробки: любой файл *.module.css
// base — сайт на GitHub Pages открывается из подпапки /Food_project/
export default defineConfig({
  base: '/Food_project/',
  plugins: [react()],
  server: { port: 5175 },
});
