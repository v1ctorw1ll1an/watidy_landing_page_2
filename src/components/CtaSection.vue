<script setup>
import StatisticsCard from './StatisticsCard.vue'

const features = ['Gestão', 'Prospecção', 'Relacionamento', 'Resultados']
</script>

<template>
  <section class="container mx-auto px-4 pt-[5rem] lg:pt-[9rem]">
    <div
      class="rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 p-8 md:p-12 relative overflow-hidden border border-gray-200">
      <div class="grid lg:grid-cols-2 gap-8 items-center relative z-10">
        <div>
          <h3 class="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">
            PRONTO PARA TRANSFORMAR A FORMA DE VENDER PELO WHATSAPP?
          </h3>
          <p class="text-gray-600 mb-6 text-center">
            Funções pensadas de Empresário para empresário, vendedor para
            vendedor. Tudo que o whatsapp web precisa para ser um CRM
            completo
          </p>
          <div class="flex flex-wrap justify-center gap-3">
            <span v-for="item in features" :key="item"
              class="bg-gray-200 px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-sm">
              {{ item }}
            </span>
          </div>
          <StatisticsCard />
        </div>
        <div class="relative">
          <div class="w-full h-full flex items-center justify-center">
            <img src="/imgs/Arte1.avif" alt="Imagem do waTidy no desktop" class="rounded-lg object-fill" width="600"
              height="400" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
