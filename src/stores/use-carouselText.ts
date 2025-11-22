// src/stores/carouselStore.ts
import { defineStore } from 'pinia'

export const useCarouselText = defineStore('carouselText', {
  state: (): {
    tick: number
    intervalId: number | null
  } => ({
    tick: 0,
    intervalId: null,
  }),
  getters: {},
  actions: {
    startPulse(interval: number = 3000) {
      // 防止重複啟動
      if (this.intervalId) return

      console.log('Pinia: Starting pulse...')
      this.intervalId = window.setInterval(() => {
        this.tick++
      }, interval)
    },
    stopPulse() {
      if (this.intervalId) {
        console.log('Pinia: Stopping pulse...')
        clearInterval(this.intervalId)
        this.intervalId = null
      }
    },
  },
})
