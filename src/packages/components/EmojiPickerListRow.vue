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
    :class="rowClass"
  >
    <EmojiPickerListEmoji
      v-for="(emoji, columnIndex) in row?.emojis || []"
      :key="`${emoji.label}-${emoji.emoji}`"
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

type ClassValue = string | Record<string, boolean> | Array<string | Record<string, boolean>>;

interface Props {
  rowIndex: number;
  rowClass?: ClassValue;
}

const props = defineProps<Props>();

const store = useEmojiPickerStore();
const row = useSelector(
  store,
  (state) => state.data?.rows[props.rowIndex],
  sameEmojiPickerRow,
);
</script>
