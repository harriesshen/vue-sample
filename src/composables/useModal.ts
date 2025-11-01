import { ref, shallowRef } from 'vue'
import type { Component } from 'vue'
const isVisible = ref(false)
const modalComponent = shallowRef<Component | null>(null)
const modalProps = ref<Record<string, any>>({})
export default function useModal() {
  const open = <T extends Component>({
    component,
    props,
  }: {
    component: T
    props?: Record<string, any>
  }) => {
    modalComponent.value = component
    if (props) modalProps.value = props
    isVisible.value = true
  }

  const close = () => {
    isVisible.value = false
    modalComponent.value = null
    console.log('close modal')
  }

  return {
    isVisible,
    modalComponent,
    modalProps,
    open,
    close,
  }
}
