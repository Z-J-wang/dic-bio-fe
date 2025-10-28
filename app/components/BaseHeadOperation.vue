<script setup lang="ts">
import type { SpaceSize } from 'ant-design-vue/es/space'
import type { ButtonType } from 'ant-design-vue/es/button'
import type { SelectValue } from 'ant-design-vue/es/select'
import { useLanguage } from '../composables/useLanguage'

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
  loginConfig: () => ({ href: '/login', type: 'primary',
  }),
  registerConfig: () => ({ href: '/register', type: 'default',
  }),
})

const { locale, locales, changeLanguage: updateLanguage } = useLanguage()
const changeLanguage = (value: SelectValue) => {
  if (typeof value === 'string') {
    updateLanguage(value)
  }
}
</script>

<template>
  <a-space :size="props.gap">
    <slot />
    <slot name="language">
      <ClientOnly>
        <a-select
          :value="locale"
          :options="locales"
          :field-names="{ label: 'name', value: 'code' }"
          @select="changeLanguage"
        />
      </ClientOnly>
    </slot>
    <slot name="login">
      <a-button v-bind="loginConfig">
        {{ props.loginConfig.text || $t('login') }}
      </a-button>
    </slot>
    <slot name="register">
      <a-button v-bind="registerConfig">
        {{ props.registerConfig.text || $t('register') }}
      </a-button>
    </slot>
  </a-space>
</template>
