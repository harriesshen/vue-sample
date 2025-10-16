<script setup lang="ts">
defineOptions({
  name: 'CalenderPage', // 設定一個多詞的名稱
})
import { ref, computed } from 'vue'
import { ShowType, type CalendarDay } from './type'
import { useI18n } from 'vue-i18n'
// 響應式數據
const currentDate = ref(new Date())
const selectedDate = ref<Date | null>(null)
const showType = ref<ShowType>(ShowType.MONTHS)
const showYearSelector = ref(false)
const { t } = useI18n()
console.log('translate', t('message.hello'))
// 星期標題
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

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

// 當前月份
const currentMonth = computed({
  get: () => currentDate.value.getMonth(),
  set: (month: number) => {
    const newDate = new Date(currentDate.value)
    newDate.setMonth(month)
    currentDate.value = newDate
  },
})

// 計算當前月份的第一天和最後一天
const firstDayOfMonth = computed(() => {
  const date = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth(),
    1,
  )
  return date
})

// const lastDayOfMonth = computed(() => {
//   const date = new Date(
//     currentDate.value.getFullYear(),
//     currentDate.value.getMonth() + 1,
//     0,
//   )
//   return date
// })

// 計算月曆視圖的日期
const monthDays = computed((): CalendarDay[] => {
  const days: CalendarDay[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const startDate = new Date(firstDayOfMonth.value)
  startDate.setDate(startDate.getDate() - firstDayOfMonth.value.getDay())

  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)

    const day: CalendarDay = {
      date: new Date(date),
      day: date.getDate(),
      isCurrentMonth: date.getMonth() === currentDate.value.getMonth(),
      isToday: date.getTime() === today.getTime(),
      isSelected: selectedDate.value
        ? date.getTime() === selectedDate.value.getTime()
        : false,
    }

    days.push(day)
  }

  return days
})

// 計算週曆視圖的日期
const weekDays = computed((): CalendarDay[] => {
  const days: CalendarDay[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const startOfWeek = new Date(currentDate.value)
  startOfWeek.setDate(currentDate.value.getDate() - currentDate.value.getDay())

  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek)
    date.setDate(startOfWeek.getDate() + i)

    const day: CalendarDay = {
      date: new Date(date),
      day: date.getDate(),
      isCurrentMonth: date.getMonth() === currentDate.value.getMonth(),
      isToday: date.getTime() === today.getTime(),
      isSelected: selectedDate.value
        ? date.getTime() === selectedDate.value.getTime()
        : false,
    }

    days.push(day)
  }

  return days
})

// 當前顯示的日期數據
const displayDays = computed(() => {
  return showType.value === ShowType.MONTHS ? monthDays.value : weekDays.value
})

// 當前顯示的標題
// const currentTitle = computed(() => {
//   if (showType.value === ShowType.MONTHS) {
//     return `${monthNames[currentDate.value.getMonth()]} ${currentDate.value.getFullYear()}`
//   } else {
//     const startOfWeek = weekDays.value[0]
//     const endOfWeek = weekDays.value[6]

//     if (startOfWeek.date.getMonth() === endOfWeek.date.getMonth()) {
//       return `${monthNames[startOfWeek.date.getMonth()]} ${startOfWeek.date.getFullYear()}`
//     } else {
//       return `${monthNames[startOfWeek.date.getMonth()]} - ${monthNames[endOfWeek.date.getMonth()]} ${startOfWeek.date.getFullYear()}`
//     }
//   }
// })

// 導航方法
const goToPrevious = () => {
  const newDate = new Date(currentDate.value)
  if (showType.value === ShowType.MONTHS) {
    newDate.setMonth(newDate.getMonth() - 1)
  } else {
    newDate.setDate(newDate.getDate() - 7)
  }
  currentDate.value = newDate
}

const goToNext = () => {
  const newDate = new Date(currentDate.value)
  if (showType.value === ShowType.MONTHS) {
    newDate.setMonth(newDate.getMonth() + 1)
  } else {
    newDate.setDate(newDate.getDate() + 7)
  }
  currentDate.value = newDate
}

