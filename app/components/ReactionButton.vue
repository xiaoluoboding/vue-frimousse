<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import NumberFlow from '@number-flow/vue'
import { cn } from '~/lib/utils'
// import { buttonVariants } from '~/components/ui/button'
import { useIsMounted } from '~/composables/useIsMounted'

interface Props {
  emoji: string
  count: number
  active?: boolean
  hidden?: boolean
  disabled?: boolean
  type?: 'fallback' | 'server' | 'client'
}

withDefaults(defineProps<Props>(), {
  active: false,
  hidden: false,
  disabled: false,
  type: 'client'
})

const emit = defineEmits<{
  click: []
}>()

const isMounted = useIsMounted()

// Composable for initial render detection
const isInitialRender = ref(true)
onMounted(() => {
  nextTick(() => {
    isInitialRender.value = false
  })
})

// Number flow transition config
const numberFlowTransition = {
  duration: 300,
  easing: 'cubic-bezier(0.75, 0, 0.175, 1)',
}

const handleClick = () => {
  emit('click')
}
</script>

<template>
  <button
    :aria-hidden="hidden ? 'true' : undefined"
    :aria-label="`${count} reaction${count !== 1 ? 's' : ''} with ${emoji}`"
    :aria-pressed="active"
    :class="cn(
      'group rounded-full border border-transparent bg-muted px-2.5 py-1 text-sm tabular-nums will-change-transform hover:border-border hover:bg-background focus-visible:border-border focus-visible:bg-background data-[state=open]:border-border data-[state=open]:bg-background',
      active && !isInitialRender
        ? 'border-emerald-600/80 bg-emerald-600/10 text-emerald-600 outline-emerald-600/20 selection:bg-emerald-600/30 hover:border-emerald-600 hover:bg-emerald-600/20 focus-visible:border-emerald-600 dark:bg-emerald-600/20 dark:focus-visible:bg-emerald-600/20 dark:hover:bg-emerald-600/30 dark:selection:bg-emerald-600/40'
        : 'text-secondary-foreground focus-visible:border-muted-foreground/80'
    )"
    :data-count="count"
    :data-reaction="emoji"
    :disabled="(type === 'client' ? isInitialRender : true) || disabled"
    @click="handleClick"
    :tabindex="hidden ? -1 : undefined"
    type="button"
  >
    <span
      :class="cn('inline-flex items-center gap-1.5', {
        'opacity-0': type === 'fallback',
        'fade-in animate-in fill-mode-both duration-300 ease-out': type === 'server' && !isMounted && isInitialRender,
        'animate-none opacity-100': type === 'client',
      })"
    >
      <span class="relative transition-transform will-change-transform group-active:rotate-6 group-active:scale-80">
        {{ emoji }}
      </span>
      <NumberFlow
        class="inline-flex text-primary justify-center transition-[width] duration-300 ease-[cubic-bezier(0.75,0,0.175,1)]"
        :style="{ width: `${count.toString().length}ch` }"
        :value="count"
        v-bind="numberFlowTransition"
        will-change
      />
    </span>
  </button>
</template>
