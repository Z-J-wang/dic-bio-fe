<script setup lang="ts">
const props = defineProps({
  documentString: { type: String, required: true },
  headLevel: { type: [Number, Array], default: 1 },
  asideWidth: { type: String, default: 'w-[190px]' }
})

const route = useRoute()
const activeHeading = ref()
const docContainer = ref()
const doc = ref<string>()
const categoryDocumentReader = useCategoryDocumentReader(docContainer, props.headLevel)
const { expanded, category, categoryLevel } = toRefs(categoryDocumentReader)
const scrollDocumentReader = useScrollDocumentReader(docContainer, categoryLevel, 60)

watch(
  () => route.hash,
  () => {
    activeHeading.value = { id: route.hash.slice(1) }
  }
)
watch(
  () => scrollDocumentReader.activeId.value,
  (id) => {
    activeHeading.value = { id }
  }
)

watchEffect(() => {
  const { htmlString } = useMarkdownIt(props.documentString)
  doc.value = htmlString
  nextTick(() => categoryDocumentReader.getCategory())
})
</script>

<template>
  <div class="help flex gap-10">
    <aside class="hidden md:block" :class="asideWidth">
      <div
        class="sticky top-(--ui-header-height) py-5 rounded-md bg-slate-50 backdrop-blur-[3px] border-[0.8px] border-slate-300 max-h-[calc(100vh-var(--ui-header-height)-2rem)] overflow-y-auto"
      >
        <UTree
          v-model="activeHeading"
          v-model:expanded="expanded"
          size="lg"
          :items="category"
          :get-key="(item) => item.id"
          :ui="{ linkLeadingIcon: 'hidden!', link: 'cursor-pointer' }"
        >
          <template #item-label="{ item }">
            <UTooltip :text="item.label" :delay-duration="100">
              <span>{{ item.label }}</span>
            </UTooltip>
          </template>
        </UTree>
      </div>
    </aside>
    <div ref="docContainer" class="doc min-w-0">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="markdown-body" v-html="doc" />
    </div>
  </div>
</template>

<style lang="less">
.doc {
  h1[id],
  h2[id],
  h3[id],
  h4[id],
  h5[id],
  h6[id] {
    scroll-margin-top: calc(var(--ui-header-height) + 1rem);
  }
}
</style>
