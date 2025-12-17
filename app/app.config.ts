export default defineAppConfig({
  ui: {
    header: {
      slots: {
        root: 'md:bg-[#00274C] sm:text-white'
      }
    },
    footer: {
      slots: {
        root: 'bg-black text-white py-8',
        bottom: 'p-0!'
      }
    }
  }
})
