// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/ui',
    '@nuxt/test-utils',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@regle/nuxt',
    '@vueuse/nuxt'
  ],
  ssr: true,
  devtools: { enabled: true },
  app: {
    // 设置全局默认的 meta
    head: {
      title: 'SMART-Nuxt-Template',
      meta: [{ name: 'description', content: 'SMART-Nuxt-Template' }]
    }
  },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      // 客户端变量
      baseUrl: '', // 默认的 baseUrl，此处应该填写生产环境的客户端的 baseUrl
      apiBaseUrl: '/api' // 默认的 apiBaseUrl，此处应该填写生产环境的服务器的 apiBaseUrl
    }
  },
  devServer: {
    port: 8080
  },
  compatibilityDate: '2025-07-15',
  eslint: {
    config: {
      stylistic: true // 开启 eslint-stylistic
    }
  },
  i18n: {
    defaultLocale: 'zh-CN',
    locales: [
      { code: 'en', name: 'English', files: ['en.js', 'common.en.js'], alias: 'En' },
      { code: 'zh-CN', name: '简体中文', files: ['zh-CN.js', 'common.zh-CN.js'], alias: '中' }
    ]
  },
  regle: {
    setupFile: '~/regle.config.ts' // regle 配置文件
  }
})