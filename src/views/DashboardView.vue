<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DashboardTopbar from '@/components/dashboard/Topbar/index.vue'
import DashboardSidebar from '@/components/dashboard/Sidebar/index.vue'

const sidebarOpen = ref(false)

const route = useRoute()
const router = useRouter()
const tabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'calender', label: 'Calender' },
]
const activeTab = computed(() => (route.query.tab as string) || 'overview')

watch(
  () => route.fullPath,
  () => {
    if (!route.query.tab) {
      router.replace({ name: 'dashboard', query: { tab: 'overview' } })
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 relative">
    <!-- Top gradient accent -->
    <div
      class="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-cyan-500/20 via-transparent to-transparent">
    </div>

    <!-- Shell -->
    <div class="mx-auto px-8 ">
      <DashboardTopbar @toggleSidebar="sidebarOpen = !sidebarOpen" />

      <!-- Content -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <!-- Sidebar -->
        <DashboardSidebar class="lg:col-span-3" :open="sidebarOpen" :activeTab="activeTab" :tabs="tabs" />

        <!-- Main -->
        <main class="lg:col-span-9 space-y-6">
          <!-- <DashboardKpiCards :stats="stats" />
          <DashboardCharts />
          <div class="grid grid-cols-1 gap-4 lg:grid-cols-5">
            <div class="lg:col-span-3">
              <DashboardServiceTable :rows="tableRows" />
            </div>
            <div class="lg:col-span-2 space-y-4">
              <DashboardActivity />
              <DashboardShortcuts />
            </div>
          </div> -->
        </main>
      </div>

      <!-- Footer -->
      <div class="py-10 text-center text-xs text-slate-500">© 2025 Tech Dashboard</div>
    </div>
  </div>
</template>

<style scoped></style>
