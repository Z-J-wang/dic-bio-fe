import Mock from 'mockjs'
import type { Product } from '../../products.get'

const rawData: Product[] = Mock.mock({
  'list|6': [
    {
      id: '@guid',
      name: '@name',
      name_cn: '@cname',
      cas_number: '@name',
      catalog_no: '@word',
      brand_name: '@word(2,5)',
      formula: '@name',
      mol_weight: '@integer'
    }
  ]
}).list

export default defineEventHandler(() => {
  return rawData
})
