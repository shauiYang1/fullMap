import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'path';
// https://vitejs.dev/config/
export default defineConfig({
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
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'index.js'),
      name: 'demo',
      fileName: 'demo',
      formats: ['umd', 'es'],
    },
    // rollupOptions: {
    //   // 确保外部化处理那些你不想打包进库的依赖
    //   external: ['vue'],
    //   output: [
    //     {

    //       // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
    //       globals: {
    //         vue: 'Vue',
    //       },
    //     }
    //   ],
    // }
  }
})
