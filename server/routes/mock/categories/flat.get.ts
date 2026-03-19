import Mock from 'mockjs'
import type { Category } from '../categories.get'

const rawData: Category[] = Mock.mock({
  'list|8': [
    {
      id: '@guid',
      name: '@name',
      name_cn: '@cname',
      slug: '@name',
      icon: '💊'
    }
  ]
}).list

export default defineEventHandler(() => {
  return rawData
})
