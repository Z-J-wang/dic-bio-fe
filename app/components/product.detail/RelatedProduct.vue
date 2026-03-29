<script setup lang="ts">
import type { Product } from '~~/server/routes/mock/products.get'

const props = defineProps<{ productId: string }>()

const products = ref<Product[]>([])

async function fetchData() {
  const { status, data } = await useCustomFetch<Product[]>(`/products/${props.productId}/related/`)

  if (status.value === 'success' && data.value) {
    products.value = data.value
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <h2 class="mb-4 text-lg font-bold">相关产品</h2>
  <div class="grid grid-cols-3 gap-2.5 sm:grid-cols-1 sm:gap-3.5 md:grid-cols-3">
    <NuxtLinkLocale
      v-for="(item, i) in products"
      :key="i"
      :to="'/product/' + item.id"
      class="related-card p-2.5 sm:p-4"
    >
      <div class="related-name">{{ item.name }}</div>
      <div class="related-cas font-mono text-[10px] sm:text-[11px]">CAS {{ item.cas_number }}</div>
      <div class="flex items-center justify-between">
        <span class="related-brand">{{ item.brand_name }}</span>
        <span class="text-xs text-(--blue)">查看 →</span>
      </div>
    </NuxtLinkLocale>
  </div>
</template>

<style lang="less" scoped>
.related-card {
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--card);
  transition: 0.15s;
  cursor: pointer;

  .related-name {
    margin-bottom: 4px;
    font-size: 13px;
    font-weight: 600;
  }

  .related-cas {
    margin-bottom: 8px;
    color: var(--muted);
  }

  .related-brand {
    border-radius: 3px;
    padding: 2px 8px;
    font-size: 11px;
    font-family: 'DM Mono', monospace;
    font-weight: 700;
    color: var(--tag-txt);
    background: var(--tag-bg);
  }
}
</style>
