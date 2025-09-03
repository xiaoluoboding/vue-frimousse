<template>
  <div class="container max-w-screen-sm mx-auto relative px-8 before:border-neutral-200 dark:before:border-neutral-700 flex min-h-dvh flex-col before:pointer-events-none before:absolute before:inset-x-4 before:h-full before:border-x before:border-dotted md:before:inset-x-0">
    <StickyHeader />

    <p class="mt-3.5 max-w-(--container-lg) text-muted-foreground leading-[1.65]">
      A lightweight, unstyled, and composable emoji picker for Vue.
    </p>

    <Docs />
  </div>

  <SiteFooter />

<!--
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
import SiteFooter from '~/components/SiteFooter.vue'
</script>
