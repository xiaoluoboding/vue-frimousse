<template>
  <button
    type="button"
    :aria-label="ariaLabel + (nextSkinToneLabel ? ` (${nextSkinToneLabel})` : '')"
    aria-live="polite"
    frimousse-skin-tone-selector=""
    @click="handleClick"
    v-bind="$attrs"
  >
    {{ skinToneVariation.emoji }}
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSkinTone } from '../hooks';
import { useEmojiPickerStore } from '../store';
import { useSelector } from '../utils/store';
import { $skinTones } from '../store';
import { shallow } from '../utils/compare';
import type { EmojiPickerSkinToneSelectorProps } from '../types';

interface Props extends EmojiPickerSkinToneSelectorProps {
  'aria-label'?: string;
}

const props = withDefaults(defineProps<Props>(), {
  emoji: '✋',
  'aria-label': 'Change skin tone',
});

const emit = defineEmits<{
  click: [event: Event];
}>();

const store = useEmojiPickerStore();
const skinTones = useSelector(store, $skinTones, shallow);
const [skinTone, setSkinTone, skinToneVariations] = useSkinTone(props.emoji);

const skinToneVariationIndex = computed(() =>
  Math.max(
    0,
    skinToneVariations.findIndex(
      (variation) => variation.skinTone === skinTone.value,
    ),
  )
);

const skinToneVariation = computed(() => skinToneVariations[skinToneVariationIndex.value]!);

const nextSkinToneVariation = computed(() =>
  skinToneVariations[
    (skinToneVariationIndex.value + 1) % skinToneVariations.length
  ]!
);

const nextSkinTone = computed(() => nextSkinToneVariation.value.skinTone);

const nextSkinToneLabel = computed(() =>
  nextSkinTone.value === "none" ? undefined : skinTones.value?.[nextSkinTone.value]
);

const ariaLabel = computed(() => props['aria-label'] || 'Change skin tone');

const handleClick = (event: Event) => {
  emit('click', event);

  if (!event.defaultPrevented) {
    setSkinTone(nextSkinTone.value);
  }
};
</script>
