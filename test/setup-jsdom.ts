import { afterEach, beforeEach, vi } from 'vitest'
import { config } from '@vue/test-utils'

// Global test utilities for Vue components

// Configure Vue Test Utils globally
config.global.config.warnHandler = () => {
  // Suppress Vue warnings in tests
}

// Mock IntersectionObserver for components that use it
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
  takeRecords() {
    return []
  }
}

// Mock ResizeObserver for components that use it
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock requestIdleCallback for components that use it
global.requestIdleCallback = (callback: IdleRequestCallback, options?: IdleRequestOptions) => {
  return setTimeout(
    () =>
      callback({
        didTimeout: false,
        timeRemaining: () => 50
      }),
    1
  )
}

global.cancelIdleCallback = (id: number) => {
  clearTimeout(id)
}

// Mock matchMedia for responsive components
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {}
  })
})

beforeEach(() => {
  // Reset any global state before each test
  vi.clearAllMocks()
})

afterEach(() => {
  // Clean up DOM after each test
  document.body.innerHTML = ''
})
