<template>
  <span
    v-if="isEmpty"
    frimousse-empty=""
    v-bind="$attrs"
  >
    <EmojiPickerEmptyWithSearch v-if="$slots.default">
      <template #default="{ search }">
        <slot :search="search" />
      </template>
    </EmojiPickerEmptyWithSearch>
    <slot v-else :search="''" />
  </span>
</template>

<script setup lang="ts">
import { useEmojiPickerStore } from '../store';
import { useSelector } from '../utils/store';
import { $isEmpty } from '../store';
import type { EmojiPickerEmptyProps, EmojiPickerEmptyRenderProps } from '../types';
import EmojiPickerEmptyWithSearch from './EmojiPickerEmptyWithSearch.vue';

defineProps<EmojiPickerEmptyProps>();

defineSlots<{
  default?: (props: EmojiPickerEmptyRenderProps) => void
}>()

const store = useEmojiPickerStore();
const isEmpty = useSelector(store, $isEmpty);
</script>
