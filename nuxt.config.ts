// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/test-utils',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
  ],
  ssr: true,
  devtools: { enabled: true },
  app: {
    // 设置全局默认的 meta
    head: {
      title: 'SMART-Nuxt-Template',
      meta: [
        { name: 'description', content: 'SMART-Nuxt-Template' },
      ],
    },
  },
  css: ['~/assets/css/main.css'],
  devServer: {
    // host: '0.0.0.0', // 允许所有网络接口访问
    port: 8080,
  },
  compatibilityDate: '2025-07-15',
  eslint: {
    config: {
      stylistic: true, // 开启 eslint-stylistic
    },
  },
  i18n: {
    defaultLocale: 'zh_cn',
    locales: [
      { code: 'en', name: 'EN', file: 'en.json' },
      { code: 'zh_cn', name: '中', file: 'zh_cn.json' },
    ],
  },
})
