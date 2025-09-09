# Vue Emoji Picker Components

This directory contains Vue 3 components translated from the original React implementation.

## Components

- `EmojiPicker` - Main container component
- `EmojiPickerSearch` - Search input with icon
- `EmojiPickerContent` - Content area with viewport, loading, empty states
- `EmojiPickerFooter` - Footer with active emoji display
- `EmojiPickerRow` - Row component for list items
- `EmojiPickerCategoryHeader` - Category header component

## Usage

```vue
<template>
  <EmojiPicker>
    <EmojiPickerSearch />
    <EmojiPickerContent />
    <EmojiPickerFooter />
  </EmojiPicker>
</template>

<script setup>
import {
  EmojiPicker,
  EmojiPickerSearch,
  EmojiPickerContent,
  EmojiPickerFooter
} from './components/ui/emoji-picker'
</script>
```

## Key Differences from React Version

1. **Props**: Vue 3 `defineProps` instead of React props destructuring
2. **Class binding**: Vue's `:class` with computed values instead of JSX className
3. **Template syntax**: Vue template syntax instead of JSX
4. **Slots**: Vue slots instead of React children/render props
5. **Event handling**: Vue event modifiers and `v-bind="$attrs"`
6. **Component composition**: Vue Single File Components instead of function components

All styling and functionality remains the same as the original React implementation.
