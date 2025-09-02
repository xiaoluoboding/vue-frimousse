import { computed, type Ref } from 'vue'
import { getSkinToneVariations } from './utils/get-skin-tone-variations'
import { useSelector, useSelectorKey } from './utils/store'
import { $activeEmoji, sameEmojiPickerEmoji, useEmojiPickerStore } from './store'
import type { Emoji, SkinTone, SkinToneVariation } from './types'

export { useEmojiPickerData, type UseEmojiPickerDataOptions } from './hooks/useEmojiPickerData'

/**
 * Returns the currently active emoji (either hovered or selected
 * via keyboard navigation).
 *
 * @example
 * ```vue
 * <script setup>
 * const activeEmoji = useActiveEmoji();
 * </script>
 * ```
 *
 * It can be used to build a preview area next to the list.
 *
 * @example
 * ```vue
 * <template>
 *   <div>
 *     <span v-if="activeEmoji">{{ activeEmoji.emoji }} {{ activeEmoji.label }}</span>
 *     <span v-else>Select an emoji…</span>
 *   </div>
 * </template>
 *
 * <script setup>
 * const activeEmoji = useActiveEmoji();
 * </script>
 * ```
 *
 * @see
 * If you prefer to use a component rather than a hook,
 * `<EmojiPicker.ActiveEmoji />` is also available.
 */
export function useActiveEmoji(): Ref<Emoji | undefined> {
  const store = useEmojiPickerStore()
  const activeEmoji = useSelector(store, $activeEmoji, sameEmojiPickerEmoji)

  return activeEmoji
}

/**
 * Returns the current skin tone and a function to change it.
 *
 * @example
 * ```vue
 * <script setup>
 * const [skinTone, setSkinTone] = useSkinTone();
 * </script>
 * ```
 *
 * It can be used to build a custom skin tone selector: pass an emoji
 * you want to use as visual (by default, ✋) and it will return its skin tone
 * variations.
 *
 * @example
 * ```vue
 * <template>
 *   <button
 *     v-for="variation in skinToneVariations"
 *     :key="variation.skinTone"
 *     @click="setSkinTone(variation.skinTone)"
 *   >
 *     {{ variation.emoji }}
 *   </button>
 * </template>
 *
 * <script setup>
 * const [skinTone, setSkinTone, skinToneVariations] = useSkinTone("👋");
 * </script>
 * ```
 *
 * @see
 * If you prefer to use a component rather than a hook,
 * `<EmojiPicker.SkinTone />` is also available.
 *
 * @see
 * An already-built skin tone selector is also available,
 * `<EmojiPicker.SkinToneSelector />`.
 */
export function useSkinTone(
  emoji = '✋'
): [Ref<SkinTone>, (skinTone: SkinTone) => void, SkinToneVariation[]] {
  const store = useEmojiPickerStore()
  const skinTone = useSelectorKey(store, 'skinTone')
  const skinToneVariations = computed(() => getSkinToneVariations(emoji))

  const setSkinTone = (newSkinTone: SkinTone) => {
    store.set({ skinTone: newSkinTone })
  }

  return [skinTone, setSkinTone, skinToneVariations.value]
}
