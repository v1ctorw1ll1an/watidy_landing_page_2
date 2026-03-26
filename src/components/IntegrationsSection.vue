<script setup>
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

const integrations = [
  { nome: 'bitrix', logo: '/imgs/integracoes/bitrix24-logo-eng.png', alt: 'Bitrix24' },
  { nome: 'erp', logo: '/imgs/integracoes/erp.webp', alt: 'ERP' },
  { nome: 'googlesheets', logo: '/imgs/integracoes/png-transparent-google-sheets-logo-and-symbol-thumbnail.png', alt: 'Google Sheets' },
  { nome: 'hubspot', logo: '/imgs/integracoes/HubSpot_Logo.svg.png', alt: 'HubSpot' },
  { nome: 'webhooks', logo: '/imgs/integracoes/webhooks.png', alt: 'Webhooks' },
  { nome: 'nfe', logo: '/imgs/integracoes/nota-fiscal-eletronica.jpg', alt: 'NFe' },
  { nome: 'pipedrive', logo: '/imgs/integracoes/Pipedrive_Logo.svg.png', alt: 'Pipedrive' },
  { nome: 'rdstation', logo: '/imgs/integracoes/rdstatiion.png', alt: 'RD Station' },
]

const modules = [Autoplay]

const breakpoints = {
  768: { slidesPerView: 3, spaceBetween: 25 },
  1024: { slidesPerView: 5, spaceBetween: 30 },
}
</script>

<template>
  <section class="w-full bg-white pt-12 lg:pt-20 pb-8 lg:pb-12">
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
          <div class="group flex items-center justify-center p-6 rounded-xl transition-colors duration-300">
            <div class="relative lg:w-40 lg:h-20 bg-white">
              <img
                :src="integration.logo"
                :alt="integration.alt"
                class="group-hover:scale-110 transition-transform w-full h-full duration-300 object-contain mix-blend-multiply"
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
