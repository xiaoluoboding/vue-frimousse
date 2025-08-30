<template>
  <div
    ref="listRef"
    :aria-colcount="columns"
    :aria-rowcount="rowsCount || 0"
    frimousse-list=""
    role="grid"
    :style="{
      '--frimousse-list-columns': columns,
      ...listStyle,
    }"
    v-bind="$attrs"
  >
    <div
      v-if="!rowsCount || !categoriesRowsStartIndices || categoriesCount === 0"
      :style="listSizerStyle(0, 0, 0, 0)"
    >
      <EmojiPickerListSizers
        :CategoryHeader="CategoryHeader"
        :Emoji="Emoji"
        :Row="Row"
      />
    </div>
    <div
      v-else
      :style="listSizerStyle(
        rowsCount,
        categoriesCount,
        viewportStartRowIndex,
        previousHeadersCount,
      )"
    >
      <EmojiPickerListSizers
        :CategoryHeader="CategoryHeader"
        :Emoji="Emoji"
        :Row="Row"
      />
      <template
        v-for="index in viewportEndRowIndex - viewportStartRowIndex + 1"
        :key="viewportStartRowIndex + index - 1"
      >
        <template v-if="getCategoryIndex(viewportStartRowIndex + index - 1) >= 0">
          <div
            :style="{
              height: 'var(--frimousse-category-header-height)',
            }"
          />
        </template>
        <EmojiPickerListRow
          :Emoji="Emoji"
          :Row="Row"
          :row-index="viewportStartRowIndex + index - 1"
        />
      </template>
      <EmojiPickerListCategory
        v-for="index in categoriesCount"
        :key="index - 1"
        :CategoryHeader="CategoryHeader"
        :category-index="index - 1"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useEmojiPickerStore } from '../store';
import { useSelector, useSelectorKey } from '../utils/store';
import { $rowsCount, $categoriesRowsStartIndices } from '../store';
import { shallow } from '../utils/compare';
import type { EmojiPickerListProps } from '../types';
import EmojiPickerListSizers from './EmojiPickerListSizers.vue';
import EmojiPickerListRow from './EmojiPickerListRow.vue';
import EmojiPickerListCategory from './EmojiPickerListCategory.vue';
import DefaultEmojiPickerListCategoryHeader from './DefaultEmojiPickerListCategoryHeader.vue';
import DefaultEmojiPickerListEmoji from './DefaultEmojiPickerListEmoji.vue';
import DefaultEmojiPickerListRow from './DefaultEmojiPickerListRow.vue';

interface Props extends EmojiPickerListProps {
  style?: Record<string, string | number>;
}

const props = defineProps<Props>();

const listRef = ref<HTMLDivElement | null>(null);
const store = useEmojiPickerStore();

const CategoryHeader = computed(() => 
  props.components?.CategoryHeader ?? DefaultEmojiPickerListCategoryHeader
);
const Emoji = computed(() => 
  props.components?.Emoji ?? DefaultEmojiPickerListEmoji
);
const Row = computed(() => 
  props.components?.Row ?? DefaultEmojiPickerListRow
);

const columns = useSelectorKey(store, "columns");
const viewportStartRowIndex = useSelectorKey(store, "viewportStartRowIndex");
const viewportEndRowIndex = useSelectorKey(store, "viewportEndRowIndex");
const rowsCount = useSelector(store, $rowsCount);
const categoriesRowsStartIndices = useSelector(store, $categoriesRowsStartIndices, shallow);

const categoriesCount = computed(() => categoriesRowsStartIndices.value?.length ?? 0);

const previousHeadersCount = computed(() => {
  return (
    categoriesRowsStartIndices.value?.filter(
      (index) => index < viewportStartRowIndex.value,
    ).length ?? 0
  );
});

const listStyle = computed(() => props.style || {});

// Set list ref in store
watch(listRef, (element) => {
  if (element) {
    store.set({ listRef });
  }
});

const getCategoryIndex = (rowIndex: number) => {
  return categoriesRowsStartIndices.value?.indexOf(rowIndex) ?? -1;
};

const listSizerStyle = (
  rowsCount: number,
  categoriesCount: number,
  viewportStartRowIndex: number,
  previousHeadersCount: number,
) => ({
  position: 'relative' as const,
  boxSizing: 'border-box' as const,
  height: `calc(${rowsCount} * var(--frimousse-row-height) + ${categoriesCount} * var(--frimousse-category-header-height))`,
  paddingTop: `calc(${viewportStartRowIndex} * var(--frimousse-row-height) + ${previousHeadersCount} * var(--frimousse-category-header-height))`,
});
</script>
