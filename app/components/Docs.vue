<template>
  <section
    class="prose mt-10 mb-20 md:mt-16 md:mb-30"
  >
    <PermalinkHeading as="h2">Installation</PermalinkHeading>

    <CodeBlock lang="bash" :code="installCode"/>

    <p>
      If you are using
      <a href="https://ui.shadcn.com/" rel="noreferrer" target="_blank">
        shadcn/ui
      </a>
      , you can also install it as a pre-built component via the
      <a
        href="https://ui.shadcn.com/docs/cli"
        rel="noreferrer"
        target="_blank"
      >
        shadcn CLI
      </a>
      .
    </p>

    <CodeBlock lang="bash" :code="shadcnCode"/>

    <p>
      Learn more in the shadcn/ui <a href="#shadcnui">section</a>.
    </p>

    <PermalinkHeading as="h2">Usage</PermalinkHeading>
    <p>
      Import the <code>EmojiPicker</code> parts and create your own component
      by composing them.
    </p>

    <CodeBlock lang="vue" :code="exampleCode" />

    <p>
      Apart from a few sizing and overflow defaults, the parts don't have any
      styles out-of-the-box. Being composable, you can bring your own styles
      and apply them however you want:
      <a href="https://tailwindcss.com/" rel="noreferrer" target="_blank">
        Tailwind CSS
      </a>
      , CSS-in-JS, vanilla CSS via inline styles, classes, or by targeting the
      <code>[frimousse-*]</code> attributes present on each part.
    </p>

    <EmojiPickerBasicDemo />

    <p>
      You might want to use it in a popover rather than on its own. Frimousse
      only provides the emoji picker itself so if you don’t have a popover
      component in your app yet, there are several libraries available:
      <a
        href="https://www.radix-ui.com/primitives/docs/components/popover"
        rel="noreferrer"
        target="_blank"
      >
        Radix UI
      </a>
      ,
      <a
        href="https://base-ui.com/react/components/popover"
        rel="noreferrer"
        target="_blank"
      >
        Base UI
      </a>
      ,
      <a
        href="https://headlessui.com/react/popover"
        rel="noreferrer"
        target="_blank"
      >
        Headless UI
      </a>
      , and
      <a
        href="https://react-spectrum.adobe.com/react-aria/Popover.html"
        rel="noreferrer"
        target="_blank"
      >
        React Aria
      </a>
      , to name a few.
    </p>

    <PermalinkHeading as="h3">shadcn-vue</PermalinkHeading>

    <p>
      If you are using
      <a href="https://ui.shadcn.com/" rel="noreferrer" target="_blank">
        shadcn/ui
      </a>
      , you can install a pre-built version of the component which integrates
      with the existing shadcn/ui variables via the
      <a
        href="https://ui.shadcn.com/docs/cli"
        rel="noreferrer"
        target="_blank"
      >
        shadcn CLI
      </a>
      .
    </p>

    <CodeBlock lang="bash" code="npx shadcn@latest add https://vue-frimousse.vercel.app"/>

    <EmojiPickerShadcnVueDemo />

    <p>
      It can be composed and combined with other <code>shadcn-vue</code> components like
      <a
        href="https://www.shadcn-vue.com/docs/components/popover.html"
        rel="noreferrer"
        target="_blank"
      >
        Popover
      </a>
      .
    </p>

    <EmojiPickerPopover />

    <PermalinkHeading as="h2">Styling</PermalinkHeading>
    <p>Various styling-related details and examples.</p>

    <PermalinkHeading as="h3">Dimensions</PermalinkHeading>
    <p>
      The emoji picker doesn’t require hard-coded dimensions and instead
      supports dynamically adapting to the contents (e.g. the number of
      columns, the size of the rows, the padding within the sticky category
      headers, etc). One aspect to keep in mind is that
      <a href="#emojipicker.list-inner-components">inner components</a> within
      <a href="#emojipicker.list">
        <code>EmojiPicker.List</code>
      </a>
      should be of the same size (e.g. all rows should be of the same height)
      to prevent layout shifts.
    </p>
    <p>
      The
      <a href="#emojipicker.root-css-variables">
        <code>--frimousse-viewport-width</code>
      </a>
      CSS variable can be used as a <code>max-width</code> to prevent some
      areas from becoming wider than the automatically sized contents, when
      showing the hovered emoji’s name below for example.
    </p>
    <p>
      And although not required, it’s still possible to force the emoji picker
      and its contents to be of a specific width, to fit the viewport on
      mobile for example.
    </p>

    <PermalinkHeading as="h3">List Padding</PermalinkHeading>
    <p>
      Because of its virtualized nature, adding padding to
      <a href="#emojipicker.list">
        <code>EmojiPicker.List</code>
      </a>
      can be tricky. We recommend adding horizontal padding to
      <a href="#emojipicker.list-inner-components">rows</a> and
      <a href="#emojipicker.list-inner-components">category headers</a>, and
      vertical padding on the <a href="#emojipicker.list">list</a> itself.
      Finally, to apply the same vertical padding to the
      <a href="#emojipicker.viewport">viewport</a> when keyboard navigating
      (which automatically scrolls to out-of-view rows), you can set the same
      value as
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-block"
        rel="noreferrer"
        target="_blank"
      >
        <code>scroll-margin-block</code>
      </a>
      on <a href="#emojipicker.list-inner-components">rows</a>.
    </p>

    <PermalinkHeading as="h3">Colorful Buttons</PermalinkHeading>
    <p>
      Some emoji pickers like Slack’s display their emoji buttons with
      seemingly random background colors when active (either hovered or
      selected via keyboard navigation). This can be achieved by using
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child"
        rel="noreferrer"
        target="_blank"
      >
        <code>:nth-child</code>
      </a>
      selectors on <a href="#emojipicker.list-inner-components">rows</a> and
      <a href="#emojipicker.list-inner-components">emojis</a> to alternate
      through a list of colors. In the example below, a row’s first emoji has
      a
      <span className="inline-block rounded-[0.3em] bg-rose-500/12 px-[0.375em] pt-[0.245em] pb-[0.265em] leading-none dark:bg-rose-400/26">
        red
      </span>
      background, the second
      <span className="inline-block rounded-[0.3em] bg-lime-500/18 px-[0.375em] pt-[0.245em] pb-[0.265em] leading-none dark:bg-lime-400/28">
        green
      </span>
      , the third
      <span className="inline-block rounded-[0.3em] bg-sky-500/12 px-[0.375em] pt-[0.245em] pb-[0.265em] leading-none dark:bg-sky-400/22">
        blue
      </span>
      , then
      <span className="inline-block rounded-[0.3em] bg-rose-500/12 px-[0.375em] pt-[0.245em] pb-[0.265em] leading-none dark:bg-rose-400/26">
        red
      </span>
      again, and so on. All <strong>odd</strong> rows follow the same pattern,
      while <strong>even</strong> rows offset it by one to avoid every column
      using the same color, starting with
      <span className="inline-block rounded-[0.3em] bg-sky-500/12 px-[0.375em] pt-[0.245em] pb-[0.265em] leading-none dark:bg-sky-400/22">
        blue
      </span>
      instead of
      <span className="inline-block rounded-[0.3em] bg-rose-500/12 px-[0.375em] pt-[0.245em] pb-[0.265em] leading-none dark:bg-rose-400/26">
        red
      </span>
      .
    </p>

    <PermalinkHeading as="h2">API Reference</PermalinkHeading>
    <p>All parts and hooks, along their usage and options.</p>

    <PermalinkHeading as="h3">EmojiPicker.Root</PermalinkHeading>
    <p>Surrounds all the emoji picker parts.</p>

    <CodeBlock lang="vue" :code="emojiPickerRootCode" />
    <p>
      Options affecting the entire emoji picker are available on this
      component as props.
    </p>

    <PermalinkHeading as="h3">EmojiPicker.Search</PermalinkHeading>
    <p>A search input to filter the list of emojis.</p>

    <CodeBlock lang="vue" :code="emojiPickerSearchCode" />

    <PermalinkHeading as="h2">Miscellaneous</PermalinkHeading>
      <p>
        The name
        <a
          href="https://en.wiktionary.org/wiki/frimousse"
          rel="noreferrer"
          target="_blank"
        >
          “frimousse”
        </a>
        means “little face” in French, and it can also refer to smileys and
        emoticons.
      </p>
      <p>
        The emoji picker component was originally created for the
        <a
          href="https://liveblocks.io/comments"
          rel="noreferrer"
          target="_blank"
        >
          Liveblocks Comments
        </a>
        default components, within
        <a
          href="https://github.com/liveblocks/liveblocks/tree/main/packages/liveblocks-react-ui"
          rel="noreferrer"
          target="_blank"
        >
          <code>@liveblocks/react-ui</code>
        </a>
        .
      </p>
      <p>
        This project is a Vue port of the
        <a
          href="https://github.com/liveblocks/frimousse"
          rel="noreferrer"
          target="_blank"
        >
          <code>frimousse</code>
        </a>
        .
      </p>

      <PermalinkHeading as="h2">Credits</PermalinkHeading>
      <p>
        The emoji data is based on
        <a href="https://emojibase.dev/" rel="noreferrer" target="_blank">
          Emojibase
        </a>
        .
      </p>
  </section>
