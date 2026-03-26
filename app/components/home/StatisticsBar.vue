<script setup lang="tsx">
import { CountTo } from 'vue3-count-to'

const statistics = useState('statistics-bar-data', () => [
  { label: '在库产品种类', number: 10, unit: '万+' },
  { label: '代理品牌', number: 30, unit: '+' },
  { label: '快速响应服务', number: 24, unit: 'h' },
  { label: '行业深耕经验', number: 15, unit: '年+' }
])
</script>

<template>
  <section class="statistics-bar border-t border-[#ffffff0f] bg-(--navy-mid)">
    <UContainer>
      <ul class="flex">
        <li
          v-for="statistic in statistics"
          :key="statistic.label"
          class="w-1/4 flex-wrap items-center justify-center border-r border-[#ffffff0f] py-4 text-white last:border-none sm:py-7"
        >
          <div class="flex justify-center gap-1">
            <CountTo
              :start-val="0"
              :end-val="statistic.number"
              :duration="1000"
              class="stat-num text-2xl font-bold sm:text-[2rem]"
            />
            <span class="text-lg font-bold text-(--cyan) sm:text-[22px]">{{ statistic.unit }}</span>
          </div>
          <div class="flex justify-center text-xs text-[#ffffff80]">{{ statistic.label }}</div>
        </li>
      </ul>
    </UContainer>
  </section>
</template>

<style lang="less" scoped>
.stat-num {
  margin-bottom: 6px;
  font-family: 'DM Mono', monospace;
  font-weight: 500;
  color: #ffffff;
  line-height: 1;
}
</style>
