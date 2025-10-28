<script setup lang="ts">
import type { SpaceSize } from 'ant-design-vue/es/space'
import type { ButtonType } from 'ant-design-vue/es/button'
import type { SelectValue } from 'ant-design-vue/es/select'

interface BtnConfig {
  href: string
  disabled?: boolean
  text?: string
  type?: ButtonType
}

interface Props {
  gap?: SpaceSize // 间距
  loginConfig?: BtnConfig
  registerConfig?: BtnConfig
}

const props = withDefaults(defineProps<Props>(), {
  gap: 'middle',
  loginConfig: () => ({ href: '/login', text: '登录', type: 'primary',
  }),
  registerConfig: () => ({ href: '/register', text: '注册', type: 'default',
  }),
})

const state = reactive({
  language: 'zh',
})

const languageOptions = [
  {
    label: '中文',
    value: 'zh',
  },
  {
    label: 'English',
    value: 'en',
  },
]

const changeLanguage = (value: SelectValue) => { if (typeof value === 'string') state.language = value }
</script>

<template>
  <a-space :size="props.gap">
    <slot />
    <slot name="language">
      <a-select
        :value="state.language"
        :options="languageOptions"
        @select="changeLanguage"
      />
    </slot>
    <slot name="login">
      <a-button v-bind="loginConfig">
        {{ props.loginConfig.text }}
      </a-button>
    </slot>
    <slot name="register">
      <a-button v-bind="registerConfig">
        {{ props.registerConfig.text }}
      </a-button>
    </slot>
  </a-space>
</template>
