<script setup lang="ts"></script>

<template>
  <section class="border-b border-(--line) bg-white">
    <UContainer>
      <ul class="global-breadcrumb flex">
        <li class="breadcrumb-item">
          <NuxtLinkLocale to="/">← 返回首页</NuxtLinkLocale>
        </li>
        <li class="breadcrumb-item active"><slot></slot></li>
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
