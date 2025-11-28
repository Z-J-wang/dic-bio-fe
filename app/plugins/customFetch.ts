/**
 * 创建 $customFetch 插件来自定义 $fetch
 * 在此插件中实现接口的一些全局配置，如请求头、拦截器、全局响应处理等
 * 配置说明：https://github.com/unjs/ofetch?tab=readme-ov-file#%EF%B8%8F-timeout
 * 用法说明：https://nuxt.zhcndoc.com/docs/4.x/guide/recipes/custom-usefetch#%E8%87%AA%E5%AE%9A%E4%B9%89-fetch
 */
export default defineNuxtPlugin((nuxtApp) => {
  const customFetch = $fetch.create({
    baseURL: useRuntimeConfig().public.apiBaseUrl, // 设置全局的 baseURL
    onRequest({ request, options }) {
      // 设置请求头
      console.log(request, options)
    },
    onRequestError({ request, error }) {
      // 处理请求错误
      console.log('[fetch request error]', request, error) // 输出请求错误日志
    },
    onResponse({ request, response }) {
      // 处理响应数据
      console.log('[fetch response]', request, response.status, response.body) // 输出响应日志
      // localStorage.setItem('token', response._data.token)
    },

    async onResponseError({ request, response }) {
      console.log('[fetch response error]', request, response.status, response.body) // 输出响应错误日志
      // 跳转到登录页面
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo('/login'))
      }
    }
  })

  // Expose to useNuxtApp().$customFetch
  return {
    provide: {
      customFetch
    }
  }
})
