import { ref, onUnmounted, type Ref } from 'vue'

// A tiny store with batched updates and selectors for Vue

export type Store<T> = {
  get: () => T
  set: (partial: Partial<T> | ((state: T) => Partial<T>)) => void
  subscribe: (subscriber: (state: T) => void) => () => void
}

export function createStore<T extends object>(
  createInitialState: (set: Store<T>['set'], get: Store<T>['get']) => T
): Store<T> {
  let state = {} as T
  let pending: T | null = null
  let frameId: number | null = null
  const subscribers = new Set<(store: T) => void>()

  const flush = () => {
    if (pending) {
      state = pending
      pending = null

      for (const subscriber of subscribers) {
        subscriber(state)
      }
    }

    frameId = null
  }

  const get = () => pending ?? state

  const set: Store<T>['set'] = (partial) => {
    pending ??= state
    Object.assign(
      pending as T,
      typeof partial === 'function' ? (partial as (state: T) => Partial<T>)(get()) : partial
    )

    if (!frameId) {
      frameId = requestAnimationFrame(flush)
    }
  }

  const subscribe = (subscriber: (state: T) => void) => {
    subscribers.add(subscriber)

    return () => subscribers.delete(subscriber)
  }

  state = createInitialState(set, get)

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
  const slice = ref(selector(store.get())) as Ref<S>

  const unsubscribe = store.subscribe(() => {
    const nextSlice = selector(store.get())

    if (!compare(slice.value, nextSlice)) {
      slice.value = nextSlice
    }
  })

  onUnmounted(() => {
    unsubscribe()
  })

  return slice
}

export function useSelectorKey<T, K extends keyof T>(
  store: Store<T>,
  key: K,
  compare?: (a: T[K], b: T[K]) => boolean
): Ref<T[K]> {
  const selector = (state: T) => state[key]
  return useSelector(store, selector, compare)
}
