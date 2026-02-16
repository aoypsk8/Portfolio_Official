<template>
  <div class="min-h-screen bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
    <!-- Decorative background elements -->
    <div class="fixed inset-0 pointer-events-none z-0">
      <div class="absolute top-1/4 right-0 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
    </div>
    
    <section class="section-pad container-narrow relative z-10">
      <!-- Enhanced Header -->
      <div class="text-center mb-12 sm:mb-16">
        <h1 ref="certificatesTitleRef" class="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight bg-gradient-to-r from-slate-800 via-slate-700 to-teal-700 bg-clip-text text-transparent">
          Certificates & Certifications
        </h1>
        <p class="text-slate-600 text-base sm:text-lg mb-6 max-w-2xl mx-auto">
          Professional certifications and achievements demonstrating expertise in various technologies and platforms.
        </p>
        <div class="w-24 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent mx-auto mt-4"></div>
      </div>

      <!-- Certificates Grid -->
      <div
        ref="certificatesGridRef"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      >
        <article
          v-for="(cert, i) in certificates"
          :key="`${cert.title}-${i}`"
          class="group relative rounded-3xl border-2 border-slate-200/80 bg-white/95 backdrop-blur-sm shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-teal-500/30 hover:border-teal-300/50 hover:-translate-y-3 flex flex-col"
        >
          <!-- Shine effect -->
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 z-10"></div>
          
          <!-- Gradient overlay -->
          <div class="absolute inset-0 bg-gradient-to-br from-teal-50/0 via-transparent to-blue-50/0 group-hover:from-teal-50/60 group-hover:to-blue-50/40 transition-all duration-500 z-10"></div>
          
          <!-- Decorative corner accent -->
          <div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-teal-100/0 to-transparent group-hover:from-teal-200/30 transition-all duration-500 rounded-bl-full z-10"></div>
          
          <!-- Category badge -->
          <div 
            :class="[
              'absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm',
              getCategoryClass(cert.category)
            ]"
          >
            {{ getCategoryLabel(cert.category) }}
          </div>
          
          <!-- Certificate Icon/Image -->
          <div class="relative p-8 pb-6 flex items-center justify-center">
            <div class="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center shadow-xl ring-4 ring-white/50 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <svg class="w-12 h-12 sm:w-14 sm:h-14 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
          </div>
          
          <!-- Content section -->
          <div class="relative z-10 px-6 pb-6 flex flex-col flex-1 min-w-0">
            <h2 class="text-xl sm:text-2xl font-bold text-slate-800 mb-2 line-clamp-2 group-hover:text-teal-700 transition-colors duration-300 leading-tight">
              {{ cert.title }}
            </h2>
            
            <div class="flex items-center gap-2 mb-4">
              <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span class="text-sm font-semibold text-slate-600">{{ cert.issuer }}</span>
            </div>
            
            <div class="space-y-2 mb-4">
              <div class="flex items-center gap-2 text-sm text-slate-600">
                <svg class="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Issued: <strong>{{ cert.issueDate }}</strong></span>
              </div>
              <div v-if="cert.expiryDate" class="flex items-center gap-2 text-sm text-slate-600">
                <svg class="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Expires: <strong>{{ cert.expiryDate }}</strong></span>
              </div>
              <div v-if="cert.credentialId" class="flex items-center gap-2 text-xs text-slate-500">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <span class="font-mono">{{ cert.credentialId }}</span>
              </div>
            </div>
            
            <p v-if="cert.description" class="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed border-l-4 border-teal-400/30 pl-4 flex-1">
              {{ cert.description }}
            </p>
            
            <!-- View Certificate Button -->
            <a
              v-if="cert.credentialUrl"
              :href="cert.credentialUrl"
              target="_blank"
              rel="noopener"
              class="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold text-sm hover:from-teal-600 hover:to-teal-700 hover:shadow-lg hover:shadow-teal-500/50 transform hover:scale-105 transition-all duration-300 relative overflow-hidden mt-auto"
            >
              <!-- Button shine effect -->
              <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></span>
              <span class="relative z-10">View Certificate</span>
              <svg class="w-4 h-4 relative z-10 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            
            <!-- Decorative bottom line -->
            <div class="mt-6 pt-6 border-t border-slate-200/50 flex items-center gap-2">
              <div class="h-1 flex-1 bg-gradient-to-r from-teal-400 to-transparent rounded-full"></div>
              <div class="w-2 h-2 rounded-full bg-teal-400 group-hover:scale-150 transition-transform duration-300"></div>
              <div class="h-1 w-8 bg-gradient-to-l from-teal-300 to-transparent rounded-full"></div>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { CERTIFICATES } from '~/constants/certificatesPage'
import type { Certificate } from '~/types/portfolio'

const certificates = CERTIFICATES
const certificatesTitleRef = ref<HTMLElement | null>(null)
const certificatesGridRef = ref<HTMLElement | null>(null)

useScrollReveal(certificatesTitleRef, { start: 'top 88%' })
useStaggerReveal(certificatesGridRef, { childSelector: 'article', stagger: 0.1, y: 32 })

function getCategoryLabel(category?: string): string {
  const labels: Record<string, string> = {
    'technical': 'Technical',
    'professional': 'Professional',
    'academic': 'Academic',
    'other': 'Other'
  }
  return labels[category || 'other'] || 'Certificate'
}

function getCategoryClass(category?: string): string {
  const classes: Record<string, string> = {
    'technical': 'bg-gradient-to-r from-teal-500/90 to-teal-600/90 text-white',
    'professional': 'bg-gradient-to-r from-blue-500/90 to-blue-600/90 text-white',
    'academic': 'bg-gradient-to-r from-purple-500/90 to-purple-600/90 text-white',
    'other': 'bg-gradient-to-r from-slate-500/90 to-slate-600/90 text-white'
  }
  return classes[category || 'other'] || 'bg-gradient-to-r from-slate-500/90 to-slate-600/90 text-white'
}
</script>
