# SMART-NUXT-TEMPLATE

前端模板项目。本模板项目采用Nuxt技术框架，以兼容 SSR/SPA 两种开发模式。

## 运行环境

- Node v22
- [pnpm v10](https://pnpm.io/zh/)
- [pm2](https://pm2.node.org.cn/) （SSR项目部署需要）

> 使用pnpm进行包管理时可能存在幽灵依赖问题，可通过`npx depcheck`命令来检查。

## 主要技术栈

- [Nuxt v4](https://nuxt.zhcndoc.com/)
- [Nuxt UI](https://ui.nuxt.com/)
- [Nuxt i18n](https://nuxt-i18n.zhcndoc.com/)
- [Pinia](https://pinia.vuejs.ac.cn/)
- [Tailwind CSS](https://tailwind.org.cn/)

### 关于UI组件库

默认采用且优先推荐 Nuxt 衍生的 UI 组件库 Nuxt UI。Nuxt UI 有着对 Nuxt 以及 SSR 更好的兼容性。

如果确实需要采用其他 UI 组件库，还可以使用 Nuxt 版本的 [Element Plus](https://element.eleme.cn/#/zh-CN)、[Ant Design Vue](https://www.antdv.com/components/overview-cn) 和 [TDesign Next Vue](https://tdesign.tencent.com/vue-next/overview)。

- 引入 Element Plus: [@element-plus/nuxt - Nuxt 模块 - Nuxt 中文文档](https://nuxt.zhcndoc.com/modules/element-plus)
- 引入 Ant Design Vue: [@ant-design-vue/nuxt - Nuxt 模块 - Nuxt 中文文档](https://nuxt.zhcndoc.com/modules/ant-design-vue)
- 引入 TDesgin Next Vue: [@tdesign-vue-next/nuxt - Nuxt 模块 - Nuxt 中文文档](https://nuxt.zhcndoc.com/modules/tdesign-vue-next)

### 关于 Tailwind CSS

无论采用哪个UI组件库，都要结合 [Tailwind CSS](https://tailwind.org.cn/) 使用。Nuxt UI 默认内置Tailwind CSS 无效手动安装。使用其他组件库时，需手动引入。

Tailwind CSS 安装方法详见：[使用 Nuxt 安装 Tailwind CSS - Tailwind CSS 框架](https://tailwind.org.cn/docs/installation/framework-guides/nuxt)

> 如果在使用过程中发现 UI 组件库的样式存在异常，可能是 Tailwind CSS 的基础样式覆盖导致的。
>
> 可通过关闭基础样式导入解决。详见：[Preflight - 基础样式 - Tailwind CSS 框架](https://tailwind.org.cn/docs/preflight#disabling-preflight)

## 目录结构说明

详见：[Nuxt 指南 v4](https://nuxt.zhcndoc.com/docs/4.x/guide)

## 项目模式

### SPA 模式

把`nuxt.config.ts`文件中的`ssr`属性设置为`false`即可切换 SPA 开发模式。

```ts
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false
})
```

#### 项目部署

SPA 模式下有两种部署模式。一种是传统的 SPA 部署，另外一种是 SSR 部署。

##### 传统的 SPA 部署

1. 执行`pnpm generate`构建生产文件。
2. 将`.output/pubilc/`中的文件迁移至 Web 服务器。

##### SSR 部署

1. 执行`pnpm build`构建生产文件。
2. 通过PM2 运行 Node 的服务。
3. 通过nginx对外暴露 Node 的端口。

### SSR 模式

本项目默认采用 SSR 模式，无需额外配置。

#### 项目部署

1. 执行`pnpm build`构建生产文件。
2. 通过PM2 运行 Node 的服务。
3. 通过nginx对外暴露 Node 的端口。
