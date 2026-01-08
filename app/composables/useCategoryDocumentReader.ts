import type { TreeItem } from '@nuxt/ui'
import type { TreeItemSelectEvent } from 'reka-ui'

type CustomTreeItem = TreeItem & {
  level: number
  children?: CustomTreeItem[]
}

export function useCategoryDocumentReader(docContainer: Ref<HTMLElement>, headLevel: unknown[] | number) {
  const category = ref<CustomTreeItem[]>([])
  const router = useRouter()
  const expanded = ref()

  const categoryLevel = computed(() => {
    const defaultCategoryLevel = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
    if (typeof headLevel === 'number') {
      return defaultCategoryLevel.slice(0, headLevel).join(',')
    } else {
      return headLevel.join(',')
    }
  })

  function getCategory() {
    if (docContainer.value) {
      const headList = docContainer.value.querySelectorAll(categoryLevel.value)
      category.value = []
      const stack: CustomTreeItem[] = []
      const defaultExpanded = []
      for (let i = 0; i < headList.length; i++) {
        const head = headList[i] as HTMLElement
        const { id, tagName } = head
        const level = Number(tagName.substring(1))

        const newItem: CustomTreeItem = {
          id,
          level,
          label: head.textContent || '',
          onSelect: handleTreeItemClick
        }
        defaultExpanded.push(id)

        while (stack.length > 0) {
          const top = stack[stack.length - 1]
          if (top && top.level >= level) {
            stack.pop()
          } else {
            break
          }
        }

        if (stack.length === 0) {
          // 如果当前标题等级为 categoryLevel 中的第一个等级，直接添加的category中
          category.value.push(newItem)
        } else {
          const parent = stack[stack.length - 1] as CustomTreeItem
          if (!parent.children) parent.children = []
          parent.children.push(newItem)
        }

        stack.push(newItem)
      }

      expanded.value = defaultExpanded
    }
  }

  // 处理目录项点击
  function handleTreeItemClick(ev: TreeItemSelectEvent<TreeItem>) {
    const item = ev.detail.value
    if (item && item.id) {
      router.push(`#${item.id}`)
    }
  }

  // 返回响应式引用，支持解构
  return {
    getCategory,
    expanded,
    category,
    categoryLevel
  }
}
