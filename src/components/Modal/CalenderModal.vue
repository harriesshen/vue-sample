<template>
  <div>
    <h2>{{ formatDate(date) }}</h2>
    <div id="CalenderForm" class="px-3 mb-2">
      <form @submit="onSubmit">
        <InputText name="eventName" :label="t('calender.eventName')" />
        <div class="bg-transparent flex flex-row gap-3">
          <button
            class="w-full rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-900 cursor-pointer hover:bg-cyan-400"
          >
            {{ t('modal.submit') }}
          </button>
          <button
            type="button"
            @click="handleClose"
            class="w-full rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-900 cursor-pointer hover:bg-amber-400"
          >
            {{ t('modal.cancel') }}
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
import { useCalender } from '@/stores/calender'
import { toTypedSchema } from '@vee-validate/zod'
import zod, { string } from 'zod'
import { useI18n } from 'vue-i18n'

const { date } = defineProps<{
  date: Date
}>()
const { t } = useI18n()
const { closeModal } = useModal()
const { formatDate, onCalenderEventSubmit } = useCalender()
const initialValues = {
  eventName: '',
}

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    zod.object({
      eventName: string().min(1, { message: 'This is required' }),
    }),
  ),
  initialValues,
})
const onSubmit = handleSubmit((value) => {
  const { eventName } = value
  onCalenderEventSubmit({
    eventName,
    date,
  })
  closeModal()
})

const handleClose = () => {
  closeModal()
}
</script>
