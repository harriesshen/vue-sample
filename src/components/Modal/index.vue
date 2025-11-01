<template>
  <TransitionRoot appear :show="modelValue" as="template">
    <Dialog as="div" @close="handleClose">
      <!-- <div class="fixed inset-0 flex w-screen items-center justify-center p-4"> -->
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="w-full max-w-sm rounded bg-cyan-200">
              <slot></slot>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
      <!-- </div> -->
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'

defineOptions({
  name: 'Modal',
})

const modelValue = defineModel<boolean>()
const emit = defineEmits<{
  (e: 'onClose'): void
}>()
const handleClose = () => {
  emit('onClose')
}
// 處理 Esc 鍵 和 滾動鎖定
watchEffect((onCleanup) => {
  if (modelValue.value) {
    // 鎖定背景滾動
    document.body.style.overflow = 'hidden'

    // 監聽 Esc 鍵
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') modelValue.value = false
    }
    window.addEventListener('keydown', onEsc)

    // 清除副作用
    onCleanup(() => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onEsc)
    })
  }
})
</script>
