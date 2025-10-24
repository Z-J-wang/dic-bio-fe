<template>
  <a-space
    direction="vertical"
    :style="{ width: '100%' }"
    :size="[0, 48]"
  >
    <a-layout>
      <a-layout-header>
        <a-space
          class="h-full"
          align="center"
        >
          <NuxtLink to="/">
            <div class="text-primary text-3xl font-bold ">
              NGB
            </div>
          </NuxtLink>
        </a-space>
      </a-layout-header>
      <a-layout-content>
        <div class="min-h-[calc(100vh_-_132px)]">
          <slot />
        </div>
      </a-layout-content>
      <a-layout-footer>
        <div class="flex justify-between items-center text-white">
          <div>
            <CopyrightOutlined /> 2025 NGB 版权所有
          </div>
          <div>粤ICP备xxxxxxxxx</div>
        </div>
      </a-layout-footer>
    </a-layout>
  </a-space>
</template>

<style scoped lang="less">
.ant-layout-footer{
  background-color: #001529;
}
</style>
