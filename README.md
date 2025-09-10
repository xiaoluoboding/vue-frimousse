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
- ⚡️ **Lightweight and fast**: Dependency-free, tree-shakable, and virtualized with minimal re-renders
- 🎨 **Unstyled and composable**: Bring your own styles and compose parts as you want
- 🔄 **Always up-to-date**: Latest emoji data is fetched when needed and cached locally
- 🔣 **No � symbols**: Unsupported emojis are automatically hidden
- ♿️ **Accessible**: Keyboard navigable and screen reader-friendly

## Installation

```bash
npm install vue-frimousse
# or
pnpm add vue-frimousse
# or
yarn add vue-frimousse
```

If you are using [shadcn/vue](https://www.shadcn-vue.com), you can also install it as a pre-built component via the [shadcn CLI](https://www.shadcn-vue.com/docs/cli.html).

```bash
npx shadcn-vue@latest add https://vue-frimousse.robertshaw.id/r/emoji-picker.json
```

Learn more in the [shadcn/vue](#shadcnvue) section.

## Usage

Import the `EmojiPicker` parts and create your own component by composing them.

```vue
<template>
  <EmojiPicker.Root>
    <EmojiPicker.Search />
    <EmojiPicker.Viewport>
      <EmojiPicker.Loading>Loading…</EmojiPicker.Loading>
      <EmojiPicker.Empty>No emoji found.</EmojiPicker.Empty>
      <EmojiPicker.List />
    </EmojiPicker.Viewport>
  </EmojiPicker.Root>
</template>

<script setup lang="ts">
  import { default as EmojiPicker } from "vue-frimousse";
</script>
```

Apart from a few sizing and overflow defaults, the parts don’t have any styles out-of-the-box. Being composable, you can bring your own styles and apply them however you want: [Tailwind CSS](https://tailwindcss.com/), CSS-in-JS, vanilla CSS via inline styles, classes, or by targeting the `[frimousse-*]` attributes present on each part.

You might want to use it in a popover rather than on its own. Frimousse only provides the emoji picker itself so if you don’t have a popover component in your app yet, there are several libraries available: [Reka UI](https://reka-ui.com/docs/components/popover), [Base UI](https://www.shadcn-vue.com/docs/components/popover.html), [shadcn/vue](https://headlessui.com/react/popover), and [Nuxt UI](https://ui.nuxt.com/components/popover), to name a few.

### shadcn/vue

If you are using [shadcn/vue](https://www.shadcn-vue.com), you can install a pre-built version which integrates with the existing shadcn/vue variables via the [shadcn/vue CLI](https://www.shadcn-vue.com/docs/cli.html).

```bash
npx shadcn-vue@latest add https://vue-frimousse.robertshaw.id/r/emoji-picker.json
```

It can be composed and combined with other shadcn/ui components like [Popover](https://ui.shadcn.com/docs/components/popover).

## Documentation

Find the full documentation and examples on [vue-frimousse.robertshaw.id](https://vue-frimousse.robertshaw.id).

## Compatibility

- Vue 3+ or Nuxt 3+
- TypeScript 5.1 and above

## Miscellaneous

The name [“frimousse”](https://en.wiktionary.org/wiki/frimousse) means “little face” in French, and it can also refer to smileys and emoticons.

The emoji picker component was originally created for the [Liveblocks Comments](https://liveblocks.io/comments) default components, within [`@liveblocks/react-ui`](https://github.com/liveblocks/liveblocks/tree/main/packages/liveblocks-react-ui).

## Credits

The emoji data is based on [Emojibase](https://emojibase.dev/).

## Contributing

All contributions are welcome! If you find a bug or have a feature request, feel free to create an [issue](https://github.com/xiaoluoboding/vue-frimousse/issues) or a [PR](https://github.com/xiaoluoboding/vue-frimousse/pulls).

The project is setup as a monorepo with the `vue-frimousse` package at the root and [vue-frimousse.robertshaw.id](https://vue-frimousse.robertshaw.id) in the `app` directory.

### Development

Install dependencies and start development builds from the root.

```bash
npm i
npm run dev
```

Test the Nuxt package

```bash
npm run dev:nuxt
```

### Tests

The package has 95%+ test coverage with [Vitest](https://vitest.dev/). Some tests use Vitest’s [browser mode](https://vitest.dev/guide/browser-testing) with [Playwright](https://playwright.dev/), make sure to install the required browser first.

```bash
npm run test:unit
```

## License

MIT [@xiaoluoboding](https://github.com/xiaoluoboding)
