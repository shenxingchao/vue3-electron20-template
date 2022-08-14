import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  //路径
  base: './',
  //开发环境配置
  server: {
    port: 3000
  },
  //插件
  plugins: [vue()],
  //解析
  resolve: {
    //别名
    alias: {
      '@': resolve('src')
    }
  },
  //配置全局css https://cn.vitejs.dev/config/#css-preprocessoroptions
  css: {
    postcss: {
      plugins: [
        require('autoprefixer'), //css自动前缀
        require('postcss-import') //支持@import写法
      ]
    },
    preprocessorOptions: {
      scss: {
        //注意这里sass变成了scss
        additionalData: `@import "@/assets/styles/variables.scss";`
      }
    }
  },
  //打包配置
  build: {
    minify: true, //打包文件是否压缩  打包出来的css文件 @charset "UTF-8"; 重复添加  原因'node_modules/element-plus/dist/index.css' 里添加了@charset "UTF-8"; 强迫症可以去掉在打包
    target: 'esnext',
    sourcemap: false, //构建后是否生成 source map 文件
    chunkSizeWarningLimit: 2000 // chunk 大小警告的限制（以 kbs 为单位）。
  }
})
