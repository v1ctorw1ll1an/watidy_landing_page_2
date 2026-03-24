<script setup>
import { computed, onMounted, ref } from 'vue'
import { useModal } from '../composables/useModal.js'
import { getCheckoutUrlsWithTracking } from '../composables/useTracking.js'

const { openModal } = useModal()

const quantity = ref(1)

const BASE_CHECKOUT_URLS = [
  'https://go.watidy.com.br/subscribe/watidy-1-usuario',
  'https://go.watidy.com.br/subscribe/watidy-2-usuarios',
  'https://go.watidy.com.br/subscribe/watidy-3-usuarios',
  'https://go.watidy.com.br/subscribe/watidy-4-usuarios',
  'https://go.watidy.com.br/subscribe/watidy-5-usuarios',
  'https://wa.me/+553129424122?text=Ol%C3%A1%2C%20vim%20do%20site%20waTidy%20e%20gostaria%20de%20saber%20das%20condi%C3%A7%C3%B5es%20especiais',
]

const checkoutUrls = ref([...BASE_CHECKOUT_URLS])

const originalPrices = [588, 1176, 1764, 2234.4, 2793]
const cashPrices = [347.0, 694.0, 1041.0, 1318.6, 1648.25]
const installmentPrices = [49.0, 98.0, 147.0, 186.2, 232.75]

const progressPercent = computed(() => ((quantity.value - 1) / 5) * 100)

const quantityText = computed(() => {
  if (quantity.value === 6) return '6+ assinaturas'
  return `${quantity.value} ${quantity.value === 1 ? 'assinatura' : 'assinaturas'}`
})

const isConsultorMode = computed(() => quantity.value >= 6)
const hasExtraDiscount = computed(() => quantity.value >= 4)

const currentOriginalPrice = computed(() => originalPrices[quantity.value - 1] || 0)
const currentCashPrice = computed(() => cashPrices[quantity.value - 1] || 0)
const currentInstallmentPrice = computed(() => installmentPrices[quantity.value - 1] || 0)

const checkoutUrl = computed(() => checkoutUrls.value[quantity.value - 1] || checkoutUrls.value[0])

function getQuantityLabel(i) {
  return i === 6 ? '+6' : i.toString()
}

function formatPrice(price) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)
}

onMounted(() => {
  checkoutUrls.value = getCheckoutUrlsWithTracking(BASE_CHECKOUT_URLS)
})
</script>

