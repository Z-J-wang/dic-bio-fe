<script setup lang="ts">
export interface Breadcrumb {
  label: string
  to?: string
}

defineProps<{
  breadcrumbs: Breadcrumb[]
}>()
</script>

<template>
  <section class="border-b border-(--line) bg-white">
    <UContainer>
      <ul class="global-breadcrumb flex">
        <li
          v-for="(item, i) in breadcrumbs"
          :key="i"
          class="breadcrumb-item"
          :class="{ active: i === breadcrumbs.length - 1 }"
        >
          <NuxtLinkLocale v-if="item.to" :to="item.to">{{ item.label }}</NuxtLinkLocale>
          <span v-else>{{ item.label }}</span>
        </li>

        <!-- <NuxtLinkLocale to="/">← 返回首页</NuxtLinkLocale> -->
      </ul>
    </UContainer>
  </section>
</template>

<style lang="less" scoped>
.global-breadcrumb {
  .breadcrumb-item {
    border-bottom: 2px solid transparent;
    padding: 16px 20px;
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
    color: var(--muted);
    transition: 0.15s;
    cursor: pointer;

    &.active {
      border-bottom-color: var(--blue);
      color: var(--blue);
    }
  }
}
</style>
