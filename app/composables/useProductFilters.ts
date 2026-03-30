import type { StatsBrand, StatsCategory, StatsProductResponse } from '~~/server/routes/mock/products/stats.get'

export function useProductFilters() {
  const search = ref('')
  const total = ref(0)
  const brands = ref<string[]>([])
  const categories = ref<string[]>([])
  const brandOptions = ref<StatsBrand[]>([])
  const categoryOptions = ref<StatsCategory[]>([])
  const loading = useLoading()

  const brandsName = computed(() =>
    brands.value.map((brand) => brandOptions.value.find((b) => b.slug === brand)?.name_cn)
  )
  const categoriesName = computed(() =>
    categories.value.map((category) => categoryOptions.value.find((c) => c.slug === category)?.name)
  )
  watch(
    [() => search.value, () => brands.value, () => categories.value],
    () => {
      setTimeout(() => {
        getProductsStats()
      }, 100)
    },
    { deep: true }
  )

  onMounted(() => {
    getProductsStats(true)
  })

  async function getProductsStats(init: boolean = false) {
    loading.open()
    const params: Record<string, string> = {
      search: search.value
    }

    if (categories.value.length) params.category_slug = categories.value.join(',')
    if (brands.value.length) params.brand = brands.value.join(',')

    try {
      const { status, data } = await useCustomFetch<StatsProductResponse>('/products/stats/', {
        method: 'GET',
        params: !init ? params : {}
      })

      if (status.value === 'success' && data.value) {
        total.value = data.value.total
        if (init) {
          brandOptions.value = data.value.by_brand
          categoryOptions.value = data.value.by_category.map(({ icon, ...rest }) => rest as StatsCategory)
        } else {
          brandOptions.value.forEach((option) => {
            option.count = data.value?.by_brand.find((b) => b.slug === option.slug)?.count || 0
          })
          categoryOptions.value.forEach((option) => {
            option.count = data.value?.by_category.find((c) => c.slug === option.slug)?.count || 0
          })
        }
      }
    } finally {
      loading.close()
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
