<template>
  <div
    v-if="activeEmoji"
    aria-live="polite"
    :style="{
      border: 0,
      clip: 'rect(0, 0, 0, 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      whiteSpace: 'nowrap',
      width: 1,
      wordWrap: 'normal',
    }"
  >
    {{ activeEmoji.label }}
  </div>
</template>

<script setup lang="ts">
import { useActiveEmoji } from '../hooks';

const activeEmoji = useActiveEmoji();
</script>
