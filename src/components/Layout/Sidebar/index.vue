<template>
  <aside :class="['transition-all', 'hidden sm:block']">
    <div class="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
      <div class="mb-2 text-xs uppercase tracking-widest text-slate-400">
        {{ t('sidebar.title') }}
      </div>
      <nav class="flex flex-col gap-1">
        <RouterLink
          v-for="tab in tabs"
          :key="tab.key"
          :to="{ name: tab.key }"
          :class="[
            'rounded-lg px-3 py-2 text-sm hover:bg-slate-800/60',
            activeTab === tab.key
              ? 'bg-slate-800/60 ring-1 ring-slate-700/60'
              : '',
          ]"
          >{{ t(`sidebar.${tab.key}`) }}</RouterLink
        >
      </nav>
    </div>
  </aside>
</template>

<script setup lang="ts">
defineOptions({
  name: 'SidebarPage', // 設定一個多詞的名稱
})
import { RouterLink, useRoute } from 'vue-router'
import { computed } from 'vue'
import { tabs } from '@/constant/dashboardTabs'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const route = useRoute()
const activeTab = computed(() => (route.name as string) || '')
</script>

<style scoped></style>
