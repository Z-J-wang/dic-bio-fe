<script setup lang="ts">
const categories = useState('home-product-categories', () => [
  { name: '医药对照品', description: '45,000+ 种 · CP/EP/USP/BP', icon: '💊', class: 'bg-(--tag-bg)', to: '/' },
  { name: '生化标准品', description: '28,000+ 种 · 酶、蛋白、核酸', icon: '🧬', class: 'bg-[#e6f9f3]', to: '/' },
  { name: '杂质对照品', description: '18,000+ 种 · 高纯度有机化合物', icon: '⚗️', class: 'bg-[#fff8e6]', to: '/' },
  { name: '无机标准品', description: '9,000+ 种 · 金属离子、盐类', icon: '🔬', class: 'bg-[#fef2f0]', to: '/' },
  { name: '工业检测标准', description: '6,500+ 种 · 环境、材料、食品', icon: '🏭', class: 'bg-(--tag-bg)', to: '/' },
  { name: '认证参考物质', description: '3,500+ 种 · NIST/ERM/CRM', icon: '📋', class: 'bg-[#e6f9f3]', to: '/' },
  { name: '植物提取物', description: '12,000+ 种 · 天然产物、中药材', icon: '🌿', class: 'bg-[#fff8e6]', to: '/' },
  { name: '农兽药残留标准', description: '8,000+ 种 · 农药、兽药检测', icon: '⚡', class: 'bg-[#fef2f0]', to: '/' }
])
</script>

<template>
  <section>
    <UContainer class="py-5 md:py-18">
      <div class="mb-4 flex items-baseline gap-2 md:mb-10">
        <h2 class="font-serif text-lg font-bold sm:text-[1.625rem]">产品分类</h2>
        <span class="hidden text-sm text-muted sm:block">按应用场景快速定位所需标准品</span>
        <NuxtLinkLocale class="ml-auto text-sm font-medium text-(--blue) hover:underline" to="/"
          >查看全部产品 →</NuxtLinkLocale
        >
      </div>

      <ul class="grid grid-cols-3 gap-2 lg:grid-cols-4 lg:gap-4">
        <li v-for="item in categories" :key="item.name" class="cat-card p-4 text-center sm:p-[24px_20px] sm:text-left">
          <div
            class="mx-auto mb-3.5 flex h-11 w-11 items-center justify-center rounded-lg text-2xl sm:mx-0"
            :class="item.class"
          >
            {{ item.icon }}
          </div>
          <div class="mb-1.25 font-bold">{{ item.name }}</div>
          <div class="hidden text-sm text-muted sm:block">{{ item.description }}</div>
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
