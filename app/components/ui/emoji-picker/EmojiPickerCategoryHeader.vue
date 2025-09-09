<script setup lang="ts">
import type { EmojiPickerListCategoryHeaderProps } from '@/packages';


const props = defineProps<EmojiPickerListCategoryHeaderProps>()
</script>

<template>
  <div
    v-bind="$attrs"
    class="bg-popover px-3 pt-3.5 pb-2 text-muted-foreground text-xs leading-none"
    data-slot="emoji-picker-category-header"
  >
    {{ props.category.label }}
  </div>
</template>
