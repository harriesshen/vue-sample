<template>
  <div
    :class="[
      'border border-slate-500 rounded-sm w-full p-1 text-xs mb-1',
      'hover:bg-slate-500',
    ]"
    @click="onEdit(event)"
  >
    <div class="truncate">{{ event.eventName }}</div>
  </div>
</template>

<script setup lang="ts">
import CalenderModal from '@/components/Modal/CalenderModal.vue'
import useModal from '@/composables/useModal'
import { CALENDER_MODAL_STATUS } from '@/constant/calender'
import { type Event } from '@/stores/calender'

const { event } = defineProps<{
  event: Event
}>()
const { openModal } = useModal()

const onEdit = (event: Event) => {
  console.log('edit event', event.eventName, event.date)
  const { date, eventId } = event
  openModal({
    component: CalenderModal,
    props: {
      date,
      eventId,
      status: CALENDER_MODAL_STATUS.EDIT,
    },
  })
}
</script>
