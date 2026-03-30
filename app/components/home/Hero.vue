<script setup lang="tsx">
import type { Category } from '~~/server/routes/mock/categories.get'

const router = useRouter()
const type = ref('all')
const query = ref('')
const typeOptions = ref([{ label: '全部类别', value: 'all' }])
const loading = useLoading()

onMounted(() => {
  loading.open()
  getCategory().finally(() => {
    loading.close()
  })
})

function search() {
  if (!query.value) return
  const params: { query: string; type?: string } = { query: query.value }
  if (type.value !== 'all') {
    params.type = type.value
  }
  router.push({ path: '/product', query: params })
}

async function getCategory() {
  const { status, data } = await useCustomFetch<Category[]>('/categories/flat/')

  if (status.value === 'success' && data.value) {
    typeOptions.value = [...typeOptions.value, ...data.value.map((item) => ({ label: item.name, value: item.slug }))]
  }
}
</script>

<template>
  <section class="hero justify-start px-4 py-10 sm:min-h-120 sm:justify-center sm:px-6 sm:pt-18 sm:pb-20">
    <div class="m-hero-grid sm:hero-grid"></div>
    <div class="sm:hero-glow m-hero-glow"></div>
    <div class="hero-content">
      <div class="hero-label mb-3 sm:mb-6"><span></span> 深圳鼎利成生物科技有限公司 · 专业对照品供应商</div>
      <h1 class="fade-up text-[clamp(26px,4vw,52px)] delay-1">
        精准溯源，<span class="text-(--cyan)">10万+</span> 种<br />对照品与标准品
      </h1>
      <p class="hero-sub fade-up mb-4 text-sm delay-2 sm:mb-11 sm:text-base">
        涵盖医药 · 生化 · 工业实验检测 | 代理全球顶尖品牌 | 专业咨询服务
      </p>
      <div class="search-bar fade-up delay-2">
        <UFieldGroup class="w-full bg-transparent">
          <USelect
            v-model="type"
            :items="typeOptions"
            :ui="{
              base: 'cursor-pointer md:h-13.5 bg-[#f0f4f8] sm:min-w-35 rounded-l-lg'
            }"
          />
          <UInput
            v-model.trim="query"
            placeholder="输入产品名称、CAS号、品牌或关键词..."
            :ui="{ root: 'flex-1 w-full', base: 'h-13.5' }"
          />
          <UButton
            class="cursor-pointer bg-(--blue) px-7 text-white hover:bg-(--blue-br) md:h-13.5"
            icon="mingcute:search-line"
            @click="search"
            ><span class="hidden md:inline">搜索产品</span></UButton
          >
        </UFieldGroup>
      </div>
      <div class="hero-tags fade-up gap-1.5 delay-3 sm:gap-2.5">
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
  align-items: center;
  overflow: hidden;
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

  .m-hero-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgb(0 188 212 / 7%) 1px, transparent 1px),
      linear-gradient(90deg, rgb(0 188 212 / 7%) 1px, transparent 1px);
    background-size: 32px 32px;
    pointer-events: none;
  }

  .m-hero-glow {
    position: absolute;
    top: -60px;
    right: -60px;
    width: 250px;
    height: 250px;
    background: radial-gradient(ellipse, rgb(16 80 208 / 35%) 0%, transparent 70%);
    pointer-events: none;
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
    margin-bottom: 14px;
    font-family: 'Noto Serif SC', serif;
    font-weight: 700;
    color: #ffffff;
    line-height: 1.25;
  }

  .hero-sub {
    color: rgb(255 255 255 / 55%);
  }

  .hero-tags {
    display: flex;
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
