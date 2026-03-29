<script setup lang="tsx">
import type { TableColumn } from '@nuxt/ui'
import type { Product, ProductQuery } from '~~/server/routes/mock/products.get'
import { UBadge, UButton } from '#components'

export interface ProductTableProps {
  search: string
  brands: string[]
  categories: string[]
}
export type Pagination = {
  pageIndex: number
  pageSize: number
  total: number
}

const props = defineProps<ProductTableProps>()

const tableData = ref<Product[]>([])
const pagination = ref<Pagination>({
  pageIndex: 1,
  pageSize: 10,
  total: 0
})
const columns: TableColumn<Product>[] = [
  {
    accessorKey: 'name',
    header: '产品名称',
    cell: ({ row }) => (
      <div class="space-y-0.5">
        <div class="text-sm font-semibold text-(--navy)">{row.original.name}</div>
        <div class="font-mono text-xs text-muted">
          {row.original.name_en} · {row.original.catalog_no}
        </div>
      </div>
    )
  },
  { accessorKey: 'cas_number', header: 'CAS 号' },
  {
    accessorKey: 'brand_name',
    header: '品牌',
    cell: ({ row }) => (
      <UBadge
        variant="soft"
        ui={{ base: 'text-xs font-mono bg-(--tag-bg) text-(--tag-txt) py-0.75 px-2.25 rounded-sm font-bold' }}
      >
        {row.original.brand_name}
      </UBadge>
    )
  },
  {
    header: '分子式 / 分子量',
    cell: ({ row }) => (
      <span>
        {row.original.formula} / {row.original.mol_weight.toLocaleString()}
      </span>
    )
  },
  {
    header: '操作',
    cell: ({ row }) => (
      <UButton class="h-8 cursor-pointer px-3 text-xs" to={'/product/' + row.original.id}>
        详情
      </UButton>
    )
  }
]

watch(
  () => [props.search, props.brands, props.categories, pagination.value.pageIndex, pagination.value.pageSize],
  () => {
    fetchData()
  }
)

onMounted(() => {
  fetchData()
})

defineExpose({
  total: computed(() => pagination.value.total)
})

async function fetchData() {
  const params: ProductQuery = {
    page_size: pagination.value.pageSize,
    page: pagination.value.pageIndex
  }
  if (props.search) params.search = props.search
  if (props.categories.length) params.category_slug = props.categories
  if (props.brands.length) params.brand = props.brands

  const { status, data } = await useCustomFetch<ResponsePaginationData<Product>>('/products/', {
    params,
    banNuxtCache: true
  })

  if (status.value === 'success' && data.value) {
    pagination.value.total = data.value.count
    tableData.value = data.value.results
  }
}
</script>

<template>
  <UTable
    :columns="columns"
    :data="tableData"
    :ui="{ thead: 'bg-[#f8fafc]', th: 'font-semibold text-xs font-mono text-muted' }"
  />
  <BasePagination
    size="lg"
    show-edges
    :page="pagination.pageIndex"
    :items-per-page="pagination.pageSize"
    :total="pagination.total"
    @update:page="(page) => (pagination.pageIndex = page)"
    @update:items-per-page="(pageSize) => (pagination.pageSize = pageSize)"
  />
</template>
