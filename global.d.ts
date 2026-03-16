/**
 * 全局类型定义
 */
export {} // 确保文件被当作模块处理

declare global {
  // 接口响应分页数据类型
  interface ResponsePaginationData<T> {
    page: number
    count: number
    total_pages: number
    results: T[]
  }

  // 接口响应数据类型
  type ApiResponse<T> = { data: T; error: string | null }
}
