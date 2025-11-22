<script setup lang="ts">
defineOptions({
  name: 'CalenderPage',
})
import CalenderHeader from '@/views/dashboard/calender/block/calenderHeader.vue'
import CalenderWeekTitle from '@/views/dashboard/calender/block/calenderWeekTitle.vue'
import CalenderDaysGrid from '@/views/dashboard/calender/block/calenderDaysGrid.vue'
import { onMounted, onUnmounted, ref } from 'vue'
import { useCarouselText } from '@/stores/use-carouselText'
import { computed } from 'vue'

const store = useCarouselText()

const currentDate = ref(new Date())
const selectedDate = ref<Date>(new Date())

const currentYear = computed({
  get: () => currentDate.value.getFullYear(),
  set: (year: number) => {
    const newDate = new Date(currentDate.value)
    newDate.setFullYear(year)
    currentDate.value = newDate
  },
})

const currentMonth = computed({
  get: () => currentDate.value.getMonth(),
  set: (month: number) => {
    const newDate = new Date(currentDate.value)
    newDate.setMonth(month)
    currentDate.value = newDate
  },
})

// event
const goToPreviousMonth = () => {
  if (currentMonth.value === 0) {
    currentYear.value -= 1
    currentMonth.value = 11
    return
  }
  currentMonth.value -= 1
}

// event
const goToNextMonth = () => {
  if (currentMonth.value === 11) {
    currentYear.value += 1
    currentMonth.value = 0
    return
  }
  currentMonth.value += 1
}

// event
const selectDate = (day: Date) => {
  selectedDate.value = day
}

onMounted(() => store.startPulse(5000))
onUnmounted(() => store.stopPulse())
</script>

<template>
  <div
    class="calendar-container h-full flex flex-col bg-slate-900/40 rounded-lg p-4"
  >
    <CalenderHeader
      v-model:current-year="currentYear"
      v-model:current-month="currentMonth"
      :selected-date="selectedDate"
      @go-to-previous-month="goToPreviousMonth"
      @go-to-next-month="goToNextMonth"
    />
    <CalenderWeekTitle />
    <CalenderDaysGrid
      :current-date="currentDate"
      :current-month="currentMonth"
      :selected-date="selectedDate"
      @select-date="selectDate"
    />
  </div>
</template>

<style scoped></style>
