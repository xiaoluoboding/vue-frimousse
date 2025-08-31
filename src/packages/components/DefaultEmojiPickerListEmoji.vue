<template>
  <button 
    type="button" 
    v-bind="$attrs"
  >
    {{ emoji.emoji }}
  </button>
</template>

<script setup lang="ts">
import type { EmojiPickerListEmojiProps } from '../types';

const props = defineProps<EmojiPickerListEmojiProps>();

// Access emoji from props
const { emoji } = props;
</script>
