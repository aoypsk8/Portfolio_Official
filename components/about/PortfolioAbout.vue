<template>
  <section id="about" class="relative section-pad overflow-hidden ">
    <!-- Decorative gradient overlay -->
    <div class="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-teal-50/30 to-transparent pointer-events-none z-[1]"></div>
    
    <!-- Decorative background blurs -->
    <div class="absolute top-1/4 right-0 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl pointer-events-none z-[1]"></div>
    <div class="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none z-[1]"></div>
  
    <div ref="sectionRef" class="container-narrow max-w-5xl relative z-[2]">
      <div class="text-center mb-12 sm:mb-16">
        <p class="section-label mb-3 text-teal-600">
          Who I am
        </p>
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight bg-gradient-to-r from-slate-800 via-slate-700 to-teal-700 bg-clip-text text-transparent">
          About
        </h2>
        <div class="w-24 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent mx-auto mt-4"></div>
      </div>
      
      <div class="about-card group relative rounded-3xl p-10 sm:p-12 md:p-16 border-2 border-slate-200/80 bg-white/95 backdrop-blur-sm shadow-2xl transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(20,184,166,0.3)] hover:border-teal-300/50 hover:-translate-y-2 overflow-hidden">
        <!-- Shine effect -->
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        
        <!-- Decorative corner accents -->
        <div class="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-teal-100/0 to-transparent group-hover:from-teal-200/40 transition-all duration-500 rounded-bl-full"></div>
        <div class="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-100/0 to-transparent group-hover:from-blue-200/30 transition-all duration-500 rounded-tr-full"></div>
        
        <!-- About Text Section -->
        <div class="relative mb-10 sm:mb-12">
          <div class="flex items-start gap-4 mb-6">
            <div class="w-1 h-16 bg-gradient-to-b from-teal-400 via-teal-500 to-teal-400 rounded-full"></div>
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-3 h-3 rounded-full bg-teal-500 animate-pulse"></div>
                <span class="text-xs font-semibold text-teal-600 uppercase tracking-wider">Professional Summary</span>
              </div>
              <p class="text-slate-600 text-base sm:text-lg md:text-xl leading-relaxed">
                {{ aboutText }}
              </p>
            </div>
          </div>
        </div>
        
        <!-- Skills Section -->
        <div v-if="skills?.length" class="relative mt-12 sm:mt-14 pt-12 sm:pt-14 border-t-2 border-gradient-to-r from-transparent via-slate-200 to-transparent">
          <!-- Skills Header -->
          <div class="mb-8 sm:mb-10">
            <h3 class="text-base sm:text-lg font-bold text-teal-700 uppercase tracking-wider mb-4 flex items-center justify-center gap-4">
              <span class="h-0.5 w-12 sm:w-16 bg-gradient-to-r from-transparent to-teal-400"></span>
              <span class="flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Core Skills
              </span>
              <span class="h-0.5 w-12 sm:w-16 bg-gradient-to-l from-transparent to-teal-400"></span>
            </h3>
          </div>
          
          <!-- Skills Grid -->
          <ul class="flex flex-wrap gap-3 sm:gap-4 justify-center">
            <li
              v-for="(skill, index) in skills"
              :key="skill"
              class="group/skill relative px-6 py-3 rounded-full text-sm sm:text-base font-bold text-teal-800 bg-gradient-to-r from-teal-50 via-teal-100/90 to-teal-50 border-2 border-teal-200/70 hover:from-teal-100 hover:via-teal-200 hover:to-teal-100 hover:border-teal-400 hover:text-teal-900 hover:scale-110 hover:shadow-xl hover:shadow-teal-500/40 transition-all duration-300 cursor-default overflow-hidden"
              :style="{ animationDelay: `${index * 50}ms` }"
            >
              <!-- Skill shine effect -->
              <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover/skill:translate-x-[100%] transition-transform duration-700"></span>
              <span class="relative z-10 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-teal-500 group-hover/skill:scale-150 transition-transform duration-300"></span>
                {{ skill }}
              </span>
            </li>
          </ul>
          
          <!-- Decorative bottom line -->
          <div class="mt-10 pt-8 border-t border-slate-200/50 flex items-center justify-center gap-2">
            <div class="h-1 w-16 bg-gradient-to-r from-transparent via-teal-400 to-transparent rounded-full"></div>
            <div class="w-2 h-2 rounded-full bg-teal-400"></div>
            <div class="h-1 w-16 bg-gradient-to-l from-transparent via-teal-400 to-transparent rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    aboutText?: string
    skills?: string[]
  }>(),
  {
    aboutText: '',
    skills: () => []
  }
)

const sectionRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef, { end: 'top 50%' })
</script>
