<template>
  <div class="flex flex-col gap-1 items-start my-2">
    <label :for="name" :class="['font-bold', { 'text-red-500': isInvalid }]">{{
      label
    }}</label>
    <input
      type="text"
      :name="name"
      :id="name"
      v-model="value"
      :class="[
        'w-full bg-white rounded-sm py-1 px-2',
        { 'border-red-500 border-2': isInvalid },
        { 'border-none': !isInvalid },
      ]"
    />
    <span v-if="isInvalid" class="text-red-500 text-sm">
      {{ errorMessage }}</span
    >
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import { computed } from 'vue'

const { value, errorMessage, meta } = useField(() => name)

const { name, label } = defineProps<{
  name: string
  label: string
}>()

const isInvalid = computed(() => !meta.valid && meta.touched)
</script>
