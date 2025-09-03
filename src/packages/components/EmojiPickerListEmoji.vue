<template>
  <div
    :role="'gridcell'"
    :aria-colindex="columnIndex"
    :aria-selected="isActive || undefined"
    :aria-label="emojiMeta.label"
    :data-active="isActive ? '' : undefined"
    frimousse-emoji=""
    :style="{
      fontFamily: 'var(--frimousse-emoji-font)',
    }"
    :tabindex="-1"
    @click="handleSelect"
    @pointerdown="preventDefault"
    @pointerenter="handlePointerEnter"
    @pointerleave="handlePointerLeave"
  >
    <slot name="emoji" :emoji="{ ...emojiMeta, isActive }" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useEmojiPickerStore } from '../store';
import { useSelector } from '../utils/store';
import { $activeEmoji } from '../store';
import type { EmojiPickerEmoji } from '../types';

interface Props {
  emojiMeta: EmojiPickerEmoji;
  columnIndex: number;
  rowIndex: number;
}

const props = defineProps<Props>();

const store = useEmojiPickerStore();
const activeEmoji = useSelector(store, $activeEmoji);

const isActive = computed(() => activeEmoji.value?.emoji === props.emojiMeta.emoji);

const handleSelect = () => {
  store.get().onEmojiSelect(props.emojiMeta);
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
