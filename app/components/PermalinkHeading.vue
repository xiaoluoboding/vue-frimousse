<template>
  <component
    :is="as"
    :id="slug"
    :class="cn('link scroll-mt-18 md:scroll-mt-24', ($attrs.class as string) || '')"
    v-bind="$attrs"
  >
    <a :href="`#${slug}`">
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
.link {
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
