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
            <svg
              aria-hidden="true"
              class="size-3.5"
              fill="currentColor"
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
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
        v{{ packageVersion }}
      </Button>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn, getPackageVersion } from '~/utils'
import { useIsMounted } from '~/composables/useIsMounted'
import { useIsSticky } from '~/composables/useIsSticky'
import { Button } from '~/components/ui/button'
import Logo from './Logo.vue'

const stickyRef = ref<HTMLDivElement>()
const isSticky = useIsSticky(stickyRef)
const isMounted = useIsMounted()

// Read the package version from package.json
const packageVersion = computed(() => getPackageVersion())
</script>
