<template>
  <footer class="border-t border-neutral-200 dark:border-neutral-700 border-dotted bg-background">
    <div class="container max-w-screen-sm mx-auto px-8 relative flex justify-between gap-6 py-5 text-secondary-foreground text-xs before:pointer-events-none before:absolute before:inset-x-4 before:inset-y-0 before:h-full before:border-neutral-200 dark:before:border-neutral-700 before:border-x before:border-dotted md:before:inset-x-0">
      <div class="flex flex-auto flex-col gap-1">
        <span class="text-muted-foreground">
          ©
          <time :dateTime="year">{{ year }}</time>
          <a
            class="link text-primary"
            href="https://github.com/xiaoluoboding/vue-frimousse/blob/main/LICENSE"
            rel="noreferrer"
            target="_blank"
          >
            MIT License
          </a>
        </span>
        <span class="text-muted-foreground">
          Made with
          <svg
            aria-label="love"
            class="pointer-events-none inline-block size-[19px]"
            fill="currentColor"
            viewBox="0 0 19 19"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Heart</title>
            <path d="M7 2H4V3.5H2.5V5H1V9.5H2.5V11H4V12.5H5.5V14H7V15.6H8.5V17H10V15.6H11.5V14H13.0455V12.5H14.5V11H16V9.5H17.5V5H16V3.5H14.5V2H11.5V3.5H10V5H8.5V3.5H7V2ZM7 3.5V5H8.5V6.5H10V5H11.5V3.5H14.5V5H16V9.5H14.5V11H13.0455V12.5H11.5V14H10V15.6H8.5V14H7V12.5H5.5V11H4V9.5H2.5V5H4V3.5H7Z" />
          </svg>
          by
          <a
            class="link text-primary"
            href="https://x.com/robert_shaw_x"
            rel="noreferrer"
            target="_blank"
          >
            Robert Shaw
          </a>
        </span>
      </div>
      <div class="flex flex-none items-center gap-1.5">
        <a
          :class="cn(
            buttonVariants({ variant: 'outline', size: 'icon' }),
            'rounded-full outline-offset-2 size-8',
          )"
          href="https://github.com/xiaoluoboding/vue-frimousse"
          rel="noreferrer"
          target="_blank"
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
          <span class="sr-only">View on GitHub</span>
        </a>
        <ThemeSwitcher />
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { cn } from '~/lib/utils'
import ThemeSwitcher from '~/components/ui/theme-switcher/ThemeSwitcher.vue'

// Current year for copyright
const year = String(new Date().getFullYear())

// Button variants function (simplified for Vue)
const buttonVariants = ({ variant, size }: { variant?: string; size?: string }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background'

  const variants = {
    outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
    default: 'bg-primary text-primary-foreground hover:bg-primary/90'
  }

  const sizes = {
    icon: 'h-10 w-10',
    default: 'h-10 px-4 py-2'
  }

  return `${baseClasses} ${variants[variant as keyof typeof variants] || variants.default} ${sizes[size as keyof typeof sizes] || sizes.default}`
}
</script>
