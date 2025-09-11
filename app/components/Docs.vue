<template>
  <section
    class="prose mt-10 mb-20 md:mt-16 md:mb-30"
  >
    <PermalinkHeading as="h2">Installation</PermalinkHeading>

    <CodeBlock lang="bash" :code="installCode"/>

    <p>
      If you are using
      <a href="https://www.shadcn-vue.com" rel="noreferrer" target="_blank">
        shadcn/vue
      </a>
      , you can also install it as a pre-built component via the
      <a
        href="https://www.shadcn-vue.com/docs/cli.html"
        rel="noreferrer"
        target="_blank"
      >
        shadcn/vue CLI
      </a>
      .
    </p>

    <CodeBlock lang="bash" :code="shadcnCode"/>

    <p>
      Learn more in the shadcn/vue <a href="#shadcnvue">section</a>.
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
        href="https://reka-ui.com/docs/components/popover"
        rel="noreferrer"
        target="_blank"
      >
        Reka UI
      </a>
      ,
      <a
        href="https://www.shadcn-vue.com/docs/components/popover.html"
        rel="noreferrer"
        target="_blank"
      >
        shadcn/vue
      </a>
      , and
      <a
        href="https://ui.nuxt.com/components/popover"
        rel="noreferrer"
        target="_blank"
      >
        Nuxt UI
      </a>
      , to name a few.
    </p>

    <PermalinkHeading as="h3">shadcn/vue</PermalinkHeading>

    <p>
      If you are using
      <a href="https://www.shadcn-vue.com" rel="noreferrer" target="_blank">
        shadcn/vue
      </a>
      , you can install a pre-built version of the component which integrates
      with the existing shadcn/vue variables via the
      <a
        href="https://www.shadcn-vue.com/docs/cli.html"
        rel="noreferrer"
        target="_blank"
      >
        shadcn/vue CLI
      </a>
      .
    </p>

    <CodeBlock lang="bash" :code="shadcnCode" />

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

    <ColorfulButtonsAlternate />
    <p>
      Some other emoji pickers like Linear’s use the main color from the
      button’s emoji as background color instead. Extracting colors from
      emojis isn’t trivial, but a similar visual result can be achieved more
      easily by duplicating the emoji and scaling it to fill the background,
      then blurring it. In the example below, the blurred and duplicated emoji
      is built as a <code>::before</code> pseudo-element.
    </p>
    <ColorfulButtonsBlur />

    <PermalinkHeading as="h2">API Reference</PermalinkHeading>
    <p>All parts and hooks, along their usage and options.</p>

    <PermalinkHeading as="h3">EmojiPicker.Root</PermalinkHeading>
    <p>Surrounds all the emoji picker parts.</p>

    <CodeBlock lang="vue" :code="emojiPickerRootCode" />
    <p>
      Options affecting the entire emoji picker are available on this
      component as props.
    </p>

    <PermalinkHeading as="h4" slugPrefix="EmojiPicker.Root">
      Props
    </PermalinkHeading>
    <PropertiesList>
      <PropertiesListRow name="onEmojiSelect" type="(emoji: Emoji) => void">
        <p>A callback invoked when an emoji is selected.</p>
      </PropertiesListRow>
      <PropertiesListRow defaultValue="en" name="locale" type="Locale">
        <p>The locale of the emoji picker.</p>
      </PropertiesListRow>
      <PropertiesListRow
        defaultValue="none"
        name="skinTone"
        type="SkinTone"
      >
        <p>The skin tone of the emoji picker.</p>
      </PropertiesListRow>
      <PropertiesListRow defaultValue="10" name="columns" type="number">
        <p>The number of columns in the list.</p>
      </PropertiesListRow>
      <PropertiesListRow defaultValue="true" name="sticky" type="boolean">
        <p>Whether the category headers should be sticky.</p>
      </PropertiesListRow>
      <PropertiesListRow
        defaultValue="the most recent version supported by the current browser"
        name="emojiVersion"
        type="number"
      >
        <p>
          Which
          <a
            href="https://emojipedia.org/emoji-versions"
            rel="noreferrer"
            target="_blank"
          >
            Emoji version
          </a>
          to use, to manually control which emojis are visible regardless of
          the current browser’s supported Emoji versions.
        </p>
      </PropertiesListRow>
      <PropertiesListRow
        defaultValue="https://cdn.jsdelivr.net/npm/emojibase-data"
        name="emojibaseUrl"
        type="string"
      >
        <p>
          The base URL of where the
          <a
            href="https://emojibase.dev/docs/datasets/"
            rel="noreferrer"
            target="_blank"
          >
            Emojibase data
          </a>
          should be fetched from, used as follows:
          <code>
            ${emojibaseUrl}/{locale}/{file}.json
          </code>
          . (e.g.
          <code>
            ${emojibaseUrl}/en/data.json
          </code>
          ).
        </p>
        <p>
          The URL can be set to another CDN hosting the
          <a
            href="https://www.npmjs.com/package/emojibase-data"
            rel="noreferrer"
            target="_blank"
          >
            <code>emojibase-data</code>
          </a>
          package and its raw JSON files, or to a self-hosted location. When
          self-hosting with a single locale (e.g. <code>en</code>), only that
          locale’s directory needs to be hosted instead of the entire package.
        </p>
      </PropertiesListRow>
      <PropertiesListBasicRow>
        <p>
          All built-in <code>div</code> props.
        </p>
      </PropertiesListBasicRow>
    </PropertiesList>

    <PermalinkHeading as="h4" slugPrefix="EmojiPicker.Root">
      Attributes
    </PermalinkHeading>
    <PropertiesList>
      <PropertiesListRow name="[frimousse-root]">
        <p>Can be targeted in CSS for styling.</p>
      </PropertiesListRow>
      <PropertiesListRow name="[data-focused]">
        <p>
          Present when the emoji picker or its inner elements are focused.
        </p>
      </PropertiesListRow>
    </PropertiesList>

    <PermalinkHeading as="h4" slugPrefix="EmojiPicker.Root">
      CSS Variables
    </PermalinkHeading>
    <PropertiesList>
      <PropertiesListRow name="--frimousse-emoji-font" type="<string>">
        <p>A list of font families to use when rendering emojis.</p>
      </PropertiesListRow>
      <PropertiesListRow name="--frimousse-viewport-width" type="<length>">
        <p>The measured width of the viewport.</p>
      </PropertiesListRow>
      <PropertiesListRow name="--frimousse-viewport-height" type="<length>">
        <p>The measured height of the viewport.</p>
      </PropertiesListRow>
      <PropertiesListRow name="--frimousse-row-height" type="<length>">
        <p>The measured height of a row in the list.</p>
      </PropertiesListRow>
      <PropertiesListRow
        name="--frimousse-category-header-height"
        type="<length>"
      >
        <p>The measured height of a category header in the list.</p>
      </PropertiesListRow>
    </PropertiesList>

    <PermalinkHeading as="h3">EmojiPicker.Search</PermalinkHeading>
    <p>A search input to filter the list of emojis.</p>

    <CodeBlock lang="vue" :code="emojiPickerSearchCode" />

    <PermalinkHeading as="h4" slugPrefix="EmojiPicker.Search">
      Props
    </PermalinkHeading>
    <PropertiesList>
      <PropertiesListBasicRow>
        <p>
          All built-in <code>input</code> props.
        </p>
      </PropertiesListBasicRow>
    </PropertiesList>

    <PermalinkHeading as="h4" slugPrefix="EmojiPicker.Search">
      Attributes
    </PermalinkHeading>
    <PropertiesList>
      <PropertiesListRow name="[frimousse-search]">
        <p>Can be targeted in CSS for styling.</p>
      </PropertiesListRow>
    </PropertiesList>

    <PermalinkHeading as="h3">EmojiPicker.Viewport</PermalinkHeading>
    <p>The scrolling container of the emoji picker.</p>

    <CodeBlock lang="vue" :code="`
      <template>
        <EmojiPicker.Root>
          <EmojiPicker.Search />
          // [!code highlight:1]
          <EmojiPicker.Viewport>
            <EmojiPicker.Loading>Loading…</EmojiPicker.Loading>
            <EmojiPicker.Empty>No emoji found.</EmojiPicker.Empty>
            <EmojiPicker.List />
          // [!code highlight:1]
          </EmojiPicker.Viewport>
        </EmojiPicker.Root>
      <\/template>
    `" />

    <PermalinkHeading as="h4" slugPrefix="EmojiPicker.Viewport">
      Props
    </PermalinkHeading>
    <PropertiesList>
      <PropertiesListBasicRow>
        <p>
          All built-in <code>div</code> props.
        </p>
      </PropertiesListBasicRow>
    </PropertiesList>

    <PermalinkHeading as="h4" slugPrefix="EmojiPicker.Viewport">
      Attributes
    </PermalinkHeading>
    <PropertiesList>
      <PropertiesListRow name="[frimousse-viewport]">
        <p>Can be targeted in CSS for styling.</p>
      </PropertiesListRow>
    </PropertiesList>

    <PermalinkHeading as="h3">EmojiPicker.List</PermalinkHeading>
    <p>The list of emojis.</p>
    <CodeBlock lang="vue" :code="`
      <template>
        <EmojiPicker.Root>
          <EmojiPicker.Search />
          <EmojiPicker.Viewport>
            // [!code highlight:1]
            <EmojiPicker.List />
          </EmojiPicker.Viewport>
        </EmojiPicker.Root>
      <\/template>
    `" />

    <p>
      Inner components within the list can be customized via the
      <code>components</code> prop.
    </p>
    <CodeBlock lang="vue" :code="emojiPickerListComponentsCode" />

    <PermalinkHeading as="h4" slugPrefix="EmojiPicker.List">
      Props
    </PermalinkHeading>
    <PropertiesList>
      <PropertiesListRow
        name="components"
        type="Partial<EmojiPickerListComponents>"
      >
        <p>The inner components of the list.</p>
      </PropertiesListRow>
      <PropertiesListBasicRow>
        <p>
          All built-in <code>div</code> props.
        </p>
      </PropertiesListBasicRow>
    </PropertiesList>

    <PermalinkHeading as="h4" slugPrefix="EmojiPicker.List">
      Attributes
    </PermalinkHeading>
    <PropertiesList>
      <PropertiesListRow name="[frimousse-list]">
        <p>Can be targeted in CSS for styling.</p>
      </PropertiesListRow>
    </PropertiesList>

    <PermalinkHeading as="h4" slugPrefix="EmojiPicker.List">
      Inner Components
    </PermalinkHeading>
    <PropertiesList>
      <PropertiesListRow
        name="CategoryHeader"
        type="EmojiPickerListCategoryHeaderProps"
      >
        <p>
          The component used to render a sticky category header in the list.
        </p>
        <p className="mt-2 text-secondary-foreground/60!">
          <CircleHelp
            aria-hidden
            className="-mt-0.5 mr-1.5 inline-block size-3.5"
          />
          <span>All category headers should be of the same size.</span>
        </p>
      </PropertiesListRow>
      <PropertiesListRow className="pl-8!" name="[frimousse-category-header]">
        <p>Can be targeted in CSS for styling.</p>
      </PropertiesListRow>
      <PropertiesListRow className="pl-8!" name="category" type="Category">
        <p>The category for this sticky header.</p>
      </PropertiesListRow>
      <PropertiesListBasicRow className="pl-8!">
        <p>
          All built-in <code>div</code> props.
        </p>
      </PropertiesListBasicRow>
      <PropertiesListRow name="Row" type="EmojiPickerListRowProps">
        <p>The component used to render a row of emojis in the list.</p>
        <p className="mt-2 text-secondary-foreground/60!">
          <CircleHelp
            aria-hidden
            className="-mt-0.5 mr-1.5 inline-block size-3.5"
          />
          <span>All rows should be of the same size.</span>
        </p>
      </PropertiesListRow>
      <PropertiesListRow className="pl-8!" name="[frimousse-row]">
        <p>Can be targeted in CSS for styling.</p>
      </PropertiesListRow>
      <PropertiesListBasicRow className="pl-8!">
        <p>
          All built-in <code>div</code> props.
        </p>
      </PropertiesListBasicRow>
      <PropertiesListRow name="Emoji" type="EmojiPickerListEmojiProps">
        <p>The component used to render an emoji button in the list.</p>
        <p className="mt-2 text-secondary-foreground/60!">
          <CircleHelp
            aria-hidden
            className="-mt-0.5 mr-1.5 inline-block size-3.5"
          />
          <span>All emojis should be of the same size.</span>
        </p>
      </PropertiesListRow>
      <PropertiesListRow className="pl-8!" name="[frimousse-emoji]">
        <p>Can be targeted in CSS for styling.</p>
      </PropertiesListRow>
      <PropertiesListRow className="pl-8!" name="[data-active]">
        <p>
          Present when the emoji is currently active (either hovered or
          selected via keyboard navigation).
        </p>
      </PropertiesListRow>
      <PropertiesListRow
        className="pl-8!"
        name="emoji"
        type="Emoji & { isActive: boolean }"
      >
        <p>
          The emoji for this button, its label, and whether the emoji is
          currently active (either hovered or selected via keyboard
          navigation).
        </p>
      </PropertiesListRow>
      <PropertiesListBasicRow className="pl-8!">
        <p>
          All built-in <code>button</code> props.
        </p>
      </PropertiesListBasicRow>
    </PropertiesList>

    <PermalinkHeading as="h3">EmojiPicker.Loading</PermalinkHeading>
    <p>Only renders when the emoji data is loading.</p>
    <CodeBlock lang="vue" :code="`
      <template>
        <EmojiPicker.Root>
          <EmojiPicker.Search />
          <EmojiPicker.Viewport>
            // [!code highlight:1]
            <EmojiPicker.Loading>Loading…</EmojiPicker.Loading>
          </EmojiPicker.Viewport>
        </EmojiPicker.Root>
      <\/template>
    `" />

    <PermalinkHeading as="h4" slugPrefix="EmojiPicker.Loading">
      Props
    </PermalinkHeading>
    <PropertiesList>
      <PropertiesListRow name="children" type="ReactNode">
        <p>The content to render when the emoji data is loading.</p>
      </PropertiesListRow>
      <PropertiesListBasicRow>
        <p>
          All built-in <code>span</code> props.
        </p>
      </PropertiesListBasicRow>
    </PropertiesList>

    <PermalinkHeading as="h4" slugPrefix="EmojiPicker.Loading">
      Attributes
    </PermalinkHeading>
    <PropertiesList>
      <PropertiesListRow name="[frimousse-loading]">
        <p>Can be targeted in CSS for styling.</p>
      </PropertiesListRow>
    </PropertiesList>

    <PermalinkHeading as="h3">EmojiPicker.Empty</PermalinkHeading>
    <p>Only renders when no emoji is found for the current search.</p>
    <CodeBlock lang="vue" :code="`
      <template>
        <EmojiPicker.Root>
          <EmojiPicker.Search />
          <EmojiPicker.Viewport>
            // [!code highlight:1]
            <EmojiPicker.Empty>No emoji found.</EmojiPicker.Empty>
            <EmojiPicker.List />
          </EmojiPicker.Viewport>
        </EmojiPicker.Root>
      <\/template>
    `" />

    <p>
      It can also expose the current search via a render callback to build a
      more detailed empty state.
    </p>
    <CodeBlock lang="vue" :code="emojiPickerEmptyRenderCallbackCode" />

    <PermalinkHeading as="h4" slugPrefix="EmojiPicker.Empty">
      Props
    </PermalinkHeading>
    <PropertiesList>
      <PropertiesListRow
        name="children"
        type="ReactNode | ((props: EmojiPickerEmptyRenderProps) => ReactNode)"
      >
        <p>
          The content to render when no emoji is found for the current search,
          or a render callback which receives the current search value.
        </p>
      </PropertiesListRow>
      <PropertiesListBasicRow>
        <p>
          All built-in <code>span</code> props.
        </p>
      </PropertiesListBasicRow>
    </PropertiesList>

    <PermalinkHeading as="h4" slugPrefix="EmojiPicker.Empty">
      Attributes
    </PermalinkHeading>
    <PropertiesList>
      <PropertiesListRow name="[frimousse-empty]">
        <p>Can be targeted in CSS for styling.</p>
      </PropertiesListRow>
    </PropertiesList>

    <PermalinkHeading as="h3">EmojiPicker.SkinToneSelector</PermalinkHeading>
    <p>
      A button to change the current skin tone by cycling through the
      available skin tones.
    </p>
    <CodeBlock lang="vue" :code="`
      <template>
        <EmojiPicker.SkinToneSelector />
      <\/template>
    `" />
    <p>The emoji used as visual can be customized.</p>
    <CodeBlock lang="vue" :code="skinToneSelectorCode" />

    <p>
      If you want to build a custom skin tone selector, you can use the
      <a href="#emojipicker.skintone">
        <code>EmojiPicker.SkinTone</code>
      </a>
      component or the
      <a href="#useskintone">
        <code>useSkinTone</code>
      </a>
      hook.
    </p>

    <PermalinkHeading as="h4" slugPrefix="EmojiPicker.SkinToneSelector">
      Props
    </PermalinkHeading>
    <PropertiesList>
      <PropertiesListRow defaultValue="✋" name="emoji" type="string">
        <p>The emoji to use as visual for the skin tone variations.</p>
      </PropertiesListRow>
      <PropertiesListBasicRow>
        <p>
          All built-in <code>button</code> props.
        </p>
      </PropertiesListBasicRow>
    </PropertiesList>

    <PermalinkHeading as="h4" slugPrefix="EmojiPicker.SkinToneSelector">
      Attributes
    </PermalinkHeading>
    <PropertiesList>
      <PropertiesListRow name="[frimousse-skin-tone-selector]">
        <p>Can be targeted in CSS for styling.</p>
      </PropertiesListRow>
    </PropertiesList>

    <PermalinkHeading as="h3">EmojiPicker.SkinTone</PermalinkHeading>
    <p>
      Exposes the current skin tone and a function to change it via a render
      callback.
    </p>
    <CodeBlock lang="vue" :code="skinToneCode" />

    <p>
      It can be used to build a custom skin tone selector: pass an emoji you
      want to use as visual and it will return its skin tone variations.
    </p>
    <CodeBlock lang="vue" :code="useSkinToneCode" />
    <p>
      If you prefer to use a hook rather than a component,
      <a href="#useskintone">
        <code>useSkinTone</code>
      </a>
      is also available.
    </p>
    <p>
      An already-built skin tone selector is also available,
      <a href="#emojipicker.skintoneselector">
        <code>EmojiPicker.SkinToneSelector</code>
      </a>
      .
    </p>

    <!-- <EmojiPickerSkinToneDemo /> -->

    <PermalinkHeading as="h4" slugPrefix="EmojiPicker.SkinTone">
      Props
    </PermalinkHeading>
    <PropertiesList>
      <PropertiesListRow defaultValue="✋" name="emoji" type="string">
        <p>The emoji to use as visual for the skin tone variations.</p>
      </PropertiesListRow>
    </PropertiesList>

    <PermalinkHeading as="h3">EmojiPicker.ActiveEmoji</PermalinkHeading>
    <p>
      Exposes the currently active emoji (either hovered or selected via
      keyboard navigation) via a render callback.
    </p>
    <CodeBlock lang="vue" :code="`
      <template>
        <EmojiPicker.ActiveEmoji>
          <span>{{ emoji }}</span>
        </EmojiPicker.ActiveEmoji>
      <\/template>
    `" />
    <p>It can be used to build a preview area next to the list.</p>

    <CodeBlock lang="vue" :code="activeEmojiCode" />

    <p>
      If you prefer to use a hook rather than a component,
      <a href="#useactiveemoji">
        <code>useActiveEmoji</code>
      </a>
      is also available.
    </p>

    <PermalinkHeading as="h3">useSkinTone</PermalinkHeading>
    <p>Returns the current skin tone and a function to change it.</p>
    <CodeBlock lang="ts" :code="`
      const skinTone = useSkinTone();
    `" />
    <p>
      It can be used to build a custom skin tone selector: pass an emoji you
      want to use as visual and it will return its skin tone variations.
    </p>

    <CodeBlock lang="vue" :code="useSkinToneVariationsCode" />

    <p>
      If you prefer to use a component rather than a hook,
      <a href="#emojipicker.skintone">
        <code>EmojiPicker.SkinTone</code>
      </a>
      is also available.
    </p>
    <p>
      An already-built skin tone selector is also available,
      <a href="#emojipicker.skintoneselector">
        <code>EmojiPicker.SkinToneSelector</code>
      </a>
      .
    </p>

    <PermalinkHeading as="h4" slugPrefix="useSkinTone">
      Parameters
    </PermalinkHeading>
    <PropertiesList>
      <PropertiesListRow defaultValue="✋" name="emoji" type="string">
        <p>The emoji to use as visual for the skin tone variations.</p>
      </PropertiesListRow>
    </PropertiesList>

    <PermalinkHeading as="h3">useActiveEmoji</PermalinkHeading>
    <p>
      Returns the currently active emoji (either hovered or selected via
      keyboard navigation).
    </p>
    <CodeBlock lang="ts" :code="`
      const activeEmoji = useActiveEmoji();
    `" />

    <p>It can be used to build a preview area next to the list.</p>
    <CodeBlock lang="vue" :code="useActiveEmojiCode" />

    <p>
      If you prefer to use a component rather than a hook,
      <a href="#emojipicker.activeemoji">
        <code>EmojiPicker.ActiveEmoji</code>
      </a>
      is also available.
    </p>

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
// import EmojiPickerSkinToneDemo from './EmojiPickerSkinToneDemo.vue'
import PropertiesList from './PropertiesList.vue'
import PropertiesListBasicRow from './PropertiesListBasicRow.vue'
import PropertiesListRow from './PropertiesListRow.vue'
import ColorfulButtonsAlternate from './ColorfulButtonsAlternate.vue'
import ColorfulButtonsBlur from './ColorfulButtonsBlur.vue'
// import HooksWithData from './HooksWithData.vue'
// import EmojiPicker from '@/packages'


const installCode = 'npm i vue-frimousse'
const shadcnCode = 'npx shadcn-vue@latest add https://vue-frimousse.robertshaw.id/r/emoji-picker.json'

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

const skinToneSelectorCode = `
  <template>
    // [!code highlight:1]
    <EmojiPicker.SkinToneSelector emoji="👋" />
  <\/template>
