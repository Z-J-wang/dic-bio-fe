<template>
  <div>
    <GlobalBreadcrumb
      class="hidden sm:block"
      :breadcrumbs="[{ label: '← 返回首页', to: '/' }, { label: '关于我们' }]"
    />
    <AboutHero />

    <UContainer class="space-y-4 py-4 sm:space-y-15 sm:py-15">
      <section class="sm:hidden">
        <h3 class="mb-2.5 border-l-[3px] border-(--blue) pl-2 text-base font-bold">公司简介</h3>
        <div class="rounded-2xl border border-(--line) bg-white p-5 text-left">
          <div class="text-sm leading-[2.1]">
            深圳鼎利成生物科技有限公司，作为全球多个高端标准品公司国内<span class="text-(--blue)">授权代理商</span
            >，能为您提供超过
            10万种的有机和无机对照品、标准品；同时提供优质的咨询服务，力助客户完成试验和生产任务。包括医药、生化、工业实验检测类对照品、标准品。
          </div>
          <div class="mt-2.5 border-t border-(--line) pt-2.5 text-xs">
            同时，我司还提供专业的<span class="text-(--blue)">杂质对照品定制服务</span>，给您一个一站式购物的体验。
          </div>
        </div>
      </section>
      <AboutScope />
      <AboutAdvantages />
      <AboutContact />
    </UContainer>
  </div>
</template>
