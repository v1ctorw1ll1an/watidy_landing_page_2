<script setup>
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

const integrations = [
  { nome: 'bitrix', logo: '/imgs/empresas/bitrix24.webp', alt: 'Bitrix' },
  { nome: 'chatgpt', logo: '/imgs/empresas/chatgpt.webp', alt: 'ChatGPT' },
  { nome: 'erp', logo: '/imgs/empresas/erpwebp.webp', alt: 'ERP' },
  { nome: 'googlesheets', logo: '/imgs/empresas/googlesheets.webp', alt: 'Google Sheets' },
  { nome: 'hubspot', logo: '/imgs/empresas/hubspot.webp', alt: 'HubSpot' },
  { nome: 'n8n', logo: '/imgs/empresas/n8n.webp', alt: 'n8n' },
  { nome: 'nfe', logo: '/imgs/empresas/nfe.webp', alt: 'NFe' },
  { nome: 'pipedrive', logo: '/imgs/empresas/pipedrivewebp.webp', alt: 'Pipedrive' },
  { nome: 'rdstation', logo: '/imgs/empresas/rdstation.webp', alt: 'RD Station' },
]

const modules = [Autoplay]

const breakpoints = {
  768: { slidesPerView: 3, spaceBetween: 25 },
  1024: { slidesPerView: 5, spaceBetween: 30 },
}
</script>

<template>
  <section class="w-full bg-white pt-20 lg:pt-36 pb-16 lg:pb-24">
    <div class="text-center mb-12">
      <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
        Integrações que impulsionam desempenho
      </h2>
      <p class="text-lg text-gray-600 max-w-3xl mx-auto">
        Torne o Watidy ainda mais eficiente ao integrá-lo com outras ferramentas.
      </p>
    </div>
    <div class="bg-white mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <Swiper
        :modules="modules"
        :slides-per-view="2"
        :space-between="30"
        :loop="true"
        :autoplay="{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }"
        :breakpoints="breakpoints"
        class="integrations-swiper"
      >
        <SwiperSlide
          v-for="integration in integrations"
          :key="integration.nome"
        >
          <div class="group flex items-center justify-center p-6 rounded-xl hover:bg-gray-50 transition-colors duration-300">
            <div class="relative lg:w-40 lg:h-20">
              <img
                :src="integration.logo"
                :alt="integration.alt"
                class="group-hover:scale-110 transition-transform w-full h-full duration-300 object-contain"
                width="200"
                height="100"
                loading="lazy"
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>
