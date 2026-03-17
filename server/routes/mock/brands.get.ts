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

const rawData: Brand[] = Mock.mock({
  'list|200': [
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

export default defineEventHandler((event) => {
  const query = getQuery<BrandQuery>(event)
  console.log(query)
  const filteredData = rawData.filter((item) => {
    return (!query.category || item.category === query.category) && (!query.search || item.name.includes(query.search))
  })
  return {
    count: filteredData.length,
    page: 1,
    total_pages: Math.ceil(filteredData.length / 20),
    results: filteredData.slice(0, 20)
  }
})
