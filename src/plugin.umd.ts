import EmojiPicker from './packages/EmojiPicker.vue'
import type { App } from 'vue'

/**
 * VueLibraryStarter plugin for Vue 3
 *
 * - Globally registers the `<EmojiPicker />` component
 * - Provides `EmojiPicker` via Vue's dependency injection (Composition API)
 * - Automatically exposes `window.EmojiPicker` in UMD builds for use in plain JS
 *
 * @example
 * // index.html (UMD / CDN build)
 * <script src="https://unpkg.com/vue@3"></script>
 * <script src="https://unpkg.com/vue-frimousse"></script>
 * <script>
 *   const app = Vue.createApp({})
 *   app.use(EmojiPicker)
 *   app.mount('#app')
 *
 *   // Component usage anywhere (even outside Vue)
 *   window.EmojiPicker
 * </script>
 *
 * @example
 * // Inside a Vue component (Options API)
 * <EmojiPicker msg="Hello World!" />
 *
 * @example
 * // Inside a Vue component (Composition API)
 * import { inject } from 'vue'
 * const myComponent = inject('EmojiPicker')
 * // myComponent is available for injection
 */
const VueFrimousse = {
  /**
   * Install function used by Vue.use()
   * @param {App} app - The Vue application instance
   */
  install(app: App) {
    // Register the <EmojiPicker /> component globally
    app.component('EmojiPicker', EmojiPicker)

    // Provide EmojiPicker for Composition API usage
    app.provide('EmojiPicker', EmojiPicker)

    // assign EmojiPicker to window for UMD usage
    if (typeof window !== 'undefined') {
      ;(window as unknown as { EmojiPicker: typeof EmojiPicker }).EmojiPicker = EmojiPicker
    }
  }
}

// UMD-friendly single export for Vue.use(EmojiPicker)
export default VueFrimousse
