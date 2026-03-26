<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useModal } from '../composables/useModal.js'

const menuOpen = ref(false)
const { openModal } = useModal()

function handleClickOutside(e) {
  if (menuOpen.value && !e.target.closest('#mobile-menu-wrapper')) {
    menuOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))

const navLinks = [
  { href: '#recursos', label: 'Recursos' },
  { href: '#depoimentos', label: 'Depoimentos' },
  { href: '#precos', label: 'Preços' },
  { href: '#perguntas-frequentes', label: 'Perguntas frequentes' },
]

const navClass =
  "font-bold relative text-gray-800 transition-colors after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-[var(--color-primary)] after:bottom-[-4px] after:left-0 after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left"
</script>

<template>
  <header id="header"
    class="fixed top-0 left-0 right-0 z-[200] transition-all duration-300 bg-white py-5 shadow-sm border-b border-gray-100">
    <div class="container mx-auto px-4 flex items-center justify-between">
      <a href="#" class="flex items-center">
        <div class="w-48 h-16 relative flex flex-col items-center">
          <div class="w-48 h-16 relative">
            <img src="/Logo-preta.png" alt="waTidy Logo" class="w-full h-full object-contain" width="192" height="64"
              loading="eager" />
          </div>
        </div>
      </a>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center space-x-8">
        <a v-for="link in navLinks" :key="link.href" :href="link.href" :class="navClass">
          {{ link.label }}
        </a>
      </nav>

      <!-- Mobile Menu -->
      <div id="mobile-menu-wrapper" class="md:hidden">
        <button aria-label="menu" @click.stop="menuOpen = !menuOpen">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="#374151">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <Transition enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-150 ease-in" leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2">
          <div v-if="menuOpen" class="shadow-lg absolute top-full left-0 right-0 bg-white border-b border-gray-100">
            <div class="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <a v-for="link in navLinks" :key="link.href" :href="link.href"
                class="font-bold hover:text-[var(--color-primary)] transition-colors py-2 text-gray-800"
                @click="menuOpen = false">
                {{ link.label }}
              </a>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </header>
</template>
