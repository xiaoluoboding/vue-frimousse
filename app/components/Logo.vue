<template>
  <div
    :class="cn(
      'relative size-6 [&>svg]:absolute [&>svg]:inset-0 [&>svg]:size-full',
      ($attrs.class as string) || ''
    )"
    v-bind="$attrs"
  >
    <component :is="currentIcon" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, h } from 'vue'
import { cn } from '~/lib/utils'

const INTERVAL = 400

const currentIndex = ref(0)

let interval: NodeJS.Timeout | null = null

const Face = () => h('svg', {
  fill: 'currentColor',
  viewBox: '0 0 24 24',
  xmlns: 'http://www.w3.org/2000/svg'
}, [
  h('title', 'Face'),
  h('path', {
    d: 'M5 3h14v2H5V3zm0 16H3V5h2v14zm14 0v2H5v-2h14zm0 0h2V5h-2v14zM10 8H8v2h2V8zm4 0h2v2h-2V8zm-5 6v-2H7v2h2zm6 0v2H9v-2h6zm0 0h2v-2h-2v2z'
  })
])

const Heart = () => h('svg', {
  fill: 'currentColor',
  viewBox: '0 0 24 24',
  xmlns: 'http://www.w3.org/2000/svg'
}, [
  h('title', 'Heart'),
  h('path', {
    d: 'M9 2H5v2H3v2H1v6h2v2h2v2h2v2h2v2h2v2h2v-2h2v-2h2v-2h2v-2h2v-2h2V6h-2V4h-2V2h-4v2h-2v2h-2V4H9V2zm0 2v2h2v2h2V6h2V4h4v2h2v6h-2v2h-2v2h-2v2h-2v2h-2v-2H9v-2H7v-2H5v-2H3V6h2V4h4z'
  })
])

const Flash = () => h('svg', {
  fill: 'currentColor',
  viewBox: '0 0 24 24',
  xmlns: 'http://www.w3.org/2000/svg'
}, [
  h('title', 'Flash'),
  h('path', {
    d: 'M12 1h2v8h8v4h-2v-2h-8V5h-2V3h2V1zM8 7V5h2v2H8zM6 9V7h2v2H6zm-2 2V9h2v2H4zm10 8v2h-2v2h-2v-8H2v-4h2v2h8v6h2zm2-2v2h-2v-2h2zm2-2v2h-2v-2h2zm0 0h2v-2h-2v2z'
  })
])

const ICONS = [Face, Heart, Flash]

const currentIcon = computed(() => ICONS[currentIndex.value])

onMounted(() => {
  interval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % ICONS.length
  }, INTERVAL)
})

onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
  }
})
</script>
