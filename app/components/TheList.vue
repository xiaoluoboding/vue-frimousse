<template>
  <div
    :aria-colcount="columns"
    :aria-rowcount="rows"
    frimousse-list=""
    role="grid"
    v-bind="$attrs"
    @pointercancel="clearActiveEmojis"
    @pointerdown="setActiveEmoji"
    @pointerleave="clearActiveEmojis"
    @pointermove="setActiveEmoji"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  rows: number
  columns: number
}

defineProps<Props>()

defineOptions({
  inheritAttrs: false
})

const clearActiveEmojis = () => {
  const emojis = Array.from(document.querySelectorAll("[frimousse-emoji]"))

  for (const emoji of emojis) {
    emoji.removeAttribute("data-active")
  }
}

const setActiveEmoji = (event: PointerEvent) => {
  clearActiveEmojis()

  const emoji = document.elementFromPoint(event.clientX, event.clientY)

  if (emoji?.hasAttribute("frimousse-emoji")) {
    emoji.setAttribute("data-active", "")
  }
}
</script>