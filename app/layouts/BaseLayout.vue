<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import logo from '@/assets/img/logo.svg'

const localePath = useLocalePath()
const { t } = useI18n()
const { isMobile } = useBreakpoint()
const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
  { label: t('general.home'), to: localePath('/') },
  { label: t('productCategory'), to: localePath('/product') },
  { label: t('brandAgent'), to: localePath('/agent') },
  { label: t('general.aboutUs'), to: localePath('/about') }
])

const bottomNav = ref([
  { icon: 'lucide:house', label: '首页', to: localePath('/') },
  { icon: 'lucide:search', label: '产品', to: localePath('/product') },
  { icon: 'carbon:partnership', label: '品牌', to: localePath('/agent') },
  { icon: 'ix:about', label: '公司', to: localePath('/about') }
])
</script>

<template>
  <UApp>
    <section
      class="hidden h-8 items-center justify-center gap-2 bg-[#0f2a5e] px-6 py-1.5 text-xs tracking-wider text-[#ffffff99] sm:flex"
    >
      <div>全国服务热线：<span class="text-white">0755-XXXX-XXXX</span></div>
      <USeparator orientation="vertical" class="h-7/10" />
      <div>超过 <span class="text-white">100,000+</span> 种对照品与标准品</div>
      <USeparator orientation="vertical" />
      <div>医药 · 生化 · 工业实验检测</div>
    </section>

    <UHeader
      :to="localePath('/')"
      toggle-side="right"
      :toggle="{
        variant: 'outline'
      }"
      :ui="{
        root: 'bg-[#f5f7fa]',
        container: 'gap-10',
        left: 'flex-none!',
        right: 'gap-2',
        content: 'bg-transparent',
        header: 'bg-white',
        body: 'bg-white'
      }"
    >
      <template #title>
        <div class="flex items-center gap-2.75">
          <div class="flex h-10 w-10 items-center justify-center rounded-[5px] bg-[#0f2a5e]">
            <img :src="logo" alt="logo" class="h-5.5 w-5.5" />
          </div>
          <div class="leading-[1.2]">
            <template v-if="isMobile && route.path === '/product'">产品目录</template>
            <template v-else-if="isMobile && route.path === '/agent'">代理品牌</template>
            <template v-else-if="isMobile && route.path === '/about'">关于我们</template>
            <template v-else-if="isMobile && route.path.startsWith('/product/')">产品详情</template>
            <template v-else>
              <p class="font-serif text-base">{{ t('blcBio', 1, { locale: 'zh-CN' }) }}</p>
              <p class="font-mono text-[8.5px] font-normal! tracking-[0.06em] text-muted">
                {{ t('blcBio', 1, { locale: 'en' }) }}
              </p>
            </template>
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
        <UButton class="hidden cursor-pointer px-4.5 py-2 md:block" to="">🔍 产品检索</UButton>
        <UButton class="hidden cursor-pointer bg-(--navy-mid) px-4.5 py-2 hover:bg-(--navy) md:block" to=""
          >💬 在线客服</UButton
        >
      </template>

      <template #body>
        <div>
          <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" :ui="{ link: 'text-lg' }" />
          <USeparator class="my-1" />
          <div class="space-y-1 py-1.5 text-sm text-muted">
            <div>联系我们</div>
            <div class="font-bold text-(--navy)">📞 0755-XXXX-XXXX</div>
            <div>工作日 09:00–18:00</div>
          </div>
        </div>
      </template>
    </UHeader>

    <UMain>
      <slot />
      <div
        class="sticky bottom-0 flex items-center justify-around border-t border-(--line) bg-white px-4 py-3 sm:hidden"
      >
        <NuxtLinkLocale
          v-for="item in bottomNav"
          :key="item.label"
          class="flex flex-col items-center space-y-0.5"
          :to="item.to"
        >
          <UIcon :name="item.icon" class="size-6" />
          <div class="text-[11px]">{{ item.label }}</div>
        </NuxtLinkLocale>
      </div>
    </UMain>

    <GlobalContact />

    <BaseFooter class="hidden sm:block" />
  </UApp>
</template>

<style lang="less" scoped>
.router-link-active {
  font-weight: 600;
  color: var(--color-primary);
}
</style>
