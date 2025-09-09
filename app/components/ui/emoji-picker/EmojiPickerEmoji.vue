<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { EmojiPickerListEmojiProps } from 'vue-frimousse'
import { cn } from '~/lib/utils'

interface Props extends EmojiPickerListEmojiProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <button
    v-bind="$attrs"
    :class="cn(
      'flex !size-7 items-center justify-center rounded-sm text-base data-[active]:bg-accent',
      props.class
    )"
    data-slot="emoji-picker-emoji"
  >
    {{ props.emoji.emoji }}
  </button>
</template>
