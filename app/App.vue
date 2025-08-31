<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'
</script>

<template>
  <div class="container max-w-screen-sm mx-auto relative px-8 before:border-neutral-200 dark:before:border-neutral-700 flex min-h-dvh flex-col before:pointer-events-none before:absolute before:inset-x-4 before:h-full before:border-x before:border-dotted md:before:inset-x-0">
    <RouterView />
  </div>
  <Toaster />
</template>

<style scoped>
</style>
