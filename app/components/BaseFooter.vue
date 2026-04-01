<script setup lang="ts">
import type { FooterColumn } from '@nuxt/ui'
import logo from '@/assets/img/logo.svg'

const { t } = useI18n()
const year = new Date().getFullYear()

const columns = computed<FooterColumn[]>(() => {
  return [
    {
      label: '产品',
      children: [
        { label: '医药对照品', to: '/product' },
        { label: '生化标准品', to: '/product' },
        { label: '有机对照品', to: '/product' },
        { label: '无机标准品', to: '/product' },
        { label: '工业检测标准', to: '/product' }
      ]
    },
    {
      label: '服务',
      children: [
        { label: '选品咨询' },
        { label: 'CoA 下载' },
        { label: '定制标准品' },
        { label: '技术支持' },
        { label: '代理申请' }
      ]
    },
    {
      label: '联系我们',
      children: [
        { label: '📞 0755-89567629' },
        { label: '✉️ [email protected]' },
        { label: '🕐 工作日 9:00–18:00' },
        { label: '关于我们' },
        { label: '加入我们' }
      ]
    }
  ]
})
</script>

<template>
  <UFooter :ui="{ root: 'pt-15 pb-7.5', container: 'items-start! py-0!', left: 'flex-none!', right: 'w-full' }">
    <template #left>
      <div class="max-w-109.5">
        <div class="mb-4 flex items-center gap-3.5">
          <div class="flex h-9 w-9 items-center justify-center rounded-[5px] bg-[#213a6a]">
            <img :src="logo" alt="logo" class="h-4.5 w-4.5" />
          </div>
          <div class="leading-[1.15]">
            <p class="font-serif leading-[1.15]">{{ t('blcBio', 1, { locale: 'zh-CN' }) }}</p>
          </div>
        </div>
        <div class="text-[13px] leading-[1.8] text-muted">
          深圳鼎利成生物科技有限公司，专注于对照品与标准品的代理与销售，提供超过10万种医药、生化、工业实验检测类对照品及标准品。
        </div>
        <div class="mt-3.5 text-xs leading-[1.8] text-muted">
          <div>深圳市龙岗区龙城街道回龙铺社区</div>
          <div>花样年乐年广场13号楼A单元1001</div>
        </div>
      </div>
    </template>
    <template #right>
      <UFooterColumns
        :columns="columns"
        :ui="{
          root: 'w-full flex!',
          center: 'flex-1 w-full',
          label: 'text-lg',
          item: '[&_a]:hover:underline [&_button]:text-gray-400! mb-2.25',
          link: 'text-base text-[13px]!'
        }"
      >
      </UFooterColumns>
    </template>
    <template #bottom>
      <UContainer>
        <USeparator class="mt-8 mb-5" :ui="{ border: 'border-[#ffffff12]' }" />
        <div class="flex items-center justify-between text-xs text-muted">
          <div>
            <span> © {{ year }} {{ t('blcBio') }} </span>
            · <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">粤ICP备2023028591号</a>
          </div>
          <div>专业对照品供应商 · 品质保证</div>
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
  smartNbc: SMART-NBC
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
  smartNbc: 深圳国家基因库
</i18n>
