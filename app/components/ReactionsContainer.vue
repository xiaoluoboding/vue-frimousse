<script lang="ts">
// Constants that need to be available for defineProps
const ZWJ = "\u200D"
const SKIN_TONE_MODIFIERS = /\u{1F3FB}|\u{1F3FC}|\u{1F3FD}|\u{1F3FE}|\u{1F3FF}/gu
const REACTIONS_HIDING_DEBOUNCE_DELAY = 500
const CREATED_AT_KEY = '__createdAt'
const UPDATED_AT_KEY = '__updatedAt'
const DEFAULT_KEYS_COUNT = 2
const MAX_REACTIONS = 50

// Types
interface ReactionData {
  [CREATED_AT_KEY]: number
  [UPDATED_AT_KEY]: number
  [userId: string]: number
}

interface ReactionsJson {
  [emoji: string]: ReactionData
}

// Helper function to generate random users for a reaction
function generateRandomUsers(maxUsers: number = 10): Record<string, number> {
  const userCount = Math.floor(Math.random() * maxUsers) + 1 // 1 to maxUsers
  const users: Record<string, number> = {}

  for (let i = 0; i < userCount; i++) {
    users[`user${Math.floor(Math.random() * 1000) + 1}`] = 1
  }

  return users
}

// Default reactions with commonly used emojis
const DEFAULT_REACTIONS: ReactionsJson = {
  // Basic reactions
  '👍': { [CREATED_AT_KEY]: Date.now() - 86400000, [UPDATED_AT_KEY]: Date.now() - 3600000, ...generateRandomUsers(8) },
  '👎': { [CREATED_AT_KEY]: Date.now() - 82800000, [UPDATED_AT_KEY]: Date.now() - 7200000, ...generateRandomUsers(3) },
  '❤️': { [CREATED_AT_KEY]: Date.now() - 79200000, [UPDATED_AT_KEY]: Date.now() - 1800000, ...generateRandomUsers(10) },
  '😂': { [CREATED_AT_KEY]: Date.now() - 75600000, [UPDATED_AT_KEY]: Date.now() - 900000, ...generateRandomUsers(6) },
  '😍': { [CREATED_AT_KEY]: Date.now() - 72000000, [UPDATED_AT_KEY]: Date.now() - 2700000, ...generateRandomUsers(5) },
  '😊': { [CREATED_AT_KEY]: Date.now() - 64800000, [UPDATED_AT_KEY]: Date.now() - 1200000, ...generateRandomUsers(7) },
  '🤔': { [CREATED_AT_KEY]: Date.now() - 61200000, [UPDATED_AT_KEY]: Date.now() - 3000000, ...generateRandomUsers(3) },
  '🔥': { [CREATED_AT_KEY]: Date.now() - 54000000, [UPDATED_AT_KEY]: Date.now() - 600000, ...generateRandomUsers(9) },

  // Celebration emojis
  '🎉': { [CREATED_AT_KEY]: Date.now() - 50400000, [UPDATED_AT_KEY]: Date.now() - 2100000, ...generateRandomUsers(8) },
  '🥳': { [CREATED_AT_KEY]: Date.now() - 46800000, [UPDATED_AT_KEY]: Date.now() - 3900000, ...generateRandomUsers(4) },
  '🎊': { [CREATED_AT_KEY]: Date.now() - 43200000, [UPDATED_AT_KEY]: Date.now() - 1500000, ...generateRandomUsers(5) },
  '✨': { [CREATED_AT_KEY]: Date.now() - 39600000, [UPDATED_AT_KEY]: Date.now() - 4800000, ...generateRandomUsers(6) },

  // Hand gestures
  '👏': { [CREATED_AT_KEY]: Date.now() - 36000000, [UPDATED_AT_KEY]: Date.now() - 2400000, ...generateRandomUsers(7) },
  '🙌': { [CREATED_AT_KEY]: Date.now() - 32400000, [UPDATED_AT_KEY]: Date.now() - 3600000, ...generateRandomUsers(4) },
  '👌': { [CREATED_AT_KEY]: Date.now() - 28800000, [UPDATED_AT_KEY]: Date.now() - 1800000, ...generateRandomUsers(3) },
  '✌️': { [CREATED_AT_KEY]: Date.now() - 25200000, [UPDATED_AT_KEY]: Date.now() - 4200000, ...generateRandomUsers(2) },
  '🤝': { [CREATED_AT_KEY]: Date.now() - 21600000, [UPDATED_AT_KEY]: Date.now() - 2700000, ...generateRandomUsers(5) },

  // Animals & Nature
  '🐱': { [CREATED_AT_KEY]: Date.now() - 18000000, [UPDATED_AT_KEY]: Date.now() - 1200000, ...generateRandomUsers(6) },
  '🐶': { [CREATED_AT_KEY]: Date.now() - 14400000, [UPDATED_AT_KEY]: Date.now() - 3000000, ...generateRandomUsers(8) },
  '🦄': { [CREATED_AT_KEY]: Date.now() - 10800000, [UPDATED_AT_KEY]: Date.now() - 4500000, ...generateRandomUsers(3) },
  '🌟': { [CREATED_AT_KEY]: Date.now() - 7200000, [UPDATED_AT_KEY]: Date.now() - 900000, ...generateRandomUsers(7) },
  '🌈': { [CREATED_AT_KEY]: Date.now() - 3600000, [UPDATED_AT_KEY]: Date.now() - 2100000, ...generateRandomUsers(4) },

  // Food & Drinks
  '☕': { [CREATED_AT_KEY]: Date.now() - 1800000, [UPDATED_AT_KEY]: Date.now() - 600000, ...generateRandomUsers(5) },
  '🍕': { [CREATED_AT_KEY]: Date.now() - 900000, [UPDATED_AT_KEY]: Date.now() - 300000, ...generateRandomUsers(9) },
  '🎂': { [CREATED_AT_KEY]: Date.now() - 450000, [UPDATED_AT_KEY]: Date.now() - 150000, ...generateRandomUsers(6) },
  '🍔': { [CREATED_AT_KEY]: Date.now() - 225000, [UPDATED_AT_KEY]: Date.now() - 75000, ...generateRandomUsers(7) },

  // Misc popular
  '💯': { [CREATED_AT_KEY]: Date.now() - 112500, [UPDATED_AT_KEY]: Date.now() - 37500, ...generateRandomUsers(10) },
  '⚡': { [CREATED_AT_KEY]: Date.now() - 56250, [UPDATED_AT_KEY]: Date.now() - 18750, ...generateRandomUsers(4) },
}

