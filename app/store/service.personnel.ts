export interface ServicePersonnel {
  name: string
  position: string
  introduction: string
  gender: 'male' | 'female'
  status: 'active' | 'inactive'
  link: string
}

export const useServicePersonnel = defineStore('servicePersonnel', () => {
  const servicePersonnel = ref<ServicePersonnel[]>([
    {
      name: '刘经理',
      position: '技术顾问',
      gender: 'female',
      introduction: '医药对照品 / 生化标准品',
      status: 'active',
      link: 'https://wpa.qq.com/dKquLMtuC?v=1'
    },
    {
      name: '李经理',
      position: '技术顾问',
      gender: 'female',
      introduction: '医药对照品 / 生化标准品',
      status: 'active',
      link: 'https://wpa.qq.com/FFFwXKB7R?v=1'
    },
    {
      name: '崔经理',
      position: '技术顾问',
      gender: 'female',
      introduction: '医药对照品 / 生化标准品',
      status: 'active',
      link: 'https://wpa.qq.com/Un0ftxRdH?v=1'
    }
  ])

  return { servicePersonnel }
})
