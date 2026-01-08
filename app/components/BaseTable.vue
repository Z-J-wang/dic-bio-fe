<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/vue-table'
import type { TableProps, ButtonProps } from '@nuxt/ui'

export type Pagination = {
  pageIndex: number
  pageSize: number
  total: number
}

type BaseTable = Pick<TableProps, 'ui' | 'loading' | 'sticky' | 'columns' | 'data'> & {
  lazy?: boolean
  dense?: boolean
  separator?: 'cells' | 'rows' | 'none'
  topClassName?: string
  globalFilterOption?: false | { placeholder?: string; clearable?: boolean }
  downloadBtn?: boolean | ButtonProps
  fetchData?: () => Promise<unknown>
}
const { t } = useI18n()

const props = withDefaults(defineProps<BaseTable>(), {
  lazy: false,
  loading: false,
  dense: false,
  topClassName: 'flex justify-between items-center',
  globalFilterOption: () => ({ clearable: true }),
  downloadBtn: false,
  sticky: 'header',
  separator: 'cells',
  ui: () => {
    return { root: 'max-h-[70vh]' }
  }
})

const tableProps = computed(() => {
  return Object.keys(props).reduce((acc, key) => {
    // 排除不属于 TableProps 的属性
    if (!['separator', 'lazy', 'topClassName', 'globalFilterOption', 'downloadBtn', 'fetchData'].includes(key)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      acc[key] = props[key]
    }
    return acc
  }, {} as TableProps)
})

const tableUiConfig = computed(() => {
  const tableStyleless: Record<string, string> = {
    th: 'text-lg',
    td: 'text-base'
  }
  if (props.separator === 'none') {
    Object.assign(tableStyleless, {
      tr: 'bg-white border-b-0'
    })
  } else if (props.separator === 'rows') {
    Object.assign(tableStyleless, {
      tr: 'group',
      thead: '[&>tr]:bg-slate-100',
      td: 'group-odd:bg-white group-even:bg-slate-100 text-base'
    })
  } else if (props.separator === 'cells') {
    Object.assign(tableStyleless, {
      thead: '[&>tr]:bg-slate-100',
      tr: 'group',
      th: 'text-lg [&+th]:shadow-[1px_0_0_0_#e2e8f0_inset] border-b',
      td: 'group-odd:bg-white group-even:bg-slate-100 text-base [&+td]:shadow-[1px_0_0_0_#e2e8f0_inset]'
    })
  }

  if (props.dense) {
    tableStyleless.th = tableStyleless.th ? `${tableStyleless.th} p-2` : 'p-2'
    tableStyleless.td = tableStyleless.td ? `${tableStyleless.td} p-2` : 'p-2'
  }

  const mergeTableStyleless = {
    root: 'max-h-[70vh] ', // 设置默认最大高度
    ...tableProps.value.ui
  }

  Object.keys(tableStyleless).forEach((k) => {
    const key = k as keyof typeof mergeTableStyleless
    const prev = mergeTableStyleless[key]
    const curStr = tableStyleless[k] || ''
    mergeTableStyleless[key] = [prev, curStr].filter(Boolean).join(' ')
  })

  mergeTableStyleless.root = mergeTableStyleless.root + ' border border-(--ui-border) flex-1 w-0' // 强制表格宽度自适应父容器

  return mergeTableStyleless
})

const downloadBtnConfig = computed(() => {
  const defaultConfig: ButtonProps = {
    icon: 'i-lucide-download',
    size: 'md',
    color: 'primary',
    variant: 'solid',
    label: t('general.download'),
    ui: {
      base: 'cursor-pointer',
      leadingIcon: 'size-4 font-bold'
    }
  }
  if (props.downloadBtn === false) {
    return false
  }

  if (props.downloadBtn === true) {
    return defaultConfig
  }
  return {
    ...defaultConfig,
    ...props.downloadBtn
  }
})

const pagination = defineModel<Pagination>('pagination', {
  default: () => ({
    pageIndex: 0,
    pageSize: 10,
    total: 0
  })
})

