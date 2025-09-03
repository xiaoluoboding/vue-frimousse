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
  <li :class="cn('prose prose-sm', className)" v-bind="$attrs">
    <slot />
  </li>
</template>
