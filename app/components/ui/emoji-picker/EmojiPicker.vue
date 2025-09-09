<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { default as EmojiPickerPrimitive } from '@/packages'
import { cn } from '~/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <EmojiPickerPrimitive.Root
    :class="cn(
      'isolate flex h-full w-fit flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
      props.class
    )"
    data-slot="emoji-picker"
    v-bind="$attrs"
  >
    <slot />
  </EmojiPickerPrimitive.Root>
</template>

<style scoped>
[frimousse-root] {
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: 380px;
  background-color: white;
  border-radius: 0.75rem;
  isolation: isolate;
  border: 1px solid transparent;
  box-shadow:
    rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.04) 0px 0px 0px 1px,
    rgba(0, 0, 0, 0.06) 0px 2px 12px 0px,
    rgba(0, 0, 0, 0.06) 0px 8px 36px 0px;
}

.dark [frimousse-root] {
  background-color: rgb(23 23 23);
  border-color: rgb(38, 38, 38);
}

[frimousse-search] {
  position: relative;
  z-index: 10;
  appearance: none;
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  padding-left: 0.625rem;
  padding-right: 0.625rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: rgb(245 245 245);
  color: rgb(38 38 38);
  border-radius: 0.375rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.dark [frimousse-search] {
  background-color: rgb(38 38 38);
  color: rgb(163 163 163);
}

[frimousse-search]::placeholder {
  color: rgb(115 115 115);
  opacity: 1;
}

[frimousse-viewport] {
  position: relative;
  flex: 1 1 0%;
  outline: 2px solid transparent;
  outline-offset: 2px;
}

[frimousse-loading],
[frimousse-empty] {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(115 115 115);
  font-size: 0.875rem;
  line-height: 1.25rem;
}

[frimousse-list] {
  padding-bottom: 0.75rem;
  user-select: none;
}

[frimousse-category-header] {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  padding-top: 0.75rem;
  padding-bottom: 0.375rem;
  background-color: white;
  color: rgb(82 82 82);
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 500;
}

.dark [frimousse-category-header] {
  background-color: rgb(23 23 23);
  color: rgb(115 115 115);
}

[frimousse-row] {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  scroll-margin-top: 0.75rem;
  scroll-margin-bottom: 0.75rem;
}

[frimousse-emoji] {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.375rem;
  background-color: transparent;
  font-size: 1.125rem;
  line-height: 1.75rem;
  border-color: transparent;
}

[frimousse-emoji][data-active] {
  background-color: rgb(245 245 245);
}

.dark [frimousse-emoji][data-active] {
  background-color: rgb(38 38 38);
}

[frimousse-skin-tone-selector] {
  background-color: rgb(245 245 245);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
  margin-right: 0.5rem;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.375rem;
  font-size: 1.125rem;
  line-height: 1.75rem;
  border-color: transparent;
}

[frimousse-skin-tone-selector]:hover {
  background-color: rgb(229 229 229);
}

.dark [frimousse-skin-tone-selector] {
  background-color: rgb(38 38 38);
}

.dark [frimousse-skin-tone-selector]:hover {
  background-color: rgb(64 64 64);
}

[frimousse-footer] {
  display: flex;
  width: 100%;
  min-width: 0;
  align-items: center;
  gap: 0.25rem;
  border-top: 1px solid rgb(229 229 229);
  padding: 0.5rem;
  max-width: var(--frimousse-viewport-width);
}

.dark [frimousse-footer] {
  border-top-color: rgb(38 38 38);
}

[frimousse-footer-emoji] {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  font-size: 1.125rem;
  line-height: 1.75rem;
}

[frimousse-footer-emoji-label] {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgb(82 82 82);
  font-size: 0.75rem;
  line-height: 1rem;
}

.dark [frimousse-footer-emoji-label] {
  color: rgb(115 115 115);
}

[frimousse-footer-placeholder] {
  margin-left: 0.375rem;
  display: flex;
  height: 1.75rem;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgb(115 115 115);
  font-size: 0.75rem;
  line-height: 1rem;
}

.dark [frimousse-footer-placeholder] {
  color: rgb(82 82 82);
}
</style>
