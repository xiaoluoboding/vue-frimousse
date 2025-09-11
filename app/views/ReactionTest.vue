<script setup lang="ts">
import ReactionsContainer from '~/components/ReactionsContainer.vue'

// Optional: You can pass custom server reactions
const customReactions = {
  '👍': {
    '__createdAt': Date.now(),
    '__updatedAt': Date.now(),
    'user1': 1,
    'user2': 1,
    'user3': 1
  },
  '❤️': {
    '__createdAt': Date.now(),
    '__updatedAt': Date.now(),
    'user4': 1
  },
  '🎉': {
    '__createdAt': Date.now(),
    '__updatedAt': Date.now(),
    'user5': 1,
    'user6': 1
  },
}
</script>

<template>
  <div class="p-8 space-y-8">
    <h1 class="text-2xl font-bold">Vue Reactions Test</h1>

    <div class="space-y-4">
      <h2 class="text-lg font-semibold">Default Reactions</h2>
      <ReactionsContainer />
    </div>

    <div class="space-y-4">
      <h2 class="text-lg font-semibold">Custom Reactions</h2>
      <ReactionsContainer :server-reactions="customReactions" />
    </div>

    <div class="space-y-4">
      <h2 class="text-lg font-semibold">Styled Container</h2>
      <ReactionsContainer
        :server-reactions="customReactions"
        class="p-4 border rounded-lg bg-card"
      />
    </div>
  </div>
</template>
