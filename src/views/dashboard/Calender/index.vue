<script setup lang="ts">
defineOptions({
  name: 'CalenderPage', // 設定一個多詞的名稱
})
import { ref, computed } from 'vue'
import { type CalendarDay } from './type'
import { useI18n } from 'vue-i18n'
import { dayNames, monthNames } from '@/constant/calender'
import Dropdown from '@/components/Dropdown/index.vue'

// 響應式數據
const currentDate = ref(new Date())
const currentMonth = ref(new Date().getMonth())
const selectedDate = ref<Date | null>(null)
const { t } = useI18n()

// 生成年份選項（當前年份前後 10 年）
const yearOptions = computed(() => {
  const currentYear = new Date().getFullYear()
  const years = []
  for (let i = currentYear - 10; i <= currentYear + 10; i++) {
    years.push(i)
  }
  return years
})

// 當前年份
const currentYear = computed({
  get: () => currentDate.value.getFullYear(),
  set: (year: number) => {
    const newDate = new Date(currentDate.value)
    newDate.setFullYear(year)
    currentDate.value = newDate
  },
})

const monthList = computed(() => {
  return monthNames.map((month, index) => ({
    text: t(`calender.months.${month}`),
    value: index,
  }))
})

// 計算當前月份的第一天
const firstDayOfMonth = computed(() => {
  const date = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth(),
    1,
  )
  return date
})

// 計算月曆視圖的日期
const monthDays = computed((): CalendarDay[] => {
  const days: CalendarDay[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const startDate = new Date(firstDayOfMonth.value)
  // 計算42格日曆的第一天 (星期一)
  startDate.setDate(
    startDate.getDate() - ((firstDayOfMonth.value.getDay() + 6) % 7),
  )

  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)

    const day: CalendarDay = {
      date: new Date(date),
      day: date.getDate(),
      isCurrentMonth: date.getMonth() === currentMonth.value,
      isToday: date.getTime() === today.getTime(),
      isSelected: selectedDate.value
        ? date.getTime() === selectedDate.value.getTime()
        : false,
    }

    days.push(day)
  }

  return days
})

// 導航方法
const goToPreviousMonth = () => {
  if (currentMonth.value === 0) return
  currentMonth.value -= 1
}

const goToNextMonth = () => {
  if (currentMonth.value === 11) return

  currentMonth.value += 1
}

// 選擇日期
const selectDate = (day: CalendarDay) => {
  selectedDate.value = day.date
}

// 格式化日期顯示
const formatDate = (date: Date) => {
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

const onChangeYear = (value: number) => {
  currentYear.value = value
}

const onChangeMonth = (value: number) => {
  currentMonth.value = value
}
</script>

<template>
  <div
    class="calendar-container h-full flex flex-col bg-slate-900/40 rounded-lg p-4"
  >
    <div class="flex justify-between items-center mb-4">
      <!-- header left -->
      <div class="flex items-center gap-4">
        <button
          @click="goToPreviousMonth"
          :class="[
            'p-2 rounded transition-colors',
            currentMonth === 0
              ? 'bg-slate-400 hover:bg-slate-400 cursor-not-allowed'
              : 'bg-slate-700 hover:bg-slate-600 cursor-pointer',
          ]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
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
            currentMonth === 11
              ? 'bg-slate-400 hover:bg-slate-400 cursor-not-allowed'
              : 'bg-slate-700 hover:bg-slate-600 cursor-pointer',
          ]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- week title -->
    <div class="grid grid-cols-7 gap-1 mb-2">
      <div
        v-for="day in dayNames"
        :key="day"
        class="p-2 text-center font-semibold text-slate-400 text-sm border-b border-slate-700"
      >
        {{ t(`calender.week.${day}`) }}
      </div>
    </div>

    <!-- days layout -->
    <div class="grid grid-cols-7 gap-1 flex-1">
      <div
        v-for="day in monthDays"
        :key="day.date.toISOString()"
        @click="selectDate(day)"
        :class="[
          'border border-slate-700 hover:bg-slate-700/60 cursor-pointer transition-colors',
          'flex flex-col items-center justify-center min-h-[80px] relative p-1',
          day.isCurrentMonth
            ? 'bg-slate-800/40'
            : 'bg-slate-900/20 text-slate-500',
          day.isToday ? 'ring-2 ring-cyan-500 bg-cyan-500/20' : '',
          day.isSelected ? 'bg-cyan-600/30 ring-1 ring-cyan-400' : '',
        ]"
      >
        <span
          :class="[
            'text-sm font-medium',
            day.isToday ? 'font-bold text-cyan-400' : '',
            day.isSelected ? 'text-cyan-300' : '',
          ]"
        >
          {{ day.day }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar-container {
  min-height: 0;
}

/* 響應式調整 */
@media (max-width: 640px) {
  .calendar-container {
    padding: 1rem;
  }

  .grid-cols-7 > div {
    min-height: 60px;
  }
}
</style>
