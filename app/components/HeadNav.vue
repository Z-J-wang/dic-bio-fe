<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const nav = useState(() => [
  { key: '/', label: 'home', to: { path: '/' } },
  { key: '/about', label: 'about', to: { path: '/about' } },
])

const current = useState(() => [route.path])
</script>

<template>
  <a-menu
    v-model:selected-keys="current"
    mode="horizontal"
    class="bg-transparent"
  >
    <a-menu-item
      v-for="item in nav"
      :key="item.key"
      class=" text-white"
    >
      <NuxtLinkLocale :to="item.to">
        {{ $t(item.label) }}
      </NuxtLinkLocale>
    </a-menu-item>
  </a-menu>
</template>
