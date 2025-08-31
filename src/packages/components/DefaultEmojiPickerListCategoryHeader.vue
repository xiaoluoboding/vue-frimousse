<template>
  <div v-bind="$attrs">
    {{ category.label }}
  </div>
</template>

<script setup lang="ts">
import type { EmojiPickerListCategoryHeaderProps } from '../types';

const props = defineProps<EmojiPickerListCategoryHeaderProps>();

// Access category from props
const { category } = props;
</script>
