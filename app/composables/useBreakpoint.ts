import { breakpointsTailwind, useBreakpoints, useSSRWidth } from '@vueuse/core'

export function useBreakpoint() {
  const width = useSSRWidth()
  const breakpoints = useBreakpoints(breakpointsTailwind, {
    ssrWidth: width // 设置 SSR模式下的屏幕宽度
  })
  const current = breakpoints.current()
  const active = breakpoints.active()

  return {
    active,
    current,
    breakpoints
  }
}
