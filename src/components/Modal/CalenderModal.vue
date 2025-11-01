<template>
  <div>
    <h2>{{ date }}</h2>
    <div id="CalenderForm" class="px-3 mb-2">
      <form @submit="onSubmit">
        <InputText name="eventName" />
        <div class="bg-transparent flex flex-row gap-3">
          <button
            class="w-full rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-900 cursor-pointer hover:bg-cyan-400"
          >
            submit
          </button>
          <button
            type="button"
            @click="handleClose"
            class="w-full rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-900 cursor-pointer hover:bg-amber-400"
          >
            cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import useModal from '@/composables/useModal'
import InputText from '../Form/InputText.vue'
import { useForm } from 'vee-validate'

const { date } = defineProps<{
  date: string
}>()
const { close } = useModal()

const { handleSubmit } = useForm({})
const onSubmit = handleSubmit((value) => {
  console.log('submit value', value)
})

const handleClose = () => {
  close()
}
</script>
