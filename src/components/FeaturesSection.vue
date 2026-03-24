<script setup>
const features = [
  {
    svg: `<svg fetchpriority='low' loading='lazy' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'></path></svg>`,
    title: 'RESPOSTAS RÁPIDAS',
    description: 'Padrão na comunicação e agilidade no atendimento com respostas já gravadas',
  },
  {
    svg: `<svg fetchpriority='low' loading='lazy' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect width='18' height='18' x='3' y='3' rx='2'/><path d='M8 7v7'/><path d='M12 7v4'/><path d='M16 7v9'/></svg>`,
    title: 'CRM KANBAN',
    description: 'Organizar seus leads de forma visual nunca foi tão simples',
  },
  {
    svg: `<svg fetchpriority='low' loading='lazy' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M8 2v4'/><path d='M16 2v4'/><rect width='18' height='18' x='3' y='4' rx='2'/><path d='M3 10h18'/><path d='M8 14h.01'/><path d='M12 14h.01'/><path d='M16 14h.01'/><path d='M8 18h.01'/><path d='M12 18h.01'/><path d='M16 18h.01'/></svg>`,
    title: 'AGENDAMENTO DE MENSAGENS',
    description: 'Lembre seu cliente de um compromisso em um dia e horário',
  },
  {
    svg: `<svg fetchpriority='low' loading='lazy' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='4.5' r='2.5'/><path d='m10.2 6.3-3.9 3.9'/><circle cx='4.5' cy='12' r='2.5'/><path d='M7 12h10'/><circle cx='19.5' cy='12' r='2.5'/><path d='m13.8 17.7 3.9-3.9'/><circle cx='12' cy='19.5' r='2.5'/></svg>`,
    title: 'FOLLOW UP',
    description: 'Movimente seu Lead no seu funil de forma automática',
  },
  {
    svg: `<svg fetchpriority='low' loading='lazy' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2'/><path d='m6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06'/><path d='m12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8'/></svg>`,
    title: 'INTEGRAÇÃO',
    description:
      'Integre com qualquer sistema de forma simples e não perca mais informação. API e webhook',
  },
  {
    svg: `<svg fetchpriority='low' loading='lazy' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21 12v3a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h7'/><path d='M16 3h5v5'/><path d='m16 8 5-5'/></svg>`,
    title: 'CHATBOT DE FLUXO',
    description: 'Crie um chat bot com fluxos de arrastar para automatizar seu atendimento',
  },
  {
    svg: `<svg fetchpriority='low' loading='lazy' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 8V4H8'/><rect width='16' height='12' x='4' y='8' rx='2'/><path d='M2 14h2'/><path d='M20 14h2'/><path d='M15 13v2'/><path d='M9 13v2'/></svg>`,
    title: 'AGENTE DE IA CHAT GPT',
    description: 'Atenda com o chat GPT de forma automática 24 horas por dia e venda mais',
  },
  {
    svg: `<svg fetchpriority='low' loading='lazy' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/><circle cx='12' cy='7' r='4'/></svg>`,
    title: 'PERFIL DO CONTATO',
    description: 'Salve informações valiosas direto no seu contato',
  },
  {
    svg: `<svg fetchpriority='low' loading='lazy' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/><path d='M12 7v6'/><path d='M9 10h6'/></svg>`,
    title: 'INICIAR NOVA CONVERSA',
    description:
      'Inicie novos contatos direto em seu WhatsApp web sem salvar o numero pelo celular',
  },
  {
    svg: `<svg fetchpriority='low' loading='lazy' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M2 10v3'/><path d='M6 6v11'/><path d='M10 3v18'/><path d='M14 8v7'/><path d='M18 5v13'/><path d='M22 10v3'/></svg>`,
    title: 'TRANSCRIÇÃO DE AUDIOS',
    description:
      'Audios recebidos pelo whatsapp viram textos com um clique para agilizar o atendimento',
  },
  {
    svg: `<svg fetchpriority='low' loading='lazy' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 256 256' fill='none'><g fill='none' stroke='currentColor' stroke-width='12'><path d='M128 16c61.86 0 112 46.73 112 104 0 57.28-50.14 104-112 104-14.43 0-28.26-2.56-41.07-7.25L48 240l13.26-39.78C46.14 179.32 32 153.35 32 120 32 62.73 66.14 16 128 16z'/><rect x='96' y='88' width='64' height='80' rx='6'/><line x1='86' y1='88' x2='170' y2='88'/><line x1='112' y1='104' x2='112' y2='152'/><line x1='128' y1='104' x2='128' y2='152'/><line x1='144' y1='104' x2='144' y2='152'/></g></svg>`,
    title: 'VISUALIZAR MENSAGENS APAGADAS',
    description: 'Restaure mensagens apagadas pelo seu cliente',
  },
  {
    svg: `<svg fetchpriority='low' loading='lazy' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m5 8 6 6'/><path d='m4 14 6-6 2-3'/><path d='M2 5h12'/><path d='M7 2h1'/><path d='m22 22-5-10-5 10'/><path d='M14 18h6'/></svg>`,
    title: 'TRADUTOR DE IDIOMAS',
    description: 'Traduza mensagens com um clique e escreva no idioma que deseja',
  },
  {
    svg: `<svg fetchpriority='low' loading='lazy' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m12 8 6-3-6-3v10'/><path d='m8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12'/><path d='m6.49 12.85 11.02 6.3'/><path d='M17.51 12.85 6.5 19.15'/></svg>`,
    title: 'RASTREIO DE ENCOMENDAS',
    description: 'Salve e envie automaticamente o link de rastreio para seus clientes',
  },
  {
    svg: `<svg fetchpriority='low' loading='lazy' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5'/><path d='M16 2v4'/><path d='M8 2v4'/><path d='M3 10h5'/><path d='M17.5 17.5 16 16.3V14'/><circle cx='16' cy='16' r='6'/></svg>`,
    title: 'AGENDA DO CHROME',
    description: 'Agende reuniões direto no google',
  },
  {
    svg: `<svg fetchpriority='low' loading='lazy' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z'/><path d='M14 2v4a2 2 0 0 0 2 2h4'/><path d='M12 12v6'/><path d='m15 15-3-3-3 3'/></svg>`,
    title: 'EXPORTAÇÃO DE CONTATOS',
    description: 'Exporte contatos de uma fase do seu funil de vendas',
  },
  {
    svg: `<svg fetchpriority='low' loading='lazy' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/></svg>`,
    title: 'ATENDIMENTO EM EQUIPE',
    description: 'Multiplos atendentes simultâneamente atendendo de forma organizada',
  },
  {
    svg: `<svg fetchpriority='low' loading='lazy' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'/><path d='M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20'/><path d='M2 12h20'/></svg>`,
    title: 'ASSISTENTE IA',
    description: 'Aprimore ou traduze mensagens com agente de IA gratuito',
  },
]
</script>