// Utility functions
function getBaseEmoji(emoji: string) {
  return emoji
    .split(ZWJ)
    .map((segment) => segment.replace(SKIN_TONE_MODIFIERS, ''))
    .join(ZWJ)
}

function sortReactionsEntries(a: [string, ReactionData], b: [string, ReactionData]) {
  return b[1][CREATED_AT_KEY] - a[1][CREATED_AT_KEY]
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, provide } from 'vue'
import { cn } from '~/lib/utils'
import { getFastBoundingRects } from '~/lib/get-fast-bounding-rects'
import ReactionButton from './ReactionButton.vue'
import ReactionPlaceholder from './ReactionPlaceholder.vue'
import AddReactionButton from './AddReactionButton.vue'

interface Props {
  serverReactions?: ReactionsJson
  class?: string
}

// Component props
const props = withDefaults(defineProps<Props>(), {
  serverReactions: () => ({ ...DEFAULT_REACTIONS })
})

// Local state for reactions management
const reactions = ref<ReactionsJson>({ ...props.serverReactions })
const currentUserId = '#####' // Mock user ID for demo purposes

// Computed sorted reactions
const sortedReactions = computed(() => {
  return Object.entries(reactions.value).sort(sortReactionsEntries)
})

// Toggle reaction function
const toggleReaction = (emoji: string) => {
  const reaction = reactions.value[emoji]
  const now = Date.now()

  if (!reaction) {
    // If the reaction doesn't exist, initialize it with self
    const updatedReactions = {
      ...reactions.value,
      [emoji]: {
        [CREATED_AT_KEY]: now,
        [UPDATED_AT_KEY]: now,
        [currentUserId]: 1,
      },
    }

    // Delete all reactions above the limit
    if (Object.keys(updatedReactions).length > MAX_REACTIONS) {
      const sortedEntries = Object.entries(updatedReactions).sort(sortReactionsEntries)
      for (const [emojiKey] of sortedEntries.slice(MAX_REACTIONS)) {
        delete updatedReactions[emojiKey]
      }
    }

    reactions.value = updatedReactions
  } else if (currentUserId in reaction) {
    // If the reaction exists and is active, remove self
    const { [currentUserId]: _unused, ...inactiveReaction } = reaction
    reactions.value = {
      ...reactions.value,
      [emoji]: {
        ...inactiveReaction,
        [UPDATED_AT_KEY]: now,
      },
    }
  } else {
    // If the reaction exists and isn't active, add self
    reactions.value = {
      ...reactions.value,
      [emoji]: {
        ...reaction,
        [UPDATED_AT_KEY]: now,
        [currentUserId]: 1,
      },
    }
  }
}

