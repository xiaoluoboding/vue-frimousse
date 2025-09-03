<template>
  <div
    v-if="category"
    frimousse-category=""
    :style="{
      contain: 'content',
      top: category
        ? `calc(${categoryIndex} * var(--frimousse-category-header-height) + ${category.startRowIndex} * var(--frimousse-row-height))`
        : undefined,
      height: category
        ? `calc(var(--frimousse-category-header-height) + ${category.rowsCount} * var(--frimousse-row-height))`
        : undefined,
      width: '100%',
      pointerEvents: 'none',
      position: 'absolute',
    }"
  >
    <div
      frimousse-category-header=""
      :style="{
        contain: 'layout paint',
        height: 'var(--frimousse-category-header-height)',
        pointerEvents: 'auto',
        position: sticky ? 'sticky' : undefined,
        top: 0,
      }"
    >
      <slot name="category-header" :category="{ label: category.label }" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEmojiPickerStore } from '../store';
import { useSelector, useSelectorKey } from '../utils/store';
import { shallow } from '../utils/compare';

interface Props {
  categoryIndex: number;
}

const props = defineProps<Props>();

const store = useEmojiPickerStore();
const category = useSelector(
  store,
  (state) => state.data?.categories[props.categoryIndex],
  shallow,
);
const sticky = useSelectorKey(store, "sticky");
</script>
