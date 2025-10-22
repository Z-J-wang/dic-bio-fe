<script setup lang="ts">
onMounted(() => { console.log('Nuxt is ready') })
onBeforeUnmount(() => { console.log('Nuxt is destroyed') })
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>
