<script setup lang="ts">
defineOptions({
  name: 'CalenderPage', // 設定一個多詞的名稱
})
import CalenderHeader from './components/CalenderHeader.vue'
import CalenderWeekTitle from './components/CalenderWeekTitle.vue'
import CalenderDaysGrid from './components/CalenderDaysGrid.vue'
</script>

<template>
  <div
    class="calendar-container h-full flex flex-col bg-slate-900/40 rounded-lg p-4"
  >
    <CalenderHeader />
    <CalenderWeekTitle />
    <CalenderDaysGrid />
  </div>
</template>

<style scoped></style>
