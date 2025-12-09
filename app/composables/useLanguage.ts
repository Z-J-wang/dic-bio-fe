import type { Locale } from '@nuxt/ui'
import * as localesList from '@nuxt/ui/locale'

export interface LocaleOption extends Locale<object> {
  code: 'en' | 'zh-CN' // 明确语言代码的类型
  name: string
  alias?: string
}

export function useLanguage() {
  const { locale: localeCode, locales, setLocale } = useI18n()

  // 获取实际的 locale 代码类型
  type LocaleCode = (typeof locales.value)[number]['code']

  const changeLocale = (newLocale: LocaleCode | string) => {
    setLocale(newLocale as LocaleCode) // ! Nuxt i18n 结合 Nuxt UI 下，该方法失效
  }

  const activeLocales = computed(() => {
    return locales.value.map((item) => {
      return { ...item, ...Object.values(localesList).find(({ code }) => code === item.code) }
    }) as LocaleOption[]
  })
  const locale = computed(() => Object.values(localesList).find(({ code }) => code === localeCode.value))

  return { localeCode, locale, locales: activeLocales, changeLocale }
}
