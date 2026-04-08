<script setup lang="ts">
import { useServicePersonnel } from '@/store/service.personnel'

const { servicePersonnel } = toRefs(useServicePersonnel())
</script>

<template>
  <div class="expert-card">
    <div class="expert-title">💬 QQ 在线客服</div>
    <div class="expert-desc">点击下方客服头像，将直接跳转至 QQ 对话窗口，与专业顾问实时沟通。</div>
    <div class="expert-qq-list">
      <div v-for="(item, i) in servicePersonnel" :key="i" class="expert-qq-item">
        <div>
          <div class="expert-qq-name">
            {{ item.gender === 'female' ? '👩‍🔬' : '👨‍💼' }} {{ item.name }} · {{ item.position }}
          </div>
          <div style="margin-top: 2px; font-size: 11px; color: rgb(255 255 255 / 50%)">{{ item.introduction }}</div>
        </div>
        <a class="expert-qq-link" :href="item.link" target="_blank">发起会话</a>
      </div>
    </div>
    <div style="margin-top: 12px; font-size: 11px; text-align: center; color: rgb(255 255 255 / 30%)">
      工作时间 09:00–18:00 | 非工作时间留言即可
    </div>
  </div>
</template>

<style lang="less" scoped>
.expert-card {
  margin-bottom: 16px;
  border-radius: 10px;
  padding: 20px;
  color: #ffffff;
  background: linear-gradient(135deg, var(--navy), var(--navy-mid));

  .expert-title {
    margin-bottom: 10px;
    font-size: 13px;
    font-weight: 700;
    color: rgb(255 255 255 / 80%);
  }

  .expert-desc {
    margin-bottom: 14px;
    font-size: 13px;
    color: rgb(255 255 255 / 55%);
    line-height: 1.7;
  }

  .expert-qq-list {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .expert-qq-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 6px;
      padding: 9px 12px;
      background: rgb(255 255 255 / 8%);

      .expert-qq-name {
        font-size: 13px;
        font-weight: 600;
        color: #ffffff;
      }

      .expert-qq-link {
        border: none;
        border-radius: 5px;
        padding: 5px 12px;
        font-size: 12px;
        font-family: 'Noto Sans SC', sans-serif;
        font-weight: 600;
        text-decoration: none;
        color: #ffffff;
        background: #12b7f5;
        transition: 0.15s;
        cursor: pointer;
      }
    }
  }
}
</style>
