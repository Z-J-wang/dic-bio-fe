<script setup lang="ts">
// 设置页面的的TDK
useSeoMeta({
  title: '首页 - smart nuxt template'
})

async function getData() {
  const { data } = await useCustomFetch('/api/user')
  console.log(data.value)
}
</script>

<template>
  <div>
    <div class="p-4">{{ $t('general.home') }}</div>
    <UButton @click="getData()">获取数据</UButton>
  </div>
</template>
