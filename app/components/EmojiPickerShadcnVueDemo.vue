<template>
  <div class="not-prose relative overflow-hidden">
    <div
      class="flex items-center justify-center rounded-t-lg border border-b-0 border-dotted bg-background"
    >
      <div class="relative flex w-full items-center justify-center h-[480px]">
        <EmojiPicker class="!h-[325px]" @emoji-select="onEmojiClick">
          <EmojiPickerSearch />
          <EmojiPickerContent />
        </EmojiPicker>
      </div>
    </div>
    <Tabs
      class="h-[348px] overflow-hidden border border-dotted rounded-b-lg gap-0"
      default-value="tailwind"
    >
      <TabsList class="bg-transparent gap-2">
       <TabsTrigger value="tailwind" class="rounded-md text-muted-foreground data-[state=active]:text-foreground hover:bg-muted data-[state=active]:bg-muted data-[state=active]:shadow-none">
          Tailwind CSS
        </TabsTrigger>
        <TabsTrigger value="css" class="rounded-md text-muted-foreground data-[state=active]:text-foreground hover:bg-muted data-[state=active]:bg-muted data-[state=active]:shadow-none">
          CSS
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tailwind" class="overflow-y-auto rounded-b-lg rounded-t-none **:[.code-block]:rounded-t-none">
        <CodeBlock lang="vue" :code="exampleCode" />
      </TabsContent>
      <TabsContent value="css" class="overflow-y-auto rounded-b-lg rounded-t-none **:[.code-block]:rounded-t-none">
        <CodeBlock lang="css" :code="cssCode" />
      </TabsContent>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import type { EmojiPickerEmoji } from '@/packages/types'

import { EmojiPicker, EmojiPickerSearch, EmojiPickerContent } from '~/components/ui/emoji-picker'
import Tabs from './ui/tabs/Tabs.vue'
import TabsContent from './ui/tabs/TabsContent.vue'
import TabsList from './ui/tabs/TabsList.vue'
import TabsTrigger from './ui/tabs/TabsTrigger.vue'
import CodeBlock from './ui/code-block/CodeBlock.vue'

const selectedEmoji = ref<EmojiPickerEmoji | null>(null)

const exampleCode = `
  <template>
    <EmojiPicker class="h-[325px]" @emoji-select="onEmojiClick">
      <EmojiPickerSearch />
      <EmojiPickerContent />
    </EmojiPicker>
  </template>

  <script setup lang="ts">
  import { ref } from 'vue'
  import {
    EmojiPicker,
    EmojiPickerSearch,
    EmojiPickerContent
  } from '~/components/ui/emoji-picker'

  const onEmojiClick = (emoji: EmojiPickerEmoji) => {
    console.log('Selected emoji:', emoji)
  }
  <\/script>
`

const cssCode = `
  [frimousse-root] {
    display: flex;
    flex-direction: column;
    width: fit-content;
    height: 380px;
    background: light-dark(#fff, #171717);
    border-radius: 12px;
    isolation: isolate;
    box-shadow:
      rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      rgba(0, 0, 0, 0.04) 0px 0px 0px 1px,
      rgba(0, 0, 0, 0.06) 0px 2px 12px 0px,
      rgba(0, 0, 0, 0.06) 0px 8px 36px 0px;
  }

  [frimousse-search] {
    position: relative;
    z-index: 10;
    appearance: none;
    margin-block-start: 8px;
    margin-inline: 8px;
    padding: 8px 10px;
    background: light-dark(#f5f5f5, #262626);
    border-radius: 6px;
    font-size: 14px;
  }

  [frimousse-viewport] {
    position: relative;
    flex: 1;
    outline: none;
  }

  [frimousse-loading] [frimousse-empty] {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: light-dark(#a1a1a1, #737373);
    font-size: 14px;
  }

  [frimousse-list] {
    padding-block-end: 12px;
    user-select: none;
  }

  [frimousse-category-header] {
    padding: 12px 12px 6px;
    background: light-dark(#fff, #171717);
    color: light-dark(#525252, #a1a1a1);
    font-size: 12px;
    font-weight: 500;
  }

  [frimousse-row] {
    padding-inline: 8px;
    scroll-margin-block: 12px;
  }

  [frimousse-emoji] {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 6px;
    background: transparent;
    font-size: 18px;
    border-color: transparent;

    &[data-active] {
      background: light-dark(#f5f5f5, #262626);
    }
  }
`

