<template>
  <component
    :is="Row"
    :role="'row'"
    :aria-rowindex="rowIndex"
    frimousse-row=""
    :style="{
      contain: 'content',
      height: 'var(--frimousse-row-height)',
      display: 'flex',
    }"
  >
    <EmojiPickerListEmoji
      v-for="(emoji, columnIndex) in row?.emojis || []"
      :key="emoji.label"
      :columnIndex="columnIndex"
      :Emoji="Emoji"
      :emoji="emoji"
      :rowIndex="rowIndex"
    />
  </component>
</template>

<script setup lang="ts">
import { useEmojiPickerStore } from '../store';
import { useSelector } from '../utils/store';
import { sameEmojiPickerRow } from '../store';
import EmojiPickerListEmoji from './EmojiPickerListEmoji.vue';
import type { EmojiPickerListComponents } from '../types';

interface Props {
  rowIndex: number;
  Emoji: EmojiPickerListComponents['Emoji'];
  Row: EmojiPickerListComponents['Row'];
}

const props = defineProps<Props>();

const store = useEmojiPickerStore();
const row = useSelector(
  store,
  (state) => state.data?.rows[props.rowIndex],
  sameEmojiPickerRow,
);
</script>
