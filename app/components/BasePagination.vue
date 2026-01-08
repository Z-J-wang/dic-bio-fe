<script setup lang="ts">
import type { PaginationProps } from '@nuxt/ui'

const props = withDefaults(defineProps<PaginationProps & { itemsPerPageOptions?: number[]; openAll?: boolean }>(), {
  as: 'div',
  showControls: true,
  itemsPerPageOptions: () => [10, 20, 50, 100, 500, 1000],
  openAll: false,
  ui: () => ({ first: 'hidden', last: 'hidden' })
})

defineEmits(['update:page', 'update:items-per-page'])

const { t } = useI18n()
const perPage = useState('base-pagination-items-per-page', () => 10)
const itemsPerPageOptions = computed(() => {
  const perPageOptions = props.itemsPerPageOptions.map((pageSize) => ({
    value: pageSize,
    label: t('showPageSize', [pageSize])
  }))
  return props.openAll ? [...perPageOptions, { value: 'all', label: t('all') }] : perPageOptions
})

watchEffect(() => {
  perPage.value = props.itemsPerPage || 10
})
</script>

<template>
  <div class="flex items-center gap-2">
    <div v-if="props.total">{{ t('totalCount', [props.total.toLocaleString()]) }}</div>
    <USeparator orientation="vertical" />
    <UPagination v-bind="props" @update:page="(page) => $emit('update:page', page)" />
    <USeparator orientation="vertical" />
    <div class="space-x-2">
      <span>{{ t('show') }}</span>
      <USelect
        v-model="perPage"
        :items="itemsPerPageOptions"
        :ui="{ content: 'min-w-fit' }"
        @update:model-value="(pageSize) => $emit('update:items-per-page', pageSize === 'all' ? props.total : pageSize)"
      />
    </div>
  </div>
</template>

<i18n lang="yaml">
en:
  totalCount: 'Total: {0} records'
  show: Show
  showPageSize: '{0}/Page'
  all: 'All'
'zh-CN':
  totalCount: '总记录数: {0}'
  show: 显示
  showPageSize: '{0}/条'
  all: '全部'
</i18n>
