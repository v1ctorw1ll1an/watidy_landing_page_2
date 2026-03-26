<script setup>
const testimonials = [
  {
    quote:
      'O waTidy transformou totalmente a forma como gerenciamos nossos atendimentos no WhatsApp. Antes, era tudo manual e desorganizado. Agora temos um CRM completo, agendamos mensagens, usamos respostas rápidas e ainda integramos com IA para acelerar o atendimento. É como ter um time extra trabalhando pra gente!',
    name: 'Carlos Ribeiro',
    title: 'Agência de Marketing',
    avatar: '/imgs/logotipo-watidy-dark.avif',
  },
  {
    quote:
      'Trabalho sozinho e precisava de algo prático para não perder vendas. Com o waTidy, organizo meus clientes com etiquetas, agendo lembretes com segurança. A versão gratuita já ajuda muito, mas com o plano pago ficou ainda melhor!',
    name: 'Roberto Gusmão',
    title: 'Imobiliária',
    avatar: '/imgs/logotipo-watidy-dark.avif',
  },
  {
    quote:
      'Comecei como usuário e hoje revendo o waTidy com minha própria marca. É uma fonte de renda recorrente e fácil de escalar. A plataforma é estável, o suporte é rápido e meus clientes amam. Melhor decisão que tomei pro meu negócio digital.',
    name: 'Gabriel Rodrigues',
    title: 'Revendedor White Label',
    avatar: '/imgs/logotipo-watidy-dark.avif',
  },
]
</script>

<template>
  <section id="depoimentos" class="py-20 px-4 pt-[5rem] lg:pt-[9rem] md:py-28 bg-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          Veja empresários que usam
          <span class="text-[var(--color-primary)]">
            watidy
          </span>
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Depoimentos reais de empresas transformadas com nossa solução
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(item, i) in testimonials"
          :key="i"
          class="bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 ease-in-out"
        >
          <div class="mb-6">
            <svg
              v-for="j in 5"
              :key="j"
              class="inline-block w-5 h-5 text-[var(--color-primary)]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          </div>
          <p class="text-gray-700 mb-6 italic">"{{ item.quote }}"</p>
          <div class="flex items-center">
            <img
              :src="item.avatar"
              :alt="item.name"
              width="48"
              height="48"
              class="rounded-full mr-4"
              loading="lazy"
            />
            <div>
              <p class="font-bold text-gray-900">{{ item.name }}</p>
              <p class="text-sm text-gray-400">{{ item.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
