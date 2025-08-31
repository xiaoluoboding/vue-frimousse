<template>
  <slot 
    :skin-tone="skinTone" 
    :set-skin-tone="setSkinTone" 
    :skin-tone-variations="skinToneVariations" 
  />
</template>

<script setup lang="ts">
import { useSkinTone } from '../hooks';
import type { EmojiPickerSkinToneProps } from '../types';

const props = withDefaults(defineProps<EmojiPickerSkinToneProps>(), {
  emoji: '✋',
});

const [skinTone, setSkinTone, skinToneVariations] = useSkinTone(props.emoji);
</script>
