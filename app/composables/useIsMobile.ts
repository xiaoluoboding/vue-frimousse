import { ref, computed, onMounted, onUnmounted } from 'vue'

export function useIsMobile() {
  const isMobile = ref<boolean | undefined>(undefined)

  let mediaQuery: MediaQueryList | null = null

  const handleChange = (event: MediaQueryListEvent) => {
    isMobile.value = !event.matches
  }

  onMounted(() => {
    mediaQuery = window.matchMedia('(min-width: 40rem)')
    isMobile.value = !mediaQuery.matches

    mediaQuery.addEventListener('change', handleChange)
  })

  onUnmounted(() => {
    if (mediaQuery) {
      mediaQuery.removeEventListener('change', handleChange)
    }
  })

  return computed(() => Boolean(isMobile.value))
}
