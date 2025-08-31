<template>
  <span
    v-if="isLoading"
    frimousse-loading=""
    v-bind="$attrs"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { useEmojiPickerStore } from '../store';
import { useSelector } from '../utils/store';
import { $isLoading } from '../store';
import type { EmojiPickerLoadingProps } from '../types';

defineProps<EmojiPickerLoadingProps>();

const store = useEmojiPickerStore();
const isLoading = useSelector(store, $isLoading);
</script>
