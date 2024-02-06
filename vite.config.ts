import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import circleDependency from 'vite-plugin-circular-dependency';
import { resolve } from 'path';

export default defineConfig({
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
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@components': resolve(__dirname, 'src/components'),
      '@api': resolve(__dirname, 'src/api'),
      '@context': resolve(__dirname, 'src/context'),
      '@types': resolve(__dirname, 'src/types'),
      '@utils': resolve(__dirname, 'src/utils'),
    },
  },
});
