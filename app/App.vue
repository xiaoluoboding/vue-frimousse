<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'
// import { useSEO } from '~/composables/useSEO'

// Set up default SEO metadata for the application
// useSEO({})
</script>

<template>
  <RouterView />
  <Toaster />
</template>

<style scoped>
</style>
