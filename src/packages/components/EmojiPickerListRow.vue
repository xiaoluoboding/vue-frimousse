<template>
  <div
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
      :emoji-meta="emoji"
      :rowIndex="rowIndex"
    >
      <template #emoji="{ emoji: emojiData }">
        <slot name="emoji" :emoji="emojiData" />
      </template>
    </EmojiPickerListEmoji>
  </div>
</template>

<script setup lang="ts">
import { useEmojiPickerStore } from '../store';
import { useSelector } from '../utils/store';
import { sameEmojiPickerRow } from '../store';
import EmojiPickerListEmoji from './EmojiPickerListEmoji.vue';

interface Props {
  rowIndex: number;
}

const props = defineProps<Props>();

const store = useEmojiPickerStore();
const row = useSelector(
  store,
  (state) => state.data?.rows[props.rowIndex],
  sameEmojiPickerRow,
);
</script>
