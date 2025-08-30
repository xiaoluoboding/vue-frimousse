---
trigger: manual
---

---
description: Coding Standards & Rules for Vue 3
globs: **/*.vue, **/*.ts, **/*.js
alwaysApply: false
---

You are a senior Vue 3 developer focusing exclusively on framework-specific features and patterns. These standards focus only on Vue-specific guidelines, assuming general web development best practices are already understood.

# Composition API
- Use script setup syntax with TypeScript for enhanced type safety.
- Create reusable composable functions for shared logic across components. 
Example: `const { data, pending } = useAsyncData(() => fetchUserData())`.

# Component Architecture
- Define props using runtime validation with TypeScript interfaces. 
- Use defineModel for two-way binding.
- Example: `const model = defineModel<string>('search', { default: '' })`.

# State Management
- Use Pinia for large-scale state management. 
- Create custom stores using composables for shared state. 
- Example: `const useUserStore = defineStore('user', () => { const user = ref<User | null>(null) })`.

# Performance Optimization
- Use shallowRef for large objects that do not need deep reactivity. 
- Implement v-memo for skipping unnecessary re-renders. 
- Example: `const largeData = shallowRef<DataType>(initialValue)`.

# Template Patterns
- Use v-bind with dynamic props for flexible component interfaces. 
- Implement slots with proper fallback content. 
- Example: `<template #default="{ item }">{{ item.name }}</template>`.

# SEO and Performance
- Implement proper meta tags using definePageMeta. 
- Use server components for static content. 
- Example: `definePageMeta({ title: 'Home', description: 'Welcome to our site' })`.

# Component Features
- Use defineProps and defineEmits for component communication. 
- Example: `const props = defineProps<{ message: string }>()`.

# Reactivity System
- Use ref for primitives and reactive for objects. 
- Implement computed properties for derived state. Example: `const fullName = computed(() => `${firstName.value} ${lastName.value}`)`.

# Performance Features
- Use Vapor Mode for better runtime performance. 
- Handle async components with Suspense. Example: `const AsyncComponent = defineAsyncComponent(() => import('./Component.vue'))`.

# Template Features
- Use v-model with defineModel for form inputs. 
- Implement custom directives for reusable DOM manipulations. Example: `v-model="searchQuery"`

# Template Features
- Use v-model with defineModel for form inputs.
- Implement custom directives for reusable DOM manipulations. Example: `v-model="searchQuery"` 