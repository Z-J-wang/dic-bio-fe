/**
 * 登录中间件
 */
import { useUserStore } from "@/store/user"

export default defineNuxtRouteMiddleware((to) => {
  // 在服务器上跳过中间件
  // if (import.meta.server) return

  const userStore = useUserStore()

  if (userStore.isLogin) {
    // 跳转登录页面
    const redirect = '/login?redirect=' + to.fullPath
    return navigateTo(redirect)
  }
})
