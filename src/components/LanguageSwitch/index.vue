<!-- from https://tailwindcss.com/plus/ui-blocks/application-ui/elements/dropdowns -->
<template>
  <Menu as="div" class="relative inline-block">
    <MenuButton
      class="cursor-pointer inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring-1 inset-ring-white/5 hover:bg-white/20">
      {{ currentLanguage }}
      <ChevronDownIcon class="-mr-1 size-5 text-gray-400" aria-hidden="true" />
    </MenuButton>

    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform scale-100" leave-active-class="transition ease-in duration-75"
      leave-from-class="transform scale-100" leave-to-class="transform opacity-0 scale-95">
      <MenuItems
        class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-800 outline-1 -outline-offset-1 outline-white/10">
        <div class="py-1">
          <MenuItem v-slot="{ active }" v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`"
            :value="locale">
          <a href="#"
            :class="[active ? 'bg-white/5 text-white outline-hidden' : 'text-gray-300', 'block px-4 py-2 text-sm']"
            @click="handleChangeLanguage(locale)">
            {{ locale }}</a>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n()
const currentLanguage = ref(locale.value);

const handleChangeLanguage = (language) => {
  locale.value = language
  currentLanguage.value = language
}
</script>