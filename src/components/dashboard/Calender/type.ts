// src/components/dashboard/Calender/type.ts
export enum ShowType {
  MONTHS = 'months',
  WEEK = 'week',
}

export interface CalendarDay {
  date: Date
  day: number
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
}

export interface CalendarState {
  currentDate: Date
  view: ShowType
  selectedDate?: Date
}
