<script setup lang="ts">
import { useUserStore } from '~/store/user'

const { t } = useI18n()

// 设置页面的的TDK
useSeoMeta({
  title: '首页 - smart nuxt template'
})

const userStore = useUserStore()
</script>

<template>
  <div class="p-4">
    <UButton :disabled="!!userStore.userInfo" @click="userStore.getUserData()">{{ t('getUserData') }}</UButton>
    <div v-if="userStore.userInfo" class="mt-4">
      <p>
        <span class="mr-2">{{ t('name') }}:</span>{{ userStore.userInfo.name }}
      </p>
      <p>
        <span class="mr-2">{{ t('age') }}:</span>{{ userStore.userInfo.age }}
      </p>
    </div>
  </div>
</template>

<i18n lang="yaml">
en:
  name: Name
  age: Age
  getUserData: Get user data
zh-CN:
  name: 姓名
  age: 年龄
  getUserData: 获取用户数据
</i18n>
