<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const localePath = useLocalePath()
const { t } = useI18n()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: t('home'),
    to: localePath('/'),
  }, {
    label: t('about'),
    to: localePath('/about'),
  },
])
</script>

<template>
  <UApp>
    <UHeader
      :to="localePath('/')"
      toggle-side="left"
    >
      <template #title>
        <div class="text-primary text-3xl font-bold">
          NGB
        </div>
      </template>

      <UNavigationMenu :items="items" />

      <template #right>
        <BaseHeadOperation language-mode="select" />
      </template>

      <template #body>
        <UNavigationMenu
          :items="items"
          orientation="vertical"
          class="-mx-2.5"
        />
      </template>
    </UHeader>

    <UMain>
      <slot />
    </UMain>

    <UFooter>
      <template #bottom>
        <UContainer>
          <BaseFooter />
        </UContainer>
      </template>
    </UFooter>
  </UApp>
</template>