</template>

<script setup lang="ts">
import { CodeBlock } from '~/components/ui/code-block/index'
import PermalinkHeading from '~/components/PermalinkHeading.vue'
import EmojiPickerPopover from './EmojiPickerPopover.vue'
import EmojiPickerBasicDemo from './EmojiPickerBasicDemo.vue'
import EmojiPickerShadcnVueDemo from './EmojiPickerShadcnVueDemo.vue'


const installCode = 'pnpm i vue-frimousse'
const shadcnCode = 'npx shadcn@latest add https://vue-frimousse.vercel.app'

const exampleCode = `
  <template>
    <EmojiPicker.Root :onEmojiSelect="onEmojiClick">
      <EmojiPicker.Search placeholder="Search..." />
      <EmojiPicker.Viewport>
        <EmojiPicker.List />
      </EmojiPicker.Viewport>
    </EmojiPicker.Root>
  </template>

  <script setup lang="ts">
  import { ref } from 'vue'
  import { default as EmojiPicker } from 'vue-frimousse'
  import type { EmojiPickerEmoji } from 'vue-frimousse'

  const onEmojiClick = (emoji: EmojiPickerEmoji) => {
    console.log('Selected emoji:', emoji)
  }
  <\/script>
`

const emojiPickerRootCode = `
  <template>
    // [!code highlight:1]
    <EmojiPicker.Root :onEmojiSelect="onEmojiClick">
      <EmojiPicker.Search placeholder="Search..." />
      <EmojiPicker.Viewport>
        <EmojiPicker.List />
      </EmojiPicker.Viewport>
    // [!code highlight:1]
    </EmojiPicker.Root>
  <\/template>
`

const emojiPickerSearchCode = `
  <template>
    <EmojiPicker.Root :onEmojiSelect="onEmojiClick">
    // [!code highlight:1]
      <EmojiPicker.Search placeholder="Search..." />
      <EmojiPicker.Viewport>
        <EmojiPicker.List />
      </EmojiPicker.Viewport>
    </EmojiPicker.Root>
  <\/template>
`
</script>
