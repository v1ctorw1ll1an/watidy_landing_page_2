<script setup>
import { reactive, ref, onMounted, onUnmounted } from 'vue'
import { X } from 'lucide-vue-next'
import { useModal } from '../composables/useModal.js'
import { captureTrackingData } from '../composables/useTracking.js'
import { getDeviceType } from '../utils/device.js'

const { isOpen, closeModal } = useModal()

function onKeydown(e) {
  if (e.key === 'Escape' && isOpen.value) closeModal()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))

const formData = reactive({
  nome: '',
  email: '',
  ddi: '+55',
  telefone: '',
  utm_source: '',
  utm_medium: '',
  utm_campaign: '',
  gad_source: '',
  gad_campaign: '',
  utm_term: '',
  utm_content: '',
  utm_id: '',
  utm_adgroup: '',
  utm_creative: '',
  utm_network: '',
  gclid: '',
  fbclid: '',
  gbraid: '',
  user_ip: '',
  page_url: '',
  referrer: '',
  screen_resolution: '',
  device: '',
  user_agent: '',
})

const errors = reactive({})
const isSubmitting = ref(false)
const formStatus = reactive({ type: null, message: '' })

function applyPhoneMask(e) {
  let value = e.target.value.replace(/\D/g, '')
  let formatted = ''
  if (value.length > 0) {
    formatted += `(${value.substring(0, 2)}`
    if (value.length >= 3) formatted += `) ${value.substring(2, 7)}`
    if (value.length >= 7) formatted += `-${value.substring(7, 11)}`
  }
  formData.telefone = formatted
}

function validate() {
  Object.keys(errors).forEach(k => delete errors[k])

  if (!formData.nome || formData.nome.trim().length < 2)
    errors.nome = 'Nome deve ter pelo menos 2 caracteres'
  else if (formData.nome.length > 100) errors.nome = 'Nome deve ter no máximo 100 caracteres'

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formData.email) errors.email = 'Email é obrigatório'
  else if (!emailRegex.test(formData.email)) errors.email = 'Email inválido'

  const raw = formData.telefone.replace(/\D/g, '')
  if (!raw) errors.telefone = 'Telefone é obrigatório'
  else if (raw.length < 8) errors.telefone = 'Telefone deve ter pelo menos 8 dígitos'
  else if (!/^\d+$/.test(raw)) errors.telefone = 'Telefone deve conter apenas números'
  else if (raw.length > 15) errors.telefone = 'Telefone deve ter no máximo 15 caracteres'

  return Object.keys(errors).length === 0
}

