<script setup lang="ts">
import { useLanguage } from '../composables/useLanguage'

interface BtnConfig {
  to: string
  disabled?: boolean
  text?: string
  variant?: 'subtle' | 'outline' | 'solid' | 'ghost' | 'link' | 'soft'
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
}

interface Props {
  languageMode?: 'button' | 'select' // 语言切换方式: button | select
  loginConfig?: BtnConfig
  registerConfig?: BtnConfig
}

// 修改 interface 部分以增强类型安全
interface LanguageOption {
  code: 'en' | 'zh-CN' // 明确语言代码的类型
  name: string
}

const props = withDefaults(defineProps<Props>(), {
  gap: 'middle',
  languageMode: 'button',
  loginConfig: () => ({ to: '/login', color: 'primary', variant: 'solid' }),
  registerConfig: () => ({ to: '/register', variant: 'ghost' }),
})

const { localeCode, locales, changeLanguage: updateLanguage } = useLanguage()

const languageBtnConfig = computed<LanguageOption | undefined>(() => {
  return locales.value.find(lang => lang?.code !== localeCode.value) as LanguageOption
})

const changeLanguage = (value: string | undefined) => {
  if (value) {
    updateLanguage(value)
  }
}
</script>

<template>
  <div class="space-x-4">
    <slot />
    <slot name="language">
      <template v-if="languageMode === 'button'">
        <SwitchLocalePathLink
          v-if="languageBtnConfig"
          :key="languageBtnConfig.code"
          :locale="languageBtnConfig.code"
        >
          <UButton variant="outline">
            {{ languageBtnConfig.name }}
          </UButton>
        </SwitchLocalePathLink>
      </template>
      <template v-else>
        <ClientOnly>
          <ULocaleSelect
            v-model="localeCode"
            :locales="locales"
            @update:model-value="changeLanguage($event)"
          />
        </ClientOnly>
      </template>
    </slot>
    <slot name="login">
      <UButton v-bind="loginConfig">
        {{ props.loginConfig.text || $t('login') }}
      </UButton>
    </slot>
    <slot name="register">
      <UButton v-bind="registerConfig">
        {{ props.registerConfig.text || $t('register') }}
      </UButton>
    </slot>
  </div>
</template>
