import type { UseFetchOptions } from 'nuxt/app'

export function useCustomFetch<T>(url: string | (() => string), options?: UseFetchOptions<T>) {
  const nuxtApp = useNuxtApp()

  return useFetch(url, {
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
    },
    ...options
  })
}
