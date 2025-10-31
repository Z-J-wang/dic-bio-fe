<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const localePath = useLocalePath()
const { t } = useI18n()
const { locale } = useLanguage()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: t('home'),
    to: localePath('/')
  },
  {
    label: t('about'),
    to: localePath('/about')
  }
])
</script>

<template>
  <UApp :locale="locale">
    <UHeader :to="localePath('/')" toggle-side="left">
      <template #title>
        <div class="text-primary text-3xl font-bold">NBC</div>
      </template>

      <UNavigationMenu :items="items" />

      <template #right>
        <BaseHeadOperation />
      </template>

      <template #body>
        <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
      </template>
    </UHeader>

    <UMain>
      <slot />
    </UMain>
    <BaseFooter />
  </UApp>
</template>
