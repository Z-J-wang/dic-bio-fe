import type { Brand } from '../brands.get'
import type { Category } from '../categories.get'

export interface ProductSpecs {
  id: string
  package: string // 包装规格
  stock: number // 库存
  lead_time: string // 货期
}

export interface ProductDetail {
  id: string
  name: string
  name_en: string
  cas_number: string // CAS 注册号
  catalog_no: string // 货号
  brand_name: string
  formula: string // 分子式
  mol_weight: number // 分子量
  appearance: string // 外观描述
  standard: string // 标准依据
  lot_no: string // 批号
  expiry_date: string // 有效期
  storage_temp: string // 储存温度
  storage_note: string // 储存条件
  brand: Brand // 品牌
  category: Category // 分类
  specs: ProductSpecs // 规格
  thumb_url: string // 缩略图
  image_url: string // 图片
  mol_url: string // 分子结构式图片 URL
  coa_url: string // CoA 证书下载 URL（PDF）
  sds_url: string // SDS 安全数据表 URL（PDF）
  description: string // 产品描述
  notes: string // 备注
  is_featured: boolean
  view_count: number
  created_at: string
  updated_at: string
}

export default defineEventHandler(() => {
  return {
    id: 1,
    name: '咖啡因对照品',
    name_en: 'Caffeine Reference Standard',
    cas_number: '58-08-2',
    catalog_no: 'DLC-C001',
    formula: 'C₈H₁₀N₄O₂',
    mol_weight: '194.1900',
    appearance: '白色结晶粉末',
    standard: '中国药典2020版',
    lot_no: '100081-202115',
    expiry_date: '36个月',
    storage_temp: '2-8°C',
    storage_note: '密封避光保存',
    brand: {
      id: 1,
      name: 'CFDI',
      name_cn: '中国食品药品检定研究院',
      slug: 'cfdi',
      category: 'pharmacopeia',
      logo_url: null,
      country: '中国',
      is_authorized: false,
      is_active: true
    },
    category: {
      id: 1,
      name: '医药对照品',
      name_en: 'Pharmaceutical',
      slug: 'pharma',
      icon: '💊'
    },
    specs: [
      { id: 1, package: '5mg', stock: 10, lead_time: '现货' },
      { id: 2, package: '25mg', stock: 5, lead_time: '现货' },
      { id: 3, package: '100mg', stock: 2, lead_time: '5~7工作日' }
    ],
    thumb_url: 'http://{SERVER_HOST}/media/products/thumbs/xxx.webp',
    image_url: 'http://{SERVER_HOST}/media/products/images/xxx.webp',
    mol_url: null,
    coa_url: 'http://{SERVER_HOST}/media/products/coa/xxx.pdf',
    sds_url: null,
    description: '',
    notes: '',
    is_featured: true,
    view_count: 128,
    created_at: '2024-01-15T08:30:00+08:00',
    updated_at: '2024-06-20T12:00:00+08:00'
  }
})
