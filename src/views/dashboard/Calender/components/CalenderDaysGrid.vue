<template>
  <div class="grid grid-cols-7 gap-1 flex-1">
    <div
      v-for="day in monthDays"
      :key="day.date.toISOString()"
      @click="selectDate(day)"
      :class="[
        'border border-slate-700 hover:bg-slate-700/60 cursor-pointer transition-colors',
        'flex flex-col items-center justify-start min-h-[80px] relative p-1',
        day.isSelected ? 'bg-amber-600 ring-1 ring-amber-400 ' : '',
        day.isCurrentMonth
          ? 'bg-slate-800/40'
          : 'bg-slate-900/20 text-slate-500',
        day.isToday ? 'ring-2 ring-cyan-500 bg-cyan-500/20' : '',
      ]"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCalender } from '@/stores/calender'
import { storeToRefs } from 'pinia'

const calender = useCalender()
const { monthDays } = storeToRefs(calender)
const { selectDate } = calender
</script>
