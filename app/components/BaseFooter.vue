<script setup lang="ts">
import type { FooterColumn } from '@nuxt/ui'

const { t } = useI18n()
const year = new Date().getFullYear()
const { localeCode } = useLanguage()
const LogoImg = computed<string>(() => {
  return localeCode.value === 'zh-CN'
    ? 'https://www.smart-nbc.org.cn/assets/cn/images/logo.svg'
    : 'https://www.smart-nbc.org.cn/assets/en/images/logo.svg'
})
const columns = computed<FooterColumn[]>(() => {
  const convertPath = (path: string) => {
    const prefix = localeCode.value === 'zh-CN' ? '' : 'en/'
    return `https://www.smart-nbc.org.cn/${prefix}${path}`
  }
  return [
    {
      label: t('general.about'),
      children: [
        { label: t('general.aboutUs'), to: convertPath('/about-us') },
        { label: t('general.contactUs'), to: convertPath('/contact') },
        { label: t('general.contactUs'), to: convertPath('/join') },
        { label: t('newsCenter'), to: convertPath('/news') }
      ]
    },
    {
      label: t('dataCompliance'),
      children: [
        { label: t('dataPolicy') },
        { label: t('dataStandard'), to: convertPath('/help') },
        { label: t('dataList'), to: convertPath('/databases') },
        { label: t('serviceTerms') },
        { label: t('privacyPolicy') }
      ]
    },
    {
      label: t('support&docs'),
      children: [
        { label: t('helpCenter'), to: convertPath('/help') },
        { label: t('FAQ'), to: convertPath('/help') },
        { label: t('userManual'), to: convertPath('/help') },
        { label: t('contactSupport') }
      ]
    }
  ]
})
</script>

<template>
  <UFooter :ui="{ container: 'items-start!' }">
    <template #left>
      <img :src="LogoImg" alt="logo" class="h-(--ui-header-height) w-auto py-1.5" />
    </template>
    <template #right>
      <UFooterColumns
        :columns="columns"
        :ui="{
          root: 'xl:gap-16',
          center: 'md:grid hidden gap-16',
          right: 'flex justify-center',
          label: 'text-lg',
          item: '[&_a]:hover:underline [&_button]:text-gray-400!',
          link: 'text-base text-white! decoration-2 underline-offset-3'
        }"
      >
        <template #right>
          <div class="inline-flex flex-row items-center md:flex-col gap-6">
            <h3 class="text-lg font-bold">{{ t('followUs') }}</h3>
            <UPopover mode="hover">
              <UButton
                class="rounded-[50%] cursor-pointer outline outline-white text-white"
                variant="outline"
                icon="tdesign:logo-wechat"
              />

              <template #content>
                <img src="@/assets/img/wechat.jpg" class="w-40 h-40" />
              </template>
            </UPopover>
          </div>
        </template>
      </UFooterColumns>
    </template>

    <template #bottom>
      <UContainer>
        <USeparator class="my-8" />
        <div class="flex justify-between items-center">
          <div>
            <i18n-t keypath="general.copyrighted">
              <span> © {{ year }} {{ t('smartNbc') }} </span>
            </i18n-t>
          </div>
          <div>
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">粤ICP备2022141747号-9</a>
          </div>
        </div>
      </UContainer>
    </template>
  </UFooter>
</template>

<i18n lang="yaml">
en:
  support&docs: Support & Docs
  dataPolicy: Data Policy
  FAQ: FAQ
  userManual: User Manual
  joinUs: Join Us
  newsCenter: News
  dataCompliance: Data & Compliance
  dataStandard: Data Standard
  dataList: Databases
  serviceTerms: Terms of Service
  privacyPolicy: Privacy Policy
  helpCenter: Help
  contactSupport: Contact Support
  followUs: Follow Us
zh-CN:
  support&docs: 支持与文档
  dataPolicy: 数据政策
  FAQ: 常见问题
  userManual: 用户手册
  joinUs: 加入我们
  newsCenter: 新闻中心
  dataCompliance: 数据与合规
  dataStandard: 数据标准
  dataList: 数据列表
  serviceTerms: 服务条款
  privacyPolicy: 隐私政策
  helpCenter: 帮助中心
  contactSupport: 联系支持
  followUs: 关注我们
</i18n>
