<script setup lang="ts">
import { cn } from '~/lib/utils'

interface Props {
  emoji: string
  class?: string
}

defineProps<Props>()
</script>

<template>
  <div
    :class="cn(
      'group rounded-full border border-border border-dotted bg-background px-2.5 py-1 text-muted-foreground text-sm tabular-nums',
      $props.class
    )"
  >
    <span class="inline-flex items-center gap-1.5">
      <span class="relative">{{ emoji }}</span>
      <span class="inline-flex w-[1ch] justify-center">0</span>
    </span>
  </div>
</template>
