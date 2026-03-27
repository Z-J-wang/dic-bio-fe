<script setup lang="ts">
const tags = ref([
  'CFDI 中检院',
  'USP',
  'EP',
  'BP',
  'SIGMA',
  'NIST',
  'LGC',
  'TRC',
  'ERM',
  'NIBSC',
  'AccuStandard',
  'CHIRON',
  '麦克林',
  '阿拉丁'
])
</script>

<template>
  <section class="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-5">
    <h3 class="border-l-[3px] border-(--blue) pl-2 font-serif text-lg font-bold sm:hidden">联系方式</h3>
    <div class="rounded-xl border-[1.5px] border-(--line) bg-white p-4 sm:p-9">
      <h3 class="mb-6 hidden font-serif text-lg font-bold sm:block">联系方式</h3>
      <ul class="space-y-2 sm:space-y-5">
        <li class="flex gap-4">
          <div class="h-9 w-9 rounded-lg bg-(--tag-bg) text-center align-middle leading-9">📞</div>
          <div class="space-y-0.75">
            <h3 class="text-sm text-muted">电话</h3>
            <p class="font-mono text-sm">+86 1234567890</p>
            <div class="text-sm text-muted">工作日 09:00 - 18:00</div>
          </div>
        </li>
        <USeparator class="sm:hidden" :ui="{ border: 'border-(--line)' }" />
        <li class="flex gap-4">
          <div class="h-9 w-9 rounded-lg bg-(--tag-bg) text-center align-middle leading-9">✉️</div>
          <div class="space-y-0.75">
            <h3 class="text-sm text-muted">邮箱</h3>
            <p class="font-mono text-sm">
              <a href="mailto:">[email protected]</a>
            </p>
            <div class="text-sm text-muted">24小时内回复</div>
          </div>
        </li>
        <USeparator class="sm:hidden" :ui="{ border: 'border-(--line)' }" />
        <li class="flex gap-4">
          <div class="h-9 w-9 rounded-lg bg-(--tag-bg) text-center align-middle leading-9">📍</div>
          <div class="space-y-0.75">
            <h3 class="text-sm text-muted">地址</h3>
            <p class="font-mono text-sm">深圳市龙岗区龙城街道<br />回龙铺社区花样年乐年广场<br />13号楼A单元1001</p>
          </div>
        </li>
        <USeparator class="sm:hidden" :ui="{ border: 'border-(--line)' }" />
        <li class="flex gap-4">
          <div class="h-9 w-9 rounded-lg bg-[#e8f9ff] text-center align-middle leading-9">💬</div>
          <div class="space-y-0.75">
            <h3 class="text-sm text-muted">QQ 在线客服</h3>
            <p class="font-mono text-sm">李欣（技术顾问）· 张磊（销售顾问）</p>
            <div class="text-sm text-muted">点击右下角 QQ 图标即可联系</div>
          </div>
        </li>
      </ul>
    </div>
    <h3 class="border-l-[3px] border-(--blue) pl-2 font-serif text-lg font-bold sm:hidden">主营品牌</h3>
    <div class="relative rounded-lg bg-(--navy) p-4 sm:p-9">
      <div class="bg-dark"></div>
      <div class="relative z-10">
        <h2 class="mb-2 hidden font-serif text-lg font-bold text-white sm:block">
          {{ $t('blcBio', 1, { locale: 'zh-CN' }) }}
        </h2>
        <h3 class="hidden font-mono text-sm text-(--cyan) sm:block">{{ $t('blcBio', 1, { locale: 'en' }) }}</h3>
        <div class="sm:mt-12">
          <h3 class="mb-3.5 hidden text-sm text-muted sm:block">主营品牌一览</h3>
          <ul class="flex flex-wrap gap-2">
            <li v-for="tag in tags" :key="tag" class="tag">{{ tag }}</li>
            <li class="tag cursor-pointer border-[#00bcd466]! bg-[#ffffff1a]! text-(--cyan)!">
              <NuxtLinkLocale to="/agent">更多品牌 →</NuxtLinkLocale>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="less" scoped>
.bg-dark {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgb(0 188 212 / 7%) 1px, transparent 1px),
    linear-gradient(90deg, rgb(0 188 212 / 7%) 1px, transparent 1px);
  background-size: 32px 32px;
}

.tag {
  border: 1px solid rgb(255 255 255 / 15%);
  border-radius: 4px;
  padding: 4px 10px;
  font-size: 11px;
  font-family: 'DM Mono', monospace;
  font-weight: 700;
  color: rgb(255 255 255 / 80%);
  background: rgb(255 255 255 / 10%);
}
</style>
