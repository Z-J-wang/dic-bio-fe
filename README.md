# dic-bio-fe

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
- [Regle](https://reglejs.dev/)

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

### 关于表单校验

表单校验采用 [Regle](https://reglejs.dev/) 校验库。通过全局配置文件`app/regle.config.ts`，为常用的校验规则设置了默认的错误提示语。

> 注意：[Nuxt | Regle](https://reglejs.dev/integrations/nuxt)文档中的全局配置使用方法不知道什么原因无效，必须在使用的地方手动导入全局配置文件导出的`useGlobalRegle`。否则，全局配置文件失效。

用法示例：

```vue
<script setup lang="ts">
import type { InferInput } from '@regle/core'
import { required, email, minLength, withMessage } from '@regle/rules'
import type { FormSubmitEvent } from '@nuxt/ui'
import { useRegle } from '~/regle.config'

const { r$ } = useRegle(
  { email: '', password: '' },
  {
    email: { required, email },
    password: { required, minLength: withMessage(minLength(8), 'Must be at least 8 characters') }
  }
)

type Schema = InferInput<typeof r$>

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
  console.log(event.data)
}
</script>

<template>
  <UForm :schema="r$" :state="r$.$value" class="space-y-4" @submit="onSubmit">
    <UFormField label="Email" name="email">
      <UInput v-model="r$.$value.email" />
    </UFormField>
    <UFormField label="Password" name="password">
      <UInput v-model="r$.$value.password" type="password" />
    </UFormField>
    <UButton type="submit">{{ $t('general.submit') }}</UButton>
  </UForm>
</template>
```

### 关于接口 Mock

接口 Mock 借助 Nuxt 的 Nitro 服务器引擎以及`.env`来实现。

大体思路如下：

1. 通过变更环境变量来将接口的请求地址改为指向 Mock 服务器的地址。
2. 借助 Nitro 服务器引擎来实现本地的 Mock 服务器。

#### 环境变量实现接口地址的切换

在本项目中，所有接口的 Mock 地址设定为在`/api`后面增加`/mock`次级路径（即，`/api/mock`）。

因此，只需要将接口中前缀的`/api`替换成`/api/mock`就可以实现将接口地址指向 Mock 服务器。

基于此，本项目注册了一个环境变量`NUXT_PUBLIC_API_BASE_URL`，用于实现接口前缀的替换。

具体思路如下：

1. 给环境变量`NUXT_PUBLIC_API_BASE_URL`设定默认值为：`/api`（可补充完整的域名）
2. 额外新建一个`.env.mock`环境变量文件，其中将`NUXT_PUBLIC_API_BASE_URL`设置为`/api/mock`（不要补充完整的域名，Mock 服务器就在本地）
3. 在运行指令中通过`--dotenv`来指定要加载的环境变量文件为`.env.mock`。即，在package.json文件中的`scripts`中新建指令：`"dev:mock": "nuxt dev --dotenv .env.mock"`
4. 运行`pnpm dev:mock`指令来启动本地项目，即可实现接口地址的切换。

> 环境变量相关说明：
>
> 1. [.env - 目录结构 - Nuxt 中文文档 v4](https://nuxt.zhcndoc.com/docs/4.x/directory-structure/env)
> 2. [运行时配置 - 进阶内容 - Nuxt 中文文档 v4](https://nuxt.zhcndoc.com/docs/4.x/guide/going-further/runtime-config#环境变量)

#### 搭建 Mock 服务器

Nuxt 已经借助 Nitro 实现的服务器功能。所以本项目可依托 Nuxt 的服务器功能来说实现 Mock 服务器。

> 详见：[server - 目录结构 - Nuxt 中文文档 v4](https://nuxt.zhcndoc.com/docs/4.x/directory-structure/server)

Nuxt 默认将`server/api`目录下的服务注册为Api服务。例如：`server/api/user.get.ts`则会被注册为`Get /api/user`。

因此，只需要在`server/api/`目录下新建一个`mock/`子目录，然后在其中编写接口的Mock代码即可实现 Mock 服务器。

例如，在`server/api/mock`目录下创建`server/api/mock/user.get.ts`文件，则 Nuxt 会自动给对外暴露接口`Get /api/mock/user`。

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
