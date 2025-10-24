<script setup lang="ts">
import '@/assets/css/main.less'
// import { useUserStore } from '@/store/user'

const configProvider = ref({
  autoInsertSpaceInButton: true,
  theme: {
    token: {
      colorPrimary: '#1677ff',
    },
  },
})

// const user = useUserStore()
onMounted(() => { console.log('Nuxt is ready') })
onBeforeUnmount(() => { console.log('Nuxt is destroyed') })
</script>

<template>
  <a-config-provider v-bind="configProvider">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <div class="page-container">
        <NuxtPage />
      </div>
    </NuxtLayout>
  </a-config-provider>
</template>
