<script setup>
import { onMounted } from 'vue'
import AppFooter from './components/AppFooter.vue'
import AppHeader from './components/AppHeader.vue'
import AppModal from './components/AppModal.vue'
import CtaSection from './components/CtaSection.vue'
import FaqSection from './components/FaqSection.vue'
import FeaturesSection from './components/FeaturesSection.vue'
import HeroSection from './components/HeroSection.vue'
import IntegrationsSection from './components/IntegrationsSection.vue'
import PricingSection from './components/PricingSection.vue'
import ResaleSection from './components/ResaleSection.vue'
import TestimonialsSection from './components/TestimonialsSection.vue'

onMounted(() => {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth <= 768

  if (!isMobile) {
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/particlesjs/2.2.2/particles.min.js'
    script.onload = () => {
      if (typeof Particles !== 'undefined') {
        Particles.init({
          selector: '.background',
          color: '#097509',
          maxParticles: 200,
          connectParticles: true,
        })
      }
    }
    document.head.appendChild(script)
  }
})
</script>

<template>
  <AppModal />
  <div class="min-h-screen bg-black flex flex-col font-sans relative scroll-smooth z-0">
    <canvas class="background absolute top-0 left-0 z-10 opacity-75 hidden md:block max-w-screen max-h-screen"></canvas>
    <AppHeader />
    <main class="z-20">
      <HeroSection />
      <FeaturesSection />
      <CtaSection />
      <TestimonialsSection />
      <IntegrationsSection />
      <PricingSection />
      <ResaleSection />
      <FaqSection />
    </main>
    <AppFooter />
  </div>
</template>
