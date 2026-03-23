<template>
  <div>
    <GlobalBreadcrumb :breadcrumbs="[{ label: '← 返回首页', to: '/' }, { label: '品牌代理' }]" />
    <AgentHero />
    <AgentList />
    <section class="mb-15">
      <UContainer>
        <div class="other">
          <div>
            <h3 class="mb-2 font-serif text-[22px] font-bold text-white">找不到所需品牌或产品？</h3>
            <div class="max-w-120 text-sm text-wrap text-[#ffffff99]">
              我司还代理更多小众专业品牌，并提供杂质对照品定制合成服务。联系我们获取一对一选品建议。
            </div>
          </div>
          <div class="space-x-3">
            <UButton class="cursor-pointer bg-(--cyan)! px-7 py-3 text-sm font-bold" to="">🔍 产品检索</UButton>
            <UButton
              variant="outline"
              class="cursor-pointer border-[1.5px] border-[#ffffff4d] bg-[#ffffff1f]! px-7 py-3 text-sm font-bold text-white"
              to=""
              >💬 在线客服</UButton
            >
          </div>
        </div>
      </UContainer>
    </section>
  </div>
</template>

<style lang="less" scoped>
.other {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 56px;
  border-radius: 16px;
  padding: 48px 40px;
  background: linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%);
  gap: 24px;
  flex-wrap: wrap;
}
</style>
