<template>
  <button
    :aria-colindex="index"
    :aria-label="emoji.label"
    :class="cn(
      'group relative size-12 rounded-[20%] text-2xl outline-none transition duration-200 ease-out',
      'focus-visible:bg-gray-400/10 hover:bg-gray-400/10 focus-visible:duration-0 data-[active]:bg-gray-400/10 data-[active]:duration-0 dark:data-[active]:bg-gray-400/20 dark:focus-visible:bg-gray-400/20 dark:hover:bg-gray-400/20',
      className,
    )"
    role="gridcell"
    :style="{
      fontFamily: `'Apple Color Emoji', 'Noto Color Emoji', 'Twemoji Mozilla', 'Android Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', EmojiSymbols, sans-serif`,
      ...style,
    }"
    type="button"
    v-bind="$attrs"
    @click="handleClick"
  >
    <span
      aria-hidden="true"
      :class="cn(
        'pointer-events-none absolute inset-0 hidden items-center justify-center overflow-hidden rounded-[inherit] opacity-0 transition-[display,opacity] transition-discrete duration-200 ease-out',
        'group-focus-visible:flex group-focus-visible:opacity-100 group-focus-visible:duration-0 group-data-[active]:flex group-data-[active]:opacity-100 group-data-[active]:duration-0 group-hover:flex group-hover:opacity-100 group-hover:duration-0',
      )"
    >
      <span class="text-[2.5em] opacity-20 blur-lg saturate-200">
        {{ emoji.emoji }}
      </span>
    </span>
    <span class="pointer-events-none relative">{{ emoji.emoji }}</span>
  </button>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'
import { cn } from '../lib/utils'

interface EmojiObject {
  emoji: string
  label: string
}

interface Props {
  emoji: EmojiObject
  index: number
  style?: Record<string, string>
  className?: string
}

const props = defineProps<Props>()

defineOptions({
  inheritAttrs: false
})

const handleClick = () => {
  toast(`${props.emoji.emoji} ${props.emoji.label}`)
}
</script>