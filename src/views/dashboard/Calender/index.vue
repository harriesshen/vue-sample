<script setup lang="ts">
defineOptions({
  name: 'CalenderPage',
})
import CalenderHeader from './components/CalenderHeader.vue'
import CalenderWeekTitle from './components/CalenderWeekTitle.vue'
import CalenderDaysGrid from './components/CalenderDaysGrid.vue'
import { onMounted, onUnmounted } from 'vue'
import { useCarouselText } from '@/stores/carouselText'

const store = useCarouselText()

onMounted(() => store.startPulse(5000))

onUnmounted(() => store.stopPulse())
</script>

<template>
  <div
    class="calendar-container h-full flex flex-col bg-slate-900/40 rounded-lg p-4"
  >
    <CalenderHeader />
    <CalenderWeekTitle />
    <CalenderDaysGrid />
  </div>
</template>

<style scoped></style>
