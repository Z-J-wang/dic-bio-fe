<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <div class="flex justify-between items-center text-white">
    <div>
      <CopyrightOutlined /> {{ year }} NGB 版权所有
    </div>
    <div>粤ICP备xxxxxxxxx</div>
  </div>
</template>
