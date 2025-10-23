<script setup lang="ts">
import { useUserStore } from '@/store/user'

const user = useUserStore()

onMounted(() => { console.log('Nuxt is ready') })
onBeforeUnmount(() => { console.log('Nuxt is destroyed') })
</script>

<template>
  <div>
    {{ user.userinfo.name }}
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>
