import type { StatsBrand, StatsCategory, StatsProductResponse } from '~~/server/routes/mock/products/stats.get'

export function useProductFilters() {
  const search = useState('product-search', () => '')
  const total = useState('product-total', () => 0)
  const brands = useState('product-brands', () => [])
  const categories = useState('product-categories', () => [])
  const brandOptions = useState<StatsBrand[]>('product-brand-options', () => [])
  const categoryOptions = useState<StatsCategory[]>('product-category-options', () => [])

  const brandsName = computed(() =>
    brands.value.map((brand) => brandOptions.value.find((b) => b.slug === brand)?.name_cn)
  )
  const categoriesName = computed(() =>
    categories.value.map((category) => categoryOptions.value.find((c) => c.slug === category)?.name_cn)
  )
  watch([() => search, () => brands, () => categories], async () => {
    await getProductsStats()
  })

  onMounted(async () => {
    await getProductsStats(true)
  })

  async function getProductsStats(init: boolean = false) {
    const params = {
      search: search.value,
      brand: brands.value.join(','),
      category_slug: categories.value.join(',')
    }
    const { status, data } = await useCustomFetch<StatsProductResponse>('/products/stats', {
      method: 'GET',
      params: !init ? params : {}
    })

    if (status.value === 'success' && data.value) {
      total.value = data.value.total
      brandOptions.value = data.value.by_brand
      categoryOptions.value = data.value.by_category
    }
  }

  return {
    search,
    total,
    brands,
    categories,
    brandsName,
    categoriesName,
    brandOptions,
    categoryOptions
  }
}
