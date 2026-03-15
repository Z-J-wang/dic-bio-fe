<script setup lang="ts">
const advantages = useState('home-advantages', () => [
  {
    icon: '🏆',
    title: '权威品牌，品质保证',
    description: '代理中检院、USP、EP、NIST等全球顶尖机构，每批次均附溯源证书与完整检测报告（CoA）。'
  },
  {
    icon: '⚡',
    title: '快速响应，按时交付',
    description: '专业服务团队24小时响应，深圳本地仓储，确保实验与生产进度不受影响。'
  },
  {
    icon: '🔬',
    title: '专业咨询，全程支持',
    description: '资深应用专家提供选品建议与方法优化支持，力助客户高效完成实验任务和生产检验。'
  }
])
</script>

<template>
  <div class="home-about-us">
    <UContainer class="py-18">
      <h2 class="text-[1.625rem] font-bold">为什么选择鼎利成</h2>
      <ul class="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-4 lg:gap-6">
        <li
          v-for="item in advantages"
          :key="item.title"
          class="rounded-[10px] border border-(--line) bg-white px-6 py-7"
        >
          <div class="mb-3.5 text-[1.75rem]">{{ item.icon }}</div>
          <div class="mb-2 font-bold">{{ item.title }}</div>
          <div class="text-sm leading-[1.8] text-muted">{{ item.description }}</div>
        </li>
      </ul>
    </UContainer>
  </div>
</template>
