<template>
  <Modal @on-close="close" v-model="isVisible" />
</template>

<script setup lang="ts">
import Modal from '@/components/Modal/index.vue'
import useModal from '@/composables/useModal'

const { close, isVisible } = useModal()
</script>
