<template>
  <div
    ref="rootRef"
    :data-focused="isFocusedWithin ? '' : undefined"
    frimousse-root=""
    :style="{
      '--frimousse-emoji-font': EMOJI_FONT_FAMILY,
      ...rootStyle,
    }"
    :tabindex="-1"
    @focuscapture="handleFocusCapture"
    @blurcapture="handleBlurCapture"
    @keydown.enter.prevent="handleEnterKey"
    @keydown.up.prevent="handleArrowKey"
    @keydown.down.prevent="handleArrowKey"
    @keydown.left.prevent="handleArrowKey"
    @keydown.right.prevent="handleArrowKey"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, type CSSProperties } from 'vue';
import { EMOJI_FONT_FAMILY } from './constants';
import { validateLocale, validateSkinTone } from './data/emoji';
import { createEmojiPickerStore, provideEmojiPickerStore, type EmojiPickerStore } from './store';
import { useCreateStore } from './utils/store';
import { noop } from './utils/noop';
import type { EmojiPickerRootProps } from './types';
import { useEmojiPickerData } from './hooks';

interface Props extends EmojiPickerRootProps {
  style?: CSSProperties;
}

const props = withDefaults(defineProps<Props>(), {
  locale: 'en',
  columns: 9,
  skinTone: 'none',
  onEmojiSelect: () => noop,
  sticky: true,
  style: () => ({}),
});

const rootRef = ref<HTMLDivElement | null>(null);
const isFocusedWithin = ref(false);

const rootStyle = computed(() => props.style);

// Create store
const store = useCreateStore(() =>
  createEmojiPickerStore(
    props.onEmojiSelect || noop,
    validateLocale(props.locale || 'en'),
    props.columns || 9,
    props.sticky !== false,
    validateSkinTone(props.skinTone || 'none'),
  ),
);

// Provide store to child components
provideEmojiPickerStore(store);

// Initialize emoji data handling
useEmojiPickerData(store, {
  emojiVersion: props.emojiVersion,
  emojibaseUrl: props.emojibaseUrl,
});

// Watch for prop changes and update store
watch(() => props.locale, (newLocale) => {
  store.set({ locale: validateLocale(newLocale || 'en') });
});

watch(() => props.columns, (newColumns) => {
  store.set({ columns: newColumns || 9 });
});

watch(() => props.sticky, (newSticky) => {
  store.set({ sticky: newSticky !== false });
});

watch(() => props.skinTone, (newSkinTone) => {
  store.set({ skinTone: validateSkinTone(newSkinTone || 'none') });
});

// Set root ref in store
watch(rootRef, (element) => {
  if (element) {
    store.set({ rootRef });
  }
});

const handleFocusCapture = (event: FocusEvent) => {
  const { searchRef, viewportRef } = store.get();

  const isSearch =
    event.target === searchRef?.value ||
    (event.target as HTMLElement)?.hasAttribute?.("frimousse-search");

  const isViewport =
    event.target === viewportRef?.value ||
    (event.target as HTMLElement)?.hasAttribute?.("frimousse-viewport");

  if (!event.defaultPrevented) {
    isFocusedWithin.value = isSearch || isViewport;

    if (!event.defaultPrevented) {
      if (isViewport) {
        store.get().onActiveEmojiChange("keyboard", 0, 0);
      } else if (isSearch && store.get().search === "") {
        store.set({ interaction: "none" });
      }
    }
  }
};

const handleBlurCapture = (event: FocusEvent) => {
  if (
    !event.defaultPrevented &&
    !(event.currentTarget as HTMLElement)?.contains?.(event.relatedTarget as Node)
  ) {
    isFocusedWithin.value = false;
  }
};

// Reset active emoji when focus is lost
watch(isFocusedWithin, (focused) => {
  if (!focused) {
    store.get().onActiveEmojiReset();
  }
});

// Keyboard navigation handlers
const handleEnterKey = () => {
  if (!isFocusedWithin.value) {
    return;
  }

  const { data, onEmojiSelect, activeColumnIndex, activeRowIndex } = store.get();
  const activeEmoji = data?.rows[activeRowIndex]?.emojis[activeColumnIndex];

  if (activeEmoji) {
    onEmojiSelect(activeEmoji);
  }
};

