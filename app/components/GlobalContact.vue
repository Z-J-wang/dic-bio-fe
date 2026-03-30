<script setup lang="ts">
import messageIcon from '@/assets/img/message.svg'
import { useServicePersonnel } from '@/store/service.personnel'

const { servicePersonnel } = toRefs(useServicePersonnel())
const open = defineModel('open', { type: Boolean, default: false })
const { isMobile } = useBreakpoint()
</script>

<template>
  <div class="fixed right-7 bottom-25">
    <UPopover
      v-model:open="open"
      :content="{ side: isMobile ? 'top' : 'left', align: 'end' }"
      :ui="{ content: 'rounded-xl' }"
    >
      <div class="flex flex-col items-center gap-1.5">
        <UButton class="qq-float-btn" title="QQ在线咨询">
          <img :src="messageIcon" alt="messageIcon" />
        </UButton>
        <div class="text-[11px] font-semibold text-muted">在线客服</div>
      </div>
      <template #content>
        <div class="global-contact qq-popup">
          <div class="qq-popup-header">
            <div class="space-y-0.5">
              <div class="text-sm font-semibold text-white">🟢 在线客服</div>
              <div class="text-xs text-[#ffffffbf]">鼎利成生物科技 · 专业服务</div>
            </div>
            <div>
              <UButton
                icon="line-md:close"
                variant="ghost"
                class="cursor-pointer p-0 text-lg text-white"
                @click="open = false"
              />
            </div>
          </div>
          <div class="qq-popup-body p-3.5">
            <a
              v-for="(item, i) in servicePersonnel"
              :key="i"
              class="qq-agent-item"
              :href="item.link"
              rel="nofollow"
              target="_blank"
            >
              <div class="qq-agent-avatar" :class="item.gender === 'female' ? 'bg-[#e8f4ff]' : 'bg-[#e8fff5]'">
                {{ item.gender === 'female' ? '👩‍🔬' : '👨‍💼' }}
              </div>
              <div>
                <div class="text-sm font-semibold">{{ item.name }} · {{ item.position }}</div>
                <div class="mt-0.5 text-xs text-muted">{{ item.introduction }}</div>
              </div>
              <div class="ml-auto h-2 w-2 shrink-0 rounded-[50%] bg-(--green)"></div>
            </a>
          </div>

          <div class="qq-popup-footer px-3.5 pb-3.5">
            <p class="border-t border-(--line) py-2 text-center text-xs leading-[1.6] text-muted">
              📌 点击客服头像将跳转至 QQ 对话窗口<br />工作时间 09:00–18:00（工作日）
            </p>
          </div>
        </div>
      </template>
    </UPopover>
  </div>
</template>

<style lang="less">
.qq-float-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 50%;
  width: 52px;
  height: 52px;
  background: linear-gradient(135deg, #12b7f5, #1184e8);
  box-shadow: 0 4px 20px rgb(16 80 208 / 45%);
  transition: 0.2s;
  cursor: pointer;
  animation: floatPulse 3s ease-in-out infinite;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 28px rgb(18 183 245 / 45%);
  }
}

.global-contact.qq-popup {
  border: 1px solid var(--line);
  border-radius: 12px;
  width: 280px;
  background: #ffffff;
  box-shadow: 0 8px 48px rgb(7 17 43 / 20%);
  transform-origin: bottom right;
  animation: popIn 0.2s ease;
}

.qq-popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px 12px 0 0;
  padding: 16px 18px;
  background: linear-gradient(135deg, #12b7f5, #0d6fc9);
}

.qq-agent-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  border: 1.5px solid var(--line);
  border-radius: 8px;
  padding: 10px 12px;
  text-decoration: none;
  transition: 0.15s;
  gap: 12px;
  cursor: pointer;

  &:hover {
    border-color: #12b7f5;
    background: #f0fbff;
  }

  .qq-agent-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 38px;
    height: 38px;
    font-size: 18px;
    flex-shrink: 0;
  }
}
</style>
