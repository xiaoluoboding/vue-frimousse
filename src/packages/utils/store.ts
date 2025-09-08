import { ref, reactive, nextTick, computed, type Ref } from 'vue'

// A tiny store with batched updates and selectors for Vue

export type Store<T> = {
  get: () => T
  set: (partial: Partial<T> | ((state: T) => Partial<T>)) => void
  subscribe: (subscriber: (state: T) => void) => () => void
}

export function createStore<T extends object>(
  createInitialState: (set: Store<T>['set'], get: Store<T>['get']) => T
): Store<T> {
  // Use Vue's reactive system instead of custom subscription system
  const reactiveState = reactive({} as T)
  const subscribers = new Set<(store: T) => void>()

  const get = () => reactiveState as T

  const set: Store<T>['set'] = (partial) => {
    const changes =
      typeof partial === 'function' ? (partial as (state: T) => Partial<T>)(get()) : partial

    // Apply changes directly to reactive state - this will trigger Vue's reactivity
    Object.assign(reactiveState, changes)

    // Still notify custom subscribers for compatibility
    nextTick(() => {
      for (const subscriber of subscribers) {
        try {
          subscriber(reactiveState as T)
        } catch (error) {
          console.error('🔄 Store subscriber error:', error)
        }
      }
    })
  }

  const subscribe = (subscriber: (state: T) => void) => {
    subscribers.add(subscriber)
    return () => subscribers.delete(subscriber)
  }

  // Initialize the reactive state
  const initialState = createInitialState(set, get)
  Object.assign(reactiveState, initialState)

  return { get, set, subscribe }
}

export function useCreateStore<T>(createStore: () => Store<T>) {
  const store = ref(createStore())
  return store.value
}

export function useSelector<T, S>(
  store: Store<T>,
  selector: (state: T) => S,
  compare: (a: S, b: S) => boolean = Object.is
): Ref<S> {
  // Use Vue's computed to create a reactive ref that automatically updates
  // when the store state changes (since store.get() returns a reactive object)
  const slice = computed(() => {
    const value = selector(store.get())
    return value
  })

  return slice
}

export function useSelectorKey<T, K extends keyof T>(
  store: Store<T>,
  key: K,
  compare?: (a: T[K], b: T[K]) => boolean
): Ref<T[K]> {
  const selector = (state: T) => {
    const value = state[key]
    return value
  }
  // Add key name to selector for better debugging
  ;(selector as { _keyName?: string })._keyName = key as string
  return useSelector(store, selector, compare)
}
