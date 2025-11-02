<template>
  <div class="grid grid-cols-7 gap-1 flex-1">
    <div
      v-for="day in monthDays"
      :key="day.date.toISOString()"
      @click="selectDate(day.date)"
      :class="[
        'border border-slate-700 hover:bg-slate-700/60 cursor-pointer transition-colors',
        'flex flex-col items-center justify-start min-h-[80px] relative p-1',
        'h-20 overflow-auto',
        day.isSelected ? 'bg-amber-600 ring-1 ring-amber-400 ' : '',
        day.isCurrentMonth
          ? 'bg-slate-800/40'
          : 'bg-slate-900/20 text-slate-500',
        day.isToday ? 'ring-2 ring-cyan-500 bg-cyan-500/20' : '',
      ]"
      @contextmenu="showMenu($event, day.date)"
    >
      <span
        :class="[
          'text-sm font-medium',
          day.isToday ? 'font-bold text-cyan-400' : '',
          day.isSelected ? 'text-amber-400' : '',
        ]"
      >
        {{ day.day }}
      </span>
      <div
        v-if="event.has(day.date.toDateString())"
        v-for="event in getEventsByDay(day)"
        :key="event.id"
        class="border border-slate-500 rounded-sm w-full p-1 text-xs mb-1"
      >
        <div class="truncate">{{ event.eventName }}</div>
      </div>
    </div>
    <Transition name="fade">
      <div
        v-if="isMenuVisible"
        :class="[
          'custom-context-menu',
          'rounded-lg bg-slate-700 text-slate-300',
        ]"
        :style="{ top: `${menuPosition.y}px`, left: `${menuPosition.x}px` }"
        @click.stop
      >
        <ul>
          <li
            class="py-2 px-4 hover:bg-slate-900 cursor-pointer text-base"
            @click="addEvent()"
          >
            建立事件
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import CalenderModal from '@/components/Modal/CalenderModal.vue'
import useModal from '@/composables/useModal'
import { useCalender } from '@/stores/calender'
import { storeToRefs } from 'pinia'
import { computed, ref, Transition, watchEffect } from 'vue'

const calender = useCalender()
const { openModal } = useModal()
const { monthDays, selectedDate, calenderEvent } = storeToRefs(calender)
const { selectDate } = calender

const isMenuVisible = ref(false)
const menuPosition = ref({ x: 0, y: 0 })
const targetItem = ref<Date | null>(null)
const event = computed(() => {
  const map = new Map<string, any[]>()

  for (const event of calenderEvent.value) {
    const dateKey = event.date.toDateString()

    if (!map.has(dateKey)) {
      map.set(dateKey, [])
    }
    map.get(dateKey)!.push(event)
  }
  return map
})

watchEffect((onCleanup) => {
  console.log('event', calenderEvent.value)
  console.log('monthDays', monthDays.value)

  if (isMenuVisible.value) {
    window.addEventListener('click', hideMenu)

    onCleanup(() => {
      window.removeEventListener('click', hideMenu)
    })
  }
})

const showMenu = (event: MouseEvent, day: Date) => {
  event.preventDefault()
  // 設置選單的 x, y 座標
  // 我們使用 clientX/Y，它會提供相對於「可視視窗」的座標
  menuPosition.value = { x: event.clientX, y: event.clientY }

  // 標記選單為可見
  isMenuVisible.value = true
  targetItem.value = day
  selectDate(day)
}

const hideMenu = () => {
  isMenuVisible.value = false
  targetItem.value = null
}

const addEvent = () => {
  openModal({
    component: CalenderModal,
    props: {
      date: selectedDate.value,
    },
  })

  isMenuVisible.value = false
}

const getEventsByDay = (day: { date: Date }): any[] | undefined => {
  return event.value.get(day.date.toDateString())
}
</script>

<style scoped>
.custom-context-menu {
  position: fixed; /* 使用 fixed，因為 clientX/Y 是相對於視窗的 */
  z-index: 1000;
  width: 150px;
}
</style>
