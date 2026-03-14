// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['github:Z-J-wang/nbc-nuxt-layer#v0.0.1-alpha.3'],
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxt/icon', '@pinia/nuxt', '@nuxtjs/i18n', '@regle/nuxt', '@vueuse/nuxt'],
  ssr: true,
  devtools: { enabled: true },
  app: {
    baseURL: './',
    // 设置全局默认的 meta
    head: {
      title: '鼎利成生物科技',
      meta: [{ name: 'description', content: '鼎利成生物科技' }]
    }
  },
  css: ['~/assets/css/main.css'],
  ui: {
    colorMode: false // 关闭自动切换主题，即禁用深色模式
  },
  runtimeConfig: {
    public: {
      // 客户端变量
      baseUrl: '', // 默认的 baseUrl，此处应该填写生产环境的客户端的 baseUrl
      apiBaseUrl: '/api' // 默认的 apiBaseUrl，此处应该填写生产环境的服务器的 apiBaseUrl
    }
  },
  devServer: { port: 8080 },
  compatibilityDate: '2025-07-15',
  nitro: {
    devProxy: {
      '/api': {
        target: '',
        changeOrigin: true,
        prependPath: true
      }
    }
  },
  eslint: {
    config: {
      stylistic: true // 开启 eslint-stylistic
    }
  },
  i18n: {
    defaultLocale: 'zh-CN',
    locales: [
      { code: 'en', name: 'English', files: ['en.js'], alias: 'En' },
      { code: 'zh-CN', name: '简体中文', files: ['zh-CN.js'], alias: '中' }
    ]
  },
  regle: {
    setupFile: '~/regle.config.ts' // regle 配置文件
  }
})
