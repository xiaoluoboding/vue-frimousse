<script lang="ts" setup>
import type { DrawerRootEmits, DrawerRootProps } from "vaul-vue"
import { useForwardPropsEmits } from "reka-ui"
import { DrawerRoot } from "vaul-vue"

// temp fix for fadeFromIndex: https://github.com/unovue/shadcn-vue/issues/1305
const props = withDefaults(defineProps<Omit<DrawerRootProps, 'fadeFromIndex'>>(), {
  shouldScaleBackground: true
});

const emits = defineEmits<DrawerRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <DrawerRoot
    data-slot="drawer"
    v-bind="forwarded"
  >
    <slot />
  </DrawerRoot>
</template>
