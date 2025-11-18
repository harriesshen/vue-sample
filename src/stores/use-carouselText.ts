// src/stores/carouselStore.ts
import { defineStore } from 'pinia'
import { ref, readonly } from 'vue'

export const useCarouselText = defineStore('carouselText', () => {
  // 1. 狀態
  const tick = ref(0)
  let intervalId: number | null = null

  // 2. 動作 (Action)
  const startPulse = (interval: number = 3000) => {
    // 防止重複啟動
    if (intervalId) return

    console.log('Pinia: Starting pulse...')
    intervalId = window.setInterval(() => {
      tick.value++
    }, interval)
  }

  const stopPulse = () => {
    if (intervalId) {
      console.log('Pinia: Stopping pulse...')
      clearInterval(intervalId)
      intervalId = null
    }
  }

  return {
    tick: readonly(tick), // 暴露唯讀的 tick
    startPulse,
    stopPulse,
  }
})
