<template>
  <div
    frimousse-footer=""
    :style="{
      display: 'flex',
      width: '100%',
      minWidth: '0',
      maxWidth: 'var(--frimousse-viewport-width)',
      alignItems: 'center',
      gap: '4px',
      borderTop: '1px solid light-dark(#e5e7eb, #374151)',
      padding: '8px',
    }"
    v-bind="$attrs"
  >
    <EmojiPickerActiveEmoji>
      <template #default="{ emoji }">
        <div v-if="emoji" style="display: flex; align-items: center; gap: 8px;">
          <div
            :style="{
              display: 'flex',
              width: '28px',
              height: '28px',
              flexShrink: '0',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
            }"
          >
            {{ emoji.emoji }}
          </div>
          <span
            :style="{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              color: 'light-dark(#6b7280, #9ca3af)',
              fontSize: '12px',
            }"
          >
            {{ emoji.label }}
          </span>
        </div>
        <span
          v-else
          :style="{
            marginLeft: '6px',
            display: 'flex',
            height: '28px',
            alignItems: 'center',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            color: 'light-dark(#9ca3af, #6b7280)',
            fontSize: '12px',
          }"
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