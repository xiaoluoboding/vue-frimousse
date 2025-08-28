import MyComponent from './packages/MyComponent.vue'
import type { App } from 'vue'

/**
 * VueLibraryStarter plugin for Vue 3
 *
 * - Globally registers the `<MyComponent />` component
 * - Provides `MyComponent` via Vue's dependency injection (Composition API)
 * - Automatically exposes `window.MyComponent` in UMD builds for use in plain JS
 *
 * @example
 * // index.html (UMD / CDN build)
 * <script src="https://unpkg.com/vue@3"></script>
 * <script src="https://unpkg.com/vue-library-starter"></script>
 * <script>
 *   const app = Vue.createApp({})
 *   app.use(VueLibraryStarter)
 *   app.mount('#app')
 *
 *   // Component usage anywhere (even outside Vue)
 *   window.MyComponent
 * </script>
 *
 * @example
 * // Inside a Vue component (Options API)
 * <MyComponent msg="Hello World!" />
 *
 * @example
 * // Inside a Vue component (Composition API)
 * import { inject } from 'vue'
 * const myComponent = inject('MyComponent')
 * // myComponent is available for injection
 */
const VueLibraryStarter = {
  /**
   * Install function used by Vue.use()
   * @param {App} app - The Vue application instance
   */
  install(app: App) {
    // Register the <MyComponent /> component globally
    app.component('MyComponent', MyComponent)

    // Provide MyComponent for Composition API usage
    app.provide('MyComponent', MyComponent)

    // assign MyComponent to window for UMD usage
    if (typeof window !== 'undefined') {
      ;(window as unknown as { MyComponent: typeof MyComponent }).MyComponent = MyComponent
    }
  },
}

// UMD-friendly single export for Vue.use(VueLibraryStarter)
export default VueLibraryStarter
