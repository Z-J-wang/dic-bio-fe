import { defineRegleNuxtPlugin } from '@regle/nuxt/setup'
import { defineRegleConfig } from '@regle/core'
import { required, withMessage, email } from '@regle/rules'

export default defineRegleNuxtPlugin(() => {
  return defineRegleConfig({
    rules: () => {
      const { t } = useI18n()
      console.log('regle')

      return {
        required: withMessage(required, t('validate.required')),
        email: withMessage(email, t('news'))
      }
    }
  })
})
