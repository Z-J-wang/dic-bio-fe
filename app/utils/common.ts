import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const toReadableDate = (date: Date | string, fallback = '') => {
  try {
    if (typeof date === 'string') {
      date = new Date(date)
    }

    // 检查日期是否有效
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return fallback
    }

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch (error) {
    console.error(error)
    return fallback
  }
}

/**
 * 计算字符串的哈希值
 * @param str
 * @returns Hash value
 */
export const hashString = (str: string) => {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i) // hash * 33 + c
  }
  return hash >>> 0 // 转换为无符号32位整数
}

export function blobToString(blob: Blob): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result) // 得到字符串
    reader.onerror = reject
    reader.readAsText(blob, 'UTF-8') // 指定编码格式（默认UTF-8）
  })
}

/**
 * 字节数格式化
 * @param bytes
 * @param decimals
 * @returns 带单位的数据量
 */
export const formatBytes = (bytes = 0, decimals = 2) => {
  if (bytes <= 0) return '0 B'
  const k = 1024
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k)) // 获取字节的指数，即单位的下标
  return `${(bytes / Math.pow(k, i)).toFixed(decimals)} ${units[i]}`
}

/**
 * 合并类名
 * @param classnames
 * @returns 合并后的类名
 */
export function classNameMerge(...classnames: ClassValue[]): string {
  return twMerge(clsx(classnames))
}
