<template>
  <div class="w-full flex justify-center px-4 col-span-4 bg-black">
    <section class="w-full py-8 lg:py-12">
      <div class="w-full max-w-5xl mx-auto px-6 lg:px-8">
        <div class="relative overflow-hidden rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 shadow-xl">
          <div class="absolute inset-0 bg-gradient-to-r from-[#1ff81d]/10 to-lime-400/10"></div>
          <div class="relative flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 p-8 lg:p-12">
            <div class="flex items-center gap-4">
              <div class="relative">
                <img
                  alt="Logo waTidy"
                  loading="lazy"
                  width="164"
                  height="164"
                  decoding="async"
                  class="block drop-shadow-lg"
                  src="/imgs/logotipo-watidy-dark.avif"
                />
              </div>
            </div>
            <div class="flex-1 text-center lg:text-left">
              <h3 class="text-2xl lg:text-3xl font-bold text-white mb-2">Revenda waTidy</h3>
              <p class="text-lg text-gray-300 font-medium">com sua Marca</p>
              <p class="text-sm text-gray-400 mt-3 max-w-md mx-auto lg:mx-0">
                Expanda seu negócio com nossa solução de WhatsApp Business. Personalize com sua marca e ofereça aos seus clientes.
              </p>
            </div>
            <div>
              <a
                href="https://api.whatsapp.com/send/?phone=%2B553129424122&text=Olá%2C+desejo+informações+sobre+a+Revenda+White+Label+WaTidy&type=phone_number&app_absent=0"
                target="_blank"
                class="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-black bg-[#1ff81d] rounded-xl shadow-lg"
              >
                <span class="relative z-10 flex items-center gap-2 font-bold">SAIBA MAIS</span>
              </a>
            </div>
          </div>
          <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#1ff81d]/10 to-transparent rounded-full blur-3xl"></div>
          <div class="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-lime-400/10 to-transparent rounded-full blur-2xl"></div>
        </div>
      </div>
    </section>
  </div>
</template>
