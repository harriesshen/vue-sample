<template>
  <Modal @on-closeModal="closeModal" v-model="isVisible">
    <component :is="modalComponent" v-bind="modalProps" />
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/Modal/index.vue'
import useModal from '@/composables/useModal'

const { closeModal, isVisible, modalComponent, modalProps } = useModal()
</script>
