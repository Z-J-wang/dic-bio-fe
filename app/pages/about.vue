<template>
  <div>
    <GlobalBreadcrumb :breadcrumbs="[{ label: '← 返回首页', to: '/' }, { label: '关于我们' }]" />
    <AboutHero />
    <UContainer class="space-y-15 py-15">
      <AboutScope />
      <AboutAdvantages />
      <AboutContact />
    </UContainer>
  </div>
</template>
