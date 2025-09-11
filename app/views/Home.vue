<template>
  <div class="container max-w-screen-sm mx-auto relative px-8 before:border-neutral-200 dark:before:border-neutral-700 flex min-h-dvh flex-col before:pointer-events-none before:absolute before:inset-x-4 before:h-full before:border-x before:border-dotted md:before:inset-x-0">
    <StickyHeader />

    <p class="mt-3.5 max-w-(--container-lg) text-muted-foreground leading-[1.65]">
      A lightweight, unstyled, and composable emoji picker for Vue.
    </p>

    <Docs />
  </div>

  <SiteFooter />
</template>

<script setup lang="ts">
import StickyHeader from '~/components/StickyHeader.vue'
import Docs from '~/components/Docs.vue'
import SiteFooter from '~/components/SiteFooter.vue'
import { useSEO } from '~/composables/useSEO'

// Set up specific SEO metadata for the home page
useSEO({
  title: 'Vue Frimousse - Lightweight Emoji Picker for Vue',
  description: 'A lightweight, unstyled, and composable emoji picker for Vue. Easy to integrate, customize, and use in your Vue applications.',
  keywords: 'vue emoji picker, vue components, emoji selector, vue3 emoji, typescript emoji picker, composable emoji picker, lightweight emoji picker',
  url: 'https://vue-frimousse.robertshaw.id',
  canonical: 'https://vue-frimousse.robertshaw.id',
  type: 'website'
})
</script>
