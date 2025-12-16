<script setup lang="ts">
import { provideSSRWidth } from '@vueuse/core'

provideSSRWidth(1280)
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
