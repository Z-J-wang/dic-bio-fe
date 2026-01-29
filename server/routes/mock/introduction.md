# server/api/mock/目录说明

server/api/mock/目录专门用于存放接口 Mock 的文件，请不要存放其余文件。

当运行`pnpm dev:mock`命令运行项目时，会自动把接口路径前缀改成指向Mock接口的路径。详见：`plugins/customFetch.ts`文件中的`baseURL`。
