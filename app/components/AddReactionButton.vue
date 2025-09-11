<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '~/lib/utils'
import { buttonVariants } from '~/components/ui/button'
import { useIsMobile } from '~/composables/useIsMobile'
import { useIsMounted } from '~/composables/useIsMounted'
import { EmojiPicker as EmojiPickerPrimitive, EmojiPickerSearch, EmojiPickerContent, EmojiPickerFooter } from '~/components/ui/emoji-picker'
import { default as EmojiPicker } from '@/packages'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '~/components/ui/drawer'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'

const emit = defineEmits<{
  emojiSelect: [emoji: string]
}>()

const isOpen = ref(false)
const isMounted = useIsMounted()
const isMobile = useIsMobile()

// Constants for emoji processing
const ZWJ = "\u200D"
const SKIN_TONE_MODIFIERS = /\u{1F3FB}|\u{1F3FC}|\u{1F3FD}|\u{1F3FE}|\u{1F3FF}/gu

function getBaseEmoji(emoji: string) {
  return emoji
    .split(ZWJ)
    .map((segment) => segment.replace(SKIN_TONE_MODIFIERS, ''))
    .join(ZWJ)
}

const handleEmojiSelect = (emojiData: { emoji: string }) => {
  emit('emojiSelect', getBaseEmoji(emojiData.emoji))
  isOpen.value = false
}
</script>

