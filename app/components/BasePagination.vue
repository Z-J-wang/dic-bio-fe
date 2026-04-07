<script setup lang="ts">
/**
 * @description 基础分页组件
 * 使用此组件时需确保插件 @nuxt/ui 在 nuxt.config.ts 配置文件中的modules选项中注册，
 * 并且位于所有模块的前面
 */
import type { PaginationProps } from '@nuxt/ui'

export type BasePagination = PaginationProps & {
  itemsPerPageOptions?: number[]
  openAll?: boolean
  showItemsPerPage?: boolean
}

const props = withDefaults(defineProps<BasePagination>(), {
  as: 'div',
  showControls: true,
  showItemsPerPage: true,
  itemsPerPageOptions: () => [10, 20, 50, 100],
  openAll: false,
  ui: () => ({ first: 'hidden', last: 'hidden' })
})

defineEmits(['update:page', 'update:items-per-page'])

const { t } = useI18n()
const perPage = ref(10)
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

const itemButtonClass = computed(() => {
  const classList = {
    xs: 'text-xs p-1',
    sm: 'text-xs p-1.5',
    md: 'text-sm p-1.5',
    lg: 'text-sm p-2',
    xl: 'text-base p-2'
  }
  const size = props.size || 'md'

  return classNameMerge(classList[size], classList[size])
})

const labelClass = computed(() => {
  const classname = 'min-w-5 text-center'

  return classNameMerge(classname, props.ui.label)
})
</script>

<template>
  <div class="flex w-full flex-col items-end gap-2 lg:flex-row lg:items-center lg:justify-end">
    <USeparator class="hidden lg:block" orientation="vertical" />
    <UPagination v-bind="props" @update:page="(page) => $emit('update:page', page)">
      <template #item="{ item }">
        <UButton
          v-if="item.type === 'page'"
          :class="itemButtonClass"
          :variant="item.value === props.page ? 'solid' : 'outline'"
          :color="item.value === props.page ? 'primary' : 'neutral'"
        >
          <span :class="labelClass">{{ item.value.toLocaleString() }}</span>
        </UButton>
      </template>
    </UPagination>
    <USeparator v-if="props.showItemsPerPage" class="hidden lg:block" orientation="vertical" />
    <div v-if="props.showItemsPerPage" class="flex w-full items-center justify-between lg:w-auto">
      <div class="space-x-2">
        <span>{{ t('show') }}</span>
        <USelect
          v-model="perPage"
          :items="itemsPerPageOptions"
          :ui="{ content: 'min-w-fit' }"
          @update:model-value="
            (pageSize) => $emit('update:items-per-page', pageSize === 'all' ? props.total : pageSize)
          "
        />
      </div>
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
