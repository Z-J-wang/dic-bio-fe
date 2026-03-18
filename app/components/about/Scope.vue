<script setup lang="ts">
const categories = useState('home-product-categories', () => [
  {
    name: '医药对照品',
    description:
      '涵盖化学药、中药、生物药各类原料药及成品的含量测定、杂质检测所需全系列对照品，符合CP/USP/EP/BP等国内外药典标准。',
    icon: '💊',
    class: 'border-t-(--blue)',
    to: '/'
  },
  {
    name: '生化标准品',
    description:
      '酶、蛋白质、核酸、多糖等生物大分子标准品，以及临床诊断、疫苗效价检测所需国际生物标准品，溯源至WHO及国家级标准。',
    class: 'border-t-(--green)',
    icon: '🧬'
  },
  {
    name: '杂质对照品',
    description:
      '环境监测、食品安全、材料分析等工业检测应用，提供农兽药残留、重金属、有机污染物等各类认证标准溶液与固体标准品。',
    class: 'border-t-(--gold)',
    icon: '⚗️'
  },
  {
    name: '有机 / 无机对照品',
    description:
      '代理高纯度有机化合物与无机标准品，涵盖金属离子、稳定同位素内标、高纯无机盐等，满足仪器校准与方法验证需求。',
    class: 'border-t-[#9b59b6]',
    icon: '🔬'
  },
  {
    name: '杂质对照品定制',
    description: '针对药物研发中难以购得的特殊杂质，提供专业定制合成服务，结构确认、纯度检测、CoA 全套文件一并提供。',
    class: 'border-t-(--cyan)',
    icon: '🛠️'
  },
  {
    name: '专业咨询服务',
    description: '资深应用专家提供选品指导、方法验证建议和注册申报支持，一站式服务助力客户高效完成实验与生产任务。',
    class: 'border-t-[#e74c3c]',
    icon: '🤝'
  }
])
</script>

<template>
  <section>
    <div class="mb-9 flex items-baseline gap-4">
      <h2 class="font-serif text-[1.5rem] font-bold">主营业务</h2>
      <span class="text-sm text-muted">Business Scope</span>
    </div>

    <ul class="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
      <li
        v-for="item in categories"
        :key="item.name"
        class="card rounded-xl border-[1.5px] border-t-[3px] border-(--line) bg-white px-6 py-7"
        :class="item.class"
      >
        <div class="mb-3.5 text-[1.75rem]">{{ item.icon }}</div>
        <div class="mb-2.5 font-bold">{{ item.name }}</div>
        <div class="text-[13px] leading-[1.9] text-muted">{{ item.description }}</div>
      </li>
    </ul>
  </section>
</template>

<style lang="less" scoped>
.card {
  position: relative;

  &:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-2px);

    &::before {
      transform: scaleX(1);
    }
  }
}
</style>
