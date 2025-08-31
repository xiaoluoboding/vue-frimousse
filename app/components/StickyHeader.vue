<template>
  <div
    :class="cn(
      'pointer-events-none inset-x-0 z-60 h-14 w-full md:h-18',
      isMounted ? 'fixed' : 'absolute'
    )"
  >
    <div
      :class="cn(
        'absolute inset-0 border-b border-neutral-200 dark:border-neutral-700 border-dotted bg-background transition-opacity duration-100 ease-out',
        isSticky ? 'opacity-100' : 'opacity-0'
      )"
    >
      <div class="container max-w-screen-sm mx-auto relative h-full before:pointer-events-none before:absolute before:inset-x-4 before:inset-y-0 before:h-full before:border-x before:border-neutral-200 dark:before:border-neutral-700 before:border-dotted md:before:inset-x-0" />
    </div>
    <div class="container max-w-screen-sm mx-auto relative h-full">
      <div class="pointer-events-auto absolute inset-x-4 inset-y-0 md:inset-x-0">
        <div class="absolute top-3 right-4 md:top-5 md:right-8">
          <Button
            variant="outline"
            size="sm"
          >
            <GithubIcon class="size-4" />
            xiaoluoboding/vue-frimousse
            <span class="xs:inline hidden">xiaoluoboding/vue-frimousse</span>
          </Button>
        </div>
      </div>
    </div>
  </div>
  <div
    :class="cn(
      'pointer-events-none mt-30 pt-5 will-change-transform md:mt-40',
      isMounted ? '-top-px sticky' : 'relative',
      isSticky ? 'z-60' : 'z-0'
    )"
    ref="stickyRef"
  >
    <span class="pointer-events-auto flex w-fit items-center gap-2 pt-px">
      <a
        class="flex items-center gap-2 rounded-sm outline-offset-2 transition duration-200 ease-out hover:opacity-60 focus-visible:opacity-60"
        href="#"
      >
        <Logo class="flex-none" />
        <h1 class="font-medium">Vue Frimousse</h1>
      </a>
      <Button
        variant="outline"
        size="sm"
      >
        v{{ version }}
      </Button>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '~/utils'
import { useIsMounted } from '~/composables/useIsMounted'
import { useIsSticky } from '~/composables/useIsSticky'
import { Button } from '~/components/ui/button'
import Logo from './Logo.vue'
import { GithubIcon } from 'lucide-vue-next'

interface Props {
  version: string
}

defineProps<Props>()

const stickyRef = ref<HTMLDivElement>()
const isSticky = useIsSticky(stickyRef)
const isMounted = useIsMounted()
</script>
