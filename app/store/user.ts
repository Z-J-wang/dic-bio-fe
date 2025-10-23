/**
 * pinia 实例文件
 */

export const useUserStore = defineStore('userinfo', () => {
  const userinfo = ref({
    name: 'Eduardo',
    age: 18,
  })
  const age = computed(() => userinfo.value.age)
  function updateAge(age: number) { userinfo.value.age = age }

  return { userinfo, age, updateAge }
})
