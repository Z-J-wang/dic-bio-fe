<script setup lang="ts">
const advantages = useState('about-advantages', () => [
  {
    name: '权威品牌，原装正品',
    description:
      '作为多个全球顶级标准品机构在国内的授权代理商，所有产品均为原装进口，附带完整的批次分析证书（CoA）与溯源文件，品质有保障。',
    icon: '🏆',
    class: 'bg-(--tag-bg)'
  },
  {
    name: '品种齐全，一站购齐',
    description:
      '在库超过10万种对照品与标准品，覆盖医药、生化、工业检测各大领域，满足客户从研发到生产的全流程需求，无需多家采购。',
    icon: '📦',
    class: 'bg-[#e6f9f3]'
  },
  {
    name: '快速响应，按时交付',
    description: '深圳本地仓储，常规产品24小时内发货；专业服务团队工作日快速响应报价，确保客户实验与生产进度不受影响。',
    icon: '⚡',
    class: 'bg-[#fff8e6]'
  },
  {
    name: '专业咨询，全程支持',
    description:
      '拥有丰富行业经验的应用专家团队，提供选品建议、方法优化指导及注册申报支持，助力客户高效完成实验任务和生产检验。',
    icon: '🔬',
    class: 'bg-[#fef2f0]'
  }
])
</script>

<template>
  <section>
    <div class="mb-9 flex items-baseline gap-4">
      <h2 class="font-serif text-[1.5rem] font-bold">我们的优势</h2>
      <span class="text-sm text-muted">Our Advantages</span>
    </div>

    <ul class="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-5">
      <li v-for="item in advantages" :key="item.name" class="cat-card flex gap-5">
        <div
          class="mb-3.5 inline-flex h-12 w-12 min-w-12 flex-1 items-center justify-center rounded-[10px] text-[1.375rem]"
          :class="item.class"
        >
          {{ item.icon }}
        </div>
        <div>
          <div class="mb-2 font-bold">{{ item.name }}</div>
          <div class="text-sm leading-[1.9] text-muted">{{ item.description }}</div>
        </div>
      </li>
    </ul>
  </section>
</template>

<style lang="less" scoped>
.cat-card {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 24px 20px;
  color: var(--navy);
  background: var(--card);
  transition: 0.2s;

  &::before {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 3px;
    background: var(--blue);
    transition: 0.2s;
    content: '';
    transform: scaleX(0);
    transform-origin: left;
  }

  &:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-2px);

    &::before {
      transform: scaleX(1);
    }
  }
}
</style>
