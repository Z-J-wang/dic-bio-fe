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
      name: '李欣',
      position: '技术顾问',
      gender: 'female',
      introduction: '医药对照品 / 生化标准品',
      status: 'active',
      link: ''
    },
    {
      name: '张磊',
      position: '销售顾问',
      gender: 'male',
      introduction: '报价咨询 / 选品建议',
      status: 'active',
      link: ''
    }
  ])

  return { servicePersonnel }
})
