<template>
  <div>
    <h2>Standalone Hooks Usage Example</h2>
    
    <!-- Display active emoji -->
    <div v-if="activeEmoji" class="active-emoji">
      <span>{{ activeEmoji.emoji }}</span>
      <span>{{ activeEmoji.label }}</span>
    </div>
    <div v-else class="no-emoji">
      No active emoji
    </div>

    <!-- Skin tone selector -->
    <div class="skin-tone-selector">
      <h3>Skin Tone: {{ skinTone }}</h3>
      <button
        v-for="variation in skinToneVariations"
        :key="variation.skinTone"
        @click="setSkinTone(variation.skinTone)"
        :class="{ active: variation.skinTone === skinTone }"
      >
        {{ variation.emoji }}
      </button>
    </div>

    <!-- Manual emoji activation for testing -->
    <button @click="simulateEmojiHover">Simulate Emoji Hover</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { createEmojiPickerStore, provideEmojiPickerStore } from '../../src/packages/store'
import { useSelector, useSelectorKey } from '../../src/packages/utils/store'
import { $activeEmoji, sameEmojiPickerEmoji } from '../../src/packages/store'
import { getSkinToneVariations } from '../../src/packages/utils/get-skin-tone-variations'
import type { SkinTone } from '../../src/packages/types'

// Create a standalone store instance
const store = createEmojiPickerStore(
  (emoji) => {
    console.log('Emoji selected:', emoji)
  }, // onEmojiSelect callback
  'en', // locale
  8,    // columns
  true, // sticky
  'none' // initial skin tone
)

// Provide the store so hooks can access it
provideEmojiPickerStore(store)

// Manually implement hooks functionality to avoid injection issues
const activeEmoji = useSelector(store, $activeEmoji, sameEmojiPickerEmoji)
const skinTone = useSelectorKey(store, 'skinTone')
const skinToneVariations = computed(() => getSkinToneVariations('👋'))

const setSkinTone = (newSkinTone: SkinTone) => {
  store.set({ skinTone: newSkinTone })
}

// Example of manually triggering emoji state changes
const simulateEmojiHover = () => {
  // You would need to populate the store with emoji data first
  // This is just to show how you could programmatically change active emoji
  store.get().onActiveEmojiChange('pointer', 0, 0)
}

onMounted(() => {
  console.log('Hooks are ready to use outside emoji picker!')
  console.log('Current skin tone:', skinTone.value)
})
</script>

<style scoped>
.active-emoji {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.active-emoji span:first-child {
  font-size: 2rem;
  margin-right: 0.5rem;
}

.no-emoji {
  padding: 1rem;
  color: #666;
  font-style: italic;
}

.skin-tone-selector {
  margin: 1rem 0;
}

.skin-tone-selector button {
  margin: 0.25rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-size: 1.5rem;
}

.skin-tone-selector button.active {
  background: #007bff;
  color: white;
}

.skin-tone-selector button:hover {
  background: #f0f0f0;
}

.skin-tone-selector button.active:hover {
  background: #0056b3;
}
</style>
