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
          class="w-1/4 flex-wrap items-center justify-center border-r border-[#ffffff0f] py-7 text-white last:border-none"
        >
          <div class="flex justify-center">
            <CountTo
              :start-val="0"
              :end-val="statistic.number"
              :duration="1000"
              class="stat-num text-[2rem] font-bold"
            />
            <span class="text-[22px] font-bold text-(--cyan)">{{ statistic.unit }}</span>
          </div>
          <div class="flex justify-center text-[0.8rem] text-[#ffffff80]">{{ statistic.label }}</div>
        </li>
      </ul>
    </UContainer>
  </section>
</template>

<style lang="less" scoped>
.stat-num {
  margin-bottom: 6px;
  font-size: 32px;
  font-family: 'DM Mono', monospace;
  font-weight: 500;
  color: #ffffff;
  line-height: 1;
}
</style>
