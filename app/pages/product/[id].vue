<script setup lang="tsx">
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
      :breadcrumbs="[{ label: '← 返回首页', to: '/' }, { label: '产品目录', to: '/product' }, { label: '产品详情' }]"
    />
    <UContainer class="flex gap-8 py-10">
      <main class="flex-1">
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
          <h2 class="mb-1.5 text-[1.75rem] font-bold">{{ detail?.name }}</h2>
          <h3 class="mb-4 font-mono text-muted">{{ detail?.name_en }}</h3>
          <ul class="flex gap-4">
            <li class="space-x-2">
              <span class="text-sm font-semibold text-muted">CAS No.</span
              ><UBadge class="rounded-sm bg-(--tag-bg) px-3 py-1 text-base text-(--blue)">{{
                detail?.cas_number
              }}</UBadge>
            </li>
            <li class="space-x-2">
              <span class="text-sm font-semibold text-muted">货号：</span
              ><UBadge class="rounded-sm bg-(--tag-bg) px-3 py-1 text-base text-(--blue)">{{
                detail?.catalog_no
              }}</UBadge>
            </li>
          </ul>
        </section>
      </main>
      <aside class="w-90 shrink-0">asadda</aside>
    </UContainer>
  </div>
</template>
