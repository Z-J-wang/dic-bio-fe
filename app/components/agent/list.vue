<script setup lang="ts">
import type { Brand, BrandQuery } from '~~/server/routes/mock/brands.get'

const activeCategory = ref('all')
const brandCategory = useState('brand-agent-page-category', () => [
  { label: '全部品牌', value: 'all' },
  { label: '药典标准', value: 'pharmacopeia' },
  { label: '国际机构', value: 'international' },
  { label: '商业标准', value: 'commercial' },
  { label: '国内品牌', value: 'domestic' }
])
const brandsList = ref<Brand[]>([])
const page = ref(1)
const totalPages = ref(1)
const total = ref(0)
const loading = useLoading()
const route = useRoute()

watch(activeCategory, () => {
  page.value = 1
  brandsList.value = []
  getData()
})

onMounted(() => {
  loading.open()
  getData(true).finally(() => {
    loading.close()
  })
})

function convertCategoryClass(category: string) {
  const baseClass = 'rounded-4xl px-5.5 py-2.5 text-[13px] font-semibold border-[2px] cursor-pointer'
  const defaultClass = 'text-muted border-(--line)! bg-white! text-[13px]'
  const activeClass = 'text-white border-(--blue) bg-(--blue)!'
  return classNameMerge(baseClass, activeCategory.value === category ? activeClass : defaultClass)
}

function updatePage(newPage: number) {
  console.log('Page changed to:', newPage)
  page.value = newPage
  getData()
}

async function getData(init: boolean = false) {
  const params: BrandQuery = { page: page.value }
  const q = route.query.query as string
  if (init && q) {
    params.search = q
  }
  if (activeCategory.value !== 'all') {
    params.category = activeCategory.value
  }
  const res = await useCustomFetch<ResponsePaginationData<Brand>>('/brands/', {
    params
  })

  const results = res.data.value?.results
  const total_pages = res.data.value?.total_pages
  const count = res.data.value?.count
  if (results) {
    brandsList.value = results
  }
  if (total_pages) {
    totalPages.value = total_pages
  }
  if (count) {
    total.value = count
  }
}
</script>

<template>
  <section>
    <UContainer class="py-5 sm:pt-15 sm:pb-0">
      <ul class="mb-11 hidden items-center gap-2.5 sm:flex">
        <li v-for="item in brandCategory" :key="item.value">
          <UButton :class="convertCategoryClass(item.value)" @click="activeCategory = item.value">{{
            item.label
          }}</UButton>
        </li>
      </ul>

      <div class="grid grid-cols-1 gap-2 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
        <div v-for="item in brandsList" :key="item.id" class="card">
          <div class="mb-4 flex items-center gap-4">
            <div><img :src="item.logo_url" class="h-14 w-14 rounded-[10px]" /></div>
            <div>
              <h3 class="text-[15px] font-bold">{{ item.name_cn }}</h3>
              <p class="mt-0.5 font-mono text-[11px] text-muted">{{ item.name }}</p>
            </div>
          </div>
          <div class="mb-3.5 line-clamp-2 text-[13px] tracking-[1.8] text-muted sm:line-clamp-3">
            {{ item.description }}
          </div>
          <div class="flex gap-1.5">
            <UBadge
              v-for="tag in item.tags"
              :key="tag"
              :label="tag"
              variant="soft"
              color="primary"
              :ui="{ base: 'rounded-sm' }"
            />
            <UBadge
              v-if="item.is_authorized"
              label="✓ 授权代理"
              variant="soft"
              color="secondary"
              :ui="{ base: 'rounded-sm' }"
            />
          </div>
        </div>
      </div>
      <div v-if="totalPages > 1" class="mt-9 flex justify-center">
        <UPagination v-model:page="page" :items-per-page="20" :total="total" size="lg" @update:page="updatePage" />
      </div>
    </UContainer>
  </section>
</template>

<style lang="less" scoped>
.card {
  border: 1.5px solid var(--line);
  border-radius: 12px;
  padding: 28px 24px;
  background-color: white;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    border-color: var(--blue);
    transform: translateY(-3px);
    box-shadow: 0 8px 32px rgb(16 80 208 / 14%);
  }
}
</style>
