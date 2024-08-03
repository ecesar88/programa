import { useState } from 'react'

export const useHandleModalState = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return {
    openModal,
    closeModal,
    isModalOpen
  }
}
