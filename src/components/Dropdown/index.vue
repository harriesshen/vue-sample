<!-- from https://tailwindcss.com/plus/ui-blocks/application-ui/elements/dropdowns -->
<template>
  <Menu as="div" class="relative inline-block">
    <MenuButton
      class="cursor-pointer inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring-1 inset-ring-white/5 hover:bg-white/20"
    >
      {{ value }}
      <ChevronDownIcon class="-mr-1 size-5 text-gray-400" aria-hidden="true" />
    </MenuButton>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        :class="[
          'absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-800 outline-1 -outline-offset-1 outline-white/10 ',
          'text-center w-auto min-w-[14rem] max-w-xs max-h-96 overflow-auto',
        ]"
      >
        <div class="py-1">
          <MenuItem
            v-slot="{ active }"
            v-for="option in normalizedOptions"
            :key="option.value"
            :value="option.value"
          >
            <a
              href="#"
              :class="[
                active
                  ? 'bg-white/5 text-white outline-hidden'
                  : 'text-gray-300',
                'block px-4 py-2 text-sm whitespace-normal',
              ]"
              @click="handleChange(option.value)"
            >
              {{ option.text }}</a
            >
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup lang="ts" generic="T extends string | number">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import type { SelectOption } from '@/components/Dropdown/type'
import { computed, ref } from 'vue'

const modelValue = defineModel<T>()

// 宣告參數類型
const { options } = defineProps<{
  // modalValue: T
  options: (SelectOption<T> | T)[]
}>()

// 宣告觸發的事件
const emit = defineEmits<{
  (e: 'change', value: T): void
}>()

const normalizedOptions = computed((): SelectOption<T>[] => {
  if (!options || options.length === 0) return []
  const firstOption = options[0]

  if (
    typeof firstOption === 'object' &&
    'value' in firstOption &&
    'text' in firstOption
  ) {
    return options as SelectOption<T>[]
  }

  if (['string', 'number'].includes(typeof firstOption)) {
    return (options as T[]).map((option) => ({
      value: option,
      text: String(option),
    }))
  }

  if (
    typeof firstOption === 'object' &&
    'value' in firstOption &&
    'text' in firstOption
  ) {
    return options as SelectOption<T>[]
  }

  console.error('Dropdown options props is not support')
  return []
})

const value = computed((): string | undefined => {
  if (modelValue.value === undefined || modelValue.value === null) {
    return undefined
  }
  return (
    normalizedOptions.value.find((option) => option.value === modelValue.value)
      ?.text || ''
  )
})

const handleChange = (value: T) => {
  emit('change', value)
}
</script>
