<template>
  <div class="not-prose relative overflow-hidden">
    <div
      class="flex items-center justify-center rounded-t-lg border border-b-0 border-dotted bg-background"
    >
      <div class="relative flex w-full items-center justify-center h-[480px]">
        <EmojiPicker.Root :onEmojiSelect="onEmojiClick">
          <EmojiPicker.Search placeholder="Search..." />
          <EmojiPicker.Viewport>
            <EmojiPicker.List />
          </EmojiPicker.Viewport>
        </EmojiPicker.Root>
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
import EmojiPicker from '@/packages/index'
import Tabs from './ui/tabs/Tabs.vue'
import TabsContent from './ui/tabs/TabsContent.vue'
import TabsList from './ui/tabs/TabsList.vue'
import TabsTrigger from './ui/tabs/TabsTrigger.vue'
import CodeBlock from './ui/code-block/CodeBlock.vue'

const selectedEmoji = ref<EmojiPickerEmoji | null>(null)

const exampleCode = `
  <template>
    <EmojiPicker.Root class="isolate flex h-[368px] w-fit flex-col bg-white dark:bg-neutral-900">
      <EmojiPicker.Search class="z-10 mx-2 mt-2 appearance-none rounded-md bg-neutral-100 px-2.5 py-2 text-sm dark:bg-neutral-800" />
      <EmojiPicker.Viewport class="relative flex-1 outline-hidden">
        <EmojiPicker.Loading class="absolute inset-0 flex items-center justify-center text-neutral-400 text-sm dark:text-neutral-500">
          Loading…
        </EmojiPicker.Loading>
        <EmojiPicker.Empty class="absolute inset-0 flex items-center justify-center text-neutral-400 text-sm dark:text-neutral-500">
          No emoji found.
        </EmojiPicker.Empty>
        <EmojiPicker.List
          className="select-none pb-1.5"
        />
      </EmojiPicker.Viewport>
    </EmojiPicker.Root>
  <\/template>
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
