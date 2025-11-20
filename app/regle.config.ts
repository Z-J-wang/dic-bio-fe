/**
 * regle 全局配置
 * @module regle.config
 * @see https://reglejs.dev/advanced-usage/global-config
 *
 * 作用：
 * 1. 为常用的 rules 提供默认的错误信息
 * 2. 自定义全局通用的 rules
 * 3，覆盖默认的触发规则
 */
import { defineRegleNuxtPlugin } from '@regle/nuxt/setup'
import { defineRegleConfig } from '@regle/core'
import {
  required,
  withMessage,
  email,
  string,
  url,
  number,
  integer,
  decimal,
  alpha,
  alphaNum,
  date,
  ipv4Address,
  macAddress,
  checked,
  nativeEnum,
  oneOf
} from '@regle/rules'

const regleInstance = defineRegleNuxtPlugin(() => {
  return defineRegleConfig({
    rules: () => {
      const { t } = useI18n()

      // 为常用的 rules 提供默认的错误信息
      return {
        required: withMessage(required, t('validate.required')),
        alpha: withMessage(alpha, t('validate.alpha')),
        alphaNum: withMessage(alphaNum, t('validate.alphaNum')),
        date: withMessage(date, t('validate.invalidDate')),
        email: withMessage(email, t('validate.email')),
        string: withMessage(string, t('validate.string')),
        url: withMessage(url, t('validate.url')),
        number: withMessage(number, t('validate.number')),
        integer: withMessage(integer, t('validate.integer')),
        decimal: withMessage(decimal, t('validate.decimal')),
        checked: withMessage(checked, t('validate.checked')),
        nativeEnum: withMessage(nativeEnum, t('validate.nativeEnum')),
        oneOf: withMessage(oneOf, t('validate.oneOf')),
        ipv4Address: withMessage(ipv4Address, t('validate.ipv4Address')),
        macAddress: withMessage(macAddress, t('validate.macAddress'))
      }
    },
    modifiers: {
      // 根据项目需求自定义触发规则。详见：https://reglejs.dev/core-concepts/modifiers
    }
  })
})

export const { useRegle, useCollectScope, useScopedRegle, inferRules } = regleInstance
