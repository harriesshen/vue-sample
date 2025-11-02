<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import Dropdown from '@/components/Dropdown/index.vue'
import { useI18n } from 'vue-i18n'
import ModalWrapper from './components/Modal/ModalWrapper.vue'
const route = useRoute()
const loginPath = computed(() => route.name === 'login')
const { locale } = useI18n()

const handleChangeLanguage = (value: string) => {
  locale.value = value
}
</script>

<template>
  <div
    :class="[
      'min-h-screen relative bg-slate-950 text-slate-100 flex flex-col',
      loginPath && 'items-center justify-center px-4',
    ]"
  >
    <div class="absolute top-5 right-8 z-10">
      <Dropdown
        v-model="locale"
        :options="$i18n.availableLocales"
        @change="handleChangeLanguage"
      />
    </div>
    <div
      :class="
        loginPath
          ? 'w-full flex items-center justify-center mb-5'
          : 'flex-1 flex flex-col'
      "
    >
      <RouterView />
      <ModalWrapper />
    </div>
    <div class="m-4 text-center text-xs text-slate-500">
      © 2025 Tech Dashboard
    </div>
  </div>
</template>

<style>
::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background: #1e293b; /* 軌道顏色 */
}

::-webkit-scrollbar-thumb {
  background-color: #587a80; /* 滑塊顏色 */
  border-radius: 8px;
  border: 2px solid #1e293b; /* 製造邊框效果 */
}

::-webkit-scrollbar-thumb:hover {
  background-color: #0891b2; /* 滑鼠懸停顏色 */
}
</style>
