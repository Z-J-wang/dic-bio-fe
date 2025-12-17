// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import stylistic from '@stylistic/eslint-plugin'
import eslintConfigPrettier from 'eslint-config-prettier'

export default withNuxt([
  stylistic.configs.recommended,
  eslintConfigPrettier,
  {
    // 自定义 stylistic 规则，详见：https://eslint.style/rules
    plugins: { '@stylistic': stylistic },
    rules: {
      '@stylistic/indent': ['error', 2],
      '@stylistic/linebreak-style': ['error', 'unix'] // 使用 unix (LF) 换行符
    }
  },
  {
    // 自定义规则，详见：https://zh-hans.eslint.org/docs/latest/use/configure/rules
    rules: {
      'vue/no-multiple-template-root': 'off',
      'no-console': 'off',
      'no-debugger': 'off',
      'no-spaced-func': 'error',
      'no-const-assign': 'error',
      'no-alert': 'off',
      'no-useless-escape': 'off',
      'no-control-regex': 'off',
      'space-before-function-paren': ['off', 'always']
    }
  },
  // 5. 文件匹配规则
  {
    files: ['\*\*/\*.{js,ts,vue}'],
    ignores: [
      '.nuxt/\*\*', // 忽略构建目录
      'node_modules/\*\*',
      'dist/\*\*'
    ]
  }
])
