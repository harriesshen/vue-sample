<template>
  <Modal @on-close="close" v-model="isVisible">
    <component :is="modalComponent" v-if="modalComponent" v-bind="modalProps" />
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/Modal/index.vue'
import useModal from '@/composables/useModal'

const { close, isVisible, modalComponent, modalProps } = useModal()
</script>
