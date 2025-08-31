<template>
  <div v-bind="$attrs">
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { EmojiPickerListRowProps } from '../types';

defineProps<EmojiPickerListRowProps>();
</script>
