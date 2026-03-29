<script setup lang="tsx">
import type { Product, ProductQuery } from '~~/server/routes/mock/products.get'

const search = ref('')
const total = ref(0)
const pageIndex = ref(1)
const products = ref<Product[]>([])

async function fetchData() {
  const params: ProductQuery = {}
  params.search = search.value

  const { status, data } = await useCustomFetch<ResponsePaginationData<Product>>('/products/', {
    params,
    banNuxtCache: true
  })

  if (status.value === 'success' && data.value) {
    total.value = data.value.count
    products.value = data.value.results
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <UContainer>
    <UFieldGroup class="mb-5 w-full bg-transparent">
      <UInput
        v-model.trim="search"
        placeholder="名称 / CAS号 / 货号..."
        :ui="{ root: 'flex-1 w-full', base: 'h-10' }"
      />
      <UButton class="cursor-pointer bg-(--blue) px-7 text-lg text-white hover:bg-(--blue-br)" @click="fetchData"
        >🔍</UButton
      >
    </UFieldGroup>

    <div class="mb-3 text-[13px] text-muted">
      共找到 <span class="font-bold text-default">{{ total.toLocaleString() }}</span> 条产品
    </div>

    <div class="space-y-2.5">
      <NuxtLinkLocale
        v-for="product in products"
        :key="product.id"
        class="m-prod-card block"
        :to="'/product/' + product.id"
      >
        <div class="mb-2 flex items-start justify-between gap-2">
          <div>
            <div class="mb-0.5 text-sm font-bold">{{ product.name }}</div>
            <div class="font-mono text-[11px] text-muted">{{ product.name_en }}</div>
          </div>
          <div>
            <UBadge class="prod-brand-badge">{{ product.brand_name }}</UBadge>
          </div>
        </div>
        <div class="mb-2 flex items-center gap-2.5">
          <UBadge class="m-cas-label">CAS</UBadge
          ><span class="font-mono text-xs font-semibold">{{ product.cas_number }}</span
          ><span class="font-mono text-[11px] text-muted">{{ product.formula }}</span>
        </div>
        <div class="flex items-center justify-end">
          <div class="text-xs font-semibold text-(--blue)">查看详情 →</div>
        </div>
      </NuxtLinkLocale>
    </div>
    <div class="my-5 flex justify-center">
      <UPagination
        show-edges
        :sibling-count="1"
        :page="pageIndex"
        :items-per-page="10"
        :total="total"
        @update:page="(page) => (pageIndex = page)"
      />
    </div>
  </UContainer>
</template>

<style lang="less" scoped>
.m-prod-card {
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 14px;
  background: #ffffff;
  transition: 0.15s;
  cursor: pointer;
}

.prod-brand-badge {
  border-radius: 4px;
  padding: 2px 7px;
  font-size: 10px;
  font-family: 'DM Mono', monospace;
  font-weight: 700;
  color: var(--tag-txt);
  background: var(--tag-bg);
  flex-shrink: 0;
}

.m-cas-label {
  border-radius: 3px;
  padding: 2px 6px;
  font-size: 10px;
  font-family: 'DM Mono', monospace;
  color: #ffffff;
  background: var(--navy);
}
</style>
