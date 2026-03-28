<script setup lang="tsx">
import { ProductDetailRelatedProduct } from '#components'
import type { ProductDetail } from '~~/server/routes/mock/products/[id].get'

definePageMeta({ name: 'ProductDetail', props: true })
const props = defineProps<{ id: string }>()
const detail = ref<ProductDetail>()

async function fetchData() {
  const { status, data } = await useCustomFetch<ProductDetail>('/products/' + props.id)
  const resData = data.value
  if (status.value === 'success' && resData) {
    detail.value = resData
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div>
    <GlobalBreadcrumb
      class="hidden sm:block"
      :breadcrumbs="[{ label: '← 返回首页', to: '/' }, { label: '产品目录', to: '/product' }, { label: '产品详情' }]"
    />
    <UContainer class="flex gap-8 py-5 sm:py-10">
      <main class="flex-1">
        <UBreadcrumb
          :items="[{ label: '首页', to: '/' }, { label: '产品目录', to: '/product' }, { label: '产品详情' }]"
          separator-icon="lucide:chevron-right"
          :ui="{ root: 'mb-3.5', separator: 'text-[8px]' }"
        />
        <section>
          <div class="mb-3 space-x-2">
            <UBadge class="rounded-sm bg-(--navy) py-1 font-mono font-semibold text-white"
              >{{ detail?.brand.name_cn }} {{ detail?.brand.name }}</UBadge
            >
            <UBadge class="rounded-sm bg-(--tag-bg) py-1 font-mono font-semibold text-(--tag-txt)">{{
              detail?.category.name
            }}</UBadge>
            <UBadge v-if="detail?.coa_url" class="rounded-sm bg-[#e6f9f3] py-1 font-mono font-semibold text-secondary"
              >✓ 附 CoA 证书</UBadge
            >
          </div>
          <h2 class="mb-1.5 text-[1.25rem] font-bold sm:text-[1.75rem]">{{ detail?.name }}</h2>
          <h3 class="mb-4 font-mono text-xs text-muted sm:text-base">{{ detail?.name_en }}</h3>
          <ul class="flex gap-4">
            <li class="space-x-2">
              <span class="text-xs font-semibold text-muted sm:text-sm">CAS No.</span
              ><UBadge
                class="rounded-sm bg-(--tag-bg) px-1.5 py-0.5 text-sm text-(--blue) sm:px-3 sm:py-1 sm:text-base"
                >{{ detail?.cas_number }}</UBadge
              >
            </li>
            <li class="space-x-2">
              <span class="text-xs font-semibold text-muted sm:text-sm">货号：</span
              ><UBadge
                class="rounded-sm bg-(--tag-bg) px-1.5 py-0.5 text-sm text-(--blue) sm:px-3 sm:py-1 sm:text-base"
                >{{ detail?.catalog_no }}</UBadge
              >
            </li>
          </ul>
        </section>

        <section class="mt-4 sm:mt-7">
          <div class="data-card">
            <div class="data-card-header">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" stroke-width="2.5">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
              <span class="data-card-title">核心技术参数</span>
            </div>
            <div class="data-grid grid grid-cols-2 sm:grid-cols-3">
              <div class="data-cell">
                <div class="data-cell-label">分子量 MW</div>
                <div class="data-cell-value text-sm sm:text-[15px]">{{ detail?.mol_weight }} g/mol</div>
              </div>
              <div class="data-cell">
                <div class="data-cell-label">分子式</div>
                <div class="data-cell-value text-sm sm:text-[15px]">{{ detail?.formula }}</div>
              </div>
              <div class="data-cell">
                <div class="data-cell-label">外观</div>
                <div class="data-cell-value text-sm sm:text-[15px]">{{ detail?.appearance }}</div>
              </div>
            </div>
          </div>
        </section>

        <section class="mt-5">
          <ProductDetailTabs v-if="detail" :detail="detail" />
        </section>

        <section class="mt-5">
          <ProductDetailRelatedProduct v-if="detail" :product-id="detail?.id" />
        </section>
      </main>
      <aside class="hidden w-90 shrink-0 sm:block">
        <ProductDetailAside v-if="detail" :detail="detail" />
      </aside>
    </UContainer>
  </div>
</template>

<style lang="less" scoped>
.data-card {
  overflow: hidden;
  margin-bottom: 20px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--card);

  .data-card-header {
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--line);
    padding: 14px 20px;
    background: #f8fafc;
    gap: 10px;

    .data-card-title {
      font-size: 13px;
      font-weight: 700;
      color: var(--navy);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
  }

  .data-grid {
    .data-cell {
      border-right: 1px solid var(--line);
      border-bottom: 1px solid var(--line);
      padding: 16px 20px;

      .data-cell-label {
        margin-bottom: 5px;
        font-size: 11px;
        font-weight: 600;
        color: var(--muted);
        text-transform: uppercase;
        letter-spacing: 0.06em;
      }

      .data-cell-value {
        font-family: 'DM Mono', monospace;
        font-weight: 600;
        color: var(--navy);
      }
    }
  }
}
</style>
