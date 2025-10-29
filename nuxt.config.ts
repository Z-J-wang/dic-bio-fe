// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxtjs/tailwindcss',
    '@ant-design-vue/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
  ],
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
    defaultLocale: 'zh-hans',
    locales: [
      { code: 'en', name: 'EN', file: 'en.json' },
      { code: 'zh-hans', name: '中', file: 'zh-hans.json' },
    ],
  },
})
