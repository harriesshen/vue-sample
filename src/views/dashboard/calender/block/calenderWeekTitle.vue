<template>
  <div class="grid grid-cols-7 gap-1 mb-2">
    <div
      v-for="day in dayNames"
      :key="day"
      class="p-2 text-center font-semibold text-slate-400 text-sm border-b border-slate-700"
    >
      {{ t(`calender.week.${day}`) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { dayNames } from '@/constant/calender'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
