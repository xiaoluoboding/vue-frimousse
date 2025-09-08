<template>
  <div class="not-prose relative overflow-hidden">
    <div
      class="flex items-center justify-center rounded-t-lg border border-dotted bg-background"
    >
      <div class="relative flex w-full items-center justify-center h-[480px]">
        <EmojiPicker.Root :onEmojiSelect="onEmojiClick">
          <div
            class="flex items-center justify-between"
          >
            <EmojiPicker.Search class="flex-1" />
            <EmojiPicker.SkinToneSelector />
          </div>

          <EmojiPicker.Viewport>
            <EmojiPicker.List />
          </EmojiPicker.Viewport>
        </EmojiPicker.Root>
      </div>
    </div>
    <CodeBlock lang="vue" :code="exampleCode" class="rounded-t-none" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import type { EmojiPickerEmoji } from '@/packages/types'
import EmojiPicker from '@/packages/index'

import CodeBlock from './ui/code-block/CodeBlock.vue'

const selectedEmoji = ref<EmojiPickerEmoji | null>(null)

const exampleCode = `
  <template>
    <EmojiPicker.Root :onEmojiSelect="onEmojiClick">
      <div
        class="flex items-center justify-between"
      >
        <EmojiPicker.Search class="flex-1" />
        // [!code highlight:1]
        <EmojiPicker.SkinToneSelector />
      </div>

      <EmojiPicker.Viewport>
        <EmojiPicker.List />
      </EmojiPicker.Viewport>
    </EmojiPicker.Root>
  </template>

  <script setup lang="ts">
  import { ref } from 'vue'
  import { default as EmojiPicker } from 'vue-frimousse'
  import type { EmojiPickerEmoji } from 'vue-frimousse'

  const onEmojiClick = (emoji: EmojiPickerEmoji) => {
    console.log('Selected emoji:', emoji)
  }
  <\/script>
`

const onEmojiClick = (emoji: EmojiPickerEmoji) => {
  selectedEmoji.value = emoji
  console.log('Selected emoji:', emoji)
  toast(`${emoji.emoji} ${emoji.label}`)
}
</script>
