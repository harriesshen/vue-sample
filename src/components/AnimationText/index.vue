<template>
  <Transition name="fade-vertical" mode="out-in">
    <div :key="currentMessage" class="text-item truncate">
      {{ currentMessage }}
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useCarouselText } from '@/stores/use-carouselText'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const { message } = defineProps<{
  message: string[]
}>()
const store = useCarouselText()
const { tick } = storeToRefs(store)

const currentIndex = computed(() => {
  if (!message || message.length === 0) {
    return 0
  }
  return tick.value % message.length
})

const currentMessage = computed(() => {
  return message[currentIndex.value]
})
</script>

<style scoped>
.text-item {
  width: 100%;
}

/* (新元素) 進入的過程 */
.fade-vertical-enter-active {
  transition: all 0.3s ease-out;
}
/* (舊元素) 離開的過程 */
.fade-vertical-leave-active {
  transition: all 0.5s ease-in;
}

/* (新元素) 進入的「開始」狀態 */
.fade-vertical-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

/* (舊元素) 離開的「結束」狀態 */
.fade-vertical-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
