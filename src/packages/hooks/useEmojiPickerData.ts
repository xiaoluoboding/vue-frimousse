import { ref, watch, onUnmounted } from 'vue';
import { getEmojiData } from '../data/emoji';
import { getEmojiPickerData } from '../data/emoji-picker';
import { useEmojiPickerStore } from '../store';
import { useSelectorKey } from '../utils/store';
import { requestIdleCallback } from '../utils/request-idle-callback';
import type { EmojiData, EmojiPickerRootProps } from '../types';

export interface UseEmojiPickerDataOptions {
  emojiVersion?: EmojiPickerRootProps['emojiVersion'];
  emojibaseUrl?: EmojiPickerRootProps['emojibaseUrl'];
}

export function useEmojiPickerData(
  store: ReturnType<typeof useEmojiPickerStore>,
  options: UseEmojiPickerDataOptions = {}
) {
  const emojiData = ref<EmojiData | undefined>(undefined);
  const locale = useSelectorKey(store, "locale");
  const columns = useSelectorKey(store, "columns");
  const skinTone = useSelectorKey(store, "skinTone");
  const search = useSelectorKey(store, "search");

  let abortController: AbortController | null = null;
  let cleanupCallback: (() => void) | null = null;

  // Fetch emoji data when locale changes
  const stopWatchingData = watch(
    [locale, () => options.emojiVersion, () => options.emojibaseUrl], 
    async () => {
      // Cleanup previous request
      if (abortController) {
        abortController.abort();
      }
      
      abortController = new AbortController();
      const signal = abortController.signal;

      try {
        const data = await getEmojiData({ 
          locale: locale.value, 
          emojiVersion: options.emojiVersion, 
          emojibaseUrl: options.emojibaseUrl, 
          signal 
        });
        
        if (!signal.aborted) {
          emojiData.value = data;
        }
      } catch (error) {
        if (!signal.aborted) {
          console.error(error);
        }
      }
    }, 
    { immediate: true }
  );

  // Process emoji data when it changes or when picker settings change
  const stopWatchingProcessing = watch([emojiData, columns, skinTone, search], () => {
    if (!emojiData.value) {
      return;
    }

    // Cleanup previous processing
    if (cleanupCallback) {
      cleanupCallback();
    }

    cleanupCallback = requestIdleCallback(
      () => {
        store
          .get()
          .onDataChange(
            getEmojiPickerData(emojiData.value!, columns.value, skinTone.value, search.value),
          );
      },
      { timeout: 100 },
    );
  });

  // Cleanup function
  const cleanup = () => {
    if (abortController) {
      abortController.abort();
      abortController = null;
    }
    if (cleanupCallback) {
      cleanupCallback();
      cleanupCallback = null;
    }
    stopWatchingData();
    stopWatchingProcessing();
  };

  onUnmounted(() => {
    cleanup();
  });

  return {
    emojiData,
    cleanup
  };
}
