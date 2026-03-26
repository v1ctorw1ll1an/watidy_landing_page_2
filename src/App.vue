<script setup>
import { defineAsyncComponent } from 'vue'
import AppFooter from './components/AppFooter.vue'
import AppHeader from './components/AppHeader.vue'
import AppModal from './components/AppModal.vue'
import HeroSection from './components/HeroSection.vue'

const FeaturesSection = defineAsyncComponent(() => import('./components/FeaturesSection.vue'))
const CtaSection = defineAsyncComponent(() => import('./components/CtaSection.vue'))
const TestimonialsSection = defineAsyncComponent(() => import('./components/TestimonialsSection.vue'))
const IntegrationsSection = defineAsyncComponent(() => import('./components/IntegrationsSection.vue'))
const PricingSection = defineAsyncComponent(() => import('./components/PricingSection.vue'))
const ResaleSection = defineAsyncComponent(() => import('./components/ResaleSection.vue'))
const FaqSection = defineAsyncComponent(() => import('./components/FaqSection.vue'))
</script>

<template>
  <AppModal />
  <div class="min-h-screen bg-white flex flex-col font-sans relative scroll-smooth z-0">
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
