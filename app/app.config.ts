export default defineAppConfig({
  ui: {
    header: {
      slots: {}
    },
    footer: {
      slots: {
        root: 'bg-black text-white py-8',
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
