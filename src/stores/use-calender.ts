import { watch } from 'vue'
import { defineStore } from 'pinia'
import { useStorage, type RemovableRef } from '@vueuse/core'
import useNotifications from '@/composables/useNotifications'

export interface Event {
  eventId: number
  eventName: string
  date: Date
  isNotification: boolean
}

const orderByEvent = (events: Event[]) => {
  return events.sort((a, b) => a.date.getTime() - b.date.getTime())
}

export const useCalender = defineStore('calender', {
  state: (): {
    eventLength: number
    calenderEvent: RemovableRef<Event[]>
    nextNotificationTimer: number | null
  } => ({
    eventLength: 0,
    calenderEvent: useStorage<Event[]>('CalenderEvent', [], localStorage, {
      serializer: {
        read: (value: string): Event[] => {
          try {
            const parsed = JSON.parse(value) as Event[]

            const result = parsed.map((item) => {
              if (item.date && typeof item.date === 'string') {
                return { ...item, date: new Date(item.date) }
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
    }),
    nextNotificationTimer: null,
  }),
  getters: {
    eventLength: (state) => state.calenderEvent.length,
  },
  actions: {
    getEventById(eventId: number) {
      return this.calenderEvent.find((event) => event.eventId === eventId)
    },
    updateEventById(e: Event) {
      this.calenderEvent = this.calenderEvent.map((event) => {
        if (event.eventId === e.eventId) return e
        return event
      })
    },
    onCalenderEventSubmit(event: Event) {
      this.calenderEvent = [...this.calenderEvent, event]
    },
    initNotification() {
      const { sendNotification, requestPermission } = useNotifications()
      const scheduleNextNotification = () => {
        if (this.nextNotificationTimer) {
          clearTimeout(this.nextNotificationTimer)
          this.nextNotificationTimer = null
        }
        const now = new Date()
        const nextEvent = [...this.calenderEvent]
          .map((e) => ({ ...e, dateObj: new Date(e.date) }))
          .filter((e) => e.dateObj > now && !e.isNotification)[0] // 只找未來的

        if (!nextEvent) {
          console.log('沒有未來的事件，停止排程。')
          return
        }

        const timeToEvent = nextEvent.dateObj.getTime() - now.getTime()
        const REMINDER_BUFFER = 60 * 1000 // 提早 1 分鐘
        const timeoutDuration = Math.max(0, timeToEvent - REMINDER_BUFFER)

        console.log(
          `已排程: "${nextEvent.eventName}" 將在 ${timeoutDuration / 1000} 秒後提醒`,
        )

        this.nextNotificationTimer = window.setTimeout(
          () => {
            sendNotification(nextEvent.eventName, {
              body: `您的事件在 ${new Date(nextEvent.date).toLocaleTimeString()} 即將開始`,
            })
            this.updateEventById({ ...nextEvent, isNotification: true })
          },
          timeoutDuration <= 0 ? 0 : timeoutDuration,
        )
      }
      watch(
        () => this.calenderEvent,
        () => {
          scheduleNextNotification()
        },
        {
          deep: true,
          immediate: true, // 關鍵：讓 watch 在元件載入時「立即」執行一次
        },
      )
    },
  },
})
