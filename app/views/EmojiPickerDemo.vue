<template>
  <div class="demo-container">
    <h1>Vue Frimousse Emoji Picker Demo</h1>
    
    <div class="demo-section">
      <h2>Basic Usage</h2>
      <div class="picker-container">
        <EmojiPickerRoot :onEmojiSelect="onEmojiClick">
          <EmojiPickerSearch placeholder="Search emojis..." />
          <EmojiPickerViewport>
            <EmojiPickerList />
          </EmojiPickerViewport>
          <EmojiPickerFooter />
        </EmojiPickerRoot>
      </div>
    </div>

    <div class="demo-section">
      <h2>With Loading and Empty States</h2>
      <div class="picker-container">
        <EmojiPickerRoot :onEmojiSelect="onEmojiClick">
          <EmojiPickerSearch />
          
          <EmojiPickerLoading>
            <div class="loading-state">🔄 Loading emojis...</div>
          </EmojiPickerLoading>
          
          <EmojiPickerEmpty>
            <template #default="{ search }">
              <div class="empty-state">
                😕 No emojis found for "{{ search }}"
              </div>
            </template>
          </EmojiPickerEmpty>
          
          <EmojiPickerViewport>
            <EmojiPickerList />
          </EmojiPickerViewport>
        </EmojiPickerRoot>
      </div>
    </div>

    <!-- 
    <div class="demo-section">
      <h2>With Skin Tone Selector</h2>
      <div class="picker-container">
        <EmojiPickerRoot :onEmojiSelect="onEmojiClick">
          <div class="picker-header">
            <EmojiPickerSearch />
            <EmojiPickerSkinTone>
              <template #default="{ skinTone, setSkinTone }">
                <EmojiPickerSkinToneSelector 
                  :skin-tone="skinTone"
                  @skin-tone-change="setSkinTone"
                />
              </template>
            </EmojiPickerSkinTone>
          </div>
          
          <EmojiPickerViewport>
            <EmojiPickerList />
          </EmojiPickerViewport>
        </EmojiPickerRoot>
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EmojiPickerRoot from '../../packages/EmojiPicker.vue';
import EmojiPickerSearch from '../../packages/components/EmojiPickerSearch.vue';
import EmojiPickerViewport from '../../packages/components/EmojiPickerViewport.vue';
import EmojiPickerList from '../../packages/components/EmojiPickerList.vue';
import EmojiPickerFooter from '../../packages/components/EmojiPickerFooter.vue';
import EmojiPickerLoading from '../../packages/components/EmojiPickerLoading.vue';
import EmojiPickerEmpty from '../../packages/components/EmojiPickerEmpty.vue';
import EmojiPickerSkinToneSelector from '../../packages/components/EmojiPickerSkinToneSelector.vue';
import EmojiPickerSkinTone from '../../packages/components/EmojiPickerSkinTone.vue';
import type { EmojiPickerEmoji } from '../../packages/types';
import { toast } from 'vue-sonner';

const selectedEmoji = ref<EmojiPickerEmoji | null>(null);

const onEmojiClick = (emoji: EmojiPickerEmoji) => {
  selectedEmoji.value = emoji;
  console.log('Selected emoji:', emoji);
  toast(`${emoji.emoji} ${emoji.label}`);
};
</script>

<style scoped>
.demo-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.demo-section {
  margin-bottom: 40px;
}

.demo-section h2 {
  margin-bottom: 16px;
  color: #1a1a1a;
  font-size: 20px;
  font-weight: 600;
}

.picker-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px 0;
}

.picker-header {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #e1e5e9;
}

.loading-state,
.empty-state {
  padding: 24px;
  text-align: center;
  color: #65676b;
  font-size: 14px;
}

.selected-emoji {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e1e5e9;
}

.selected-emoji .emoji {
  font-size: 32px;
  font-family: "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif;
}

.selected-emoji .label {
  font-size: 16px;
  font-weight: 500;
  color: #1a1a1a;
}

.no-selection {
  padding: 16px;
  text-align: center;
  color: #65676b;
  font-style: italic;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .demo-section h2 {
    color: #e4e6ea;
  }

  .selected-emoji {
    background: #242526;
    border-color: #3a3b3c;
  }

  .selected-emoji .label {
    color: #e4e6ea;
  }

  .no-selection {
    color: #b0b3b8;
  }
}
</style>

<style lang="css">
[frimousse-root] {
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: 352px;
  background: light-dark(#fafafa, #171717);
  border-radius: 6px;
  isolation: isolate;
}
[frimousse-search] {
  position: relative;
  z-index: 10;
  appearance: none;
  margin-block-start: 8px;
  margin-inline: 8px;
  padding: 8px 10px;
  background: light-dark(#f5f5f5, #262626);
  border-radius: 6px;
  font-size: 14px;
}
[frimousse-viewport] {
  position: relative;
  flex: 1;
  outline: none;
}
[frimousse-loading]
[frimousse-empty] {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: light-dark(#a1a1a1, #737373);
  font-size: 14px;
}
[frimousse-list] {
  padding-block-end: 12px;
  user-select: none;
}
[frimousse-category-header] {
  padding: 12px 12px 6px;
  background: light-dark(#fff, #171717);
  color: light-dark(#525252, #a1a1a1);
  font-size: 12px;
  font-weight: 500;
}
[frimousse-row] {
  padding-inline: 12px;
  scroll-margin-block: 12px;
}
[frimousse-emoji] {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: transparent;
  font-size: 18px;
  border-color: transparent;
  &[data-active] {
    background: light-dark(#f5f5f5, #262626);
  }
}
</style>