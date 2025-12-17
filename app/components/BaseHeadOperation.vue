<script setup lang="ts">
import { useLanguage } from '../composables/useLanguage'
import type { ButtonProps } from '@nuxt/ui'

interface BtnConfig extends ButtonProps {
  to: string
  disabled?: boolean
  text?: string
  variant?: 'subtle' | 'outline' | 'solid' | 'ghost' | 'link' | 'soft'
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
}

interface Props {
  dark?: boolean
  languageMode?: // 语言切换方式: button | select。
    'button' | 'select' // ! 由于 setLocale 方法失效，暂时不要使用 select 模式
  loginConfig?: BtnConfig
  registerConfig?: BtnConfig
}

const props = withDefaults(defineProps<Props>(), {
  dark: false,
  gap: 'middle',
  languageMode: 'button',
  loginConfig: () => ({ to: '/login', color: 'primary', variant: 'solid' }),
  registerConfig: () => ({ to: '/register', variant: 'ghost' })
})

const language = useLanguage()
const localeCode = language.localeCode
const locales = language.locales

const languageBtnConfig = computed(() => {
  return locales.value.find((lang) => lang?.code !== localeCode.value)
})
</script>

<template>
  <ClientOnly>
    <div class="flex items-center gap-2 sm:gap-4">
      <slot />
      <slot name="language">
        <template v-if="languageMode === 'button'">
          <SwitchLocalePathLink v-if="languageBtnConfig" :key="languageBtnConfig.code" :locale="languageBtnConfig.code">
            <UButton
              :ui="{
                base: props.dark
                  ? 'cursor-pointer bg-transparent text-white outline outline-white hover:bg-white hover:text-[#00274C]'
                  : ''
              }"
            >
              {{ languageBtnConfig.alias || languageBtnConfig.name }}
            </UButton>
          </SwitchLocalePathLink>
        </template>
        <template v-else>
          <ULocaleSelect v-model="localeCode" :locales="locales" />
        </template>
      </slot>
      <slot name="login">
        <UButton
          :ui="{
            base: props.dark
              ? 'md:px-6 cursor-pointer bg-transparent text-white outline outline-white hover:bg-white hover:text-[#00274C]'
              : ''
          }"
          v-bind="loginConfig"
        >
          {{ props.loginConfig.text || $t('general.login') }}
        </UButton>
      </slot>
      <slot name="register">
        <UButton
          :ui="{
            base: props.dark
              ? 'md:px-6 cursor-pointer bg-transparent text-white outline outline-white hover:bg-white hover:text-[#00274C]'
              : ''
          }"
          v-bind="registerConfig"
        >
          {{ props.registerConfig.text || $t('general.register') }}
        </UButton>
      </slot>
    </div>
  </ClientOnly>
</template>
