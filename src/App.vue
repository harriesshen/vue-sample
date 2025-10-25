<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import Dropdown from '@/components/Dropdown/index.vue'
import { useI18n } from 'vue-i18n'
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
    </div>
    <div class="m-4 text-center text-xs text-slate-500">
      © 2025 Tech Dashboard
    </div>
  </div>
</template>

<style scoped></style>
