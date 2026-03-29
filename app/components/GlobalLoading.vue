<script setup lang="ts">
import type { IconProps } from '@nuxt/ui'

withDefaults(defineProps<Pick<IconProps, 'name' | 'size'> & { className?: string; overlayClassName?: string }>(), {
  name: 'line-md:loading-twotone-loop',
  size: '100px',
  className: 'text-primary',
  overlayClassName: ''
})
</script>

<template>
  <UModal
    default-open
    :dismissible="false"
    :close="false"
    :ui="{
      overlay: overlayClassName,
      content: 'bg-transparent shadow-none ring-0',
      body: 'w-auto items-center flex justify-center'
    }"
  >
    <template #body>
      <UIcon :name="name" :size="size" :class="className" />
    </template>
  </UModal>
</template>