const handleEmojiSelect = (emoji: string) => {
  toggleReaction(getBaseEmoji(emoji))
}

// State for handling reactions list visibility
const reactionsContainer = ref<HTMLDivElement>()
const firstHiddenReactionIndex = ref<number>(Number.POSITIVE_INFINITY)

// Context keys
const FirstHiddenReactionIndexKey = Symbol('FirstHiddenReactionIndex')
provide(FirstHiddenReactionIndexKey, firstHiddenReactionIndex)

// Visibility tracking for reactions
const updateLastVisibleReaction = async () => {
  if (!reactionsContainer.value) return

  const reactions = [
    reactionsContainer.value,
    ...Array.from(reactionsContainer.value.querySelectorAll('[data-reaction]'))
  ]

  const rects = await getFastBoundingRects(reactions)
  const [containerRect, ...reactionRects] = Array.from(rects.values())
  const rows = new Map<number, number>()
  let index = 0

  for (const reactionRect of reactionRects) {
    if (!rows.has(reactionRect.top)) {
      rows.set(reactionRect.top, index)

      if (reactionRect.top >= containerRect!.top + containerRect!.height) {
        firstHiddenReactionIndex.value = index
        return
      }
    }
    index++
  }

  firstHiddenReactionIndex.value = Number.POSITIVE_INFINITY
}

let debounceTimeout: ReturnType<typeof setTimeout>

const debouncedUpdateLastVisibleReaction = () => {
  clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(updateLastVisibleReaction, REACTIONS_HIDING_DEBOUNCE_DELAY)
}

onMounted(() => {
  if (!reactionsContainer.value) return

  const resizeObserver = new ResizeObserver(debouncedUpdateLastVisibleReaction)
  const mutationObserver = new MutationObserver(debouncedUpdateLastVisibleReaction)

  resizeObserver.observe(reactionsContainer.value)
  mutationObserver.observe(reactionsContainer.value, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['data-count'],
  })

  onUnmounted(() => {
    clearTimeout(debounceTimeout)
    resizeObserver.disconnect()
    mutationObserver.disconnect()
  })
})

</script>

<template>
  <div
    ref="reactionsContainer"
    :class="cn(
      '2xs:[--rows:4] [--button-height:calc(var(--spacing)*8)] [--gap:calc(var(--spacing)*1.5)] [--rows:5] xs:[--rows:3]',
      'flex max-h-[calc(var(--button-height)_*_var(--rows)_+_var(--gap)_*_(var(--rows)_-_1))] min-h-[var(--button-height)] flex-wrap gap-[var(--gap)] [clip-path:inset(-3px)]',
      props.class
    )"
  >
    <!-- Add Reaction Button -->
    <AddReactionButton @emoji-select="handleEmojiSelect" />

    <!-- Reaction Buttons -->
    <template v-for="([emoji, data], index) in sortedReactions" :key="emoji">
      <ReactionButton
        v-if="Object.keys(data).length - DEFAULT_KEYS_COUNT > 0"
        :emoji="emoji"
        :count="Object.keys(data).length - DEFAULT_KEYS_COUNT"
        :active="currentUserId in data"
        :hidden="index >= firstHiddenReactionIndex"
        @click="() => toggleReaction(emoji)"
      />
    </template>

    <!-- Placeholder reactions -->
    <ReactionPlaceholder class="not-nth-[2]:hidden" emoji="🐰" />
    <ReactionPlaceholder class="not-nth-[3]:hidden" emoji="🥚" />
  </div>
</template>
