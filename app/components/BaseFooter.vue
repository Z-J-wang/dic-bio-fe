<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <div class="flex justify-between items-center">
    <div>
      <i18n-t keypath="copyrighted">
        <span>
          © {{ year }} NGB
        </span>
      </i18n-t>
    </div>
    <div>粤ICP备xxxxxxxxx</div>
  </div>
</template>