`

const emojiPickerListComponentsCode = `
  <template>
    <EmojiPicker.Root :onEmojiSelect="onEmojiClick">
      <EmojiPicker.Search placeholder="Search..." />
      <EmojiPicker.Viewport>
        // [!code highlight:1]
        <EmojiPicker.List>
          <template #CategoryHeader="{ category }">
            <div>{{ category.label }}</div>
          </template>
          <template #Emoji="{ emoji }">
            <button>
              {{ emoji.emoji }}
            </button>
          </template>
          <template #Row="{ children }">
            <div>{{ children }}</div>
          </template>
        </EmojiPicker.List>
      </EmojiPicker.Viewport>
    </EmojiPicker.Root>
  <\/template>
`

const emojiPickerEmptyRenderCallbackCode = `
  <template>
    <EmojiPicker.Empty>
      <template #default="{ search }">
        No emoji found for "{{ search }}"
      </template>
    </EmojiPicker.Empty>
  <\/template>
`

const skinToneCode = `
  <template>
    <EmojiPicker.SkinTone>
      <template #default="{ skinTone, setSkinTone }">
        <div>
          <span>{skinTone}</span>
          <button @click="() => setSkinTone('none')">Reset skin tone</button>
        </div>
      </template>
    </EmojiPicker.SkinTone>
  <\/template>
