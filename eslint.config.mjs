// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import stylistic from '@stylistic/eslint-plugin'

export default withNuxt([
  stylistic.configs.recommended,
  {
    // 自定义 stylistic 规则，详见：https://eslint.style/rules
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/indent': ['error', 2],
      '@stylistic/linebreak-style': ['error', 'unix'], // 使用 unix (LF) 换行符
      // '@stylistic/curly-newline': ['error', { minElements: 2 }], // 允许每行最多 2 个换行符
      '@stylistic/max-statements-per-line': ['error', { max: 2 }], // 允许每行最多 2 个语句
    },
  },
  {
    // 自定义规则，详见：https://zh-hans.eslint.org/docs/latest/use/configure/rules
    rules: {
      'no-console': 'off',
      'no-debugger': 'off',
      'no-spaced-func': 'error',
      'no-const-assign': 'error',
      'no-alert': 'off',
      'no-useless-escape': 'off',
      'no-control-regex': 'off',
      'space-before-function-paren': ['off', 'always'],
    },
  },
])
// Your custom configs here
