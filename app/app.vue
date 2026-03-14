<script setup lang="ts">
import { provideSSRWidth } from '@vueuse/core'

provideSSRWidth(1320)
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout name="base-layout">
    <NuxtPage />
  </NuxtLayout>
</template>
