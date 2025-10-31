<script setup lang="ts">
import type { FooterColumn } from '@nuxt/ui'

const { t } = useI18n()
const year = new Date().getFullYear()
const columns = computed<FooterColumn[]>(() => {
  return [
    {
      label: t('about'),
      children: [
        { label: t('aboutUs'), to: { path: '/about' } },
        { label: t('contactUs'), to: { path: '/about' } },
        { label: t('news'), to: { path: '/about' } },
      ],
    },
    {
      label: t('support&docs'),
      children: [
        { label: t('help'), to: { path: '/' } },
        { label: t('FAQ'), to: { path: '/' } },
        { label: t('userManual'), to: { path: '/' } },
      ],
    },
  ]
})
</script>

<template>
  <UFooter>
    <template #left>
      <div class=" text-3xl font-extrabold">
        SMART-NBC
      </div>
    </template>
    <UFooterColumns :columns="columns" />
    <template #bottom>
      <USeparator class="my-8" />
      <UContainer>
        <div class="flex justify-between items-center">
          <div>
            <i18n-t keypath="copyrighted">
              <span>
                © {{ year }} SMART-NBC
              </span>
            </i18n-t>
          </div>
          <div>粤ICP备xxxxxxxxx</div>
        </div>
      </UContainer>
    </template>
  </UFooter>
</template>

<i18n lang="json">
{
  "en": {
    "support&docs": "Support & Docs",
    "help": "Data Policy",
    "FAQ": "FAQ",
    "userManual": "User Manual"
  },
  "zh-CN": {
    "support&docs": "帮助 & 文档",
    "help": "数据政策",
    "FAQ": "常见问题",
    "userManual": "用户手册"
  }
}
</i18n>
