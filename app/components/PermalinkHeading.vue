<template>
  <component
    :is="as"
    :id="slug"
    :class="cn('link underline decoration-neutral-200 hover:decoration-primary-foreground scroll-mt-18 md:scroll-mt-24 text-primary decoration-dotted', ($attrs.class as string) || '')"
    v-bind="$attrs"
  >
    <a :href="`#${slug}`" class="no-underline">
      <slot />
    </a>
  </component>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import slugify from 'slugify'
import { getTextContent, cn } from '../utils'

type Heading = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

interface Props {
  as?: Heading
  slug?: string
  slugPrefix?: string
}

const props = withDefaults(defineProps<Props>(), {
  as: 'h1'
})

const slots = useSlots()

const slug = computed(() => {
  const content = props.slug ?? getTextContent(slots.default?.())
  const prefixedContent = props.slugPrefix ? `${props.slugPrefix} ${content}` : content
  return slugify(prefixedContent, { lower: true })
})
</script>

<style scoped>
</style>
