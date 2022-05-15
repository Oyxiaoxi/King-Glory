/// <reference types="vitest" />

import path from 'path'
import type { ConfigEnv } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import { wrapperEnv } from './src/utils/getEnv'

export default defineConfig((mode: ConfigEnv) => {
  const env = loadEnv(mode.mode, process.cwd())
  const viteEnv = wrapperEnv(env)
  return {
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    plugins: [
      Vue({
        reactivityTransform: true,
      }),

      // https://github.com/hannoeru/vite-plugin-pages
      Pages(),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          'vue',
          'vue/macros',
          'vue-router',
          '@vueuse/core',
        ],
        dts: true,
      }),

      // https://github.com/antfu/vite-plugin-components
      Components({
        dts: true,
      }),

      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      Unocss(),
    ],
    server: {
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      cors: true,
      // 代理跨域
      proxy: {
        '/api': {
          target: 'https://www.fastmock.site/mock/f81e8333c1a9276214bcdbc170d9e0a0',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },

    // https://github.com/vitest-dev/vitest
    test: {
      environment: 'jsdom',
    },
  }
})
