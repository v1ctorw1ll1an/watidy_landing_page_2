import { describe, it, expect, beforeEach } from 'vitest'
import { useModal } from '../composables/useModal.js'

describe('useModal', () => {
  beforeEach(() => {
    const { closeModal } = useModal()
    closeModal()
  })

  it('isOpen starts as false', () => {
    const { isOpen } = useModal()
    expect(isOpen.value).toBe(false)
  })

  it('openModal sets isOpen to true', () => {
    const { isOpen, openModal } = useModal()
    openModal()
    expect(isOpen.value).toBe(true)
  })

  it('closeModal sets isOpen to false', () => {
    const { isOpen, openModal, closeModal } = useModal()
    openModal()
    expect(isOpen.value).toBe(true)
    closeModal()
    expect(isOpen.value).toBe(false)
  })

  it('multiple calls to openModal are idempotent', () => {
    const { isOpen, openModal } = useModal()
    openModal()
    openModal()
    openModal()
    expect(isOpen.value).toBe(true)
  })

  it('multiple calls to closeModal are idempotent', () => {
    const { isOpen, openModal, closeModal } = useModal()
    openModal()
    closeModal()
    closeModal()
    closeModal()
    expect(isOpen.value).toBe(false)
  })

  it('isOpen is shared across multiple useModal() calls (singleton)', () => {
    const { openModal } = useModal()
    const { isOpen } = useModal()
    openModal()
    expect(isOpen.value).toBe(true)
  })
})
