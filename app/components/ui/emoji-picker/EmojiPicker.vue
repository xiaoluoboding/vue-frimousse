<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { default as EmojiPickerPrimitive } from '@/packages'
import { cn } from '~/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <EmojiPickerPrimitive.Root
    :class="cn(
      'isolate flex h-full w-fit flex-col overflow-hidden rounded-md border border-border bg-popover text-popover-foreground',
      props.class
    )"
    data-slot="emoji-picker"
    v-bind="$attrs"
  >
    <slot />
  </EmojiPickerPrimitive.Root>
</template>
