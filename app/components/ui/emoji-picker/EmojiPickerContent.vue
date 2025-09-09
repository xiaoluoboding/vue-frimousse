<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { EmojiPicker as EmojiPickerPrimitive } from '@/packages'
import { LoaderIcon } from 'lucide-vue-next'
import { cn } from '~/lib/utils'
import EmojiPickerEmoji from './EmojiPickerEmoji.vue'
import EmojiPickerCategoryHeader from './EmojiPickerCategoryHeader.vue'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <EmojiPickerPrimitive.Viewport
    :class="cn('relative flex-1 outline-hidden', props.class)"
    data-slot="emoji-picker-viewport"
    v-bind="$attrs"
  >
    <EmojiPickerPrimitive.Loading
      class="absolute inset-0 flex items-center justify-center text-muted-foreground"
      data-slot="emoji-picker-loading"
    >
      <LoaderIcon class="size-4 animate-spin" />
    </EmojiPickerPrimitive.Loading>

    <EmojiPickerPrimitive.Empty
      class="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm"
      data-slot="emoji-picker-empty"
    >
      No emoji found.
    </EmojiPickerPrimitive.Empty>

    <EmojiPickerPrimitive.List
      class="select-none pb-1"
      data-slot="emoji-picker-list"
      row-class="scroll-my-1 px-1"
    >
      <template #category-header="{ category }">
        <slot name="category-header" :category="category">
          <EmojiPickerCategoryHeader :category="category" />
        </slot>
      </template>
      <template #emoji="{ emoji }">
        <slot name="emoji" :emoji="emoji">
          <EmojiPickerEmoji :emoji="emoji" />
        </slot>
      </template>
    </EmojiPickerPrimitive.List>
  </EmojiPickerPrimitive.Viewport>
</template>
