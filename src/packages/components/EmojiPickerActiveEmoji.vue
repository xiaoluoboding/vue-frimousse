<template>
  <slot :emoji="activeEmoji" />
</template>

<script setup lang="ts">
import { useActiveEmoji } from '../hooks';

// Remove props definition since we're using slots, not render props
const activeEmoji = useActiveEmoji();
</script>
