# Vue Frimousse Registry

A custom component registry for [shadcn-vue](https://shadcn-vue.com) featuring the **emoji-picker** component.

## 🚀 Quick Start

### Installation

Install the emoji-picker component using the shadcn-vue CLI:

```bash
npx shadcn-vue@latest add https://vue-frimousse.robertshaw.id/r/emoji-picker.json
```

### Prerequisites

Make sure your project has the required dependencies:

```bash
# Install vue-frimousse
npm install vue-frimousse
# or
pnpm add vue-frimousse
```

## 📦 Components

### EmojiPicker

A complete emoji picker component with search, categories, and skin tone selection.

#### Basic Usage

```vue
<script setup lang="ts">
import {
  EmojiPicker,
  EmojiPickerSearch,
  EmojiPickerContent,
  EmojiPickerFooter
} from '@/components/ui/emoji-picker'

const handleEmojiSelect = (emoji: any) => {
  console.log('Selected emoji:', emoji)
}
</script>

<template>
  <EmojiPicker 
    class="w-80 h-96"
    @emoji-select="handleEmojiSelect"
  >
    <EmojiPickerSearch placeholder="Search emojis..." />
    <EmojiPickerContent />
    <EmojiPickerFooter />
  </EmojiPicker>
</template>
```

#### With Popover

```vue
<script setup lang="ts">
import { ref } from 'vue'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import {
  EmojiPicker,
  EmojiPickerSearch,
  EmojiPickerContent,
  EmojiPickerFooter
} from '@/components/ui/emoji-picker'

const selectedEmoji = ref<string>('😀')
const open = ref(false)

const handleEmojiSelect = (emoji: any) => {
  selectedEmoji.value = emoji.emoji
  open.value = false
}
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button variant="outline" class="w-12 h-12">
        {{ selectedEmoji }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-80 p-0">
      <EmojiPicker @emoji-select="handleEmojiSelect">
        <EmojiPickerSearch />
        <EmojiPickerContent />
        <EmojiPickerFooter />
      </EmojiPicker>
    </PopoverContent>
  </Popover>
</template>
```

#### Custom Styling

```vue
<template>
  <EmojiPicker class="w-96 h-[500px] border-2 border-primary rounded-lg">
    <EmojiPickerSearch 
      class="border-b-2 border-primary/20" 
      placeholder="Find your perfect emoji..."
    />
    <EmojiPickerContent class="bg-gradient-to-b from-background to-muted/20" />
    <EmojiPickerFooter class="border-t-2 border-primary/20 bg-muted/10" />
  </EmojiPicker>
</template>
```

## 🎨 Theming

The emoji-picker components automatically adapt to your shadcn-vue theme configuration. They use CSS variables for colors and support both light and dark themes.

### Required CSS Variables

Make sure your project includes the standard shadcn-vue CSS variables:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96%;
  --accent-foreground: 222.2 84% 4.9%;
  --border: 214.3 31.8% 91.4%;
  /* ... other variables */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --popover: 222.2 84% 4.9%;
  --popover-foreground: 210 40% 98%;
  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;
  --accent: 217.2 32.6% 17.5%;
  --accent-foreground: 210 40% 98%;
  --border: 217.2 32.6% 17.5%;
  /* ... other variables */
}
```

## 🔧 Configuration

### Project Setup

1. **Initialize shadcn-vue** in your project if you haven't already:

```bash
npx shadcn-vue@latest init
```

2. **Install the emoji-picker** component:

```bash
npx shadcn-vue@latest add https://vue-frimousse.robertshaw.id/r/emoji-picker.json
```

3. **Add the dependency** to your project:

```bash
npm install vue-frimousse
```

### TypeScript Support

The components include full TypeScript support. Make sure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "strict": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## 📚 API Reference

### EmojiPicker

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | `undefined` | Additional CSS classes |

### EmojiPickerSearch

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | `undefined` | Additional CSS classes |
| `placeholder` | `string` | `"Search..."` | Search input placeholder |

### EmojiPickerContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | `undefined` | Additional CSS classes |

### EmojiPickerFooter

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | `undefined` | Additional CSS classes |

## 🔗 Links

- [Vue Frimousse](https://github.com/xiaoluoboding/vue-frimousse) - The underlying emoji picker library
- [shadcn-vue](https://shadcn-vue.com) - Vue port of shadcn/ui
- [Homepage](https://vue-frimousse.robertshaw.id)

## 📄 License

MIT © Robert Shaw