<template>
  <!-- Mobile Drawer -->
  <Drawer v-if="isMounted && isMobile" v-model:open="isOpen" fixed>
    <DrawerTrigger as-child>
      <button
        aria-label="Try it"
        :class="cn(buttonVariants({ variant: 'default' }), 'group rounded-full')"
        title="Try it"
      >
        <svg
          class="-ml-0.5 relative transition-transform will-change-transform group-active:rotate-6 group-active:scale-85"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Add emoji</title>
          <path d="M9 1.07A7 7 0 1 0 14.93 7" />
          <path d="M5.5 9.5S6.25 11 8 11s2.5-1.5 2.5-1.5M6 6h0" />
          <circle cx="6" cy="6" r=".25" />
          <path d="M10 6h0" />
          <circle cx="10" cy="6" r=".25" />
          <path d="M11 3h4m-2-2v4" />
        </svg>
        Try it
      </button>
    </DrawerTrigger>
    <DrawerContent class="h-[80vh]">
      <DrawerTitle class="sr-only">Emoji picker</DrawerTitle>
      <DrawerDescription class="sr-only">Select an emoji</DrawerDescription>
      <EmojiPicker.Root
        :onEmojiSelect="handleEmojiSelect"
        class="flex flex-col w-full h-full bg-white mt-4 dark:bg-neutral-900 rounded-xl isolate border-transparent"
      >
        <div class="flex items-center justify-between w-full px-2 mt-4">
          <EmojiPicker.Search
            class="relative flex-1 z-10 appearance-none mx-2 px-2.5 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-400 rounded-md text-sm placeholder:text-neutral-500 dark:placeholder:text-neutral-500 placeholder:opacity-100"
          />
          <EmojiPicker.SkinToneSelector
            class="rounded-md size-8 bg-neutral-100 dark:bg-neutral-800"
            title="Change skin tone"
          />
        </div>
        <EmojiPicker.Loading class="absolute inset-0 flex items-center justify-center text-neutral-500 dark:text-neutral-500 text-sm">
          <div class="p-6 text-center">
            🔄 Loading emojis...
          </div>
        </EmojiPicker.Loading>
        <EmojiPicker.Empty class="absolute inset-0 flex items-center justify-center text-neutral-500 dark:text-neutral-500 text-sm">
          <template #default="{ search }">
            <div class="p-6 text-center">
              😕 No emojis found for "{{ search }}"
            </div>
          </template>
        </EmojiPicker.Empty>
        <EmojiPicker.Viewport class="relative flex-1 outline-none w-full">
          <EmojiPicker.List class="pb-3 select-none" row-class="px-2 scroll-m-bs-1.5 scroll-m-be-1.5">
            <template #category-header="{ category }">
              <div
                className="after:-top-1 relative bg-white px-4 pt-3 pb-1.5 font-medium text-neutral-600 text-xs after:absolute after:inset-x-0 after:h-2 after:bg-white dark:bg-neutral-900 dark:text-neutral-400 dark:after:bg-neutral-900"
              >
                {{ category.label }}
              </div>
            </template>
            <template #emoji="{ emoji }">
              <button
                className="flex rounded-[max(2vw,var(--radius-md))] text-[max(4vw,var(--text-lg))] w-[calc((100vw-1rem)/var(--frimousse-list-columns))] aspect-square items-center justify-center whitespace-nowrap rounded-md text-lg data-[active]:bg-neutral-100 dark:data-[active]:bg-neutral-800"
              >
                {{ emoji.emoji }}
              </button>
            </template>
          </EmojiPicker.List>
        </EmojiPicker.Viewport>
      </EmojiPicker.Root>
    </DrawerContent>
  </Drawer>

  <!-- Desktop Popover -->
  <Popover v-else-if="isMounted" v-model:open="isOpen">
    <PopoverTrigger as-child>
      <button
        aria-label="Try it"
        :class="cn(buttonVariants({ variant: 'default' }), 'group rounded-full')"
        title="Try it"
      >
        <svg
          class="-ml-0.5 relative transition-transform will-change-transform group-active:rotate-6 group-active:scale-85"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Add emoji</title>
          <path d="M9 1.07A7 7 0 1 0 14.93 7" />
          <path d="M5.5 9.5S6.25 11 8 11s2.5-1.5 2.5-1.5M6 6h0" />
          <circle cx="6" cy="6" r=".25" />
          <path d="M10 6h0" />
          <circle cx="10" cy="6" r=".25" />
          <path d="M11 3h4m-2-2v4" />
        </svg>
        Try it
      </button>
    </PopoverTrigger>
    <PopoverContent side="bottom" :side-offset="6" class="p-0 rounded-2xl">
      <EmojiPicker.Root
        :onEmojiSelect="handleEmojiSelect"
        class="flex flex-col w-fit h-[382px] bg-white dark:bg-neutral-900 rounded-xl isolate dark:border-neutral-800 border border-transparent"
        style="box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.04) 0px 0px 0px 1px, rgba(0, 0, 0, 0.06) 0px 2px 12px 0px, rgba(0, 0, 0, 0.06) 0px 8px 36px 0px;"
      >
        <EmojiPicker.Search
          class="relative z-10 appearance-none mt-2 mx-2 px-2.5 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-400 rounded-md text-sm placeholder:text-neutral-500 dark:placeholder:text-neutral-500 placeholder:opacity-100"
        />
        <EmojiPicker.Loading class="absolute inset-0 flex items-center justify-center text-neutral-500 dark:text-neutral-500 text-sm">
          <div class="p-6 text-center">
            🔄 Loading emojis...
          </div>
        </EmojiPicker.Loading>
        <EmojiPicker.Empty class="absolute inset-0 flex items-center justify-center text-neutral-500 dark:text-neutral-500 text-sm">
          <template #default="{ search }">
            <div class="p-6 text-center">
              😕 No emojis found for "{{ search }}"
            </div>
          </template>
        </EmojiPicker.Empty>
        <EmojiPicker.Viewport class="relative flex-1 outline-none">
          <EmojiPicker.List class="pb-3 select-none" row-class="px-1.5 scroll-m-bs-1.5 scroll-m-be-1.5">
            <template #category-header="{ category }">
              <div
                className="after:-top-1 relative bg-white px-3 pt-3 pb-1.5 font-medium text-neutral-600 text-xs after:absolute after:inset-x-0 after:h-2 after:bg-white dark:bg-neutral-900 dark:text-neutral-400 dark:after:bg-neutral-900"
              >
                {{ category.label }}
              </div>
            </template>
            <template #emoji="{ emoji }">
              <button
                className="flex size-8 items-center justify-center whitespace-nowrap rounded-md text-lg data-[active]:bg-neutral-100 dark:data-[active]:bg-neutral-800"
              >
                {{ emoji.emoji }}
              </button>
            </template>
          </EmojiPicker.List>
        </EmojiPicker.Viewport>
        <div class="flex items-center justify-between w-full border-t px-2">
          <EmojiPicker.Footer class="px-2 py-2.5 text-muted-foreground text-sm" />
          <EmojiPicker.SkinToneSelector
            class="rounded-md size-7 bg-neutral-100 dark:bg-neutral-800"
            title="Change skin tone"
          />
        </div>
      </EmojiPicker.Root>
    </PopoverContent>
  </Popover>

  <!-- Fallback for SSR -->
  <button
    v-else
    aria-label="Try it"
    :class="cn(buttonVariants({ variant: 'default' }), 'group rounded-full')"
    title="Try it"
  >
    <svg
      class="-ml-0.5 relative transition-transform will-change-transform group-active:rotate-6 group-active:scale-85"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Add emoji</title>
      <path d="M9 1.07A7 7 0 1 0 14.93 7" />
      <path d="M5.5 9.5S6.25 11 8 11s2.5-1.5 2.5-1.5M6 6h0" />
      <circle cx="6" cy="6" r=".25" />
      <path d="M10 6h0" />
      <circle cx="10" cy="6" r=".25" />
      <path d="M11 3h4m-2-2v4" />
    </svg>
    Try it
  </button>
</template>
