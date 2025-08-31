import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export function useIsSticky(element: Ref<HTMLElement | undefined>) {
  const isSticky = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!element.value) return

    observer = new IntersectionObserver(
      ([entry]) => {
        isSticky.value = entry.intersectionRatio < 1
      },
      {
        threshold: [1],
        rootMargin: '-1px 0px 0px 0px'
      }
    )

    observer.observe(element.value)
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return isSticky
}
