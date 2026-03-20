import Mock from 'mockjs'
import type { Brand } from '../brands.get'
import type { Category } from '../categories.get'

export interface ProductStatsQuery {
  search?: string
  brand: string
  category_slug?: string
  featured?: number
}

export interface StatsBrand extends Brand {
  count: number
}

export interface StatsCategory extends Category {
  count: number
}

const rawDataBrand: StatsBrand[] = Mock.mock({
  'list|20-50': [
    {
      id: '@guid',
      name: '@name',
      name_cn: '@cname',
      description: '@paragraph',
      category: '@pick(["pharmacopeia", "international", "commercial","domestic","custom"])',
      logo_url: '@image',
      is_authorized: '@boolean',
      count: '@integer(0, 1000)'
    }
  ]
}).list

const rawDataCategory: StatsCategory[] = Mock.mock({
  'list|20-50': [
    {
      id: '@guid',
      name: '@name',
      name_cn: '@cname',
      slug: '@name',
      icon: '💊',
      count: '@integer(0, 1000)'
    }
  ]
}).list

export default defineEventHandler(() => {
  return {
    by_category: rawDataCategory,
    by_brand: rawDataBrand,
    total: rawDataCategory.length + rawDataBrand.length
  }
})
