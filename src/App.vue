<script setup lang="ts">
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router'
const route = useRoute()
const loginPath = computed(() => route.name === 'login')
</script>


<template>
  <div
    :class="['min-h-screen bg-slate-950 text-slate-100 flex flex-col', loginPath && 'items-center justify-center px-4']">
    <div :class="loginPath ? 'w-full flex items-center justify-center mb-5' : 'flex-1 flex flex-col'">
      <RouterView />
    </div>
    <div class="m-4 text-center text-xs text-slate-500">© 2025 Tech Dashboard</div>
  </div>
</template>

<style scoped></style>