const onEmojiClick = (emoji: EmojiPickerEmoji) => {
  selectedEmoji.value = emoji
  console.log('Selected emoji:', emoji)
  toast(`${emoji.emoji} ${emoji.label}`)
}
</script>

<style scoped>
[frimousse-root] {
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: 380px;
  background-color: white;
  border-radius: 0.75rem;
  isolation: isolate;
  border: 1px solid transparent;
  box-shadow:
    rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.04) 0px 0px 0px 1px,
    rgba(0, 0, 0, 0.06) 0px 2px 12px 0px,
    rgba(0, 0, 0, 0.06) 0px 8px 36px 0px;
}

[data-theme='dark'] [frimousse-root] {
  background-color: rgb(23 23 23);
  border-color: rgb(163 163 163);
}

[frimousse-search] {
  position: relative;
  z-index: 10;
  appearance: none;
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  padding-left: 0.625rem;
  padding-right: 0.625rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: rgb(245 245 245);
  color: rgb(38 38 38);
  border-radius: 0.375rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

[data-theme='dark'] [frimousse-search] {
  background-color: rgb(38 38 38);
  color: rgb(163 163 163);
}

[frimousse-search]::placeholder {
  color: rgb(115 115 115);
  opacity: 1;
}

[frimousse-viewport] {
  position: relative;
  flex: 1 1 0%;
  outline: 2px solid transparent;
  outline-offset: 2px;
}

[frimousse-loading],
[frimousse-empty] {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(115 115 115);
  font-size: 0.875rem;
  line-height: 1.25rem;
}

[frimousse-list] {
  padding-bottom: 0.75rem;
  user-select: none;
}

[frimousse-category-header] {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  padding-top: 0.75rem;
  padding-bottom: 0.375rem;
  background-color: white;
  color: rgb(82 82 82);
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 500;
}

[data-theme='dark'] [frimousse-category-header] {
  background-color: rgb(23 23 23);
  color: rgb(115 115 115);
}

[frimousse-row] {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  scroll-margin-top: 0.75rem;
  scroll-margin-bottom: 0.75rem;
}

[frimousse-emoji] {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.375rem;
  background-color: transparent;
  font-size: 1.125rem;
  line-height: 1.75rem;
  border-color: transparent;
}

[frimousse-emoji][data-active] {
  background-color: rgb(245 245 245);
}

[data-theme='dark'] [frimousse-emoji][data-active] {
  background-color: rgb(38 38 38);
}

[frimousse-skin-tone-selector] {
  background-color: rgb(245 245 245);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
  margin-right: 0.5rem;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.375rem;
  font-size: 1.125rem;
  line-height: 1.75rem;
  border-color: transparent;
}

[frimousse-skin-tone-selector]:hover {
  background-color: rgb(229 229 229);
}

[data-theme='dark'] [frimousse-skin-tone-selector] {
  background-color: rgb(38 38 38);
}

[data-theme='dark'] [frimousse-skin-tone-selector]:hover {
  background-color: rgb(64 64 64);
}

[frimousse-footer] {
  display: flex;
  width: 100%;
  min-width: 0;
  align-items: center;
  gap: 0.25rem;
  border-top: 1px solid rgb(229 229 229);
  padding: 0.5rem;
  max-width: var(--frimousse-viewport-width);
}

[data-theme='dark'] [frimousse-footer] {
  border-top-color: rgb(38 38 38);
}

[frimousse-footer-emoji] {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  font-size: 1.125rem;
  line-height: 1.75rem;
}

[frimousse-footer-emoji-label] {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgb(82 82 82);
  font-size: 0.75rem;
  line-height: 1rem;
}

[data-theme='dark'] [frimousse-footer-emoji-label] {
  color: rgb(115 115 115);
}

[frimousse-footer-placeholder] {
  margin-left: 0.375rem;
  display: flex;
  height: 1.75rem;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgb(115 115 115);
  font-size: 0.75rem;
  line-height: 1rem;
}

[data-theme='dark'] [frimousse-footer-placeholder] {
  color: rgb(82 82 82);
}
</style>
