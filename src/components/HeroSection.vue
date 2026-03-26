<script setup>
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue'
import { hexToRgb } from '../utils/color.js'

const videoWrapper = ref(null)
const isFloating = ref(false)
const isClosed = ref(false)
const canvasRef = ref(null)
const mainVideoRef = ref(null)
const floatVideoRef = ref(null)

let observer = null
let animFrame = null

watch(isFloating, async (floating) => {
  if (floating) {
    await nextTick()
    if (mainVideoRef.value && floatVideoRef.value) {
      floatVideoRef.value.currentTime = mainVideoRef.value.currentTime
      floatVideoRef.value.muted = mainVideoRef.value.muted
      mainVideoRef.value.muted = true
      if (!mainVideoRef.value.paused) floatVideoRef.value.play().catch(() => {})
    }
  } else if (mainVideoRef.value && floatVideoRef.value) {
    mainVideoRef.value.currentTime = floatVideoRef.value.currentTime
    mainVideoRef.value.muted = floatVideoRef.value.muted
  }
})

onMounted(() => {
  // IntersectionObserver para o vídeo flutuante
  observer = new IntersectionObserver(
    ([entry]) => {
      if (!isClosed.value) isFloating.value = !entry.isIntersecting
    },
    { threshold: 0.1 },
  )
  if (videoWrapper.value) observer.observe(videoWrapper.value)

  // Particles apenas em desktop
  if (window.innerWidth >= 1024) initParticles()
})

onUnmounted(() => {
  if (observer) observer.disconnect()
  if (animFrame) cancelAnimationFrame(animFrame)
})

function closeFloat() {
  isFloating.value = false
  isClosed.value = true
}

function initParticles() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const hex = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim()
  const rgb = hexToRgb(hex)

  const resize = () => {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  }
  resize()
  window.addEventListener('resize', resize)

  const COUNT = 55
  const MAX_DIST = 140

  const particles = Array.from({ length: COUNT }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    r: Math.random() * 1.8 + 0.8,
  }))

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Linhas de conexão
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MAX_DIST) {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(${rgb},${(1 - dist / MAX_DIST) * 0.3})`
          ctx.lineWidth = 0.6
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }

    // Pontos
    for (const p of particles) {
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${rgb},0.5)`
      ctx.fill()

      p.x += p.vx
      p.y += p.vy
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1
    }

    animFrame = requestAnimationFrame(draw)
  }

  draw()
}
</script>

<template>
  <section class="pt-20 bg-white relative">
    <!-- Canvas de partículas (desktop only) -->
    <canvas
      ref="canvasRef"
      class="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
      aria-hidden="true"
    ></canvas>

    <div class="container mx-auto px-4 2xl:pb-20 relative z-10">
      <div
        class="flex flex-col gap-5 pt-20 lg:grid lg:grid-cols-12 lg:gap-8 lg:items-center lg:pt-24 xl:px-10 2xl:px-3 2xl:pt-28">
        <!-- Título + descrição (desktop) + botão (desktop) -->
        <div class="order-1 lg:col-span-7 flex flex-col items-center">
          <h1
            class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-4 lg:mb-6 leading-tight text-center text-gray-900">
            <span class="text-[var(--color-primary)]">waTidy</span> — CRM para WhatsApp
            que potencializa suas vendas
          </h1>
          <!-- Descrição: oculta no mobile -->
          <p class="hidden lg:block text-lg xl:text-xl mb-8 max-w-xl text-center text-gray-600">
            O Watidy oferece recursos pensados nas melhores práticas
            comerciais, trazendo as funcionalidades que você sempre
            precisou para dentro do seu whatsapp web.
          </p>
          <!-- Botão: oculto no mobile -->
          <a href="#precos"
            class="hidden lg:flex cursor-pointer px-20 xl:px-28 py-6 2xl:py-8 rounded-2xl text-xl 2xl:text-3xl text-black font-bold shadow-lg bg-[var(--color-primary)] justify-center items-center gap-2 hover:scale-105 transition-transform">
            Criar Conta Gratuita
          </a>
        </div>

        <!-- Vídeo -->
        <div ref="videoWrapper" class="order-2 lg:col-span-5 w-full">
          <div class="video-pulse-wrapper rounded-2xl">
            <video
              ref="mainVideoRef"
              src="/video-hero.mp4"
              class="w-full rounded-2xl shadow-xl block"
              controls
              autoplay
              muted
              playsinline
              preload="auto"
              poster="/imgs/Arte1.avif"
              width="600"
              height="338"
            ></video>
          </div>
        </div>

        <!-- Botão mobile: oculto no desktop -->
        <a href="#precos"
          class="order-3 lg:hidden cursor-pointer w-full py-5 rounded-2xl text-lg text-black font-bold shadow-lg bg-[var(--color-primary)] flex justify-center items-center hover:scale-105 transition-transform">
          Criar Conta Gratuita
        </a>
      </div>
    </div>
  </section>

  <!-- Floating video -->
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-4 scale-95"
    enter-to-class="opacity-100 translate-y-0 scale-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0 scale-100"
    leave-to-class="opacity-0 translate-y-4 scale-95"
  >
    <div
      v-if="isFloating"
      class="fixed bottom-4 right-4 z-[9999] w-72 sm:w-80"
    >
      <div class="video-pulse-wrapper rounded-xl shadow-2xl">
        <button
          @click="closeFloat"
          class="absolute -top-2 -right-2 z-10 w-6 h-6 rounded-full bg-gray-800 text-white text-xs flex items-center justify-center hover:bg-gray-600 transition-colors"
          aria-label="Fechar vídeo"
        >
          ✕
        </button>
        <video
          ref="floatVideoRef"
          src="/video-hero.mp4"
          class="w-full rounded-xl block"
          controls
          playsinline
          preload="none"
          poster="/imgs/Arte1.avif"
        ></video>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.video-pulse-wrapper {
  position: relative;
}

.video-pulse-wrapper::before,
.video-pulse-wrapper::after {
  content: '';
  position: absolute;
  inset: -3px;
  border-radius: inherit;
  background: transparent;
  border: 2.5px solid var(--color-primary);
  animation: pulse-ring 2s ease-out infinite;
  pointer-events: none;
}

.video-pulse-wrapper::after {
  animation-delay: 1s;
}

@keyframes pulse-ring {
  0% {
    opacity: 0.8;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.045);
  }
}
</style>
