<script setup lang="ts">
const { isMobile } = useBreakpoint()
</script>

<template>
  <div>
    <ProductMobile v-if="isMobile" />
    <ProductPC v-else />
  </div>
</template>
