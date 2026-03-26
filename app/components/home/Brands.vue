<script setup lang="tsx">
const brands = useState('home-brands', () => [
  'CFDI 中检院',
  'USP',
  'EP',
  'BP',
  'TRC',
  'SIGMA',
  'NIST',
  'LGC',
  'AccuStandard',
  'ERM',
  'NIBSC',
  'CDN',
  'ACOS',
  'CHIRON',
  'TLC',
  'CHROMOGENIX',
  'Chem Service',
  '麦克林试剂',
  '阿拉丁试剂',
  '罗恩试剂'
])
</script>

<template>
  <section class="home-brands bg-[#f0f4f8] py-4 sm:py-12">
    <UContainer>
      <div class="mb-4 text-sm tracking-[0.08em] text-muted uppercase sm:mb-7">代理品牌 / Authorized Brands</div>
      <div class="flex flex-wrap gap-1 sm:gap-2.5">
        <span v-for="brand in brands" :key="brand" class="brand-chip p-[4px_8px] text-xs sm:p-[8px_18px] md:text-sm">{{
          brand
        }}</span>
      </div>
    </UContainer>
  </section>
</template>

<style lang="less" scoped>
.brand-chip {
  border: 1.5px solid var(--line);
  border-radius: 6px;
  font-family: 'DM Mono', monospace;
  font-weight: 700;
  color: var(--navy-mid);
  background: #ffffff;
  transition: 0.15s;
  letter-spacing: 0.04em;
  cursor: pointer;
}
</style>
