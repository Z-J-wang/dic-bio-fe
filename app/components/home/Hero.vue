<script setup lang="tsx">
const type = ref('all')
const typeOptions = ref([
  { label: '全部类别', value: 'all' },
  { label: '医药对照品', value: 'medicine' },
  { label: '生化标准品', value: 'biochemistry' },
  { label: '工业检测', value: 'industrial' },
  { label: '有机对照品', value: 'organic' },
  { label: '无机对照品', value: 'inorganic' }
])
</script>

<template>
  <section class="hero">
    <div class="hero-grid"></div>
    <div class="hero-glow"></div>
    <div class="hero-content">
      <div class="hero-label"><span></span> 深圳鼎利成生物科技有限公司 &nbsp;·&nbsp; 专业对照品供应商</div>
      <h1 class="fade-up delay-1">精准溯源，<span class="text-(--cyan)">10万+</span> 种<br />对照品与标准品</h1>
      <p class="hero-sub fade-up delay-2">
        涵盖医药 · 生化 · 工业实验检测&nbsp;&nbsp;|&nbsp;&nbsp;代理全球顶尖品牌&nbsp;&nbsp;|&nbsp;&nbsp;专业咨询服务
      </p>
      <div class="search-bar fade-up delay-2">
        <UFieldGroup class="w-full bg-transparent" size="lg">
          <USelect
            v-model="type"
            :items="typeOptions"
            :ui="{
              base: 'cursor-pointer h-13.5 bg-[#f0f4f8] min-w-35 rounded-l-lg'
            }"
          />
          <UInput placeholder="输入产品名称、CAS号、品牌或关键词..." :ui="{ root: 'flex-1 w-full', base: 'h-13.5' }" />
          <UButton
            class="h-13.5 cursor-pointer bg-(--blue) px-7 text-white hover:bg-(--blue-br)"
            icon="mingcute:search-line"
            >搜索产品</UButton
          >
        </UFieldGroup>
        <!-- <select>
          <option>全部类别</option>
          <option>医药对照品</option>
          <option>生化标准品</option>
          <option>工业检测</option>
          <option>有机对照品</option>
          <option>无机对照品</option>
        </select>
        <input type="text" placeholder="输入产品名称、CAS号、品牌或关键词..." />
        <button onclick="showPage('list')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          搜索产品
        </button> -->
      </div>
      <div class="hero-tags fade-up delay-3">
        <span class="hero-tag" onclick="showPage('list')">咖啡因</span>
        <span class="hero-tag" onclick="showPage('list')">阿司匹林对照品</span>
        <span class="hero-tag" onclick="showPage('list')">USP标准品</span>
        <span class="hero-tag" onclick="showPage('list')">NIST SRM</span>
        <span class="hero-tag" onclick="showPage('list')">青霉素标准品</span>
        <span class="hero-tag" onclick="showPage('list')">维生素 C</span>
      </div>
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
  padding: 72px 24px 80px;
  min-height: 480px;
  background: var(--navy);
  flex-direction: column;

  .hero-glow {
    position: absolute;
    top: -120px;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 600px;
    background: radial-gradient(ellipse, rgb(16 80 208 / 45%) 0%, transparent 70%);
    pointer-events: none;
  }

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
    margin-bottom: 14px;
    font-size: clamp(30px, 4vw, 52px);
    font-family: 'Noto Serif SC', serif;
    font-weight: 700;
    color: #ffffff;
    line-height: 1.25;
  }

  .hero-sub {
    margin-bottom: 44px;
    font-size: 16px;
    color: rgb(255 255 255 / 55%);
  }

  .hero-tags {
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 18px;

    .hero-tag {
      border: 1px solid rgb(255 255 255 / 15%);
      border-radius: 20px;
      padding: 3px 10px;
      font-size: 12px;
      color: rgb(255 255 255 / 55%);
      transition: 0.15s;
      cursor: pointer;
    }
  }

  .search-bar {
    margin: 0 auto;
    width: 100%;
    max-width: 780px;
    box-shadow: 0 8px 48px rgb(0 0 0 / 35%);
  }
}
</style>
