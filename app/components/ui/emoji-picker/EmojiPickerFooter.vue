<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { default as EmojiPickerPrimitive } from '@/packages'
import { cn } from '~/lib/utils'
import { buttonVariants } from '../button';

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <div
    :class="cn(
      'flex w-full min-w-0 max-w-[var(--frimousse-viewport-width)] items-center gap-1 border-t p-2',
      props.class
    )"
    data-slot="emoji-picker-footer"
    v-bind="$attrs"
  >
    <EmojiPickerPrimitive.ActiveEmoji v-slot="{ emoji }">
      <div
        class="flex items-center justify-between w-full"
      >
        <template v-if="emoji">
          <div class="flex items-center gap-1 flex-1">
            <div class="flex size-7 flex-none items-center justify-center text-lg">
              {{ emoji.emoji }}
            </div>
            <span class="truncate text-secondary-foreground text-xs">{{ emoji.label }}</span>
          </div>
        </template>
        <template v-else>
          <span class="ml-1.5 flex h-7 items-center truncate text-muted-foreground text-xs">
            Select an emoji…
          </span>
        </template>
        <EmojiPickerPrimitive.SkinToneSelector
          :class="cn(buttonVariants({ variant: 'secondary', size: 'icon' }), 'rounded-md size-7')"
          title="Change skin tone"
        />
      </div>
    </EmojiPickerPrimitive.ActiveEmoji>
  </div>
</template>
