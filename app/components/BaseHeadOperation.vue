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
  languageMode?: 'button' | 'select' // 语言切换方式: button | select
  loginConfig?: BtnConfig
  registerConfig?: BtnConfig
}

const props = withDefaults(defineProps<Props>(), {
  gap: 'middle',
  languageMode: 'button',
  loginConfig: () => ({ href: '/login', type: 'primary',
  }),
  registerConfig: () => ({ href: '/register', type: 'default',
  }),
})

const { locale, locales, changeLanguage: updateLanguage } = useLanguage()

const languageBtnConfig = computed(() => {
  return locales.value.find(lang => lang.code !== locale.value)
})
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
      <template v-if="languageMode === 'button'">
        <SwitchLocalePathLink
          v-if="languageBtnConfig"
          :key="languageBtnConfig.code"
          :locale="languageBtnConfig.code"
        >
          <a-button
            shape="circle"
            circle
            ghost
          >
            {{ languageBtnConfig.name }}
          </a-button>
        </SwitchLocalePathLink>
      </template>
      <template v-else>
        <ClientOnly>
          <a-select
            :value="locale"
            :options="locales"
            :field-names="{ label: 'name', value: 'code' }"
            @select="changeLanguage"
          />
        </ClientOnly>
      </template>
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
