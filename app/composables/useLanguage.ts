export function useLanguage() {
  const { locale, locales, setLocale } = useI18n()

  // 获取实际的 locale 代码类型
  type LocaleCode = typeof locales.value[number]['code']

  const changeLanguage = (newLocale: LocaleCode | string) => {
    setLocale(newLocale as LocaleCode)
  }

  return { locale, locales, changeLanguage }
}
