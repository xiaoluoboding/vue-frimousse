<template>
  <span
    v-if="isEmpty"
    frimousse-empty=""
    v-bind="$attrs"
  >
    <EmojiPickerEmptyWithSearch v-if="typeof $slots.default === 'function'">
      <template #default="{ search }">
        <slot :search="search" />
      </template>
    </EmojiPickerEmptyWithSearch>
    <slot v-else />
  </span>
</template>

<script setup lang="ts">
import { useEmojiPickerStore } from '../store';
import { useSelector } from '../utils/store';
import { $isEmpty } from '../store';
import type { EmojiPickerEmptyProps } from '../types';
import EmojiPickerEmptyWithSearch from './EmojiPickerEmptyWithSearch.vue';

defineProps<EmojiPickerEmptyProps>();

const store = useEmojiPickerStore();
const isEmpty = useSelector(store, $isEmpty);
</script>
