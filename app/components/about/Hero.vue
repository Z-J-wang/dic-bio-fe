<script setup lang="tsx">
import { CountTo } from 'vue3-count-to'

const statistics = useState('about-statistics', () => [
  { label: '在库产品种类', number: 10, unit: '万+' },
  { label: '代理品牌', number: 30, unit: '+' },
  { label: '行业深耕经验', number: 15, unit: '年+' }
])
</script>

<template>
  <section class="hero">
    <div class="hero-grid"></div>
    <div class="hero-glow"></div>
    <UContainer>
      <div class="grid grid-cols-2 items-center gap-4">
        <div class="hero-content">
          <div class="hero-label"><span></span> About Us · 关于我们</div>
          <h1 class="fade-up delay-1">
            深圳鼎利成<br />
            <span class="text-(--cyan)">生物科技有限公司</span>
          </h1>
          <p class="hero-sub fade-up delay-2">SHENZHEN DINGLICHENG BIO-TECHNOLOGY CO., LTD</p>

          <ul class="flex flex-wrap gap-4">
            <li
              v-for="statistic in statistics"
              :key="statistic.label"
              class="flex-wrap items-center justify-center rounded-[10px] border border-[#ffffff1f] bg-[#ffffff12] px-6 py-4.5 text-white last:border-none"
            >
              <div class="flex items-baseline">
                <CountTo :start-val="0" :end-val="statistic.number" :duration="1000" class="stat-num" />
                <span class="text-[18px] font-bold text-(--cyan)">{{ statistic.unit }}</span>
              </div>
              <div class="flex justify-center text-xs text-[#ffffff80]">{{ statistic.label }}</div>
            </li>
          </ul>
        </div>
        <div class="rounded-2xl border border-[#ffffff1f] bg-[#ffffff0d] p-8 text-left">
          <div class="mb-3.5 text-xs text-(--cyan) uppercase">Company Profile</div>
          <div class="text-sm leading-[2.1] text-[#ffffffbf]">
            深圳鼎利成生物科技有限公司，作为全球多个高端标准品公司国内授权代理商，能为您提供超过
            10万种的有机和无机对照品、标准品；同时提供优质的咨询服务，力助客户完成试验和生产任务。包括医药、生化、工业实验检测类对照品、标准品。
          </div>
          <div class="mt-5 border-t border-[ffffff1f] pt-5 text-xs text-[#ffffff80]">
            同时，我司还提供专业的<span class="text-(--cyan)">杂质对照品定制服务</span>，给您一个一站式购物的体验。
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<style lang="less" scoped>
.hero {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 64px 40px;
  text-align: center;
  background: var(--navy);
  flex-direction: column;

  .hero-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgb(0 188 212 / 7%) 1px, transparent 1px),
      linear-gradient(90deg, rgb(0 188 212 / 7%) 1px, transparent 1px);
    background-size: 48px 48px;
  }

  .hero-glow {
    position: absolute;
    top: -80px;
    right: -80px;
    width: 500px;
    height: 500px;
    background: radial-gradient(ellipse, rgb(16 80 208 / 35%) 0%, transparent 70%);
    pointer-events: none;
  }

  .hero-content {
    position: relative;
    text-align: left;
    // max-width: 820px;

    .stat-num {
      font-size: 28px;
      font-family: 'DM Mono', monospace;
      font-weight: 500;
      color: #ffffff;
      line-height: 1;
    }

    .hero-label {
      display: inline-flex;
      align-items: center;
      margin-bottom: 24px;
      border: 1px solid rgb(0 188 212 / 35%);
      border-radius: 40px;
      padding: 4px 14px;
      font-size: 11px;
      font-family: 'DM Mono', monospace;
      color: var(--cyan);
      gap: 7px;
      letter-spacing: 0.14em;
      text-transform: uppercase;

      span {
        display: inline-block;
        border-radius: 50%;
        width: 6px;
        height: 6px;
        background: var(--cyan);
        animation: blink 1.8s infinite;
      }
    }
  }

  h1 {
    margin-bottom: 12px;
    font-size: clamp(26px, 3.5vw, 44px);
    font-family: 'Noto Serif SC', serif;
    font-weight: 700;
    color: #ffffff;
    line-height: 1.25;
  }

  .hero-sub {
    margin-bottom: 44px;
    font-size: 15px;
    color: rgb(255 255 255 / 55%);
  }
}
</style>
