<template>
  <component
    :is="Emoji"
    :role="'gridcell'"
    :aria-colindex="columnIndex"
    :aria-selected="isActive || undefined"
    :aria-label="emoji.label"
    :data-active="isActive ? '' : undefined"
    frimousse-emoji=""
    :style="{
      fontFamily: 'var(--frimousse-emoji-font)',
    }"
    :tabindex="-1"
    :emoji="{ ...emoji, isActive }"
    @click="handleSelect"
    @pointerdown="preventDefault"
    @pointerenter="handlePointerEnter"
    @pointerleave="handlePointerLeave"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useEmojiPickerStore } from '../store';
import { useSelector } from '../utils/store';
import { $activeEmoji } from '../store';
import type { EmojiPickerEmoji, EmojiPickerListComponents } from '../types';

interface Props {
  emoji: EmojiPickerEmoji;
  columnIndex: number;
  rowIndex: number;
  Emoji: EmojiPickerListComponents['Emoji'];
}

const props = defineProps<Props>();

const store = useEmojiPickerStore();
const activeEmoji = useSelector(store, $activeEmoji);

const isActive = computed(() => activeEmoji.value?.emoji === props.emoji.emoji);

const handleSelect = () => {
  store.get().onEmojiSelect(props.emoji);
};

const handlePointerEnter = () => {
  store.get().onActiveEmojiChange("pointer", props.columnIndex, props.rowIndex);
};

const handlePointerLeave = () => {
  store.get().onActiveEmojiReset();
};

const preventDefault = (event: Event) => {
  event.preventDefault();
};
</script>
