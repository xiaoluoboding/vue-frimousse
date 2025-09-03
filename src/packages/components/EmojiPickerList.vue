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
      <EmojiPickerListSizers>
        <template #category-header="{ category }">
          <slot name="category-header" :category="category">
            <DefaultEmojiPickerListCategoryHeader :category="category" />
          </slot>
        </template>
        <template #emoji="{ emoji }">
          <slot name="emoji" :emoji="emoji">
            <DefaultEmojiPickerListEmoji :emoji="emoji" />
          </slot>
        </template>
        <template #row="{ rowProps }">
          <slot name="row" v-bind="rowProps">
            <DefaultEmojiPickerListRow v-bind="rowProps" />
          </slot>
        </template>
      </EmojiPickerListSizers>
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
      <EmojiPickerListSizers>
        <template #category-header="{ category }">
          <slot name="category-header" :category="category">
            <DefaultEmojiPickerListCategoryHeader :category="category" />
          </slot>
        </template>
        <template #emoji="{ emoji }">
          <slot name="emoji" :emoji="emoji">
            <DefaultEmojiPickerListEmoji :emoji="emoji" />
          </slot>
        </template>
        <template #row="{ rowProps }">
          <slot name="row" v-bind="rowProps">
            <DefaultEmojiPickerListRow v-bind="rowProps" />
          </slot>
        </template>
      </EmojiPickerListSizers>
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
          :row-index="viewportStartRowIndex + index - 1"
        >
          <template #emoji="{ emoji }">
            <slot name="emoji" :emoji="emoji">
              <DefaultEmojiPickerListEmoji :emoji="emoji" />
            </slot>
          </template>
          <template #row="{ rowProps }">
            <slot name="row" v-bind="rowProps">
              <DefaultEmojiPickerListRow v-bind="rowProps" />
            </slot>
          </template>
        </EmojiPickerListRow>
      </template>
      <EmojiPickerListCategory
        v-for="index in categoriesCount"
        :key="index - 1"
        :category-index="index - 1"
      >
        <template #category-header="{ category }">
          <slot name="category-header" :category="category">
            <DefaultEmojiPickerListCategoryHeader :category="category" />
          </slot>
        </template>
        <template #emoji="{ emoji }">
          <slot name="emoji" :emoji="emoji">
            <DefaultEmojiPickerListEmoji :emoji="emoji" />
          </slot>
        </template>
        <template #row="{ rowProps }">
          <slot name="row" v-bind="rowProps">
            <DefaultEmojiPickerListRow v-bind="rowProps" />
          </slot>
        </template>
      </EmojiPickerListCategory>
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
