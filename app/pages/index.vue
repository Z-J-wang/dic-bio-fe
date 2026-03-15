<script setup lang="ts">
const { t } = useI18n()

// 设置页面的的TDK
useSeoMeta({
  title: t('blcBio')
})
</script>

<template>
  <PageScrollAnimation />
  <HomeHero />
  <HomeStatisticsBar />
  <HomeProduct />
  <HomeBrands />
  <HomeAboutUs />
</template>