const handleArrowKey = (event: KeyboardEvent) => {
  if (!isFocusedWithin.value) {
    return;
  }

  const {
    data,
    onActiveEmojiChange,
    interaction,
    activeColumnIndex,
    activeRowIndex,
  } = store.get();

  let columnIndex = activeColumnIndex;
  let rowIndex = activeRowIndex;

  if (interaction !== "none") {
    if (data?.rows && data.rows.length > 0) {
      switch (event.key) {
        case "ArrowLeft": {
          if (columnIndex === 0) {
            const previousRowIndex = rowIndex - 1;
            const previousRow = data.rows[previousRowIndex];

            // If first column, move to last column of previous row (if available)
            if (previousRow) {
              rowIndex = previousRowIndex;
              columnIndex = previousRow.emojis.length - 1;
            }
          } else {
            // Otherwise, move to previous column
            columnIndex -= 1;
          }

          break;
        }

        case "ArrowRight": {
          if (columnIndex === data.rows[rowIndex]!.emojis.length - 1) {
            const nextRowIndex = rowIndex + 1;
            const nextRow = data.rows[nextRowIndex];

            // If last column, move to first column of next row (if available)
            if (nextRow) {
              rowIndex = nextRowIndex;
              columnIndex = 0;
            }
          } else {
            // Otherwise, move to next column
            columnIndex += 1;
          }

          break;
        }

        case "ArrowUp": {
          const previousRow = data.rows[rowIndex - 1];

          // If not first row, move to previous row
          if (previousRow) {
            rowIndex -= 1;

            // If previous row doesn't have the same column, move to last column of previous row
            if (!previousRow.emojis[columnIndex]) {
              columnIndex = previousRow.emojis.length - 1;
            }
          }

          break;
        }

        case "ArrowDown": {
          const nextRow = data.rows[rowIndex + 1];

          // If not last row, move to next row
          if (nextRow) {
            rowIndex += 1;

            // If next row doesn't have the same column, move to last column of next row
            if (!nextRow.emojis[columnIndex]) {
              columnIndex = nextRow.emojis.length - 1;
            }
          }

          break;
        }
      }
    }

    onActiveEmojiChange("keyboard", columnIndex, rowIndex);
  } else {
    onActiveEmojiChange("keyboard", 0, 0);
  }
};

// CSS custom properties management
onMounted(() => {
  let previousViewportWidth: EmojiPickerStore["viewportWidth"] = null;
  let previousViewportHeight: EmojiPickerStore["viewportHeight"] = null;
  let previousRowHeight: EmojiPickerStore["rowHeight"] = null;
  let previousCategoryHeaderHeight: EmojiPickerStore["categoryHeaderHeight"] = null;

  const unsubscribe = store.subscribe((state) => {
    if (!rootRef.value) {
      return;
    }

    if (previousViewportWidth !== state.viewportWidth && rootRef.value) {
      previousViewportWidth = state.viewportWidth;

      rootRef.value.style.setProperty(
        "--frimousse-viewport-width",
        `${state.viewportWidth}px`,
      );
    }

    if (previousViewportHeight !== state.viewportHeight && rootRef.value) {
      previousViewportHeight = state.viewportHeight;

      rootRef.value.style.setProperty(
        "--frimousse-viewport-height",
        `${state.viewportHeight}px`,
      );
    }

    if (previousRowHeight !== state.rowHeight && rootRef.value) {
      previousRowHeight = state.rowHeight;

      rootRef.value.style.setProperty(
        "--frimousse-row-height",
        `${state.rowHeight}px`,
      );
    }

    if (previousCategoryHeaderHeight !== state.categoryHeaderHeight && rootRef.value) {
      previousCategoryHeaderHeight = state.categoryHeaderHeight;

      rootRef.value.style.setProperty(
        "--frimousse-category-header-height",
        `${state.categoryHeaderHeight}px`,
      );
    }
  });

  const { viewportWidth, viewportHeight, rowHeight, categoryHeaderHeight } = store.get();

  if (viewportWidth && rootRef.value) {
    rootRef.value.style.setProperty(
      "--frimousse-viewport-width",
      `${viewportWidth}px`,
    );
  }

  if (viewportHeight && rootRef.value) {
    rootRef.value.style.setProperty(
      "--frimousse-viewport-height",
      `${viewportHeight}px`,
    );
  }

  if (rowHeight && rootRef.value) {
    rootRef.value.style.setProperty(
      "--frimousse-row-height",
      `${rowHeight}px`,
    );
  }

  if (categoryHeaderHeight && rootRef.value) {
    rootRef.value.style.setProperty(
      "--frimousse-category-header-height",
      `${categoryHeaderHeight}px`,
    );
  }

  onUnmounted(() => {
    unsubscribe();
  });
});
</script>
