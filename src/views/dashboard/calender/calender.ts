import { monthNames } from '@/constant/calender'
import { type ComposerTranslation } from 'vue-i18n'
import type { CalendarDay } from '@/views/dashboard/calender/types.ts'

// year - dropdown
export const yearOptions = (year: number, num: number) => {
  // const currentYear = new Date().getFullYear()
  const years = []
  for (let i = year - num; i <= year + num; i++) {
    years.push(i)
  }
  return years
}

// month - dropdown
export const monthList = (t: ComposerTranslation) => {
  return monthNames.map((month, index) => ({
    text: t(`calender.months.${month}`),
    value: index,
  }))
}

// format date to string yyyy-mm-dd
export const formatDate = (date: Date) => {
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

export const createCalenderByMonth = (
  firstDayOfMonth: Date,
  currentMonth: number,
  selectedDate: Date,
  days: number,
): CalendarDay[] => {
  const dayList: CalendarDay[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const startDate = new Date(firstDayOfMonth)
  // 計算42格日曆的第一天 (星期一)
  startDate.setDate(startDate.getDate() - ((firstDayOfMonth.getDay() + 6) % 7))

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)

    const day: CalendarDay = {
      date: new Date(date),
      day: date.getDate(),
      isCurrentMonth: date.getMonth() === currentMonth,
      isToday: date.getTime() === today.getTime(),
      isSelected: selectedDate
        ? date.getTime() === selectedDate.getTime()
        : false,
    }

    dayList.push(day)
  }

  return dayList
}