const filter = defineModel<string>('filter', {
  default: ''
})

const table = useTemplateRef('table')

// 内部分页数据, 仅在关闭 lazy 模式使用
const innerPagination = useState<Omit<Pagination, 'total'>>('innerPagination', () => ({
  pageIndex: 0,
  pageSize: 10
}))

if (props.lazy) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fetchData = typeof props.fetchData === 'function' ? props.fetchData : (searchKeyword: string = '') => {}
  watch([() => pagination.value.pageIndex, () => pagination.value.pageSize, () => filter.value], async () => {
    fetchData(filter.value)
  })
  watch(
    () => filter.value,
    async () => {
      pagination.value.pageIndex = 1
      fetchData(filter.value)
    }
  )
  onMounted(() => {
    if (typeof fetchData === 'function') {
      fetchData(filter.value)
    }
  })
} else {
  onMounted(() => {
    // 首次加载时,根据pagination初始化分页数据
    const { pageIndex, pageSize } = pagination.value
    innerPagination.value = {
      pageIndex: pageIndex === 0 ? pageIndex : pageIndex - 1,
      pageSize: pageSize
    }
  })
}
</script>

<template>
  <div class="w-full space-y-4 pb-4">
    <div :class="topClassName">
      <slot name="global-filter">
        <UInput
          v-if="globalFilterOption"
          v-model.lazy="filter"
          leading-icon="lucide:search"
          size="xl"
          :placeholder="globalFilterOption.placeholder || t('search')"
          :ui="{
            base: 'min-w-xs'
          }"
        >
          <template v-if="globalFilterOption.clearable" #trailing>
            <UButton
              v-if="filter"
              color="neutral"
              variant="link"
              class="cursor-pointer"
              icon="lucide:x"
              aria-label="clear search input"
              @click="filter = ''"
            />
          </template>
        </UInput>
      </slot>
      <slot name="download-btn">
        <UButton v-if="downloadBtn" aria-label="download" v-bind="downloadBtnConfig" />
      </slot>
    </div>
    <div v-if="lazy">
      <!-- Lazy 模式的表格 -->
      <div class="w-full flex overflow-auto rounded">
        <UTable
          ref="table"
          class="flex-1 w-0"
          v-bind="tableProps"
          :loading="loading"
          :ui="tableUiConfig"
          :empty="t('table.noData')"
        >
          <template #empty>
            <slot name="empty"></slot>
          </template>
        </UTable>
      </div>
      <div v-if="pagination.total > pagination.pageSize" class="flex justify-end border-t border-default pt-4 px-4">
        <BasePagination
          show-edges
          :page="pagination.pageIndex"
          :items-per-page="pagination.pageSize"
          :total="pagination.total"
          @update:page="(page) => (pagination.pageIndex = page)"
          @update:items-per-page="(pageSize) => (pagination.pageSize = pageSize)"
        />
      </div>
    </div>
    <div v-else>
      <!-- 非 Lazy 模式的表格 -->
      <div class="w-full flex overflow-auto rounded">
        <UTable
          ref="table"
          v-model:pagination="innerPagination"
          v-model:global-filter="filter"
          class="flex-1 w-0"
          v-bind="tableProps"
          :ui="tableUiConfig"
          :empty="t('table.noData')"
          :pagination-options="{
            getPaginationRowModel: getPaginationRowModel()
          }"
        >
          <template #empty>
            <slot name="empty"></slot>
          </template>
        </UTable>
      </div>

      <div v-if="pagination.total > pagination.pageSize" class="flex justify-end border-t border-default pt-4 px-4">
        <BasePagination
          show-edges
          :page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
          :items-per-page="table?.tableApi?.getState().pagination.pageSize"
          :total="table?.tableApi?.getFilteredRowModel().rows.length"
          @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
          @update:items-per-page="(pageSize) => table?.tableApi?.setPageSize(pageSize)"
        />
      </div>
    </div>
  </div>
</template>

<i18n lang="yaml">
en:
  search: 'Search Keywords'
</i18n>
