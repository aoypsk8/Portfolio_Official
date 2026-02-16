<template>
  <div class="min-h-screen bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
    <!-- Decorative background elements -->
    <div class="fixed inset-0 pointer-events-none z-0">
      <div class="absolute top-1/4 right-0 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
    </div>
    
    <section ref="contactSectionRef" class="section-pad container-narrow relative z-10">
      <div class="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
        <!-- Left: Enhanced decorative circles -->
        <div class="flex-shrink-0 order-2 lg:order-1">
          <div class="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 mx-auto lg:mx-0">
            <!-- Animated gradient circles -->
            <div
              class="absolute inset-0 rounded-full bg-gradient-to-br from-teal-200/80 via-teal-300/60 to-blue-200/70 shadow-2xl transition-all duration-700 hover:scale-110 hover:rotate-12"
              style="transform: rotate(-8deg)"
            />
            <div
              class="absolute inset-0 rounded-full bg-gradient-to-br from-blue-300/70 via-teal-200/60 to-teal-400/50 shadow-xl translate-x-4 translate-y-4 transition-all duration-700 hover:scale-110 hover:-rotate-6"
              style="transform: rotate(6deg)"
            />
            <!-- Decorative accent dot -->
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-teal-500 shadow-lg animate-pulse"></div>
          </div>
        </div>

        <!-- Right: Enhanced content -->
        <div class="flex-1 min-w-0 order-1 lg:order-2">
          <!-- Enhanced Header -->
          <div class="mb-8">
            <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-3 tracking-tight bg-gradient-to-r from-slate-800 via-slate-700 to-teal-700 bg-clip-text text-transparent">
              {{ contact.headingLine1 }}
            </h1>
            <h2 class="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-700 mb-6">
              {{ contact.headingLine2 }}
            </h2>
            <div class="w-24 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent mb-8"></div>
          </div>

          <!-- Enhanced Paragraphs -->
          <div class="space-y-5 mb-8">
            <p class="text-slate-600 text-base sm:text-lg leading-relaxed">
              {{ contact.paragraph1 }}
            </p>
            <p class="text-slate-600 text-base sm:text-lg leading-relaxed">
              {{ contact.paragraph2BeforeEmail }}
              <!-- Enhanced Email Link -->
              <a
                :href="`mailto:${contact.email}`"
                class="group/email inline-flex items-center gap-2 px-4 py-2 mx-1 rounded-xl bg-gradient-to-r from-teal-50 to-teal-100/80 border-2 border-teal-200/50 text-teal-700 font-semibold hover:from-teal-500 hover:to-teal-600 hover:text-white hover:border-teal-500 hover:shadow-lg hover:shadow-teal-500/50 transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
              >
                <!-- Email shine effect -->
                <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover/email:translate-x-[100%] transition-transform duration-700"></span>
                <svg class="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span class="relative z-10">{{ contact.email }}</span>
              </a>
              {{ contact.paragraph2AfterEmail }}
            </p>
            <p class="text-slate-600 text-base sm:text-lg leading-relaxed">
              {{ contact.paragraph3 }}
            </p>
          </div>

          <!-- Enhanced Social Links -->
          <div class="mb-6">
            <p class="text-sm font-semibold text-teal-600 mb-4">Connect with me:</p>
            <div class="flex flex-wrap gap-4">
              <a
                v-for="s in contact.socialLinks"
                :key="s.label"
                :href="s.href"
                target="_blank"
                rel="noopener"
                :class="[
                  'group relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-xl overflow-hidden',
                  getSocialIconClass(s.label)
                ]"
                :aria-label="s.label"
              >
                <!-- Glow effect -->
                <div 
                  :class="[
                    'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl',
                    getSocialGlowClass(s.label)
                  ]"
                ></div>
                <!-- Icon -->
                <div class="relative z-10 w-6 h-6 sm:w-7 sm:h-7">
                  <component :is="getSocialIcon(s.label)" />
                </div>
                <!-- Shine effect -->
                <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
              </a>
            </div>
          </div>
          
          <!-- Decorative bottom line -->
          <div class="mt-10 pt-8 border-t border-slate-200/50 flex items-center gap-2">
            <div class="h-1 flex-1 bg-gradient-to-r from-teal-400 to-transparent rounded-full"></div>
            <div class="w-2 h-2 rounded-full bg-teal-400"></div>
            <div class="h-1 w-8 bg-gradient-to-l from-teal-300 to-transparent rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { CONTACT_PAGE } from '~/constants/contactPage'

const contact = CONTACT_PAGE
const contactSectionRef = ref<HTMLElement | null>(null)
useScrollReveal(contactSectionRef, { start: 'top 88%' })

// Official Social Media Icons
function getSocialIcon(label: string) {
  const icons: Record<string, any> = {
    'Facebook': () => h('svg', {
      viewBox: '0 0 24 24',
      fill: 'currentColor',
      xmlns: 'http://www.w3.org/2000/svg'
    }, [
      h('path', {
        d: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'
      })
    ]),
    'Instagram': () => h('svg', {
      viewBox: '0 0 24 24',
      fill: 'currentColor',
      xmlns: 'http://www.w3.org/2000/svg'
    }, [
      h('path', {
        d: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'
      })
    ]),
    'LinkedIn': () => h('svg', {
      viewBox: '0 0 24 24',
      fill: 'currentColor',
      xmlns: 'http://www.w3.org/2000/svg'
    }, [
      h('path', {
        d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
      })
    ]),
    'GitHub': () => h('svg', {
      viewBox: '0 0 24 24',
      fill: 'currentColor',
      xmlns: 'http://www.w3.org/2000/svg'
    }, [
      h('path', {
        d: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'
      })
    ])
  }
  const fallbackIcon = contact.socialLinks?.find((link) => link.label === label)?.icon || ''
  return icons[label] || (() => h('span', fallbackIcon))
}

function getSocialIconClass(label: string) {
  const classes: Record<string, string> = {
    'Facebook': 'bg-slate-100 text-slate-600 hover:bg-[#1877F2] hover:text-white',
    'Instagram': 'bg-slate-100 text-slate-600 hover:bg-gradient-to-br hover:from-[#F56040] hover:via-[#E1306C] hover:to-[#C13584] hover:text-white',
    'LinkedIn': 'bg-slate-100 text-slate-600 hover:bg-[#0077B5] hover:text-white',
    'GitHub': 'bg-slate-100 text-slate-600 hover:bg-slate-800 hover:text-white'
  }
  return classes[label] || 'bg-slate-100 text-slate-600 hover:bg-teal-500 hover:text-white'
}

function getSocialGlowClass(label: string) {
  const classes: Record<string, string> = {
    'Facebook': 'bg-[#1877F2]',
    'Instagram': 'bg-[#E1306C]',
    'LinkedIn': 'bg-[#0077B5]',
    'GitHub': 'bg-slate-800'
  }
  return classes[label] || 'bg-teal-500'
}
</script>
