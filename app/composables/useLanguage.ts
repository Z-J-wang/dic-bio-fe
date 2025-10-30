import type { Locale } from '@nuxt/ui'
import * as localesList from '@nuxt/ui/locale'

export function useLanguage() {
  const { locale: localeCode, locales, setLocale } = useI18n()

  // 获取实际的 locale 代码类型
  type LocaleCode = typeof locales.value[number]['code']

  const changeLanguage = (newLocale: LocaleCode | string) => {
    setLocale(newLocale as LocaleCode)
  }

  const activeLocales = computed(() => {
    return locales.value.map(item => Object.values(localesList).find(({ code }) => code === item.code)) as Locale<object>[]
  })

  const locale = computed(() => {
    return Object.values(localesList).find(({ code }) => code === localeCode.value)
  })

  return { localeCode, locale, locales: activeLocales, changeLanguage }
}
