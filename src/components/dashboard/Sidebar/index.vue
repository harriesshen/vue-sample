<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { computed } from 'vue';
import { tabs } from '@/constant/dashboardTabs'

const route = useRoute()
const activeTab = computed(() => (route.name as string) || '')
</script>

<template>
  <aside :class="[
    'transition-all',
    'hidden sm:block'
  ]">
    <div class="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
      <div class="mb-2 text-xs uppercase tracking-widest text-slate-400">Navigation</div>
      <nav class="flex flex-col gap-1">
        <RouterLink v-for="t in tabs" :key="t.key" :to="{ name: t.key }" :class="[
          'rounded-lg px-3 py-2 text-sm hover:bg-slate-800/60',
          activeTab === t.key ? 'bg-slate-800/60 ring-1 ring-slate-700/60' : ''
        ]">{{ t.label }}</RouterLink>

      </nav>
    </div>

  </aside>
</template>

<style scoped></style>
