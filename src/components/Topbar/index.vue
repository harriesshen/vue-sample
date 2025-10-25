<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineOptions({
  name: 'TopbarPage', // 設定一個多詞的名稱
})
const { t } = useI18n()
</script>

<template>
  <div class="flex items-center justify-between py-6">
    <div class="flex items-center gap-3">
      <div
        class="h-9 w-9 rounded-lg bg-gradient-to-br from-cyan-400 to-fuchsia-500 p-px"
      >
        <div class="h-full w-full rounded-lg bg-slate-950"></div>
      </div>
      <div>
        <div class="text-xl font-semibold">{{ t('topbar.title') }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
