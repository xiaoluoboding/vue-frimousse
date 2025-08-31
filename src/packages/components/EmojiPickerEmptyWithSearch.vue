<template>
  <slot :search="search" />
</template>

<script setup lang="ts">
import { useEmojiPickerStore } from '../store';
import { useSelector } from '../utils/store';
import { $search } from '../store';

const store = useEmojiPickerStore();
const search = useSelector(store, $search);
</script>
