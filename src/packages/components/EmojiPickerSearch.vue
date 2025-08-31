<template>
  <input
    ref="searchRef"
    autocapitalize="off"
    autocomplete="off"
    autocorrect="off"
    enterkeyhint="done"
    frimousse-search=""
    placeholder="Search…"
    :spellcheck="false"
    type="search"
    :default-value="props.defaultValue"
    :value="props.value"
    @input="handleInput"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useEmojiPickerStore } from '../store';
import type { EmojiPickerSearchProps } from '../types';

const props = defineProps<EmojiPickerSearchProps>();
const emit = defineEmits<{
  change: [event: Event];
}>();

const searchRef = ref<HTMLInputElement | null>(null);
const store = useEmojiPickerStore();
// const isControlled = typeof props.value === "string";

// Set search ref in store
watch(searchRef, (element) => {
  if (element) {
    store.set({ searchRef });
  }
});

// Initialize search with controlled or uncontrolled value
onMounted(() => {
  store.set({
    search:
      typeof props.value === "string"
        ? props.value
        : typeof props.defaultValue === "string"
          ? props.defaultValue
          : "",
  });
});

// Handle controlled value changes
watch(() => props.value, (newValue) => {
  if (typeof newValue === "string") {
    store.get().onSearchChange(newValue);
  }
});

const handleInput = (event: Event) => {
  emit('change', event);

  if (!event.defaultPrevented) {
    const target = event.target as HTMLInputElement;
    store.get().onSearchChange(target.value);
  }
};
</script>
