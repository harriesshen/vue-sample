<template>
  <div class="flex flex-col gap-1 items-start my-2">
    <label :for="name" :class="['font-bold', { 'text-red-500': isInvalid }]">{{
      label
    }}</label>
    <el-time-picker
      v-model="value"
      placeholder="Arbitrary time"
      :class="[
        'w-full bg-white rounded-sm ',
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
import { computed, ref, watch, watchEffect } from 'vue'

const { name, label } = defineProps<{
  name: string
  label: string
}>()
const time = ref()
const { value, errorMessage, meta } = useField(() => name)
const isInvalid = computed(() => !meta.valid && meta.touched)

watchEffect(() => {
  console.log('time value', time.value)
  console.log('time value in field', value.value)
})
</script>

<style scoped>
.el-date-editor {
  margin: 8px;
}
</style>
