<template>
  <div
    ref="sizersRef"
    aria-hidden="true"
    :style="{
      height: 0,
      visibility: 'hidden',
    }"
  >
    <div ref="rowRef" frimousse-row-sizer="">
      <div
        :role="undefined"
        :aria-rowindex="undefined"
        frimousse-row=""
        :style="{
          contain: undefined,
          height: undefined,
          display: 'flex',
        }"
      >
        <div
          v-for="(emoji, index) in emojis"
          :key="index"
          :role="'gridcell'"
          :aria-colindex="index"
          :aria-selected="undefined"
          :aria-label="emoji.label"
          :data-active="undefined"
          frimousse-emoji=""
          :style="{
            fontFamily: 'var(--frimousse-emoji-font)',
          }"
          :tabindex="-1"
        >
          <slot name="emoji" :emoji="{ ...emoji, isActive: false }" />
        </div>
      </div>
    </div>
    <div
      frimousse-category=""
      :style="{
        contain: 'content',
        top: undefined,
        height: undefined,
        width: '100%',
        pointerEvents: 'none',
        position: 'absolute',
      }"
    >
      <div ref="categoryHeaderRef" frimousse-category-header-sizer="">
        <div
          frimousse-category-header=""
          :style="{
            contain: undefined,
            height: undefined,
            pointerEvents: 'auto',
            position: undefined,
            top: 0,
          }"
        >
          <slot name="category-header" :category="category" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useEmojiPickerStore } from '../store';
import { useSelectorKey } from '../utils/store';
import type { EmojiPickerEmoji, EmojiPickerCategory } from '../types';


const sizersRef = ref<HTMLDivElement | null>(null);
const rowRef = ref<HTMLDivElement | null>(null);
const categoryHeaderRef = ref<HTMLDivElement | null>(null);

const store = useEmojiPickerStore();
const columns = useSelectorKey(store, "columns");

const emojis = computed(() =>
  Array<EmojiPickerEmoji>(columns.value).fill({
    emoji: "🙂",
    label: "",
  })
);

const category = computed((): EmojiPickerCategory => ({
  label: "Category",
}));

onMounted(() => {
  const list = sizersRef.value?.parentElement?.parentElement;

  if (!list || !rowRef.value || !categoryHeaderRef.value) {
    return;
  }

  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const height = entry.contentRect.height;

      const {
        onRowHeightChange,
        onCategoryHeaderHeightChange,
        rowHeight,
        categoryHeaderHeight,
      } = store.get();

      if (entry.target === rowRef.value && rowHeight !== height) {
        onRowHeightChange(height);
      }

      if (
        entry.target === categoryHeaderRef.value &&
        categoryHeaderHeight !== height
      ) {
        onCategoryHeaderHeightChange(height);
      }
    }
  });

  resizeObserver.observe(list);
  resizeObserver.observe(rowRef.value);
  resizeObserver.observe(categoryHeaderRef.value);

  const { onRowHeightChange, onCategoryHeaderHeightChange } = store.get();

  onRowHeightChange(rowRef.value.clientHeight);
  onCategoryHeaderHeightChange(categoryHeaderRef.value.clientHeight);

  onUnmounted(() => {
    resizeObserver.disconnect();
  });
});
</script>
