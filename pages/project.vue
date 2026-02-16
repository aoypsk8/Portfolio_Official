<template>
  <div class="min-h-screen bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
    <!-- Decorative background elements -->
    <div class="fixed inset-0 pointer-events-none z-0">
      <div class="absolute top-1/4 right-0 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
    </div>
    
    <!-- Section: Things I've made -->
    <section class="section-pad container-narrow relative z-10 overflow-hidden">
      <!-- Enhanced decorative elements -->
      <div
        class="absolute -top-24 -left-24 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-teal-200/60 to-teal-300/40 blur-3xl pointer-events-none animate-pulse"
        aria-hidden
      />
      <div
        class="absolute top-1/2 right-0 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-blue-200/50 to-teal-200/30 blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"
        aria-hidden
      />

      <div class="relative mb-12 sm:mb-16 md:mb-20">
        <div class="mb-4">
          <p class="section-label mb-3 text-teal-600">
            Portfolio
          </p>
        </div>
        <h1 ref="projectTitleRef" class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-4 tracking-tight bg-gradient-to-r from-slate-800 via-slate-700 to-teal-700 bg-clip-text text-transparent max-w-4xl">
          Things I've made trying to put my dent in the universe.
        </h1>
        <div class="w-32 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent mt-6"></div>
      </div>

      <!-- Enhanced Timeline + project cards -->
      <div ref="timelineRef" class="relative max-w-5xl mx-auto">
        <!-- Enhanced vertical timeline line -->
        <div
          class="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-300 via-teal-400 to-teal-300 -translate-x-1/2 hidden md:block rounded-full shadow-lg"
          aria-hidden
        />
        <div class="space-y-10 md:space-y-0 timeline-cards">
          <article
            v-for="(project, i) in projects"
            :key="`${project.title}-${i}`"
            :class="[
              'group/item relative flex flex-col md:flex-row md:items-center gap-6 md:gap-8',
              i < projects.length - 1 ? 'md:mb-24' : ''
            ]"
          >
            <div
              :class="[
                'w-full flex md:w-[calc(50%-2rem)]',
                i % 2 === 0 ? 'md:justify-end md:pr-8' : 'md:justify-start md:pl-8 md:order-2'
              ]"
            >
              <div
                class="group/card relative w-full max-w-md rounded-3xl border-2 border-slate-200/80 bg-white/95 backdrop-blur-sm shadow-xl p-8 sm:p-10 transition-all duration-500 hover:shadow-2xl hover:shadow-teal-500/30 hover:border-teal-300/50 hover:-translate-y-3 overflow-hidden"
              >
                <!-- Shine effect -->
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/card:translate-x-[100%] transition-transform duration-1000"></div>
                
                <!-- Gradient overlay -->
                <div class="absolute inset-0 bg-gradient-to-br from-teal-50/0 via-transparent to-blue-50/0 group-hover/card:from-teal-50/60 group-hover/card:to-blue-50/30 transition-all duration-500"></div>
                
                <!-- Decorative corner -->
                <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-100/0 to-transparent group-hover/card:from-teal-200/40 transition-all duration-500 rounded-bl-full"></div>
                
                <div class="relative z-10">
                  <div class="flex items-start gap-5 mb-5">
                    <!-- Enhanced Logo -->
                    <div
                      v-if="project.logo"
                      class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl font-bold shrink-0 shadow-xl ring-4 ring-white/50 group-hover/card:scale-110 group-hover/card:rotate-3 transition-all duration-300"
                      :style="{ backgroundColor: project.logoBg ?? '#ef4444', color: 'white' }"
                    >
                      {{ project.logo }}
                    </div>
                    <!-- Project number badge -->
                    <div class="ml-auto px-3 py-1.5 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white text-xs font-bold shadow-lg">
                      #{{ i + 1 }}
                    </div>
                  </div>
                  <div class="min-w-0 flex-1">
                    <h2 class="text-2xl sm:text-3xl font-bold text-slate-800 mb-3 group-hover/card:text-teal-700 transition-colors duration-300">
                      {{ project.title }}
                    </h2>
                    <p class="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 border-l-4 border-teal-400/50 pl-4">
                      {{ project.description }}
                    </p>
                    <!-- Enhanced View Project Link -->
                    <a
                      v-if="project.link"
                      :href="project.link"
                      target="_blank"
                      rel="noopener"
                      class="group/link inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold text-sm sm:text-base hover:from-teal-600 hover:to-teal-700 hover:shadow-xl hover:shadow-teal-500/50 transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
                    >
                      <!-- Link shine effect -->
                      <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover/link:translate-x-[100%] transition-transform duration-700"></span>
                      <span class="relative z-10">View project</span>
                      <svg class="w-5 h-5 relative z-10 transform group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
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
            </div>
            <!-- Enhanced Timeline dot -->
            <div
              class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 border-4 md:border-[6px] border-white shadow-xl z-10 shrink-0 hidden md:block group-hover/item:scale-150 group-hover/item:shadow-teal-500/50 transition-all duration-300"
              aria-hidden
            />
            <div :class="['hidden md:block w-[calc(50%-2rem)]', i % 2 === 0 ? 'md:order-2' : '']" />
          </article>
        </div>
      </div>

      <!-- Enhanced Divider: All of the projects have finished -->
      <div ref="dividerRef" class="relative mt-16 md:mt-20 flex flex-col items-center">
        <div class="flex items-center gap-4 mb-4">
          <div class="h-0.5 w-16 bg-gradient-to-r from-transparent to-teal-400 rounded-full"></div>
          <p class="text-slate-600 text-sm sm:text-base font-semibold px-4 py-2 rounded-full bg-gradient-to-r from-teal-50 to-teal-100/80 border border-teal-200/70">
            {{ finishedLabel }}
          </p>
          <div class="h-0.5 w-16 bg-gradient-to-l from-transparent to-teal-400 rounded-full"></div>
        </div>
        <div class="w-full max-w-3xl h-0.5 bg-gradient-to-r from-transparent via-teal-300 to-transparent" />
      </div>
    </section>

    <!-- Enhanced Section: Company's Project -->
    <section ref="companyRef" class="section-pad container-narrow border-t-2 border-gradient-to-r from-transparent via-slate-200 to-transparent relative z-10">
      <div class="mb-10 sm:mb-12">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight bg-gradient-to-r from-slate-800 via-slate-700 to-teal-700 bg-clip-text text-transparent">
          Company's Project
        </h2>
        <div class="w-24 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent"></div>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(item, i) in companyProjects"
          :key="`${item.name}-${i}`"
          class="group relative rounded-2xl border-2 border-slate-200/80 bg-white/95 backdrop-blur-sm shadow-lg p-6 sm:p-8 transition-all duration-500 hover:shadow-xl hover:shadow-teal-500/20 hover:border-teal-300/50 hover:-translate-y-2 overflow-hidden"
        >
          <!-- Gradient overlay -->
          <div class="absolute inset-0 bg-gradient-to-br from-teal-50/0 via-transparent to-blue-50/0 group-hover:from-teal-50/60 group-hover:to-blue-50/30 transition-all duration-500"></div>
          
          <div class="relative z-10 flex items-center gap-5">
            <!-- Enhanced Logo -->
            <div
              v-if="item.logo"
              class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl font-bold shrink-0 shadow-xl ring-4 ring-teal-100/50 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
              :style="{ backgroundColor: item.logoBg ?? '#ef4444', color: 'white' }"
            >
              {{ item.logo }}
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-lg sm:text-xl font-bold text-slate-800 group-hover:text-teal-700 transition-colors duration-300">
                {{ item.name }}
              </h3>
              <!-- Company badge -->
              <div class="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-teal-50 to-teal-100/80 border border-teal-200/70">
                <svg class="w-3.5 h-3.5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span class="text-xs font-semibold text-teal-700">Company</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { PROJECT_PAGE_ITEMS, COMPANY_PROJECTS, PROJECT_PAGE_FINISHED_LABEL } from '~/constants/projectPage'

const projects = PROJECT_PAGE_ITEMS
const companyProjects = COMPANY_PROJECTS
const finishedLabel = PROJECT_PAGE_FINISHED_LABEL

const projectTitleRef = ref<HTMLElement | null>(null)
const timelineRef = ref<HTMLElement | null>(null)
const dividerRef = ref<HTMLElement | null>(null)
const companyRef = ref<HTMLElement | null>(null)

useScrollReveal(projectTitleRef, { start: 'top 88%' })
useStaggerReveal(timelineRef, { childSelector: 'article', stagger: 0.12, y: 44 })
useScrollReveal(dividerRef, { start: 'top 90%' })
useScrollReveal(companyRef, { start: 'top 88%' })
</script>