`

const useSkinToneCode = `
  <template>
    // (👋) (👋🏻) (👋🏼) (👋🏽) (👋🏾) (👋🏿)
    <EmojiPicker.SkinTone emoji="👋">
      <template #default="{ skinTone, setSkinTone, skinToneVariations }">
        <button
          v-for="{ skinTone, emoji } in skinToneVariations"
          :key="skinTone"
          @click="() => setSkinTone(skinTone)"
        >
          {{ emoji }}
        </button>
      </template>
    </EmojiPicker.SkinTone>
  <\/template>

  <script setup lang="ts">
  import { useSkinTone } from 'vue-frimousse'

   const { skinTone, skinToneVariations } = useSkinTone("👋");
  <\/script>
`;

const useSkinToneVariationsCode = `
  <template>
    // (👋) (👋🏻) (👋🏼) (👋🏽) (👋🏾) (👋🏿)
    <template #default="{ skinToneVariations }">
      <button
        v-for="{ skinTone, emoji } in skinToneVariations"
        :key="skinTone"
        @click="() => setSkinTone(skinTone)"
      >
        {{ emoji }}
      </button>
    </template>
  <\/template>

  <script setup lang="ts">
  import { useSkinTone } from 'vue-frimousse'

  const { skinTone, skinToneVariations } = useSkinTone("👋");
  <\/script>
`;

const activeEmojiCode = `
  <template>
    <EmojiPicker.ActiveEmoji>
      <template #default="{ emoji }">
        <div>
          <span v-if="emoji">{{ emoji.emoji }} {{ emoji.label }}</span>
          <span v-else>Select an emoji…</span>
        </div>
      </template>
    </EmojiPicker.ActiveEmoji>
  <\/template>
`

const useActiveEmojiCode = `
  <template>
    <div>
      <span v-if="activeEmoji">{{ activeEmoji.emoji }} {{ activeEmoji.label }}</span>
      <span v-else>Select an emoji…</span>
    </div>
  <\/template>

  <script setup lang="ts">
  import { useActiveEmoji } from 'vue-frimousse'

  const activeEmoji = useActiveEmoji();
  <\/script>
`;
</script>
