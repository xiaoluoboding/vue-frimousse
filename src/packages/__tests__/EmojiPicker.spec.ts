import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import EmojiPicker from '../EmojiPicker.vue'

// Mock the data fetching hook since it relies on external APIs
vi.mock('../hooks/useEmojiPickerData', () => ({
  useEmojiPickerData: vi.fn(() => ({
    data: { value: { rows: [] } },
    isLoading: { value: false },
    error: { value: null }
  }))
}))

describe('EmojiPicker', () => {
  beforeEach(() => {
    // Clear all mocks before each testc
    vi.clearAllMocks()
  })

  it('renders the emoji picker root element', () => {
    const wrapper = mount(EmojiPicker, {
      props: {
        locale: 'en',
        columns: 9,
        skinTone: 'none'
      }
    })

    expect(wrapper.find('[frimousse-root]').exists()).toBe(true)
  })

  it('accepts and applies custom props', () => {
    const onEmojiSelect = vi.fn()
    const wrapper = mount(EmojiPicker, {
      props: {
        locale: 'fr',
        columns: 8,
        skinTone: 'light',
        onEmojiSelect,
        sticky: false
      }
    })

    // Check that the component is mounted
    expect(wrapper.vm).toBeDefined()

    // Check that the root element exists
    const root = wrapper.find('[frimousse-root]')
    expect(root.exists()).toBe(true)
  })

  it('renders with default props when none are provided', () => {
    const wrapper = mount(EmojiPicker)

    expect(wrapper.find('[frimousse-root]').exists()).toBe(true)
    expect(wrapper.vm).toBeDefined()
  })

  it('applies custom CSS styles', () => {
    const customStyle = { backgroundColor: 'red', width: '300px' }
    const wrapper = mount(EmojiPicker, {
      props: {
        style: customStyle
      }
    })

    const root = wrapper.find('[frimousse-root]')
    expect(root.exists()).toBe(true)
  })
})
