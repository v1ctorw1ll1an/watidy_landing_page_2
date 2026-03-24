<script setup>
import { ref } from 'vue'

const openItem = ref('item-1')

function toggle(item) {
  openItem.value = openItem.value === item ? null : item
}

const faqs = [
  {
    id: 'item-1',
    question: 'Como usar a ferramenta?',
    answer:
      'A ferramenta pode ser usada como uma extensão do Google Chrome, Microsoft Edge ou Opera. Funciona tanto no Windows quanto no MAC.',
  },
  {
    id: 'item-2',
    question: 'Preciso de mais atendentes, como faço?',
    answer:
      'A extensão do WhatsApp Web te permite conectar até 4 atendentes. Cada usuário precisa de 1 licença, que pode ser a Free ou a Premium.',
  },
  {
    id: 'item-3',
    question: 'É seguro usar o waTidy?',
    answer:
      'Sim, a ferramenta passou por um processo rigoroso antes de ser publicada no repositório do Google. Para estar lá, é necessário passar por um longo processo de auditoria e controle do código-fonte. Assim, o Google garante que a ferramenta não viola as políticas de privacidade.',
  },
  {
    id: 'item-4',
    question: 'O waTidy armazena minhas informações de contato?',
    answer:
      'Não. Os dados transacionados no waTidy ficam armazenados localmente na sua máquina. Não possuímos servidores de armazenamento, portanto, não temos acesso aos seus dados nem muito menos o arquivamos.',
  },
  {
    id: 'item-5',
    question: 'Como funciona o suporte?',
    answer:
      'Se você precisar entrar em contato conosco, nos chame pelo whatsapp 3129424122. Atendemos em horário comercial.',
  },
]
</script>

<template>
  <section id="perguntas-frequentes" class="max-w-4xl mx-auto px-4 pt-[5rem] lg:pt-[9rem] mb-24">
    <h2 class="text-4xl font-bold mb-16 text-center text-gray-100">Perguntas Frequentes</h2>
    <div class="w-full max-w-4xl mx-auto">
      <div
        v-for="faq in faqs"
        :key="faq.id"
        class="border-b border-gray-700"
      >
        <button
          @click="toggle(faq.id)"
          :aria-expanded="openItem === faq.id"
          :aria-controls="`faq-content-${faq.id}`"
          class="cursor-pointer w-full py-6 text-left text-xl font-medium text-gray-100 hover:text-white focus:outline-none transition-colors duration-200 flex justify-between items-center"
        >
          <span>{{ faq.question }}</span>
          <svg
            class="w-6 h-6 flex-shrink-0 transform transition-transform duration-200 text-gray-100"
            :class="{ 'rotate-180': openItem === faq.id }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <Transition
          enter-active-class="transition-all duration-300 ease-out overflow-hidden"
          enter-from-class="max-h-0 opacity-0"
          enter-to-class="max-h-96 opacity-100"
          leave-active-class="transition-all duration-300 ease-in overflow-hidden"
          leave-from-class="max-h-96 opacity-100"
          leave-to-class="max-h-0 opacity-0"
        >
          <div
            v-if="openItem === faq.id"
            :id="`faq-content-${faq.id}`"
            role="region"
            class="overflow-hidden"
          >
            <div class="pb-6">
              <p class="text-lg text-gray-100 leading-relaxed">{{ faq.answer }}</p>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>
