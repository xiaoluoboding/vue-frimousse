import { ref, onMounted } from 'vue'

export function useIsMounted() {
  const isMounted = ref(false)

  onMounted(() => {
    isMounted.value = true
  })

  return isMounted
}
