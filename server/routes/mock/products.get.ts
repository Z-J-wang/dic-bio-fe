import Mock from 'mockjs'

export interface ProductQuery {
  search: string
  brand?: string[]
  category_slug?: string[]
  page?: number
  page_size?: number
}

export interface Product {
  id: string
  name: string
  name_cn: string
  cas_number: string
  catalog_no: string
  formula: string
  mol_weight: number
}

const rawData: Product[] = Mock.mock({
  'list|200': [
    {
      id: '@guid',
      name: '@name',
      name_cn: '@cname',
      cas_number: '@name',
      catalog_no: '@name',
      formula: '@name',
      mol_weight: '@integer'
    }
  ]
}).list

export default defineEventHandler((event) => {
  const query = getQuery<ProductQuery>(event)
  const { page_size = 10 } = query

  return {
    count: rawData.length,
    page: 1,
    total_pages: Math.ceil(rawData.length / page_size),
    results: rawData.slice(0, page_size)
  }
})
