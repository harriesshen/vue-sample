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

export const NOTIFICATION_STATUS = {
  DEFAULT: 'default',
  GRANTED: 'granted',
  DENIED: 'denied',
} as const

export const CALENDER_MODAL_STATUS = { CREATE: 'create', EDIT: 'edit' }
export type CALENDER_MODAL_STATUS_TYPE = ValueOf<typeof CALENDER_MODAL_STATUS>
