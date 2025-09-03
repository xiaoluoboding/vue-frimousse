<script setup lang="ts">
import { cn } from '../lib/utils'

interface Props {
  name: string
  type?: string
  required?: boolean
  defaultValue?: string
  className?: string
}

withDefaults(defineProps<Props>(), {
  className: ''
})

defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <li :class="cn('flex flex-col gap-1', className)" v-bind="$attrs">
    <div class="flex flex-wrap items-baseline gap-x-2 gap-y-1">
      <code class="p-0 bg-transparent flex-none font-semibold font-mono text-[0.875em]">
        {{ name }}
      </code>
      <code 
        v-if="type" 
        class="flex-none font-medium font-mono text-[0.875em] text-secondary-foreground"
      >
        {{ type }}
      </code>
      <span 
        v-if="required" 
        class="text-muted-foreground text-xs"
      >
        Required
      </span>
      <span 
        v-if="defaultValue" 
        class="text-muted-foreground/80 text-xs leading-[1.65]"
      >
        Default is {{ defaultValue }}
      </span>
    </div>
    <div class="prose prose-sm">
      <slot />
    </div>
  </li>
</template>
