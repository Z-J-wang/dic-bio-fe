<script setup lang="ts">
import type { ProductDetail } from '~~/server/routes/mock/products/[id].get'
import CustomerService from '@/components/CustomerService.vue'

defineProps<{
  detail: ProductDetail
}>()
</script>

<template>
  <div class="space-y-3.5">
    <div class="molecule-card">
      <div class="molecule-card-header">
        <span class="molecule-card-title">🧪 分子结构图</span>
        <span class="font-mono text-xs text-muted">{{ detail.formula }}</span>
      </div>
      <div class="molecule-viewer">
        <div class="mol-svg-wrap">
          <img class="size-full" :src="detail.image_url" />
        </div>
        <div class="mol-formula-row">
          <span class="mol-tag">{{ detail.formula }}</span>
          <span class="mol-tag">{{ detail.mol_weight }}</span>
          <!-- <span class="mol-tag">InChI Key: RYYVLZVUVIJVGH</span> -->
        </div>
      </div>
    </div>
    <div class="contact-info-card">
      <div class="contact-info-title">📞 联系与咨询</div>
      <div class="contact-item">
        <div class="contact-icon">📞</div>
        <div class="contact-text">0755-89567629<small>工作日 09:00 – 18:00</small></div>
      </div>
      <div class="contact-item">
        <div class="contact-icon">✉️</div>
        <div class="contact-text">
          <a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="bbd2d5ddd4fbdfd7d896d9d2d495d8d4d6"
            >[email&nbsp;protected]</a
          ><small>24小时内回复</small>
        </div>
      </div>
      <div class="contact-item">
        <div class="contact-icon">📍</div>
        <div class="contact-text">深圳市龙岗区龙城街道<small>花样年乐年广场13号楼A单元1001</small></div>
      </div>
    </div>

    <CustomerService />
  </div>
</template>

<style lang="less" scoped>
.molecule-card {
  overflow: hidden;
  margin-bottom: 16px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--card);

  .molecule-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--line);
    padding: 12px 18px;
    background: #f8fafc;

    .molecule-card-title {
      font-size: 13px;
      font-weight: 700;
      color: var(--navy);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
  }

  .molecule-viewer {
    display: flex;
    padding: 16px;
    background: #ffffff;
    flex-direction: column;
    gap: 10px;

    .mol-svg-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 20px;
      min-height: 180px;
      background: #fafbfc;
    }

    .mol-formula-row {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;

      .mol-tag {
        border-radius: 5px;
        padding: 4px 12px;
        font-size: 13px;
        font-family: 'DM Mono', monospace;
        font-weight: 600;
        color: var(--tag-txt);
        background: var(--tag-bg);
      }
    }
  }
}

.contact-info-card {
  margin-bottom: 16px;
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 20px;
  background: var(--card);

  .contact-info-title {
    margin-bottom: 16px;
    border-bottom: 1px solid var(--line);
    padding-bottom: 12px;
    font-size: 13px;
    font-weight: 700;
    color: var(--navy);
  }

  .contact-item {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    margin-bottom: 12px;

    .contact-icon {
      margin-top: 1px;
      width: 20px;
      font-size: 16px;
      color: var(--blue);
      flex-shrink: 0;
    }

    .contact-text {
      font-size: 13px;

      small {
        display: block;
        margin-top: 1px;
        font-size: 11px;
        color: var(--muted);
      }
    }
  }
}
</style>
