<script setup lang="ts">
import type { ProductDetail } from '~~/server/routes/mock/products/[id].get'

const props = defineProps<{
  detail: ProductDetail
}>()

const tab = ref('specs')
const tabs = computed(() => {
  const items = [
    { label: '技术规格', value: 'specs' },
    { label: '储存与安全', value: 'storage' }
  ]

  if (props.detail.description) {
    items.push({ label: '应用信息', value: 'description' })
  }

  if (props.detail.sds_url || props.detail.coa_url) {
    items.push({ label: '文件下载', value: 'files' })
  }

  return items
})
</script>

<template>
  <div>
    <UTabs
      v-model="tab"
      :items="tabs"
      variant="link"
      size="xl"
      :ui="{ indicator: 'h-0.5', trigger: 'px-5 py-2.5 cursor-pointer text-sm' }"
    />

    <div v-if="tab === 'specs'" class="data-card">
      <div class="data-card-header p-[8px_20px] sm:p-[14px_20px]">
        <span class="data-card-title">详细规格参数</span>
      </div>
      <table class="spec-table">
        <tbody>
          <tr>
            <td class="p-[11px_20px] text-xs sm:text-sm">中文名称</td>
            <td class="p-[11px_20px] text-xs sm:text-[13px]">{{ detail.name }}</td>
          </tr>
          <tr>
            <td class="p-[11px_20px] text-xs sm:text-sm">英文名称</td>
            <td class="p-[11px_20px] text-xs sm:text-[13px]">{{ detail.name_en }}</td>
          </tr>
          <tr>
            <td class="p-[11px_20px] text-xs sm:text-sm">CAS 编号</td>
            <td class="p-[11px_20px] text-xs sm:text-[13px]">{{ detail.cas_number }}</td>
          </tr>
          <tr v-if="detail.brand_name">
            <td class="p-[11px_20px] text-xs sm:text-sm">品牌 / 来源</td>
            <td class="p-[11px_20px] text-xs sm:text-[13px]">{{ detail.brand_name }}</td>
          </tr>
          <tr>
            <td class="p-[11px_20px] text-xs sm:text-sm">批号</td>
            <td class="p-[11px_20px] text-xs sm:text-[13px]">{{ detail.lot_no }}</td>
          </tr>
          <tr>
            <td class="p-[11px_20px] text-xs sm:text-sm">标准依据</td>
            <td class="p-[11px_20px] text-xs sm:text-[13px]">{{ detail.standard }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="tab === 'storage'" class="data-card">
      <div class="data-card-header p-[8px_20px] sm:p-[14px_20px]">
        <span class="data-card-title">储存与安全信息</span>
      </div>
      <table class="spec-table">
        <tbody>
          <tr>
            <td class="p-[11px_20px] text-xs sm:text-sm">推荐储存温度</td>
            <td class="p-[11px_20px] text-xs sm:text-[13px]">{{ detail.storage_temp }}</td>
          </tr>
          <tr>
            <td class="p-[11px_20px] text-xs sm:text-sm">储存条件</td>
            <td class="p-[11px_20px] text-xs sm:text-[13px]">{{ detail.storage_note }}</td>
          </tr>
          <tr>
            <td class="p-[11px_20px] text-xs sm:text-sm">有效期</td>
            <td class="p-[11px_20px] text-xs sm:text-[13px]">{{ detail.expiry_date }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="tab === 'description'" class="data-card">
      <div class="data-card-header p-[8px_20px] sm:p-[14px_20px]"><span class="data-card-title">应用领域</span></div>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div style="padding: 20px; font-size: 14px; line-height: 2; color: var(--navy)" v-html="detail.description"></div>
    </div>

    <div v-if="tab === 'files'">
      <div v-if="detail.coa_url" class="coa-block p-4 sm:p-[18px_20px]">
        <div class="coa-icon sm:h-12 sm:w-12">📄</div>
        <div class="flex-1 space-y-0.75">
          <div class="text-sm font-bold">批次分析证书（CoA）</div>
          <!-- <div class="text-xs text-muted">批号 100081-202115 · PDF · 245 KB · 由中检院出具</div> -->
        </div>
        <UButton
          :to="detail.coa_url"
          target="_blank"
          class="cursor-pointer rounded-md bg-(--navy) p-2 text-xs font-semibold sm:px-4.5 sm:text-[13px]"
          >⬇ 下载 CoA</UButton
        >
      </div>

      <div v-if="detail.sds_url" class="coa-block p-4 sm:p-[18px_20px]">
        <div class="coa-icon sm:h-12 sm:w-12">📄</div>
        <div class="flex-1 space-y-0.75">
          <div class="text-sm font-bold">安全数据表（SDS / MSDS）</div>
          <!-- <div class="text-xs text-muted">GHS 标准格式 · PDF · 180 KB</div> -->
        </div>
        <UButton
          :to="detail.sds_url"
          target="_blank"
          class="cursor-pointer rounded-md bg-(--navy) p-2 text-xs font-semibold sm:px-4.5 sm:text-[13px]"
          >⬇ 下载 SDS</UButton
        >
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.data-card {
  overflow: hidden;
  margin-bottom: 20px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--card);

  .data-card-header {
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--line);
    background: #f8fafc;
    gap: 10px;

    .data-card-title {
      font-size: 13px;
      font-weight: 700;
      color: var(--navy);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
  }
}

.spec-table {
  width: 100%;

  td {
    border-bottom: 1px solid var(--line);
    // padding: 11px 20px;
    // font-size: 14px;
  }

  td:first-child {
    width: 40%;
    // font-size: 13px;
    font-weight: 500;
    color: var(--muted);
  }

  td:last-child {
    font-family: 'DM Mono', monospace;
    font-weight: 500;
    color: var(--navy);
  }

  tr:nth-child(even) td {
    background: #f8fafc;
  }
}

.coa-block {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  border: 1.5px solid var(--line);
  border-radius: 8px;
  gap: 14px;

  .coa-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    font-size: 22px;
    background: var(--tag-bg);
    flex-shrink: 0;
  }
}
</style>
