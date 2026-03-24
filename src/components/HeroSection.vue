<script setup>
import { onMounted } from 'vue'
import { useModal } from '../composables/useModal.js'
import { useVsl } from '../composables/useVsl.js'

const { openModal } = useModal()

useVsl()

onMounted(() => {
  const container = document.getElementById('vslcontainer')
  if (container) {
    const vsl = document.createElement('div')
    vsl.setAttribute(
      'style',
      'position:relative;width:100%;overflow:hidden;padding-top:56.25%;transition:0.25s;border-radius:20px;',
    )
    vsl.setAttribute('data-vslplay', '4a0f276f-39b3-494f-ba91-943550e79b7b')

    const iframe = document.createElement('iframe')
    iframe.setAttribute('fetchpriority', 'low')
    iframe.setAttribute('title', 'video')
    iframe.setAttribute(
      'style',
      'position:absolute;top:0;left:0;bottom:0;right:0;width:100%;height:100%',
    )
    iframe.setAttribute('src', 'https://iframe.vslplay.com/4a0f276f-39b3-494f-ba91-943550e79b7b')
    iframe.setAttribute('scrolling', 'no')
    iframe.setAttribute('frameborder', '0')
    iframe.setAttribute('allowfullscreen', '')
    iframe.setAttribute(
      'allow',
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
    )

    vsl.appendChild(iframe)
    container.appendChild(vsl)
  }

  window.addEventListener('message', e => {
    if (
      e.origin === 'https://iframe.vslplay.com' &&
      e.data.from === 'vslplay-player' &&
      e.data.type === 'height'
    ) {
      const content = document.querySelector(
        '[data-vslplay="4a0f276f-39b3-494f-ba91-943550e79b7b"]',
      )
      if (content) {
        if (e.data.showing) {
          content.style.paddingTop = `calc(56.25% + ${e.data.value}px)`
        } else {
          content.style.paddingTop = '56.25%'
        }
      }
    }
  })
})
</script>

<template>
    <section class="pt-20">
        <div class="container mx-auto px-4 z-9 2xl:pb-20">
            <!--
        Mobile:  flex-col  → order: título(1) | vídeo(2) | botão(3)
        Desktop: grid 12col → texto+botão col-span-7 | vídeo col-span-5
      -->
            <div
                class="flex flex-col gap-5 pt-10 lg:grid lg:grid-cols-12 lg:gap-8 lg:items-center lg:pt-24 xl:px-10 2xl:px-3 2xl:pt-28"
            >
                <!-- Título + descrição (desktop) + botão (desktop) -->
                <div class="order-1 lg:col-span-7 flex flex-col items-center">
                    <h1
                        class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-4 lg:mb-6 leading-tight text-center text-white"
                    >
                        <span class="text-[#1ff81d]">watidy</span> -
                        Potencialize suas vendas pelo WhatsApp
                    </h1>
                    <!-- Descrição: oculta no mobile -->
                    <p
                        class="hidden lg:block text-lg xl:text-xl mb-8 max-w-xl text-center text-white"
                    >
                        O Watidy oferece recursos pensados nas melhores práticas
                        comerciais, trazendo as funcionalidades que você sempre
                        precisou para dentro do seu whatsapp web.
                    </p>
                    <!-- Botão: oculto no mobile -->
                    <a
                        href="#precos"
                        class="hidden lg:flex cursor-pointer px-20 xl:px-28 py-6 2xl:py-8 rounded-2xl text-xl 2xl:text-3xl text-black font-bold shadow-lg bg-[#1ff81d] justify-center items-center gap-2 hover:scale-105 transition-transform"
                    >
                        Testar
                    </a>
                </div>

                <!-- Vídeo -->
                <div id="vslintersection" class="order-2 lg:col-span-5 w-full">
                    <div
                        id="vslcontainer"
                        style="
                            width: 100%;
                            max-width: 60rem;
                            margin: auto;
                            z-index: 10000;
                        "
                    ></div>
                </div>

                <!-- Botão mobile: oculto no desktop -->
                <a
                    href="#precos"
                    class="order-3 lg:hidden cursor-pointer w-full py-5 rounded-2xl text-lg text-black font-bold shadow-lg bg-[#1ff81d] flex justify-center items-center hover:scale-105 transition-transform"
                >
                    Testar
                </a>
            </div>
        </div>
    </section>
</template>

<style>
.vslplay-show {
    display: none !important;
}
</style>
