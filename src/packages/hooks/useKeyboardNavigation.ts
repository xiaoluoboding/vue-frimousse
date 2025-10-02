import type { Ref } from 'vue'
import type { EmojiPickerStore } from '../store'
import type { Store } from '../utils/store'
import type { EmojiPickerDataRow } from '../types'

/**
 * Navigation result containing the new position
 */
interface NavigationResult {
  rowIndex: number
  columnIndex: number
}

/**
 * A composable that handles keyboard navigation for the emoji picker.
 *
 * This extracts the complex keyboard navigation logic into a reusable,
 * testable composable, making the main component cleaner and more maintainable.
 *
 * @param store - The EmojiPicker store instance
 * @param isFocusedWithin - Ref indicating if the picker has focus
 *
 * @example
 * ```ts
 * const { handleArrowKey, handleEnterKey } = useKeyboardNavigation(store, isFocusedWithin)
 * ```
 */
export function useKeyboardNavigation(
  store: Store<EmojiPickerStore>,
  isFocusedWithin: Ref<boolean>
) {
  /**
   * Handles left arrow navigation
   */
  const moveLeft = (
    columnIndex: number,
    rowIndex: number,
    rows: EmojiPickerDataRow[]
  ): NavigationResult => {
    if (columnIndex === 0) {
      // At first column, try to move to last column of previous row
      const previousRowIndex = rowIndex - 1
      const previousRow = rows[previousRowIndex]

      if (previousRow) {
        return {
          rowIndex: previousRowIndex,
          columnIndex: previousRow.emojis.length - 1
        }
      }
    } else {
      // Move to previous column
      return {
        rowIndex,
        columnIndex: columnIndex - 1
      }
    }

    // Can't move left, stay at current position
    return { rowIndex, columnIndex }
  }

  /**
   * Handles right arrow navigation
   */
  const moveRight = (
    columnIndex: number,
    rowIndex: number,
    rows: EmojiPickerDataRow[]
  ): NavigationResult => {
    const currentRow = rows[rowIndex]
    if (!currentRow) {
      return { rowIndex, columnIndex }
    }

    if (columnIndex === currentRow.emojis.length - 1) {
      // At last column, try to move to first column of next row
      const nextRowIndex = rowIndex + 1
      const nextRow = rows[nextRowIndex]

      if (nextRow) {
        return {
          rowIndex: nextRowIndex,
          columnIndex: 0
        }
      }
    } else {
      // Move to next column
      return {
        rowIndex,
        columnIndex: columnIndex + 1
      }
    }

    // Can't move right, stay at current position
    return { rowIndex, columnIndex }
  }

  /**
   * Handles up arrow navigation
   */
  const moveUp = (
    columnIndex: number,
    rowIndex: number,
    rows: EmojiPickerDataRow[]
  ): NavigationResult => {
    const previousRow = rows[rowIndex - 1]

    if (previousRow) {
      const newRowIndex = rowIndex - 1

      // If previous row doesn't have the same column, move to last column
      const newColumnIndex = previousRow.emojis[columnIndex]
        ? columnIndex
        : previousRow.emojis.length - 1

      return {
        rowIndex: newRowIndex,
        columnIndex: newColumnIndex
      }
    }

    // Can't move up, stay at current position
    return { rowIndex, columnIndex }
  }

  /**
   * Handles down arrow navigation
   */
  const moveDown = (
    columnIndex: number,
    rowIndex: number,
    rows: EmojiPickerDataRow[]
  ): NavigationResult => {
    const nextRow = rows[rowIndex + 1]

    if (nextRow) {
      const newRowIndex = rowIndex + 1

      // If next row doesn't have the same column, move to last column
      const newColumnIndex = nextRow.emojis[columnIndex] ? columnIndex : nextRow.emojis.length - 1

      return {
        rowIndex: newRowIndex,
        columnIndex: newColumnIndex
      }
    }

    // Can't move down, stay at current position
    return { rowIndex, columnIndex }
  }

  /**
   * Handles arrow key navigation
   */
  const handleArrowKey = (event: KeyboardEvent) => {
    console.log('handleArrowKey', isFocusedWithin.value)
    if (!isFocusedWithin.value) {
      return
    }

    const { data, onActiveEmojiChange, interaction, activeColumnIndex, activeRowIndex } =
      store.get()

    let columnIndex = activeColumnIndex
    let rowIndex = activeRowIndex

    if (interaction !== 'none') {
      // Only try to navigate if we have data
      if (data?.rows && data.rows.length > 0) {
        // Map of arrow keys to their navigation handlers
        const navigationHandlers: Record<string, () => NavigationResult> = {
          ArrowLeft: () => moveLeft(columnIndex, rowIndex, data.rows),
          ArrowRight: () => moveRight(columnIndex, rowIndex, data.rows),
          ArrowUp: () => moveUp(columnIndex, rowIndex, data.rows),
          ArrowDown: () => moveDown(columnIndex, rowIndex, data.rows)
        }

        const handler = navigationHandlers[event.key]
        if (handler) {
          const result = handler()
          columnIndex = result.columnIndex
          rowIndex = result.rowIndex
        }
      }

      // Always call onActiveEmojiChange when interaction is not "none"
      onActiveEmojiChange('keyboard', columnIndex, rowIndex)
    } else {
      // No interaction yet, start from first emoji
      onActiveEmojiChange('keyboard', 0, 0)
    }
  }

  /**
   * Handles Enter key to select the active emoji
   */
  const handleEnterKey = () => {
    console.log('handleEnterKey', isFocusedWithin.value)
    if (!isFocusedWithin.value) {
      return
    }

    const { data, onEmojiSelect, activeColumnIndex, activeRowIndex } = store.get()
    const activeEmoji = data?.rows[activeRowIndex]?.emojis[activeColumnIndex]

    if (activeEmoji) {
      onEmojiSelect(activeEmoji)
    }
  }

  return {
    handleArrowKey,
    handleEnterKey
  }
}
