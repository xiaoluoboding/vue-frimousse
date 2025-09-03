<template>
  <div
    :aria-rowindex="index"
    :class="cn(className)"
    frimousse-row=""
    role="row"
    :style="{
      contain: 'content',
      display: 'flex',
      ...style,
    }"
    :tabindex="-1"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from '../lib/utils'

interface Props {
  index: number
  style?: Record<string, string>
  className?: string
}

defineProps<Props>()

defineOptions({
  inheritAttrs: false
})
</script>