<template>
  <div class="flex justify-center items-center gap-4 bg-black">
    <div id="precos" class="grid grid-cols-1 lg:grid-cols-12 w-full container justify-center lg:justify-start pt-[120px] max-w-7xl">

      <!-- Card Teste Gratuito -->
      <div class="w-full flex justify-center px-4 dark:bg-black col-span-4">
        <section class="w-full flex flex-col rounded-2xl p-8 shadow-xl transition-colors duration-100 bg-zinc-900 text-white">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-center lg:text-start w-full">Teste Gratuito</h2>
          </div>
          <ul class="space-y-6 text-sm mb-8 flex flex-col flex-1 items-center lg:block">
            <li v-for="item in [
              'Ideal para conhecer nosso produto e suas funcionalidades',
              'Atualizações incluídas',
              'Todas funcionalidades Premium com limite de utilização',
              'Sem a necessidade de cartão de crédito.',
              'Segurança padrão do sistema',
              'Período de avaliação gratuito',
            ]" :key="item" class="flex items-start">
              <span class="w-5 flex justify-center mt-1">
                <svg class="text-[#1ff81d] w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </span>
              <span class="ml-2 max-w-md">{{ item }}</span>
            </li>
          </ul>
          <div>
            <button
              type="button"
              @click="openModal"
              class="cursor-pointer w-full group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-black bg-[#1ff81d] rounded-xl shadow-lg"
            >
              <span class="relative z-[9] flex items-center gap-2 font-bold">
                TESTAR GRÁTIS
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </span>
            </button>
          </div>
          <p class="text-xs text-center mt-4 opacity-70 pt-4"></p>
        </section>
      </div>

      <!-- Card Assinatura -->
      <div class="w-full flex justify-center px-4 bg-black lg:pt-0 pt-[50px] col-span-7">
        <section class="w-full max-w-2xl flex flex-col rounded-2xl p-8 shadow-xl transition-colors duration-100 bg-zinc-900 text-white">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">Assinatura Anual Watidy</h2>
            <div class="flex items-center text-sm gap-2">
              <span class="text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
              </span>
              Pagamento seguro
            </div>
          </div>
          <p class="text-sm opacity-70 mb-6">
            Tenha acesso completo a todos os recursos premium do Watidy e profissionalize seu whatsapp.
          </p>

          <!-- Slider de Quantidade -->
          <div class="mb-8">
            <div class="flex justify-between text-sm mb-3">
              <span>Quantidade de <b>USUÁRIOS</b></span>
              <span class="font-semibold">{{ quantityText }}</span>
            </div>
            <div class="relative w-full h-6">
              <div class="absolute top-1/2 transform -translate-y-1/2 w-full h-2 rounded-full bg-zinc-700"></div>
              <div
                class="absolute top-1/2 transform -translate-y-1/2 h-2 rounded-full bg-[#1ff81d]"
                :style="`width: ${progressPercent}%`"
              ></div>
              <div
                class="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#1ff81d] border-2 border-zinc-900 shadow"
                :style="`left: ${progressPercent}%`"
              ></div>
              <input
                type="range"
                min="1"
                max="6"
                v-model.number="quantity"
                class="w-full h-6 opacity-0 absolute top-0 left-0 cursor-pointer"
              />
            </div>
            <div class="flex justify-between text-xs text-zinc-400 mt-1">
              <span v-for="i in 6" :key="i" class="w-4 text-center">{{ getQuantityLabel(i) }}</span>
            </div>
          </div>

          <!-- Preços -->
          <div v-if="!isConsultorMode" class="mb-8">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
              <!-- Parcelado -->
              <div class="col-span-5 bg-gradient-to-br from-green-900/20 to-green-800/20 rounded-xl p-2 border border-green-700/30 flex flex-col h-full">
                <div class="flex justify-end mb-3">
                  <span class="text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                  </span>
                </div>
                <div class="text-center flex-1 flex flex-col justify-center">
                  <div class="text-white mb-1">
                    <span :class="hasExtraDiscount ? 'line-through' : ''">{{ formatPrice(currentOriginalPrice) }}</span>
                  </div>
                  <div class="text-xl lg:text-2xl font-bold text-green-300 mb-1">
                    12x {{ formatPrice(currentInstallmentPrice) }}
                    <span class="text-sm text-white ml-1 font-normal">/ ano</span>
                  </div>
                  <div v-if="hasExtraDiscount">
                    <span class="max-w-fit mx-auto bg-red-500/10 text-red-400 text-xs font-bold px-2 py-1 rounded-full">
                      5% DESCONTO
                    </span>
                  </div>
                  <div v-else class="mb-8"></div>
                </div>
              </div>
              <!-- OU -->
              <div class="col-span-2 flex justify-center items-center">
                <div class="font-bold text-xl lg:text-2xl text-white">OU</div>
              </div>
              <!-- À Vista -->
              <div class="col-span-5 bg-gradient-to-br from-green-900/20 to-green-800/20 rounded-xl p-2 border border-green-200 border-green-700/30 flex flex-col h-full">
                <div class="flex justify-end mb-3 gap-3">
                  <span class="text-green-600 size-4 mr-2">
                    <svg role="img" height="24" width="24" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5.283 18.36a3.505 3.505 0 0 0 2.493-1.032l3.6-3.6a.684.684 0 0 1 .946 0l3.613 3.613a3.504 3.504 0 0 0 2.493 1.032h.71l-4.56 4.56a3.647 3.647 0 0 1-5.156 0L4.85 18.36ZM18.428 5.627a3.505 3.505 0 0 0-2.493 1.032l-3.613 3.614a.67.67 0 0 1-.946 0l-3.6-3.6A3.505 3.505 0 0 0 5.283 5.64h-.434l4.573-4.572a3.646 3.646 0 0 1 5.156 0l4.559 4.559ZM1.068 9.422 3.79 6.699h1.492a2.483 2.483 0 0 1 1.744.722l3.6 3.6a1.73 1.73 0 0 0 2.443 0l3.614-3.613a2.482 2.482 0 0 1 1.744-.723h1.767l2.737 2.737a3.646 3.646 0 0 1 0 5.156l-2.736 2.736h-1.768a2.482 2.482 0 0 1-1.744-.722l-3.613-3.613a1.77 1.77 0 0 0-2.444 0l-3.6 3.6a2.483 2.483 0 0 1-1.744.722H3.791l-2.723-2.723a3.646 3.646 0 0 1 0-5.156"/></svg>
                  </span>
                  <span class="text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                  </span>
                </div>
                <div class="text-center flex-1 flex flex-col justify-center">
                  <div class="line-through text-white mb-1">{{ formatPrice(currentOriginalPrice) }}</div>
                  <div class="flex flex-col items-center gap-2">
                    <div class="text-xl lg:text-2xl font-bold text-green-300">
                      {{ formatPrice(currentCashPrice) }}
                      <span class="text-sm text-white ml-1 font-normal">à vista / ano</span>
                    </div>
                    <div class="flex flex-wrap justify-center gap-2">
                      <span class="bg-red-500/10 text-red-400 text-xs font-bold px-2 py-1 rounded-full">23% OFF</span>
                      <template v-if="hasExtraDiscount">
                        <div class="flex items-center gap-2">
                          <span class="text-xs text-zinc-400">+</span>
                          <span class="bg-red-500/10 text-red-400 text-xs font-bold px-2 py-1 rounded-full">5% DESCONTO</span>
                        </div>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ul class="space-y-2 text-sm mb-8 flex-1">
            <li v-for="item in [
              'Todas as funcionalidades premium ilimitadas',
              'Atualizações incluídas',
              'Suporte em horário comercial',
            ]" :key="item" class="flex items-start">
              <svg class="text-[#1ff81d] mr-2 mt-0.5 w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              {{ item }}
            </li>
          </ul>

          <!-- Botão Consultor -->
          <div v-if="isConsultorMode">
            <a
              href="https://wa.me/+553129424122?text=Ol%C3%A1%2C%20vim%20do%20site%20waTidy%20e%20gostaria%20de%20saber%20das%20condi%C3%A7%C3%B5es%20especiais"
              class="cursor-pointer w-full group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-[#1ff81d] rounded-xl shadow-lg hover:bg-[#1ee71c] transition-colors"
            >
              <span class="relative z-10 flex items-center gap-2 font-bold text-black">
                FALAR COM O CONSULTOR
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </span>
            </a>
          </div>
          <!-- Botão Assinar -->
          <div v-else>
            <a
              :href="checkoutUrl"
              rel="noopener noreferrer"
              class="cursor-pointer w-full group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-black bg-[#1ff81d] rounded-xl shadow-lg hover:bg-[#1ee71c] transition-colors"
            >
              <span class="relative z-[9] flex items-center gap-2 font-bold">
                ASSINAR AGORA
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </span>
            </a>
          </div>

          <p class="text-xs text-center mt-4 opacity-70">
            Garantia de 7 dias, reembolso total se não gostar.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>
