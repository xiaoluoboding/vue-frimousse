<template>
  <div
    ref="viewportRef"
    frimousse-viewport=""
    :style="{
      position: 'relative',
      boxSizing: 'border-box',
      contain: 'layout paint',
      containIntrinsicSize:
        typeof rowsCount === 'number' && typeof categoriesCount === 'number'
          ? `var(--frimousse-viewport-width, auto) calc(${rowsCount} * var(--frimousse-row-height) + ${categoriesCount} * var(--frimousse-category-header-height))`
          : undefined,
      overflowY: 'auto',
      overscrollBehavior: 'contain',
      scrollbarGutter: 'stable',
      willChange: 'scroll-position',
      ...viewportStyle,
    }"
    @scroll.passive="handleScroll"
    v-bind="$attrs"
  >
    <ActiveEmojiAnnouncer />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useEmojiPickerStore } from '../store';
import { useSelector } from '../utils/store';
import { $rowsCount, $categoriesCount } from '../store';
import type { EmojiPickerViewportProps } from '../types';
import ActiveEmojiAnnouncer from './ActiveEmojiAnnouncer.vue';

interface Props extends EmojiPickerViewportProps {
  style?: Record<string, string | number>;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  scroll: [event: Event];
}>();

const viewportRef = ref<HTMLDivElement | null>(null);
const store = useEmojiPickerStore();
const rowsCount = useSelector(store, $rowsCount);
const categoriesCount = useSelector(store, $categoriesCount);

const viewportStyle = computed(() => props.style || {});

// Set viewport ref in store
watch(viewportRef, (element) => {
  if (element) {
    store.set({ viewportRef });
  }
});

const handleScroll = (event: Event) => {
  emit('scroll', event);

  const target = event.currentTarget as HTMLDivElement;
  store.get().onViewportScroll(target.scrollTop);
};

// Setup ResizeObserver for viewport size changes
onMounted(() => {
  if (!viewportRef.value) {
    return;
  }

  const resizeObserver = new ResizeObserver(([entry]) => {
    const width = entry?.borderBoxSize[0]?.inlineSize ?? 0;
    const height = entry?.borderBoxSize[0]?.blockSize ?? 0;

    const { onViewportSizeChange, viewportHeight, viewportWidth } = store.get();

    if (viewportHeight !== height || viewportWidth !== width) {
      onViewportSizeChange(width, height);
    }
  });

  resizeObserver.observe(viewportRef.value);

  store
    .get()
    .onViewportSizeChange(viewportRef.value.offsetWidth, viewportRef.value.clientHeight);

  onUnmounted(() => {
    resizeObserver.disconnect();
  });
});
</script>
