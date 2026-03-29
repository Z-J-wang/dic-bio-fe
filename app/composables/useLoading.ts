import { GlobalLoading } from '#components'

export function useLoading() {
  const overlay = useOverlay()
  const modal = overlay.create(GlobalLoading)

  return {
    modal,
    open: modal.open,
    close: modal.close,
    patch: modal.patch
  }
}
