import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'path';
import libCss from 'vite-plugin-libcss';
import VitePluginStyleInject from 'vite-plugin-style-inject';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue(), libCss(), VitePluginStyleInject()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    // 忽略后缀名的配置选项, 添加 .vue 选项时要记得原本默认忽略的选项也要手动写入
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  server: {
    port: 9000
  },
  build: {
    lib: {
      entry: 'src/bigeMap.js',
      name: 'bigeMap',
      fileName: 'bigeMap',
    },
    rollupOptions: {
      external: ['vue'], // 如果你的库依赖了Vue，需要将Vue声明为外部依赖
      output: {
        globals: {
          vue: 'Vue', // 将Vue作为全局变量
        },
      },
    },
  }
})
