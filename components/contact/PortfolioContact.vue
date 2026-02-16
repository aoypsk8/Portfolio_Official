<template>
  <section id="contact" class="section-pad bg-gradient-to-b from-white via-teal-50/30 to-white relative overflow-hidden">
    <!-- Decorative elements -->
    <div class="absolute top-0 left-1/4 w-64 h-64 bg-teal-200/20 rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl"></div>
    
    <div ref="sectionRef" class="container-narrow max-w-2xl mx-auto text-center relative z-10">
      <div class="mb-10 sm:mb-12">
        <p class="section-label mb-3 text-teal-600">
          Get in touch
        </p>
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight bg-gradient-to-r from-slate-800 via-slate-700 to-teal-700 bg-clip-text text-transparent">
          Contact
        </h2>
        <div class="w-24 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent mx-auto mt-4"></div>
      </div>
      <p class="text-slate-600 text-base sm:text-lg mb-10 sm:mb-12 leading-relaxed max-w-xl mx-auto">
        {{ message }}
      </p>
      <div class="flex flex-wrap justify-center gap-4 sm:gap-5">
        <a
          v-for="link in links"
          :key="link.label"
          :href="link.href"
          target="_blank"
          rel="noopener"
          class="group relative inline-flex items-center gap-3 px-6 sm:px-8 py-4 sm:py-5 rounded-2xl border-2 border-slate-200/80 bg-white/95 backdrop-blur-sm shadow-lg text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 hover:border-teal-500 hover:shadow-xl hover:shadow-teal-500/50 text-base font-semibold min-h-[52px] transform hover:scale-105 transition-all duration-300 overflow-hidden"
        >
          <!-- Shine effect -->
          <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
          <span class="relative z-10 text-xl">{{ link.icon }}</span>
          <span class="relative z-10">{{ link.label }}</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ContactLink } from '~/types/portfolio'

withDefaults(
  defineProps<{
    message?: string
    links?: ContactLink[]
  }>(),
  {
    message: '',
    links: () => []
  }
)

const sectionRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef)
</script>
