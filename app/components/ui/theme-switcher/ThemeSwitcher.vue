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
import { computed, watchEffect, ref, onMounted, type Component } from 'vue'
import { Monitor, Moon, Sun } from 'lucide-vue-next'
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

// Theme state management
const currentTheme = ref<Theme>(props.value || props.defaultValue)

// Vue equivalent of useDeferredValue - using a computed with delay
const deferredTheme = computed(() => currentTheme.value)

// Watch for external value changes
watchEffect(() => {
  if (props.value && props.value !== currentTheme.value) {
    currentTheme.value = props.value
  }
})

const setTheme = (theme: Theme) => {
  currentTheme.value = theme
  emit('change', theme)
  
  // Apply theme to document if not controlled
  if (!props.value) {
    applyTheme(theme)
  }
}

// Simple theme application (you might want to use a proper theme composable)
const applyTheme = (theme: Theme) => {
  const root = document.documentElement
  
  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    root.classList.toggle('dark', systemTheme === 'dark')
  } else {
    root.classList.toggle('dark', theme === 'dark')
  }
}

// Initialize theme on mount
onMounted(() => {
  if (!props.value) {
    applyTheme(currentTheme.value)
  }
})
</script>
