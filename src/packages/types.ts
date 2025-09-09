/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  Emoji as EmojibaseEmoji,
  Group as EmojibaseGroup,
  Locale as EmojibaseLocale,
  SkinToneKey as EmojibaseSkinToneKey
} from 'emojibase/lib/types'
import type { ComponentPublicInstance, DefineComponent, VNode } from 'vue'

type Resolve<T> = T extends (...args: unknown[]) => unknown ? T : { [K in keyof T]: T[K] }

export type WithAttributes<T> = T & {
  [attribute: `frimousse-${string}` | `data-${string}`]: string | number | undefined
}

export type {
  Emoji as EmojibaseEmoji,
  MessagesDataset as EmojibaseMessagesDataset,
  SkinTone as EmojibaseSkinTone
} from 'emojibase/lib/types'

export type EmojibaseEmojiWithGroup = EmojibaseEmoji & {
  group: EmojibaseGroup
}

export type Locale = Resolve<EmojibaseLocale>

export type SkinTone = Resolve<'none' | EmojibaseSkinToneKey>

export type SkinToneVariation = {
  skinTone: SkinTone
  emoji: string
}

export type Emoji = Resolve<EmojiPickerEmoji>

export type Category = Resolve<EmojiPickerCategory>

export type EmojiDataEmoji = {
  emoji: string
  category: number
  label: string
  version: number
  tags: string[]
  countryFlag: true | undefined
  skins: Record<Exclude<SkinTone, 'none'>, string> | undefined
}

export type EmojiDataCategory = {
  index: number
  label: string
}

export type EmojiData = {
  locale: Locale
  emojis: EmojiDataEmoji[]
  categories: EmojiDataCategory[]
  skinTones: Record<Exclude<SkinTone, 'none'>, string>
}

export type EmojiPickerEmoji = {
  emoji: string
  label: string
}

export type EmojiPickerCategory = {
  label: string
}

export type EmojiPickerDataRow = {
  categoryIndex: number
  emojis: EmojiPickerEmoji[]
}

export type EmojiPickerDataCategory = {
  label: string
  rowsCount: number
  startRowIndex: number
}

export type EmojiPickerData = {
  count: number
  categories: EmojiPickerDataCategory[]
  categoriesStartRowIndices: number[]
  rows: EmojiPickerDataRow[]
  skinTones: Record<Exclude<SkinTone, 'none'>, string>
}

export type EmojiPickerListComponents = Record<string, never>

export interface EmojiPickerListRowProps {
  [key: string]: any
}

export interface EmojiPickerListCategoryHeaderProps {
  /**
   * The category for this sticky header.
   */
  category: Category
  [key: string]: any
}

export interface EmojiPickerListEmojiProps {
  /**
   * The emoji for this button, its label, and whether the emoji is currently
   * active (either hovered or selected via keyboard navigation).
   */
  emoji: Emoji & { isActive: boolean }
  [key: string]: any
}

export interface EmojiPickerListProps {
  /**
   * The inner components of the list.
   */
  components?: Partial<EmojiPickerListComponents>
  [key: string]: any
}

export interface EmojiPickerRootProps {
  /**
   * A callback invoked when an emoji is selected.
   */
  onEmojiSelect?: (emoji: Emoji) => void

  /**
   * The locale of the emoji picker.
   *
   * @default "en"
   */
  locale?: Locale

  /**
   * The skin tone of the emoji picker.
   *
   * @default "none"
   */
  skinTone?: SkinTone

  /**
   * The number of columns in the list.
   *
   * @default 10
   */
  columns?: number

  /**
   * Which {@link https://emojipedia.org/emoji-versions | Emoji version} to use,
   * to manually control which emojis are visible regardless of the current
   * browser's supported Emoji versions.
   *
   * @default The most recent version supported by the current browser
   */
  emojiVersion?: number

  /**
   * The base URL of where the {@link https://emojibase.dev/docs/datasets/ | Emojibase data}
   * should be fetched from, used as follows: `${emojibaseUrl}/${locale}/${file}.json`.
   * (e.g. `${emojibaseUrl}/en/data.json`).
   *
   * The URL can be set to another CDN hosting the {@link https://www.npmjs.com/package/emojibase-data | `emojibase-data`}
   * package and its raw JSON files, or to a self-hosted location. When self-hosting
   * with a single locale (e.g. `en`), only that locale's directory needs to be hosted
   * instead of the entire package.
   *
   * @example "https://unpkg.com/emojibase-data"
   *
   * @example "https://example.com/self-hosted-emojibase-data"
   *
   * @default "https://cdn.jsdelivr.net/npm/emojibase-data"
   */
  emojibaseUrl?: string

  /**
   * Whether the category headers should be sticky.
   *
   * @default true
   */
  sticky?: boolean

  [key: string]: any
}

export interface EmojiPickerViewportProps {
  [key: string]: any
}

export interface EmojiPickerSearchProps {
  value?: string
  defaultValue?: string
  onChange?: (event: Event) => void
  [key: string]: any
}

export interface EmojiPickerSkinToneSelectorProps {
  /**
   * The emoji to use as visual for the skin tone variations.
   *
   * @default "✋"
   */
  emoji?: string
  onClick?: (event: Event) => void
  'aria-label'?: string
  [key: string]: any
}

export interface EmojiPickerLoadingProps {
  [key: string]: any
}

export type EmojiPickerEmptyRenderProps = {
  /**
   * The current search value.
   */
  search: string
}

export interface EmojiPickerFooterProps {
  [key: string]: any
}

export interface EmojiPickerEmptyProps {
  /**
   * The content to render when no emoji is found for the current search, or
   * a render callback which receives the current search value.
   */
  children?: VNode | ((props: EmojiPickerEmptyRenderProps) => VNode)
  [key: string]: any
}

export type EmojiPickerActiveEmojiRenderProps = {
  /**
   * The currently active emoji (either hovered or selected
   * via keyboard navigation).
   */
  emoji?: Emoji
}

export type EmojiPickerActiveEmojiProps = {
  /**
   * A render callback which receives the currently active emoji (either hovered or selected
   * via keyboard navigation).
   */
  children: (props: EmojiPickerActiveEmojiRenderProps) => VNode
}

export type EmojiPickerSkinToneRenderProps = {
  /**
   * The current skin tone.
   */
  skinTone: SkinTone

  /**
   * A function to change the current skin tone.
   */
  setSkinTone: (skinTone: SkinTone) => void

  /**
   * The skin tone variations of the specified emoji.
   */
  skinToneVariations: SkinToneVariation[]
}

export interface EmojiPickerSkinToneProps {
  /**
   * The emoji to use as visual for the skin tone variations.
   *
   * @default "✋"
   */
  emoji?: string
  [key: string]: any
}
