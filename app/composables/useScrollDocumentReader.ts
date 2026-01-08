/**
 *
 * @param docContainer 渲染的文档容器
 * @param headingsSelector 标题的查询字符串
 * @param offset 滚动偏移量
 * @returns
 */
export function useScrollDocumentReader(docContainer: Ref<HTMLElement>, headingsSelector: Ref<string>, offset = 0) {
  const headScrollPositions = ref<
    Array<{
      id: string
      text: string | null
      level: number
      scrollDistance: number
    }>
  >([])

  const activeId = ref('')

  onMounted(() => {
    nextTick(() => {
      headScrollPositions.value = getHeadScrollPositions()
    })

    window.addEventListener('scroll', handleScroll)
  })

  // 在 onUnmounted 中移除事件监听器
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  function handleScroll() {
    // 节流处理，避免频繁计算
    requestAnimationFrame(() => {
      if (!headScrollPositions.value.length) {
        headScrollPositions.value = getHeadScrollPositions()
      }
      const currentScrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop
      const positions = headScrollPositions.value

      if (!positions.length) return
      for (let i = positions.length - 1; i >= 0; i--) {
        const position = positions[i]?.scrollDistance || 0
        const pervPosition = positions[i - 1]?.scrollDistance || 0
        if (currentScrollTop - offset <= position && currentScrollTop - offset > pervPosition) {
          const id = positions[i]?.id
          if (id) {
            activeId.value = id
          }
          break
        }
      }
    })
  }

  // 在现有代码中添加以下函数
  function getHeadScrollPositions() {
    if (!docContainer.value) return []

    const headList = docContainer.value.querySelectorAll(headingsSelector.value)
    const positions = []

    for (let i = 0; i < headList.length; i++) {
      const head = headList[i] as HTMLElement
      const rect = head.getBoundingClientRect()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollDistance = rect.top + scrollTop

      positions.push({
        id: head.id,
        text: head.textContent,
        level: Number(head.tagName.substring(1)),
        scrollDistance: Math.round(scrollDistance)
      })
    }

    return positions
  }

  return { activeId }
}
