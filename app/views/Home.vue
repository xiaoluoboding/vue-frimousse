<template>
  <StickyHeader version="0.1.0" />
  
  <p class="mt-3.5 max-w-(--container-lg) text-muted-foreground leading-[1.65]">
    A lightweight, unstyled, and composable emoji picker for Vue.
  </p>

  <Docs />

<!-- 
  <div class="mb-10">
    <h2 class="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
      With Loading and Empty States
    </h2>
    <div class="w-full flex justify-center items-center my-4">
      <EmojiPickerRoot :onEmojiSelect="onEmojiClick">
        <EmojiPickerSearch />

        <EmojiPickerLoading>
          <div class="p-6 text-center text-neutral-500 dark:text-neutral-400 text-sm">
            🔄 Loading emojis...
          </div>
        </EmojiPickerLoading>

        <EmojiPickerEmpty>
          <template #default="{ search }">
            <div class="p-6 text-center text-neutral-500 dark:text-neutral-400 text-sm">
              😕 No emojis found for "{{ search }}"
            </div>
          </template>
        </EmojiPickerEmpty>

        <EmojiPickerViewport>
          <EmojiPickerList />
        </EmojiPickerViewport>
      </EmojiPickerRoot>
    </div>
  </div>

  <PermalinkHeading as="h2">With Skin Tone Selector</PermalinkHeading>
  <div class="">
    <h2>With Skin Tone Selector</h2>
    <div class="w-full flex justify-center items-center my-4">
      <EmojiPickerRoot :onEmojiSelect="onEmojiClick">
        <div
          class="flex gap-3 items-center p-3 border-b border-neutral-200 dark:border-neutral-700"
        >
          <EmojiPickerSearch />
          <EmojiPickerSkinTone>
            <template #default="{ skinTone, setSkinTone }">
              <EmojiPickerSkinToneSelector :skin-tone="skinTone" @skin-tone-change="setSkinTone" />
            </template>
          </EmojiPickerSkinTone>
        </div>

        <EmojiPickerViewport>
          <EmojiPickerList />
        </EmojiPickerViewport>
      </EmojiPickerRoot>
    </div>
  </div> -->
</template>

<script setup lang="ts">
import StickyHeader from '~/components/StickyHeader.vue'
import Docs from '~/components/Docs.vue'
</script>

<style lang="css">
[frimousse-root] {
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: 352px;
  background: light-dark(#fff, #171717);
  border-radius: 6px;
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
  padding-inline: 12px;
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
</style>
