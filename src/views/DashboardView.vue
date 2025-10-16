<script setup lang="ts">
import Topbar from '@/components/dashboard/Topbar/index.vue'
import Sidebar from '@/components/dashboard/Sidebar/index.vue'

</script>

<template>
  <div class="flex flex-1 relative ">
    <!-- Top gradient accent -->
    <div
      class="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-cyan-500/20 via-transparent to-transparent">
    </div>
    <!-- Shell -->
    <div class="flex flex-col flex-1 mx-auto px-8 ">
      <Topbar />

      <!-- Content -->
      <div class="grid grid-cols-1 flex-1 gap-6 lg:grid-cols-12  min-h-0">
        <!-- Sidebar -->
        <Sidebar class="lg:col-span-3" />

        <!-- Main -->
        <main class="flex lg:col-span-9 min-h-0 rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <div class="flex flex-col flex-1 overflow-auto">
            <RouterView />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
