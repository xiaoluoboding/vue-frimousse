# Vue Frimousse

[![NPM][npmBadge]][npmUrl]
[![Minzip Package][bundlePhobiaBadge]][bundlePhobiaUrl]
[![NPM Download][npmDtBadge]][npmDtUrl]

[npmBadge]: https://img.shields.io/npm/v/vue-frimousse.svg?maxAge=2592000
[npmUrl]: https://www.npmjs.com/package/vue-frimousse
[npmDtBadge]: https://img.shields.io/npm/dt/vue-frimousse.svg
[npmDtUrl]: https://www.npmjs.com/package/vue-frimousse
[bundlePhobiaBadge]: https://img.shields.io/bundlephobia/minzip/vue-frimousse
[bundlePhobiaUrl]: https://bundlephobia.com/package/vue-frimousse@latest

> A Vue 3 emoji picker component library - 1:1 port of the React Frimousse emoji picker

## Features

- 🎯 **1:1 React Port**: Complete feature parity with the React Frimousse emoji picker
- 🚀 **Vue 3 Composition API**: Built with modern Vue 3 patterns and TypeScript
- 🎨 **Customizable Components**: Flexible component system with custom renderers
- ⌨️ **Keyboard Navigation**: Full keyboard accessibility support
- 🔍 **Search & Filter**: Real-time emoji search with category filtering
- 🌈 **Skin Tone Support**: Complete skin tone variation support
- 📱 **Responsive Design**: Works seamlessly across all device sizes
- 🎭 **Emoji Data**: Uses Emojibase for comprehensive emoji data

## Installation

```bash
npm install vue-frimousse
# or
pnpm add vue-frimousse
# or
yarn add vue-frimousse
```

## Basic Usage

```vue
<template>
  <EmojiPicker.Root @emoji-click="onEmojiClick">
    <EmojiPicker.Search placeholder="Search emojis..." />
    <EmojiPicker.Viewport>
      <EmojiPicker.List />
    </EmojiPicker.Viewport>
  </EmojiPicker.Root>
</template>

<script setup lang="ts">
import * as EmojiPicker from 'vue-frimousse'
import 'vue-frimousse/style.css'

const onEmojiClick = (emoji: any) => {
  console.log('Selected emoji:', emoji)
}
</script>
```

## Advanced Usage

### Custom Components

```vue
<template>
  <EmojiPicker.Root 
    :components="{
      CategoryHeader: CustomCategoryHeader,
      Emoji: CustomEmojiButton,
      Row: CustomRow
    }"
    @emoji-click="onEmojiClick"
  >
    <EmojiPicker.Search />
    <EmojiPicker.Viewport>
      <EmojiPicker.List />
    </EmojiPicker.Viewport>
  </EmojiPicker.Root>
</template>
```

### With Loading and Empty States

```vue
<template>
  <EmojiPicker.Root @emoji-click="onEmojiClick">
    <EmojiPicker.Search />
    
    <EmojiPicker.Loading>
      <div>Loading emojis...</div>
    </EmojiPicker.Loading>
    
    <EmojiPicker.Empty>
      <template #default="{ search }">
        <div>No emojis found for "{{ search }}"</div>
      </template>
    </EmojiPicker.Empty>
    
    <EmojiPicker.Viewport>
      <EmojiPicker.List />
    </EmojiPicker.Viewport>
  </EmojiPicker.Root>
</template>
```

### Skin Tone Selector

```vue
<template>
  <EmojiPicker.Root @emoji-click="onEmojiClick">
    <EmojiPicker.SkinTone>
      <template #default="{ skinTone, setSkinTone, skinToneVariations }">
        <EmojiPicker.SkinToneSelector 
          :skin-tone="skinTone"
          @skin-tone-change="setSkinTone"
        />
      </template>
    </EmojiPicker.SkinTone>
    
    <EmojiPicker.Search />
    <EmojiPicker.Viewport>
      <EmojiPicker.List />
    </EmojiPicker.Viewport>
  </EmojiPicker.Root>
</template>
```

## API Reference

### Components

- `EmojiPicker.Root` - Main container component
- `EmojiPicker.Search` - Search input component  
- `EmojiPicker.Viewport` - Scrollable container for the emoji list
- `EmojiPicker.List` - Virtualized emoji list component
- `EmojiPicker.Loading` - Loading state component
- `EmojiPicker.Empty` - Empty state component
- `EmojiPicker.SkinToneSelector` - Skin tone selection button
- `EmojiPicker.ActiveEmoji` - Active emoji display component
- `EmojiPicker.SkinTone` - Skin tone context provider

### Hooks

- `useActiveEmoji()` - Get the currently active emoji
- `useSkinTone(emoji)` - Manage skin tone state for an emoji

### Types

All TypeScript types are exported for full type safety:

```typescript
import type { 
  EmojiPickerRootProps,
  EmojiPickerListProps,
  Emoji,
  Category,
  SkinTone,
  Locale
} from 'vue-frimousse'
```

## Use the Template

### GitHub Template

[create a repo from this template on GitHub](https://github.com/new?template_name=vue-frimousse&template_owner=xiaoluoboding)

### Clone to local

```bash
git clone https://github.com/xiaoluoboding/vue-frimousse

cd vue-frimousse
```

## Usage

Building it is as easy as 1, 2, 3.

### 1、Install dependencies

```bash
pnpm install
```

### 2、Build a library

Rename all the `vue-frimousse` to your component name in the file `package.json、vite.config.ts`, eg: `my-component`

```bash
pnpm run build:lib
```

### 3、Build nuxt library

This repository ships a Nuxt module so you can use the library in Nuxt projects.

- Prepare the Nuxt playground and stub the module (handy for local testing)

```bash
pnpm run dev:nuxt:prepare
```

- Run the Nuxt playground to verify everything works

```bash
pnpm run dev:nuxt
```

- Build the Nuxt module artifacts to `lib/nuxt`

```bash
pnpm run build:module
```

- (Optional) Build all outputs (ESM, UMD, Nuxt) in one go

```bash
pnpm run release
```

Use in a Nuxt app by adding the module and CSS in your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['vue-frimousse/nuxt'],
  css: ['vue-frimousse/style.css']
})
```

### 4、Publish to npm

```bash
npm publish
```

## License

MIT [@xiaoluoboding](https://github.com/xiaoluoboding)
