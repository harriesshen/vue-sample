<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { DashboardSidebarProps } from './types'

defineProps<DashboardSidebarProps>()
</script>

<template>
  <aside :class="[
    'space-y-3 transition-all',
    open ? 'block' : 'hidden sm:block'
  ]">
    <div class="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
      <div class="mb-2 text-xs uppercase tracking-widest text-slate-400">Navigation</div>
      <nav class="flex flex-col gap-1">
        <RouterLink v-for="t in tabs" :key="t.key" :to="{ name: 'dashboard', query: { tab: t.key } }" :class="[
          'rounded-lg px-3 py-2 text-sm hover:bg-slate-800/60',
          activeTab === t.key ? 'bg-slate-800/60 ring-1 ring-slate-700/60' : ''
        ]">{{ t.label }}</RouterLink>
      </nav>
    </div>

  </aside>
</template>

<style scoped></style>
