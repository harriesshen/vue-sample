<template>
  <div class="flex justify-between items-center mb-4">
    <!-- header left -->
    <div class="flex items-center gap-4">
      <button
        @click="goToPreviousMonth"
        :class="[
          'p-2 rounded transition-colors',
          'bg-slate-700 hover:bg-slate-600 cursor-pointer',
        ]"
      >
        <LeftArrowIcon />
      </button>
      <div class="relative h-full">
        <Dropdown
          v-model="currentYear"
          :options="yearOptions"
          @change="onChangeYear"
        />
      </div>

      <div class="relative h-full">
        <Dropdown
          v-model="currentMonth"
          :options="monthList"
          @change="onChangeMonth"
        />
      </div>
      <button
        v-if="isCurrentMonth"
        :class="[
          'p-2 rounded transition-colors',
          'bg-slate-700 hover:bg-slate-600 cursor-pointer',
        ]"
        @click="backToNow"
      >
        {{ t('calender.backToNow') }}
      </button>
    </div>

    <!-- selected date -->
    <div v-if="selectedDate" class="bg-slate-800/60 rounded-lg">
      <div class="text-sm text-slate-300 py-2 px-3">
        {{ t('calender.selectedDay') }}：{{ formatDate(selectedDate) }}
      </div>
    </div>

    <!-- header right -->
    <div class="flex items-center gap-2 h-full">
      <button
        @click="goToNextMonth"
        :class="[
          'p-2 rounded transition-colors',
          'bg-slate-700 hover:bg-slate-600 cursor-pointer',
        ]"
      >
        <RightArrowIcon />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCalender } from '@/stores/calender'
import Dropdown from '@/components/Dropdown/index.vue'
import { useI18n } from 'vue-i18n'
import RightArrowIcon from '@/components/icons/RightArrowIcon.vue'
import LeftArrowIcon from '@/components/icons/LeftArrowIcon.vue'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const calender = useCalender()

const { currentYear, yearOptions, currentMonth, monthList, selectedDate } =
  storeToRefs(calender)
const {
  onChangeYear,
  onChangeMonth,
  formatDate,
  goToNextMonth,
  goToPreviousMonth,
} = calender
const { t } = useI18n()

const isCurrentMonth = computed(() => {
  const month = new Date().getMonth()
  const year = new Date().getFullYear()
  if (currentMonth.value !== month || currentYear.value !== year) {
    return true
  }
  return false
})

const backToNow = () => {
  onChangeMonth(new Date().getMonth())
  onChangeYear(new Date().getFullYear())
}
</script>
