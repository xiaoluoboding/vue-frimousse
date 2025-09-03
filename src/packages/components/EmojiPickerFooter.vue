<template>
  <div
    frimousse-footer=""
    v-bind="$attrs"
  >
    <EmojiPickerActiveEmoji>
      <template #default="{ emoji }">
        <div v-if="emoji" style="display: flex; align-items: center; gap: 8px;">
          <div
            frimousse-footer-emoji=""
          >
            {{ emoji.emoji }}
          </div>
          <span
            frimousse-footer-emoji-label=""
          >
            {{ emoji.label }}
          </span>
        </div>
        <span
          v-else
          frimousse-footer-placeholder=""
        >
          Select an emoji…
        </span>
      </template>
    </EmojiPickerActiveEmoji>
  </div>
</template>

<script setup lang="ts">
import EmojiPickerActiveEmoji from './EmojiPickerActiveEmoji.vue';
import type { EmojiPickerFooterProps } from '../types';

defineProps<EmojiPickerFooterProps>();
</script>