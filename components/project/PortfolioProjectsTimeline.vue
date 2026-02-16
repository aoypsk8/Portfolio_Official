<template>
  <section id="projects" class="section-pad bg-gradient-to-b from-white via-slate-50/50 to-white relative">
    <div class="container-narrow max-w-5xl mx-auto">
      <div class="text-center mb-12 sm:mb-16 md:mb-20">
        <p class="section-label mb-3 text-teal-600">
          What I built
        </p>
        <h2 ref="titleRef"
          class="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 text-center mb-4 tracking-tight bg-gradient-to-r from-slate-800 via-slate-700 to-teal-700 bg-clip-text text-transparent">
          Proudly presenting projects
        </h2>
        <div class="w-24 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent mx-auto mt-4"></div>
      </div>

      <!-- Desktop: timeline with line. Mobile: single column cards with left accent -->
      <div class="relative">
        <!-- Enhanced Vertical timeline line: hidden on mobile, visible md+ -->
        <div ref="lineRef"
          class="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-300 via-teal-400 to-teal-300 origin-top hidden md:block rounded-full shadow-lg"
          style="transform: translateX(-50%) scaleY(0)" />

        <div class="relative space-y-8 md:space-y-0">
          <template v-for="(project, i) in projects" :key="project.title">
            <div :ref="(el) => setCardRef(el as HTMLElement, i)" :class="[
              'relative flex flex-col md:flex-row md:items-center gap-4 md:gap-6',
              i < projects.length - 1 ? 'md:mb-20' : ''
            ]">
              <!-- Card -->
              <div :class="[
                'w-full flex md:w-[calc(50%-1.5rem)]',
                i % 2 === 0 ? 'md:justify-end md:pr-6' : 'md:justify-start md:pl-6 md:order-2'
              ]">
                <div
                  class="group relative w-full max-w-md rounded-3xl border-2 border-slate-200/80 bg-white/95 backdrop-blur-sm shadow-xl p-8 sm:p-10 transition-all duration-500 hover:shadow-2xl hover:shadow-teal-500/30 hover:border-teal-300/50 hover:-translate-y-3 overflow-hidden">
                  <!-- Shine effect -->
                  <div
                    class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000">
                  </div>

                  <!-- Gradient overlay on hover -->
                  <div
                    class="absolute inset-0 bg-gradient-to-br from-teal-50/0 via-transparent to-blue-50/0 group-hover:from-teal-50/60 group-hover:to-blue-50/40 transition-all duration-500">
                  </div>

                  <!-- Decorative corner -->
                  <div
                    class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-100/0 to-transparent group-hover:from-teal-200/30 transition-all duration-500 rounded-bl-full">
                  </div>

                  <div class="relative z-10">
                    <!-- Logo with enhanced design -->
                    <div class="mb-6 flex items-center gap-4">
                      <div v-if="project.logo"
                        class="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center text-3xl sm:text-4xl font-bold shadow-xl ring-4 ring-white/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-2xl"
                        :style="{ backgroundColor: project.logoBg ?? '#ef4444', color: 'white' }">
                        {{ project.logo }}
                      </div>
                      <h3
                        class="text-2xl sm:text-3xl font-bold text-slate-800 mb-4 group-hover:text-teal-700 transition-colors duration-300 leading-tight">
                        {{ project.title }}
                      </h3>
                    </div>


                    <p
                      class="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 border-l-4 border-teal-400/50 pl-4">
                      {{ project.description }}
                    </p>

                    <!-- Tags -->
                    <div v-if="project.tags?.length" class="flex flex-wrap gap-2 mb-6">
                      <span v-for="tag in project.tags" :key="tag"
                        class="px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-teal-50 to-teal-100/80 text-teal-800 border border-teal-200/70 hover:from-teal-100 hover:to-teal-200 hover:border-teal-300 hover:scale-105 transition-all duration-300">
                        {{ tag }}
                      </span>
                    </div>

                    <!-- View Project Button -->
                    <a v-if="project.link" :href="project.link" target="_blank" rel="noopener"
                      class="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold text-sm sm:text-base hover:from-teal-600 hover:to-teal-700 hover:shadow-xl hover:shadow-teal-500/50 transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
                      <!-- Button shine effect -->
                      <span
                        class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></span>
                      <span class="relative z-10">View project</span>
                      <svg
                        class="w-5 h-5 relative z-10 transform group-hover/btn:translate-x-1 transition-transform duration-300"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </a>

                    <!-- Decorative bottom line -->
                    <div class="mt-6 pt-6 border-t border-slate-200/50 flex items-center gap-2">
                      <div class="h-1 flex-1 bg-gradient-to-r from-teal-400 to-transparent rounded-full"></div>
                      <div class="w-2 h-2 rounded-full bg-teal-400"></div>
                      <div class="h-1 w-8 bg-gradient-to-l from-teal-300 to-transparent rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Enhanced Timeline dot: center on desktop, hidden on mobile -->
              <div
                class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 border-4 md:border-[6px] border-white shadow-xl z-10 shrink-0 hidden md:block group-hover:scale-150 group-hover:shadow-teal-500/50 transition-all duration-300" />

              <div :class="['hidden md:block w-[calc(50%-1.5rem)]', i % 2 === 0 ? 'md:order-2' : '']" />
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Project } from '~/types/portfolio'

const props = withDefaults(
  defineProps<{
    projects?: Project[]
  }>(),
  { projects: () => [] }
)

const titleRef = ref<HTMLElement | null>(null)
const lineRef = ref<HTMLElement | null>(null)
const cardRefs = ref<HTMLElement[]>([])

function setCardRef(el: HTMLElement | null, i: number) {
  if (el) cardRefs.value[i] = el
}

useProjectsTimelineAnimation(titleRef, lineRef, cardRefs, () => props.projects?.length ?? 0)
</script>
