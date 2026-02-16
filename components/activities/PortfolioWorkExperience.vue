<template>
  <section class="section-pad bg-gradient-to-b from-slate-50/50 via-white to-white">
    <div class="container-narrow max-w-3xl mx-auto">
      <div class="text-center mb-12 sm:mb-16">
        <p class="section-label mb-3 text-teal-600">
          Career
        </p>
        <h2
          ref="titleRef"
          class="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 text-center mb-4 tracking-tight bg-gradient-to-r from-slate-800 via-slate-700 to-teal-700 bg-clip-text text-transparent"
        >
          Work experience
        </h2>
        <div class="w-24 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent mx-auto mt-4"></div>
      </div>

      <!-- Timeline Container -->
      <div class="relative">
        <!-- Vertical timeline line -->
        <div class="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-300 via-teal-400 to-teal-300 hidden sm:block rounded-full"></div>
        
        <div
          ref="cardRef"
          class="relative space-y-8 sm:space-y-10"
        >
          <div
            v-for="(job, i) in experiences"
            :key="job.company + job.role"
            :ref="(el) => setItemRef(el as HTMLElement, i)"
            class="group/item relative flex flex-col sm:flex-row gap-6 sm:gap-8"
          >
            <!-- Timeline dot -->
            <div class="absolute left-6 top-6 w-4 h-4 rounded-full bg-teal-500 border-4 border-white shadow-lg z-10 hidden sm:block group-hover/item:scale-150 group-hover/item:bg-teal-600 transition-all duration-300"></div>
            
            <!-- Content Card -->
            <div class="flex-1 ml-0 sm:ml-20">
              <div class="group/card relative rounded-2xl border-2 border-slate-200/80 bg-white/95 backdrop-blur-sm shadow-xl p-6 sm:p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-teal-500/20 hover:border-teal-300/50 hover:-translate-y-2 overflow-hidden">
                <!-- Gradient overlay on hover -->
                <div class="absolute inset-0 bg-gradient-to-br from-teal-50/0 via-transparent to-blue-50/0 group-hover/card:from-teal-50/50 group-hover/card:to-blue-50/30 transition-all duration-500"></div>
                
                <!-- Shine effect -->
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/card:translate-x-[100%] transition-transform duration-1000"></div>
                
                <div class="relative z-10">
                  <!-- Header with logo and company -->
                  <div class="flex items-start gap-4 mb-4">
                    <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-teal-100 via-teal-200 to-teal-300 flex items-center justify-center text-3xl sm:text-4xl shrink-0 shadow-lg ring-4 ring-teal-100/50 group-hover/card:scale-110 group-hover/card:rotate-3 transition-all duration-300">
                      {{ job.logo ?? '💼' }}
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 class="font-bold text-slate-800 text-lg sm:text-xl mb-1 group-hover/card:text-teal-700 transition-colors">
                            {{ job.role }}
                          </h3>
                          <p class="text-slate-600 text-base sm:text-lg font-semibold">
                            {{ job.company }}
                          </p>
                        </div>
                        <!-- Period Badge -->
                        <div class="px-3 py-1.5 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white text-xs sm:text-sm font-semibold shadow-lg shrink-0 flex items-center gap-1.5">
                          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {{ job.period }}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Description -->
                  <p v-if="job.description" class="text-slate-600 text-sm sm:text-base leading-relaxed pl-2 border-l-4 border-teal-400/50">
                    {{ job.description }}
                  </p>
                  
                  <!-- Decorative elements -->
                  <div class="mt-4 flex items-center gap-2">
                    <div class="h-1 w-12 bg-gradient-to-r from-teal-400 to-transparent rounded-full"></div>
                    <div class="h-1 w-8 bg-gradient-to-r from-teal-300 to-transparent rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { WorkExperience } from '~/types/portfolio'

const props = withDefaults(
  defineProps<{
    experiences?: WorkExperience[]
  }>(),
  { experiences: () => [] }
)

const titleRef = ref<HTMLElement | null>(null)
const cardRef = ref<HTMLElement | null>(null)
const itemRefs = ref<HTMLElement[]>([])

function setItemRef(el: HTMLElement | null, i: number) {
  if (el) itemRefs.value[i] = el
}

useWorkExperienceReveal(titleRef, cardRef, itemRefs)
</script>
