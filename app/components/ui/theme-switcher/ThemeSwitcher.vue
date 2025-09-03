<template>
  <div
    :class="cn(
      'relative isolate inline-flex h-8 items-center rounded-full border border-dotted px-1',
      ($attrs.class as string) || '',
    )"
    v-bind="$attrs"
  >
    <button
      v-for="{ type, icon: Icon, label } in THEMES"
      :key="type"
      :aria-label="`Switch to ${label}`"
      :title="`Switch to ${label}`"
      class="group cursor-pointer relative size-6 rounded-full transition duration-200 ease-out"
      type="button"
      @click="setTheme(type)"
    >
      <div
        v-if="deferredTheme === type"
        class="-z-1 absolute inset-0 rounded-full bg-muted transition-all duration-200 ease-out"
      />
      <component
        :is="Icon"
        :class="cn(
          'relative m-auto size-3.5',
          'transition duration-200 ease-out',
          deferredTheme === type
            ? 'text-foreground'
            : 'text-secondary-foreground group-hover:text-foreground group-focus-visible:text-foreground',
        )"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, watchEffect, onMounted, type Component } from 'vue'
import { Monitor, Moon, Sun } from 'lucide-vue-next'
import { useLocalStorage } from '@vueuse/core'
import { cn } from '~/lib/utils'

const THEMES = [
  {
    type: 'system' as const,
    icon: Monitor as Component,
    label: 'system theme',
  },
  {
    type: 'light' as const,
    icon: Sun as Component,
    label: 'light theme',
  },
  {
    type: 'dark' as const,
    icon: Moon as Component,
    label: 'dark theme',
  },
]

type Theme = (typeof THEMES)[number]['type']

interface Props {
  value?: Theme
  defaultValue?: Theme
}

interface Emits {
  (e: 'change', theme: Theme): void
}

const props = withDefaults(defineProps<Props>(), {
  defaultValue: 'system'
})

const emit = defineEmits<Emits>()

// Use localStorage to persist theme selection
const storedTheme = useLocalStorage<Theme>('theme', props.defaultValue)

// Theme state management - use stored theme if not controlled by props
const currentTheme = computed(() => props.value || storedTheme.value)

// Vue equivalent of useDeferredValue - using a computed with delay
const deferredTheme = computed(() => currentTheme.value)

// Watch for external value changes
watchEffect(() => {
  if (props.value && props.value !== storedTheme.value) {
    storedTheme.value = props.value
  }
})

const setTheme = (theme: Theme) => {
  // Update stored theme if not controlled by props
  if (!props.value) {
    storedTheme.value = theme
  }
  
  emit('change', theme)
  applyTheme(theme)
}

// Theme application with system preference detection
const applyTheme = (theme: Theme) => {
  const root = document.documentElement
  
  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    root.classList.toggle('dark', systemTheme === 'dark')
  } else {
    root.classList.toggle('dark', theme === 'dark')
  }
}

// Listen for system theme changes when using 'system' theme
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
const handleSystemThemeChange = () => {
  if (currentTheme.value === 'system') {
    applyTheme('system')
  }
}

// Initialize theme on mount
onMounted(() => {
  applyTheme(currentTheme.value)
  mediaQuery.addEventListener('change', handleSystemThemeChange)
})

// Cleanup listener on unmount
import { onUnmounted } from 'vue'
onUnmounted(() => {
  mediaQuery.removeEventListener('change', handleSystemThemeChange)
})
</script>
