import Mock from 'mockjs'

export interface BrandQuery {
  category?: string
  search?: string
  page?: number
  page_size?: number
}

export interface Brand {
  id: string
  name: string
  name_cn: string
  description: string
  category: string
  logo_url: string
  is_authorized: boolean
}

export default defineEventHandler(() => {
  return {
    count: 20,
    page: 1,
    total_pages: 1,
    results: Mock.mock({
      'list|20': [
        {
          id: '@guid',
          name: '@name',
          name_cn: '@cname',
          description: '@paragraph',
          category: '@pick(["pharmacopeia", "international", "commercial","domestic","custom"])',
          logo_url: '@image',
          is_authorized: '@boolean'
        }
      ]
    }).list
  }
})
