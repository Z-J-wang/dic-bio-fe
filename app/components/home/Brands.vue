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
  <section class="home-brands bg-[#f0f4f8] py-12">
    <UContainer>
      <div class="mb-7 text-sm tracking-[0.08em] text-muted uppercase">代理品牌 / Authorized Brands</div>
      <div class="flex flex-wrap gap-2.5">
        <span v-for="brand in brands" :key="brand" class="brand-chip">{{ brand }}</span>
      </div>
    </UContainer>
  </section>
</template>

<style lang="less" scoped>
.brand-chip {
  border: 1.5px solid var(--line);
  border-radius: 6px;
  padding: 8px 18px;
  font-size: 13px;
  font-family: 'DM Mono', monospace;
  font-weight: 700;
  color: var(--navy-mid);
  background: #ffffff;
  transition: 0.15s;
  letter-spacing: 0.04em;
  cursor: pointer;
}
</style>
