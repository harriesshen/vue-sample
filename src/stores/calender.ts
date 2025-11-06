import { computed, ref } from 'vue'
import { monthNames } from '@/constant/calender'
import { useI18n } from 'vue-i18n'
import type { CalendarDay } from '@/views/dashboard/Calender/type'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

interface Event {
  eventName: string
  date: Date
}

const orderByEvent = (events: Event[]) => {
  return events.sort((a, b) => a.date.getTime() - b.date.getTime())
}

export const useCalender = defineStore('calender', () => {
  const currentDate = ref(new Date())
  const selectedDate = ref<Date>(new Date())
  const calenderEvent = useStorage<Event[]>('CalenderEvent', [], localStorage, {
    serializer: {
      read: (value: string): Event[] => {
        try {
          const parsed = JSON.parse(value) as Event[]

          const result = parsed.map((item) => {
            if (item.date && typeof item.date === 'string') {
              return { eventName: item.eventName, date: new Date(item.date) }
            }
            return item
          })
          return orderByEvent(result)
        } catch (e) {
          console.error('從 localStorage 載入資料失敗', e)
          return [] // 如果解析失敗，回傳預設值
        }
      },
      write: (value: Event[]): string => {
        const sortEvent = orderByEvent(value)
        return JSON.stringify(sortEvent)
      },
    },
  })
  const { t } = useI18n()

  const yearOptions = computed(() => {
    const currentYear = new Date().getFullYear()
    const years = []
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
      years.push(i)
    }
    return years
  })

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

  const goToPreviousMonth = () => {
    if (currentMonth.value === 0) return
    currentMonth.value -= 1
  }

  const goToNextMonth = () => {
    if (currentMonth.value === 11) return
    currentMonth.value += 1
  }

  const selectDate = (day: Date) => {
    selectedDate.value = day
  }

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

  const onCalenderEventSubmit = (event: Event) => {
    calenderEvent.value = [...calenderEvent.value, event]
  }

  return {
    currentDate,
    selectedDate,
    yearOptions,
    currentYear,
    currentMonth,
    monthList,
    monthDays,
    calenderEvent,
    goToPreviousMonth,
    goToNextMonth,
    selectDate,
    formatDate,
    onChangeYear,
    onChangeMonth,
    onCalenderEventSubmit,
  }
})
