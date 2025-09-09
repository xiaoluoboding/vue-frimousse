<template>
  <div class="not-prose relative overflow-hidden">
    <div
      class="flex items-center justify-center rounded-t-lg border border-b-0 border-dotted bg-background"
    >
      <div class="relative flex w-full items-center justify-center h-[480px]">
        <EmojiPicker.Root
          :onEmojiSelect="onEmojiClick"
          class="flex flex-col w-fit h-[372px] bg-white dark:bg-neutral-900 rounded-xl isolate dark:border-neutral-800 border border-transparent"
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
    <EmojiPicker.Root
      :onEmojiSelect="onEmojiClick"
      class="flex flex-col w-fit h-[372px] bg-white dark:bg-neutral-900 rounded-xl isolate dark:border-neutral-800 border border-transparent"
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

const cssCode = `
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
    padding-left: 6px;
    padding-right: 6px;
    scroll-margin-block-start: 6px;
    scroll-margin-block-end: 6px;
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

`

const onEmojiClick = (emoji: EmojiPickerEmoji) => {
  selectedEmoji.value = emoji
  console.log('Selected emoji:', emoji)
  toast(`${emoji.emoji} ${emoji.label}`)
}
</script>
