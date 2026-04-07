<script setup lang="tsx">
import type { CheckboxGroupProps } from '@nuxt/ui'

const props = defineProps<Pick<CheckboxGroupProps, 'items' | 'labelKey' | 'valueKey'> & { label: string }>()
const selected = defineModel<string[]>({
  required: true
})
const selectedModel = ref<string[]>([])

const options = computed(() => props.items?.slice(0, 8))

watch(
  () => selected.value,
  (val) => {
    selectedModel.value = JSON.parse(JSON.stringify(val))
  }
)

function confirm(close: () => void) {
  selected.value = [...selectedModel.value]
  close()
}
</script>

<template>
  <div class="product-checkout-controller">
    <h3 class="mb-3 text-xs font-semibold">{{ label }}</h3>
    <UCheckboxGroup
      v-model="selected"
      v-bind="props"
      :items="options"
      :ui="{ description: 'hidden', fieldset: 'gap-y-2.5' }"
    >
      <template #label="{ item }">
        <div class="flex justify-between">
          <div class="text-xm line-clamp-1">{{ item.label }}</div>
          <UBadge :ui="{ base: 'text-[11px] font-mono bg-(--tag-bg) text-(--tag-txt) py-px px-1.75 rounded-[10px]' }">{{
            item?.count.toLocaleString()
          }}</UBadge>
        </div>
      </template>
    </UCheckboxGroup>
    <UModal v-if="Array.isArray(props.items) && props.items?.length > 8" class="mt-2" :title="'全部' + label">
      <UButton
        block
        variant="soft"
        class="cursor-pointer rounded-[5px] border border-(--line) bg-[#f8fafc] text-xs font-semibold"
        >{{ '全部' + label }} ↓</UButton
      >

      <template #body>
        <UCheckboxGroup
          v-model="selectedModel"
          :items="props.items"
          :label-key="props.labelKey"
          :value-key="props.valueKey"
          :ui="{ description: 'hidden', fieldset: 'gap-y-2.5 grid grid-cols-1 md:grid-cols-2' }"
        >
          <template #label="{ item }">
            <div class="flex justify-between">
              <div class="text-xm line-clamp-1">{{ item.label }}</div>
              <UBadge
                :ui="{ base: 'text-[11px] font-mono bg-(--tag-bg) text-(--tag-txt) py-px px-1.75 rounded-[10px]' }"
                >{{ item?.count?.toLocaleString() }}</UBadge
              >
            </div>
          </template>
        </UCheckboxGroup>
      </template>
      <template #footer="{ close }">
        <UButton label="Submit" color="primary" block class="h-10 cursor-pointer" @click="confirm(close)" />
        <UButton label="Cancel" color="neutral" variant="outline" class="h-10 cursor-pointer" @click="close" />
      </template>
    </UModal>
  </div>
</template>
