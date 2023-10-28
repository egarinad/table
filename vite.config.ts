import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      config: path.resolve(__dirname, 'src/config'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      types: path.resolve(__dirname, 'src/types'),
    },
  },
});
