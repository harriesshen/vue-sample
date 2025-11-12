<template>
  <div>
    <h2>{{ formatDate(date) }}</h2>
    <div id="CalenderForm" class="px-3 mb-2">
      <form @submit="onSubmit">
        <InputText name="eventName" :label="t('calender.eventName')" />
        <TimePicker name="time" :label="t('calender.time')" />
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
import TimePicker from '../Form/TimePicker.vue'
import {
  CALENDER_MODAL_STATUS,
  type CALENDER_MODAL_STATUS_TYPE,
} from '@/constant/calender'
import { onMounted, watch } from 'vue'

interface FormType {
  time: Date
  eventName: string
}

const { date, eventId, status } = defineProps<{
  date: Date
  eventId?: number
  status: CALENDER_MODAL_STATUS_TYPE
}>()

const { t } = useI18n()
const { closeModal } = useModal()
const {
  formatDate,
  onCalenderEventSubmit,
  eventLength,
  getEventById,
  updateEventById,
} = useCalender()

const { handleSubmit, setValues } = useForm({
  validationSchema: toTypedSchema(
    zod.object({
      eventName: string().min(1, { message: t('validation.required') }),
      time: zod.date({
        required_error: t('validation.required'),
      }),
    }),
  ),
})
const onSubmit = handleSubmit((value: FormType) => {
  const { eventName, time } = value
  date.setHours(time.getHours(), time.getMinutes(), time.getSeconds())
  if (status === CALENDER_MODAL_STATUS.EDIT && eventId) {
    updateEventById({ eventId, eventName, date })
    closeModal()

    return
  }
  const eventNewId = eventLength + 1
  onCalenderEventSubmit({
    eventId: eventNewId,
    eventName,
    date,
  })
  closeModal()
})

onMounted(() => {
  // 做表單初始化
  if (status === CALENDER_MODAL_STATUS.EDIT && eventId) {
    const event = getEventById(eventId)
    console.log('event', event)
    if (event)
      setValues({
        eventName: event.eventName,
        time: event.date,
      })
    return
  }

  setValues({
    eventName: '',
  })
})
const handleClose = () => {
  closeModal()
}
</script>
