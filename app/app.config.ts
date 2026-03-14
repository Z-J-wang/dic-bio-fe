export default defineAppConfig({
  ui: {
    header: {
      slots: {}
    },
    footer: {
      slots: {
        root: 'bg-[#0f2a5e] text-white py-8',
        bottom: 'p-0!'
      }
    },
    navigationMenu: {
      slots: {
        link: 'before:bg-transparent! '
      }
    }
  }
})
