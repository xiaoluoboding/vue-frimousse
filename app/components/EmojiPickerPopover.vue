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
          <PopoverContent class="w-fit p-0 rounded-xl">
            <EmojiPicker.Root class="h-[342px] !border-none !shadow-none" @emoji-select="handleEmojiSelect">
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
    <CodeBlock lang="vue" :code="exampleCode" class="rounded-t-none" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '~/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import EmojiPicker from '@/packages/index'
import CodeBlock from '~/components/ui/code-block/CodeBlock.vue'
import type { EmojiPickerEmoji } from '@/packages/types'
import { toast } from 'vue-sonner'

const isOpen = ref(false)

const handleEmojiSelect = (emoji: EmojiPickerEmoji) => {
  isOpen.value = false
  console.log(emoji)
  toast(`${emoji.emoji}  ${emoji.label}`)
}

const exampleCode = `
  <template>
    <Popover v-model:open="isOpen">
      <PopoverTrigger as-child>
        <Button>Open emoji picker</Button>
      </PopoverTrigger>
      <PopoverContent class="w-fit p-0 rounded-xl">
        <EmojiPicker.Root class="h-[342px] !border-none !shadow-none">
          <EmojiPicker.Search />
          <EmojiPicker.Viewport>
            <EmojiPicker.List />
          </EmojiPicker.Viewport>
          <EmojiPicker.Footer />
        </EmojiPicker.Root>
      </PopoverContent>
    </Popover>
  </template>

  <script setup lang="ts">
  import { ref } from 'vue'
  import { Button } from '~/components/ui/button'
  import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
  import { default as EmojiPicker } from 'vue-frimousse'

  const isOpen = ref(false)
  <\/script>
`
</script>
