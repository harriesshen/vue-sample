<script setup lang="ts">
import type { DashboardTopbarEmits } from './types'

const emit = defineEmits<DashboardTopbarEmits>()
</script>

<template>
  <div class="flex items-center justify-between py-6">
    <div class="flex items-center gap-3">
      <div class="h-9 w-9 rounded-lg bg-gradient-to-br from-cyan-400 to-fuchsia-500 p-px">
        <div class="h-full w-full rounded-lg bg-slate-950"></div>
      </div>
      <div>
        <div class="text-sm uppercase tracking-widest text-cyan-400/80">Control Center</div>
        <div class="text-xl font-semibold">Tech Dashboard</div>
      </div>
    </div>

  </div>
</template>

<style scoped></style>
