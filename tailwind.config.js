/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false, // 禁用全局样式重置，以避免样式冲突。开启此选项会取消基础样式的引入。本项目仅使用工具类样式和组件类样式，故而禁用全局样式重置。
  },
  prefix: '',
  content: ['./index.html', './app/**/*.{vue,js,ts,jsx,tsx}'], // tailwind CSS 生效路径
  theme: {
    extend: {
      colors: {
        primary: '#1677ff',
      },
    },
  },
  plugins: [],
}