async function handleSubmit() {
  formStatus.type = null
  formStatus.message = ''
  if (!validate()) return

  try {
    isSubmitting.value = true
    const tracking = await captureTrackingData()
    Object.assign(formData, tracking)

    const raw = formData.telefone.replace(/\D/g, '')
    formData.telefone = raw

    const webhooks = [
      'https://n8n.manyflux.com.br/webhook/75e6626b-d95d-459e-a669-a94f0835d2a0',
      'https://n8n.manyflux.com.br/webhook/formulario_leads_watidy',
    ]

    let createdUserId = null
    let authDownloadPlugin = null

    for (const url of webhooks) {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData }),
      })
      if (!response.ok)
        throw new Error(`Erro no webhook ${url}: ${response.status} ${response.statusText}`)

      const data = await response.json().catch(() => ({}))
      if (data.user_id && !createdUserId) createdUserId = data.user_id
      if (data.auth_download_plugin && !authDownloadPlugin) authDownloadPlugin = data.auth_download_plugin
    }

    if (createdUserId) {
      document.cookie = `uid=${createdUserId}; path=/; domain=.watidy.com.br; max-age=${60 * 60 * 24 * 180}; SameSite=Lax; Secure`
    }

    formStatus.type = 'success'
    formStatus.message = '🎉 Sucesso! Seu acesso gratuito foi liberado.'

    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'lead_form_success',
      form_id: 'modal_lead_vue',
      form_name: formData.nome,
    })

    Object.assign(formData, {
      nome: '',
      email: '',
      ddi: '+55',
      telefone: '',
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_term: '',
      utm_content: '',
      utm_id: '',
      utm_adgroup: '',
      utm_creative: '',
      utm_network: '',
      gclid: '',
      gbraid: '',
      gad_source: '',
      gad_campaign: '',
      fbclid: '',
      user_ip: '',
      page_url: '',
      referrer: '',
      screen_resolution: '',
      device: '',
      user_agent: '',
    })
    Object.keys(errors).forEach(k => delete errors[k])

    const pluginUrl = authDownloadPlugin ? new URL(authDownloadPlugin) : null
    const bearerToken = pluginUrl ? pluginUrl.searchParams.get('bearer_token') : null

    if (getDeviceType() === 'Mobile') {
      const mobileParams = new URLSearchParams()
      if (createdUserId) mobileParams.set('user_id', createdUserId)
      if (bearerToken) mobileParams.set('bearer_token', bearerToken)
      const queryString = mobileParams.toString() ? `?${mobileParams.toString()}` : ''
      window.location.href = `https://mobile.watidy.com.br/${queryString}`
    } else {
      if (authDownloadPlugin) {
        window.location.href = authDownloadPlugin
      } else {
        window.location.href =
          'https://chromewebstore.google.com/detail/watidy-crm-no-whatsapp-au/gjlfpggiddcminhebiejofeglfjmleli?hl=pt-BR'
      }
    }
  } catch (error) {
    console.error('Erro ao enviar formulário:', error)
    formStatus.type = 'error'
    formStatus.message =
      'Ops! Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente em alguns instantes.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <Transition
    enter-active-class="transition-opacity duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
  <div v-if="isOpen"
    class="fixed inset-0 grid overflow-scroll z-2147483647 bg-black/50 backdrop-blur-sm place-items-center h-full w-full"
    @click.self="closeModal">
    <div class="w-full max-w-2xl mx-auto px-4 animate-modal-in">
      <div class="relative bg-white rounded-lg border border-gray-200 shadow-sm">
        <button
          class="absolute top-3 right-3 h-8 w-8 rounded-full bg-white flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all duration-150 shadow-md hover:shadow-lg cursor-pointer"
          @click="closeModal" aria-label="Fechar">
          <X class="h-4 w-4" />
        </button>
        <!-- Header -->
        <div class="p-6 pb-0">
          <h2 class="text-xl font-semibold tracking-tight uppercase">CRIAR CONTA GRATUITA</h2>

        </div>
        <!-- Content -->
        <div class="p-6 pt-2 space-y-2">
          <!-- Status Message -->
          <div v-if="formStatus.type">
            <div :class="{
              'border-[var(--color-primary)]/30 bg-[var(--color-primary)]/10 text-[var(--color-primary)]': formStatus.type === 'success',
              'border-red-200 bg-red-50 text-red-800': formStatus.type === 'error',
            }" class="rounded-lg border p-4">
              <div class="flex items-center">
                <div class="shrink-0">
                  <svg v-if="formStatus.type === 'success'" class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"></path>
                  </svg>
                  <svg v-else class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium">{{ formStatus.message }}</p>
                </div>
              </div>
            </div>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-2">
            <!-- Nome -->
            <div class="space-y-1">
              <label for="nome" class="text-sm font-medium leading-none">Nome completo *</label>
              <input id="nome" type="text" placeholder="Seu nome completo" v-model="formData.nome"
                :class="{ 'border-red-500': errors.nome }"
                class="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
              <div v-if="errors.nome" class="rounded-lg border border-red-200 bg-red-50 p-2">
                <div class="flex items-center">
                  <svg class="h-3 w-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"></path>
                  </svg>
                  <p class="ml-3 text-xs text-red-800">{{ errors.nome }}</p>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Email -->
              <div class="space-y-2">
                <label for="email" class="text-sm font-medium leading-none">Email *</label>
                <input id="email" type="email" placeholder="seu@email.com" v-model="formData.email"
                  :class="{ 'border-red-500': errors.email }"
                  class="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                <div v-if="errors.email" class="rounded-lg border border-red-200 bg-red-50 p-2">
                  <div class="flex items-center">
                    <svg class="h-3 w-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"></path>
                    </svg>
                    <p class="ml-3 text-xs text-red-800">{{ errors.email }}</p>
                  </div>
                </div>
              </div>
              <!-- Telefone -->
              <div class="space-y-2">
                <label for="telefone" class="text-sm font-medium leading-none">Telefone *</label>
                <input id="telefone" type="tel" placeholder="11999999999" :value="formData.telefone"
                  @input="applyPhoneMask" :class="{ 'border-red-500': errors.telefone }"
                  class="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                <div v-if="errors.telefone" class="rounded-lg border border-red-200 bg-red-50 p-2">
                  <div class="flex items-center">
                    <svg class="h-3 w-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"></path>
                    </svg>
                    <p class="ml-3 text-xs text-red-800">{{ errors.telefone }}</p>
                  </div>
                </div>
              </div>
            </div>
            <p class="text-sm text-gray-600 mt-3 text-center">
              Sua senha provisória é <b>1234</b>
            </p>

            <!-- Botões -->
            <div class="flex gap-3 pt-6">
              <button type="submit" :disabled="isSubmitting"
                class="flex-1 inline-flex items-center justify-center rounded-md font-bold text-lg px-3 py-4 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-black shadow-brand hover:scale-105 active:scale-[0.98]">
                <span v-if="isSubmitting" class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                  </svg>
                  Enviando...
                </span>
                <span v-else>Criar Conta Gratuita</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  </Transition>
</template>
