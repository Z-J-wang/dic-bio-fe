import * as localesList from '@nuxt/ui/locale'

export function useLanguage() {
  const { locale, locales, setLocale } = useI18n()

  // 获取实际的 locale 代码类型
  type LocaleCode = typeof locales.value[number]['code']

  const changeLanguage = (newLocale: LocaleCode | string) => {
    setLocale(newLocale as LocaleCode)
  }

  const activeLocales = computed(() => {
    return locales.value.map(item => localesList[item.code])
  })

  return { locale, locales: activeLocales, changeLanguage }
}
