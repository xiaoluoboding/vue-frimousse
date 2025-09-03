<template>
  <div
    ref="elementRef"
    :class="cn(
      'relative flex w-full items-center justify-center',
      className,
    )"
    v-bind="$attrs"
  >
    <slot v-if="isInView" />
    <LoaderCircle 
      v-else 
      class="size-5 animate-spin text-muted-foreground" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { inView } from 'motion'
import { LoaderCircle } from 'lucide-vue-next'
import { cn } from '../lib/utils'

interface Props {
  className?: string
}

withDefaults(defineProps<Props>(), {
  className: ''
})

defineOptions({
  inheritAttrs: false
})

const elementRef = ref<HTMLElement>()
const isInView = ref(false)

onMounted(() => {
  if (elementRef.value) {
    inView(elementRef.value, () => {
      isInView.value = true
    })
  }
})
</script>
