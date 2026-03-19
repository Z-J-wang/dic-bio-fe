import Mock from 'mockjs'

export interface CategoryQuery {
  page?: number
  page_size?: number
}

export interface Category {
  id: string
  name: string
  name_cn: string
  slug: string
  icon: string
  sort_order?: number
}

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
  return {
    count: 8,
    page: 1,
    total_pages: 1,
    results: rawData
  }
})