const goToToday = () => {
  currentDate.value = new Date()
  selectedDate.value = null
}

// 視圖切換
const switchView = (view: ShowType) => {
  showType.value = view
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
</script>

<template>
  <div
    class="calendar-container h-full flex flex-col bg-slate-900/40 rounded-lg p-4"
  >
    <!-- 標題和導航 -->
    <div class="flex justify-between items-center mb-4">
      <div class="flex items-center gap-4">
        <!-- 年份選擇器 -->
        <div class="relative">
          <button
            @click="showYearSelector = !showYearSelector"
            class="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded text-sm transition-colors"
          >
            {{ currentYear }} ▼
          </button>

          <!-- 年份下拉選單 -->
          <div
            v-if="showYearSelector"
            class="absolute top-full left-0 mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto w-20"
          >
            <div
              v-for="year in yearOptions"
              :key="year"
              @click="
                currentYear = year
                showYearSelector = false
              "
              :class="[
                'px-3 py-2 text-sm cursor-pointer hover:bg-slate-700 transition-colors',
                year === currentYear
                  ? 'bg-slate-700 text-cyan-400'
                  : 'text-slate-300',
              ]"
            >
              {{ year }}
            </div>
          </div>
        </div>

        <!-- 月份選擇器 -->
        <div class="relative">
          <select
            v-model="currentMonth"
            class="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded text-sm transition-colors appearance-none cursor-pointer"
          >
            <option
              v-for="(month, index) in monthNames"
              :key="index"
              :value="index"
            >
              {{ month }}
            </option>
          </select>
        </div>
      </div>

      <!-- 導航按鈕 -->
      <div class="flex items-center gap-2">
        <button
          @click="goToPrevious"
          class="p-2 bg-slate-700 hover:bg-slate-600 rounded transition-colors"
        >
          ‹
        </button>
        <button
          @click="goToToday"
          class="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded text-sm transition-colors"
        >
          今天
        </button>
        <button
          @click="goToNext"
          class="p-2 bg-slate-700 hover:bg-slate-600 rounded transition-colors"
        >
          ›
        </button>
      </div>
    </div>

    <!-- 視圖選擇器 -->
    <div class="flex gap-2 mb-4">
      <button
        @click="switchView(ShowType.MONTHS)"
        :class="[
          'px-4 py-2 rounded text-sm font-medium transition-colors',
          showType === ShowType.MONTHS
            ? 'bg-cyan-600 text-white'
            : 'bg-slate-700 text-slate-300 hover:bg-slate-600',
        ]"
      >
        月曆
      </button>
      <button
        @click="switchView(ShowType.WEEK)"
        :class="[
          'px-4 py-2 rounded text-sm font-medium transition-colors',
          showType === ShowType.WEEK
            ? 'bg-cyan-600 text-white'
            : 'bg-slate-700 text-slate-300 hover:bg-slate-600',
        ]"
      >
        週曆
      </button>
    </div>

    <!-- 星期標題 -->
    <div class="grid grid-cols-7 gap-1 mb-2">
      <div
        v-for="dayName in dayNames"
        :key="dayName"
        class="p-2 text-center font-semibold text-slate-400 text-sm border-b border-slate-700"
      >
        {{ dayName }}
      </div>
    </div>

    <!-- 日期格子 -->
    <div class="grid grid-cols-7 gap-1 flex-1">
      <div
        v-for="day in displayDays"
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

        <div class="flex gap-1 mt-1">
          <div
            v-if="day.day % 3 === 0"
            class="w-1 h-1 bg-blue-400 rounded-full"
          ></div>
          <div
            v-if="day.day % 5 === 0"
            class="w-1 h-1 bg-green-400 rounded-full"
          ></div>
        </div>
      </div>
    </div>

    <!-- 選中日期信息 -->
    <div v-if="selectedDate" class="mt-4 p-3 bg-slate-800/60 rounded-lg">
      <div class="text-sm text-slate-300">
        選中日期：{{ formatDate(selectedDate) }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar-container {
  min-height: 0;
}

/* 點擊外部關閉下拉選單 */
.relative {
  position: relative;
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
