import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import circleDependency from 'vite-plugin-circular-dependency';
import { resolve } from 'path';

export default defineConfig({
  server: {
    host: '0.0.0.0'
  },
  
  plugins: [
    react(),
    circleDependency({
      include: /src\/.*\.(js|jsx|ts|tsx)$/,
      exclude: /node_modules/,
      circleImportThrowErr: true,
    }),
  ],

  resolve: {
    alias: {
      '@api': resolve(__dirname, 'src/api'),
      '@constants': resolve(__dirname, 'src/constants'),
      '@components': resolve(__dirname, 'src/components'),
      '@context': resolve(__dirname, 'src/context'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@routes': resolve(__dirname, 'src/routes'),
    },
  },
});
