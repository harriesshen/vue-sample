type ValueOf<T> = T[keyof T]

export const dayNames = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]

export const monthNames = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
]

export const notificationStatus = {
  DEFAULT: 'default',
  GRANTED: 'granted',
  DENIED: 'denied',
} as const

export const calenderModalStatus = { CREATE: 'create', EDIT: 'edit' }
export type calenderModalStatusType = ValueOf<typeof calenderModalStatus>
