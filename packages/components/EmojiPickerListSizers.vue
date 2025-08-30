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
      <component
        :is="Row"
        :role="undefined"
        :aria-rowindex="undefined"
        frimousse-row=""
        :style="{
          contain: undefined,
          height: undefined,
          display: 'flex',
        }"
      >
        <component
          v-for="(emoji, index) in emojis"
          :key="index"
          :is="Emoji"
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
          :emoji="{ ...emoji, isActive: false }"
        />
      </component>
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
        <component
          :is="CategoryHeader"
          frimousse-category-header=""
          :style="{
            contain: undefined,
            height: undefined,
            pointerEvents: 'auto',
            position: undefined,
            top: 0,
          }"
          :category="category"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useEmojiPickerStore } from '../store';
import { useSelectorKey } from '../utils/store';
import type { EmojiPickerEmoji, EmojiPickerCategory, EmojiPickerListComponents } from '../types';

interface Props {
  CategoryHeader: EmojiPickerListComponents['CategoryHeader'];
  Row: EmojiPickerListComponents['Row'];
  Emoji: EmojiPickerListComponents['Emoji'];
}

defineProps<Props>();

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
