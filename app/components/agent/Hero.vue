<template>
  <section class="hero px-5 py-8 sm:p-[64px_40px]">
    <div class="hero-grid"></div>
    <div class="hero-content">
      <div class="hero-label mb-4 sm:mb-6"><span></span> Authorized Partners</div>
      <h1 class="fade-up text-[clamp(26px,3.5vw,44px)] delay-1">
        全球顶尖品牌 <span class="text-(--cyan)">授权代理</span>
      </h1>
      <p class="hero-sub fade-up text-sm delay-2 sm:mb-11 sm:text-base">
        鼎利成生物科技是国内多家权威标准品机构的授权代理商，为您提供原装正品及完整溯源证书
      </p>
    </div>
  </section>
</template>

<style lang="less" scoped>
.hero {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
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

  .hero-content {
    position: relative;
    max-width: 820px;
    text-align: center;

    .hero-label {
      display: inline-flex;
      align-items: center;
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
    font-family: 'Noto Serif SC', serif;
    font-weight: 700;
    color: #ffffff;
    line-height: 1.25;
  }

  .hero-sub {
    color: rgb(255 255 255 / 55%);
  }
}
</style>
