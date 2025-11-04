/**
 * 用户信息
 */
export const useUserStore = defineStore('userinfo', () => {
  const userinfo = ref({
    name: 'Eduardo',
    age: 18,
  })
  const age = computed(() => userinfo.value.age)

  const isLogin = computed(() => userinfo.value.name !== '')
  function updateAge(age: number) { userinfo.value.age = age }

  return { userinfo, age, isLogin, updateAge }
})
