// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/icon', '@nuxt/ui', '@nuxt/test-utils', '@pinia/nuxt', '@nuxtjs/i18n'],
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
      baseUrl: '', // 默认的 baseUrl
      apiBaseUrl: '' // 默认的 apiBaseUrl
    }
  },
  devServer: {
    // host: '0.0.0.0', // 允许所有网络接口访问
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
  }
})
