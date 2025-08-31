<template>
  <div
    :class="cn(
      'code-block not-prose group relative isolate flex min-h-11 flex-col overflow-hidden rounded-lg bg-muted',
      ($attrs.class as string) || ''
    )"
    v-bind="$attrs"
  >
    <CopyButton
      :class="cn(
        'absolute top-1.5 right-1.5 z-10 bg-muted/20 outline-muted-foreground/40 backdrop-blur-md',
        'lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100'
      )"
      :text="removeTransformersAnnotations(code)"
    />
    <div
      :class="cn(
        'scrollbar-track-[transparent] scrollbar-thumb-secondary-foreground/30 flex flex-1 overflow-auto font-mono text-secondary-foreground text-xs',
        '**:[code:has(.line:only-child)]:h-full **:[code:has(.line:only-child)]:pt-3.25 **:[code:has(.line:only-child)]:pb-3 **:[code]:table **:[code]:py-3.5 **:[pre,code,.line]:w-full **:[pre,span]:text-(--shiki-light) dark:**:[pre,span]:text-(--shiki-dark) **:[pre]:cursor-text **:[pre]:outline-none',
        '**:[.line:empty]:before:content-[','] **:[.line]:table-row **:[.line_:first-child]:ml-4 **:[.line_:last-child]:mr-12 lg:**:[.line_:last-child]:mr-4',
        '**:[.line.highlighted]:bg-secondary/60 dark:**:[.line.highlighted]:bg-secondary/80',
        '**:[.line.diff.add]:bg-lime-500/15 dark:**:[.line.diff.add]:bg-lime-400/10',
        '**:[.line.diff.remove]:bg-rose-500/20 **:[.line.diff.remove]:opacity-50 dark:**:[.line.diff.remove]:bg-rose-400/20',
        '**:[.highlighted-word]:before:-z-1 **:[.highlighted-word]:pointer-events-none **:[.highlighted-word]:relative **:[.highlighted-word]:before:absolute **:[.highlighted-word]:before:inset-x-[-0.25em] **:[.highlighted-word]:before:inset-y-[-0.165em] **:[.highlighted-word]:before:rounded-sm **:[.highlighted-word]:before:bg-secondary/80 dark:**:[.highlighted-word]:before:bg-secondary'
      )"
      v-html="codeHTML"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers'
import dedent from 'dedent'
import type { BundledLanguage } from 'shiki'
import { codeToHtml } from 'shiki'
import { cn } from '~/utils'
import { getTextContent } from '~/utils'
import { CopyButton } from '../copy-button/index'

const TRANSFORMERS_ANNOTATION_REGEX = /\[!code(?:\s+\w+(:\w+)?)?\]/

interface Props {
  lang: BundledLanguage
  html: string
}

const props = defineProps<Props>()

const code = computed(() => {
  const slotContent = getTextContent(props.html)
  return dedent(slotContent)
})

const codeHTML = ref('')

watchEffect(async () => {
  const htmlContent = await codeToHtml(code.value, {
    lang: props.lang,
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
    defaultColor: false,
    transformers: [
      transformerNotationDiff(),
      transformerNotationErrorLevel(),
      transformerNotationHighlight(),
      transformerNotationWordHighlight(),
    ],
  })
  codeHTML.value = htmlContent
})

function removeTransformersAnnotations(code: string): string {
  return code
    .split('\n')
    .filter((line) => !TRANSFORMERS_ANNOTATION_REGEX.test(line))
    .join('\n')
}
</script>
