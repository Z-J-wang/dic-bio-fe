import Mock from 'mockjs'
import type { Brand } from '../brands.get'

const rawData: Brand[] = Mock.mock({
  'list|30': [
    {
      id: '@guid',
      name: '@name',
      name_cn: '@cname',
      description: '@paragraph',
      category: '@pick(["pharmacopeia", "international", "commercial","domestic","custom"])',
      logo_url: '@image',
      is_authorized: '@boolean',
      tags: '@pick(["pharmacopeia", "international", "commercial","domestic","custom"])'
    }
  ]
}).list

export default defineEventHandler(() => {
  return rawData
})