<template>
  <section id="recursos" class="pt-[5rem] lg:pt-[9rem] bg-black">
    <div class="container mx-auto px-4 py-10">
      <div class="text-center pb-16">
        <h2 class="text-3xl md:text-4xl font-bold mb-4 text-white">
          Na desorganização do seu WhatsApp, o preço é alto,
          <br />
          oportunidades escapam e vendas se perdem.
        </h2>
        <p class="text-lg max-w-2xl mx-auto text-gray-100">
          waTidy tem funcionalidades essenciais para gerenciar
          <br />
          e potencializar suas vendas pelo Whatsapp
        </p>
      </div>
    </div>
    <div class="container mx-auto">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mx-10">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="group relative p-6 rounded-2xl border border-gray-700 bg-zinc-900 shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-900/10 blur-2xl opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none z-0"></div>
          <div class="relative z-10">
            <div class="mb-4 w-14 h-14 flex items-center justify-center rounded-xl bg-gray-800 text-green-400 border border-gray-700 transition-transform group-hover:scale-105" v-html="feature.svg"></div>
            <h3 class="text-lg font-semibold text-white mb-2 group-hover:text-[#1ff81d] transition-colors">
              {{ feature.title }}
            </h3>
            <p class="text-gray-200 leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="container mx-auto px-4 py-5 mt-10">
      <a
        href="#precos"
        class="block text-2xl mx-auto w-full py-4 max-w-[400px] text-center font-bold rounded-xl bg-[#1ff81d] text-black hover:scale-105 transition-transform"
      >
        Assinar agora
      </a>
    </div>
  </section>
</template>
