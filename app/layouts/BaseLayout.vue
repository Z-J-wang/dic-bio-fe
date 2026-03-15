<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import logo from '@/assets/img/logo.svg'

const localePath = useLocalePath()
const { t } = useI18n()

const items = computed<NavigationMenuItem[]>(() => [
  { label: t('general.home'), to: localePath('/') },
  { label: t('productCategory'), to: localePath('/product') },
  { label: t('brandAgent'), to: localePath('/agent') },
  { label: t('general.aboutUs'), to: localePath('/about') }
])
</script>

<template>
  <UApp>
    <section
      class="flex h-8 items-center justify-center gap-2 bg-[#0f2a5e] px-6 py-1.5 text-xs tracking-wider text-[#ffffff99]"
    >
      <div>全国服务热线：<span class="text-white">0755-XXXX-XXXX</span></div>
      <USeparator orientation="vertical" class="h-7/10" />
      <div>超过 <span class="text-white">100,000+</span> 种对照品与标准品</div>
      <USeparator orientation="vertical" />
      <div>医药 · 生化 · 工业实验检测</div>
    </section>

    <UHeader
      :to="localePath('/')"
      toggle-side="left"
      :ui="{
        root: 'bg-[#f5f7fa]',
        container: 'gap-10',
        left: 'flex-none!',
        right: 'gap-2'
      }"
    >
      <template #title>
        <div class="flex items-center gap-2.75">
          <div class="flex h-10 w-10 items-center justify-center rounded-[5px] bg-[#0f2a5e]">
            <img :src="logo" alt="logo" class="h-5.5 w-5.5" />
          </div>
          <div class="leading-[1.2]">
            <p class="font-serif text-base">{{ t('blcBio', 1, { locale: 'zh-CN' }) }}</p>
            <p class="font-mono text-[8.5px] font-normal! tracking-[0.06em] text-muted">
              {{ t('blcBio', 1, { locale: 'en' }) }}
            </p>
          </div>
        </div>
      </template>

      <UNavigationMenu
        :items="items"
        :ui="{
          link: 'px-3.5'
        }"
      />

      <template #right>
        <UButton class="cursor-pointer px-4.5 py-2" to="">🔍 产品检索</UButton>
        <UButton class="cursor-pointer bg-(--navy-mid) px-4.5 py-2 hover:bg-(--navy)" to="">💬 在线客服</UButton>
      </template>

      <template #body>
        <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
      </template>
    </UHeader>

    <UMain>
      <slot />
    </UMain>

    <GlobalContact />

    <BaseFooter />
  </UApp>
</template>
