<template>
  <button
    :class="cn('inline-flex text-muted-foreground items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-muted hover:text-primary h-8 w-8', $attrs.class as string)"
    @click="copyToClipboard"
    :aria-label="copied ? 'Copied!' : 'Copy to clipboard'"
  >
    <CheckIcon v-if="copied" class="size-3" />
    <CopyIcon v-else class="size-3" />
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CheckIcon, CopyIcon } from 'lucide-vue-next'
import { cn } from '~/utils'

interface Props {
  text: string
}

const props = defineProps<Props>()
const copied = ref(false)

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(props.text)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}
</script>
