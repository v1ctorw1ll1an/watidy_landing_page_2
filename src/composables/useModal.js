import { ref } from 'vue'

const isOpen = ref(false)

export function useModal() {
  const openModal = () => {
    isOpen.value = true
  }
  const closeModal = () => {
    isOpen.value = false
  }
  return { isOpen, openModal, closeModal }
}
