import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { ref } from 'vue'
import AppModal from '../components/AppModal.vue'

const closeModalMock = vi.fn()

vi.mock('../composables/useModal.js', () => ({
  useModal: () => ({ isOpen: ref(true), closeModal: closeModalMock }),
}))

vi.mock('../composables/useTracking.js', () => ({
  captureTrackingData: vi.fn().mockResolvedValue({}),
}))

vi.mock('../utils/device.js', () => ({
  getDeviceType: vi.fn().mockReturnValue('Desktop'),
}))

async function fillValidForm(wrapper) {
  await wrapper.find('#nome').setValue('João Silva')
  await wrapper.find('#email').setValue('joao@example.com')
  const tel = wrapper.find('#telefone')
  tel.element.value = '(11) 99999-9999'
  await tel.trigger('input')
}

describe('AppModal - form validation: nome', () => {
  let wrapper

  beforeEach(() => {
    closeModalMock.mockClear()
    vi.mocked(global.fetch).mockResolvedValue({ ok: true, json: async () => ({}) })
    wrapper = mount(AppModal)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('shows error when nome is empty', async () => {
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(wrapper.text()).toContain('Nome deve ter pelo menos 2 caracteres')
  })

  it('shows error when nome is 1 character', async () => {
    await wrapper.find('#nome').setValue('A')
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(wrapper.text()).toContain('Nome deve ter pelo menos 2 caracteres')
  })

  it('shows error when nome is only whitespace', async () => {
    await wrapper.find('#nome').setValue('   ')
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(wrapper.text()).toContain('Nome deve ter pelo menos 2 caracteres')
  })

  it('accepts nome with exactly 2 characters', async () => {
    await wrapper.find('#nome').setValue('AB')
    await wrapper.find('#email').setValue('test@test.com')
    const tel = wrapper.find('#telefone')
    tel.element.value = '11999999'
    await tel.trigger('input')
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(wrapper.text()).not.toContain('Nome deve ter')
  })

  it('shows error when nome exceeds 100 characters', async () => {
    await wrapper.find('#nome').setValue('A'.repeat(101))
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(wrapper.text()).toContain('Nome deve ter no máximo 100 caracteres')
  })

  it('accepts nome with 100 characters', async () => {
    await wrapper.find('#nome').setValue('A'.repeat(100))
    await wrapper.find('#email').setValue('test@test.com')
    const tel = wrapper.find('#telefone')
    tel.element.value = '11999999'
    await tel.trigger('input')
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(wrapper.text()).not.toContain('Nome deve ter')
  })
})

describe('AppModal - form validation: email', () => {
  let wrapper

  beforeEach(() => {
    vi.mocked(global.fetch).mockResolvedValue({ ok: true, json: async () => ({}) })
    wrapper = mount(AppModal)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('shows "Email é obrigatório" when email is empty', async () => {
    await wrapper.find('#nome').setValue('João Silva')
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(wrapper.text()).toContain('Email é obrigatório')
  })

  it('shows "Email inválido" for email without @', async () => {
    await wrapper.find('#nome').setValue('João Silva')
    await wrapper.find('#email').setValue('notanemail')
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(wrapper.text()).toContain('Email inválido')
  })

  it('shows "Email inválido" for email without domain extension', async () => {
    await wrapper.find('#nome').setValue('João Silva')
    await wrapper.find('#email').setValue('user@domain')
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(wrapper.text()).toContain('Email inválido')
  })

  it('shows "Email inválido" for email with no TLD', async () => {
    await wrapper.find('#nome').setValue('João Silva')
    await wrapper.find('#email').setValue('user@')
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(wrapper.text()).toContain('Email inválido')
  })

  it('accepts valid email user@domain.com', async () => {
    await wrapper.find('#nome').setValue('João Silva')
    await wrapper.find('#email').setValue('user@domain.com')
    const tel = wrapper.find('#telefone')
    tel.element.value = '11999999'
    await tel.trigger('input')
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(wrapper.text()).not.toContain('Email inválido')
    expect(wrapper.text()).not.toContain('Email é obrigatório')
  })

  it('accepts email with plus sign', async () => {
    await wrapper.find('#nome').setValue('João Silva')
    await wrapper.find('#email').setValue('user+tag@domain.com')
    const tel = wrapper.find('#telefone')
    tel.element.value = '11999999'
    await tel.trigger('input')
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(wrapper.text()).not.toContain('Email inválido')
  })
})

describe('AppModal - form validation: telefone', () => {
  let wrapper

  beforeEach(() => {
    vi.mocked(global.fetch).mockResolvedValue({ ok: true, json: async () => ({}) })
    wrapper = mount(AppModal)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('shows "Telefone é obrigatório" when telefone is empty', async () => {
    await wrapper.find('#nome').setValue('João Silva')
    await wrapper.find('#email').setValue('user@domain.com')
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(wrapper.text()).toContain('Telefone é obrigatório')
  })

  it('shows error when telefone has fewer than 8 digits', async () => {
    await wrapper.find('#nome').setValue('João Silva')
    await wrapper.find('#email').setValue('user@domain.com')
    const tel = wrapper.find('#telefone')
    tel.element.value = '1199999' // 7 digits
    await tel.trigger('input')
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(wrapper.text()).toContain('Telefone deve ter pelo menos 8 dígitos')
  })

  it('accepts telefone with exactly 8 digits', async () => {
    await wrapper.find('#nome').setValue('João Silva')
    await wrapper.find('#email').setValue('user@domain.com')
    const tel = wrapper.find('#telefone')
    tel.element.value = '11999999' // 8 digits
    await tel.trigger('input')
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(wrapper.text()).not.toContain('Telefone deve ter pelo menos 8 dígitos')
  })

  it('accepts formatted phone (11) 99999-9999', async () => {
    await wrapper.find('#nome').setValue('João Silva')
    await wrapper.find('#email').setValue('user@domain.com')
    const tel = wrapper.find('#telefone')
    tel.element.value = '11999999999' // 11 digits → mask applies
    await tel.trigger('input')
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    // check no telefone error messages (label "Telefone *" is always rendered)
    expect(wrapper.text()).not.toContain('Telefone é obrigatório')
    expect(wrapper.text()).not.toContain('Telefone deve ter')
  })
})

describe('AppModal - applyPhoneMask', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(AppModal)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  async function triggerMask(value) {
    const tel = wrapper.find('#telefone')
    tel.element.value = value
    await tel.trigger('input')
    await wrapper.vm.$nextTick()
    return tel.element.value
  }

  it('empty input stays empty', async () => {
    expect(await triggerMask('')).toBe('')
  })

  it('2 digits formats as "(XX"', async () => {
    expect(await triggerMask('11')).toBe('(11')
  })

  it('3 digits formats as "(XX) X"', async () => {
    expect(await triggerMask('119')).toBe('(11) 9')
  })

  it('7 digits formats as "(XX) XXXXX-" (trailing dash before last group)', async () => {
    // mask adds the hyphen as soon as length >= 7, even if no digits follow
    expect(await triggerMask('1199999')).toBe('(11) 99999-')
  })

  it('11 digits formats as "(XX) XXXXX-XXXX"', async () => {
    expect(await triggerMask('11999999999')).toBe('(11) 99999-9999')
  })

  it('strips non-digit characters before masking', async () => {
    expect(await triggerMask('abc11999abc999')).toBe('(11) 99999-9')
  })
})

describe('AppModal - modal close behavior', () => {
  let wrapper

  beforeEach(() => {
    closeModalMock.mockClear()
    wrapper = mount(AppModal, { attachTo: document.body })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('closes modal when Escape key is pressed', async () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await wrapper.vm.$nextTick()
    expect(closeModalMock).toHaveBeenCalledOnce()
  })

  it('does not close modal on other keydown events', async () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    await wrapper.vm.$nextTick()
    expect(closeModalMock).not.toHaveBeenCalled()
  })
})

describe('AppModal - handleSubmit integration', () => {
  let wrapper

  beforeEach(() => {
    vi.mocked(global.fetch).mockResolvedValue({ ok: true, json: async () => ({}) })
    wrapper = mount(AppModal)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('does not call fetch when validation fails', async () => {
    vi.mocked(global.fetch).mockClear()
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(global.fetch).not.toHaveBeenCalled()
  })

  it('calls fetch twice (both webhooks) on valid submit', async () => {
    vi.mocked(global.fetch).mockClear()
    await fillValidForm(wrapper)
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(global.fetch).toHaveBeenCalledTimes(2)
    const calls = vi.mocked(global.fetch).mock.calls
    expect(calls[0][0]).toContain('n8n.manyflux.com.br')
    expect(calls[1][0]).toContain('n8n.manyflux.com.br')
  })

  it('shows success message on successful submit', async () => {
    await fillValidForm(wrapper)
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(wrapper.text()).toContain('Sucesso')
  })

  it('shows error message when fetch fails', async () => {
    vi.mocked(global.fetch).mockRejectedValueOnce(new Error('Network error'))
    await fillValidForm(wrapper)
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(wrapper.text()).toContain('Ops')
  })

  it('resets form fields after successful submit', async () => {
    await fillValidForm(wrapper)
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(wrapper.find('#nome').element.value).toBe('')
    expect(wrapper.find('#email').element.value).toBe('')
  })

  it('sets uid cookie when webhook returns user_id', async () => {
    vi.mocked(global.fetch)
      .mockResolvedValueOnce({ ok: true, json: async () => ({ user_id: 'abc123' }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({}) })

    const cookieSpy = vi.spyOn(document, 'cookie', 'set')
    await fillValidForm(wrapper)
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(cookieSpy).toHaveBeenCalledWith(expect.stringContaining('uid=abc123'))
    cookieSpy.mockRestore()
  })

  it('pushes dataLayer event on successful submit', async () => {
    window.dataLayer = []
    await fillValidForm(wrapper)
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(window.dataLayer).toContainEqual(
      expect.objectContaining({ event: 'lead_form_success' }),
    )
  })
})
