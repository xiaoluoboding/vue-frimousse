<script setup lang="ts">
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
</script>

<template>
  <ul
    :class="cn(
      'not-prose properties-list overflow-hidden rounded-lg border border-dotted',
      '**:[li:not(:last-child)]:border-b **:[li:not(:last-child)]:border-dotted **:[li]:px-4 **:[li]:py-3',
      className,
    )"
    v-bind="$attrs"
  >
    <slot />
  </ul>
</template>
