<script setup lang="tsx">
const { search, total, brands, categories, brandsName, categoriesName, brandOptions, categoryOptions } =
  toRefs(useProductFilters())
const condition = computed(() => {
  let cond = []
  if (search.value) cond.push(search.value)
  if (brands.value.length) cond = [...cond, ...brandsName.value]
  if (categories.value.length) cond = [...cond, ...categoriesName.value]

  return cond.join(' / ')
})
</script>

<template>
  <div>
    <GlobalBreadcrumb>产品目录</GlobalBreadcrumb>
    <UContainer class="space-y-15 py-15">
      <div class="flex gap-8">
        <aside class="min-w-65 space-y-4">
          <div class="rounded-lg border border-(--line) bg-(--card) p-5">
            <h3 class="mb-3.5 text-[13px] font-bold">快速搜索</h3>
            <UInput v-model="search" size="lg" placeholder="名称 / CAS号 / 货号" />
          </div>

          <div class="space-y-4 rounded-lg border border-(--line) bg-(--card) p-5">
            <h3 class="mb-3.5 text-[13px] font-bold">筛选条件</h3>
            <ProductCheckoutController
              v-model="brands"
              label="品牌"
              :items="brandOptions"
              label-key="name_cn"
              value-key="slug"
            />

            <ProductCheckoutController
              v-model="categories"
              label="产品类别"
              :items="categoryOptions"
              label-key="name_cn"
              value-key="slug"
            />
          </div>
        </aside>
        <main class="flex-1">
          <div class="text-sm text-muted">
            共找到 <span class="font-bold text-default">{{ total.toLocaleString() }}</span> 条产品<span
              v-if="search || brands.length || categories.length"
            >
              · 已筛选：{{ condition }}</span
            >
          </div>
          <USeparator :ui="{ border: 'border-(--line)', root: 'mt-6 mb-5.5' }" />
          <ProductTable class="w-full" :search="search" :brands="brands" :categories="categories" />
        </main>
      </div>
    </UContainer>
  </div>
</template>
