<template>
  <div class="mt-4 not-prose relative overflow-hidden">
    <div
      class="flex items-center justify-center rounded-t-lg border border-b-0 border-dotted bg-background"
    >
      <div class="relative flex w-full items-center justify-center h-[200px]">
        <Popover v-model:open="isOpen">
          <PopoverTrigger as-child>
            <Button>Open emoji picker</Button>
          </PopoverTrigger>
          <PopoverContent class="w-fit p-0">
            <EmojiPicker.Root class="h-[342px] !shadow-none" @emoji-select="handleEmojiSelect">
              <EmojiPicker.Search />
              <EmojiPicker.Viewport>
                <EmojiPicker.List />
              </EmojiPicker.Viewport>
              <EmojiPicker.Footer />
            </EmojiPicker.Root>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '~/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import EmojiPicker from '@/packages/index'

const isOpen = ref(false)

const handleEmojiSelect = ({ emoji }: { emoji: unknown }) => {
  isOpen.value = false
  console.log(emoji)
}
</script>
