/**
 * 用户信息
 */

// 定义用户数据接口
interface UserInfo {
  name: string
  age: number
}

export const useUserStore = defineStore('userinfo', () => {
  const userInfo = ref<UserInfo>()
  const age = computed(() => userInfo.value?.age)

  const isLogin = computed(() => userInfo.value?.name !== '')
  async function getUserData() {
    const res = await useCustomFetch('/user')
    const data = res.data.value as UserInfo
    if (data) {
      userInfo.value = data
    }
  }

  return { userInfo, age, isLogin, getUserData }
})
