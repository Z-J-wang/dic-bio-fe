<script setup lang="ts">
import type { Category } from '~~/server/routes/mock/categories.get'

const bgColor = [
  'bg-(--tag-bg)',
  'bg-[#e6f9f3]',
  'bg-[#fff8e6]',
  'bg-[#fef2f0]',
  'bg-(--tag-bg)',
  'bg-[#e6f9f3]',
  'bg-[#fff8e6]',
  'bg-[#fef2f0]'
]
const categories = ref()
const localePath = useLocalePath()

onMounted(() => {
  getCategory()
})

async function getCategory() {
  const { status, data } = await useCustomFetch<Category[]>('/categories/flat/')

  if (status.value === 'success' && data.value) {
    categories.value = data.value.map((item, i) => ({
      name: item.name,
      description: item?.description,
      icon: item.icon,
      class: bgColor[i],
      to: localePath(`/product?type=${item.slug}`)
    }))
  }
}
</script>

<template>
  <section>
    <UContainer class="py-5 md:py-18">
      <div class="mb-4 flex items-baseline gap-2 md:mb-10">
        <h2 class="font-serif text-lg font-bold sm:text-[1.625rem]">产品分类</h2>
        <span class="hidden text-sm text-muted sm:block">按应用场景快速定位所需标准品</span>
        <NuxtLinkLocale class="ml-auto text-sm font-medium text-(--blue) hover:underline" :to="localePath('/product')"
          >查看全部产品 →</NuxtLinkLocale
        >
      </div>

      <ul class="grid grid-cols-3 gap-2 lg:grid-cols-4 lg:gap-4">
        <li v-for="item in categories" :key="item.name" class="cat-card p-4 text-center sm:p-[24px_20px] sm:text-left">
          <NuxtLinkLocale :to="item.to">
            <div
              class="mx-auto mb-3.5 flex h-11 w-11 items-center justify-center rounded-lg text-2xl sm:mx-0"
              :class="item.class"
            >
              {{ item.icon }}
            </div>
            <div class="mb-1.25 font-bold">{{ item.name }}</div>
            <div v-if="item.description" class="hidden text-sm text-muted sm:block">{{ item.description }}</div>
          </NuxtLinkLocale>
        </li>
      </ul>
    </UContainer>
  </section>
</template>

<style lang="less" scoped>
.cat-card {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 8px;
  color: var(--navy);
  background: var(--card);
  transition: 0.2s;
  cursor: pointer;

  &::before {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 3px;
    background: var(--blue);
    transition: 0.2s;
    content: '';
    transform: scaleX(0);
    transform-origin: left;
  }

  &:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-2px);

    &::before {
      transform: scaleX(1);
    }
  }
}
</style>
