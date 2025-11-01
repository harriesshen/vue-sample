<template>
  <div class="flex flex-col gap-1 items-start my-2">
    <label for="{{name}}" class="font-bold">Event Name</label>
    <input
      type="text"
      name="{{name}}"
      id="eventName"
      v-model="value"
      class="w-full bg-white rounded-sm border-none py-1 px-2"
    />
    {{ errorMessage }}
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'

const { value, errorMessage } = useField(() => name)
const { name } = defineProps<{
  name: string
}>()
</script>
