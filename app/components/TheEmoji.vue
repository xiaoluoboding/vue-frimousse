<template>
  <button
    :aria-colindex="index"
    :aria-label="emoji.label"
    :class="cn(
      'group relative size-12 rounded-[20%] text-2xl outline-none transition duration-200 ease-out',
      'focus-visible:bg-(--color) hover:bg-(--color) focus-visible:duration-0 data-[active]:bg-(--color) data-[active]:duration-0',
      '[--color-red:--alpha(var(--color-rose-500)/12%)] dark:[--color-red:--alpha(var(--color-rose-400)/26%)]',
      '[--color-green:--alpha(var(--color-lime-500)/18%)] dark:[--color-green:--alpha(var(--color-lime-400)/28%)]',
      '[--color-blue:--alpha(var(--color-sky-500)/12%)] dark:[--color-blue:--alpha(var(--color-sky-400)/22%)]',
      'group-odd:nth-[3n+1]:[--color:var(--color-red)] group-even:nth-[3n+2]:[--color:var(--color-red)]',
      'group-odd:nth-[3n+2]:[--color:var(--color-green)] group-even:nth-[3n+3]:[--color:var(--color-green)]',
      'group-odd:nth-[3n+3]:[--color:var(--color-blue)] group-even:nth-[3n+1]:[--color:var(--color-blue)]',
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
    {{ emoji.emoji }}
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