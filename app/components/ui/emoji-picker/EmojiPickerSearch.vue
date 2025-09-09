<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { default as EmojiPickerPrimitive } from '@/packages'
import { SearchIcon } from 'lucide-vue-next'
import { cn } from '~/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <div
    :class="cn('flex h-9 items-center gap-2 border-b px-3', props.class)"
    data-slot="emoji-picker-search-wrapper"
  >
    <SearchIcon class="size-4 shrink-0 opacity-50" />
    <EmojiPickerPrimitive.Search
      class="flex !h-10 w-full rounded-md !m-0 !bg-transparent !py-3 text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
      data-slot="emoji-picker-search"
      v-bind="$attrs"
    />
  </div>
</template>
