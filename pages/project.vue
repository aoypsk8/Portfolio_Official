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
            v-for="(project, i) in (projects ?? [])"
            :key="`${project.title}-${i}`"
            :class="[
              'group/item relative flex flex-col md:flex-row md:items-center gap-6 md:gap-8',
              i < (projects ?? []).length - 1 ? 'md:mb-24' : ''
            ]"
          >
            <div
              :class="[
                'w-full flex md:w-[calc(50%-2rem)]',
                i % 2 === 0 ? 'md:justify-end md:pr-8' : 'md:justify-start md:pl-8 md:order-2'
              ]"
            >
              <!-- Card: preview image + logo + name + description; click opens modal -->
              <button
                type="button"
                class="group/card w-full max-w-md rounded-3xl border-2 border-slate-200/80 bg-white/95 backdrop-blur-sm shadow-xl overflow-hidden text-left transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/20 hover:border-teal-300/50 hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                @click="selectedProject = project"
              >
                <!-- Preview image only (not logo) -->
                <div v-if="previewImage(project)" class="w-full aspect-video bg-slate-100 overflow-hidden">
                  <img
                    :src="previewImage(project) ?? ''"
                    :alt="project.title"
                    class="w-full h-full object-contain"
                    loading="lazy"
                  >
                </div>
                <div class="p-6 sm:p-8 flex items-start gap-4">
                  <div
                    v-if="project.logo"
                    class="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold shrink-0 overflow-hidden"
                    :style="{ backgroundColor: isLogoUrl(project.logo) ? 'transparent' : (project.logoBg ?? '#0d9488'), color: isLogoUrl(project.logo) ? undefined : 'white' }"
                  >
                    <img v-if="isLogoUrl(project.logo)" :src="project.logo" :alt="project.title" class="w-full h-full object-contain">
                    <span v-else>{{ project.logo }}</span>
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center gap-2 mb-1">
                      <span class="px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-600 text-xs font-bold">#{{ i + 1 }}</span>
                    </div>
                    <h2 class="text-xl sm:text-2xl font-bold text-slate-800 mb-2 group-hover/card:text-teal-700 transition-colors">
                      {{ project.title }}
                    </h2>
                    <p class="text-slate-600 text-sm leading-relaxed line-clamp-3">
                      {{ project.description }}
                    </p>
                    <p class="mt-3 text-teal-600 text-sm font-medium">
                      View details →
                    </p>
                  </div>
                </div>
              </button>
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
          v-for="(item, i) in (companyProjects ?? [])"
          :key="`${item.name}-${i}`"
          class="group relative rounded-2xl border-2 border-slate-200/80 bg-white/95 backdrop-blur-sm shadow-lg p-6 sm:p-8 transition-all duration-500 hover:shadow-xl hover:shadow-teal-500/20 hover:border-teal-300/50 hover:-translate-y-2 overflow-hidden"
        >
          <!-- Gradient overlay -->
          <div class="absolute inset-0 bg-gradient-to-br from-teal-50/0 via-transparent to-blue-50/0 group-hover:from-teal-50/60 group-hover:to-blue-50/30 transition-all duration-500"></div>
          
          <div class="relative z-10 flex items-center gap-5">
            <!-- Enhanced Logo -->
            <div
              v-if="item.logo"
              class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl font-bold shrink-0 shadow-xl ring-4 ring-teal-100/50 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 overflow-hidden"
              :style="{ backgroundColor: isLogoUrl(item.logo) ? 'transparent' : (item.logoBg ?? '#ef4444'), color: isLogoUrl(item.logo) ? undefined : 'white' }"
            >
              <img v-if="isLogoUrl(item.logo)" :src="item.logo" :alt="item.name" class="w-full h-full object-contain">
              <span v-else>{{ item.logo }}</span>
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

    <!-- Modal: full details + all images (same as home) -->
    <ProjectDetailModal
      :open="!!selectedProject"
      :project="selectedProject"
      @close="selectedProject = null"
    />
  </div>
</template>

<script setup lang="ts">
import type { Project } from '~/types/portfolio'
import { PROJECT_PAGE_ITEMS, COMPANY_PROJECTS, PROJECT_PAGE_FINISHED_LABEL } from '~/constants/projectPage'
import { useApiProjects, useApiCompanyProjects } from '~/composables/usePortfolioApi'

const selectedProject = ref<Project | null>(null)

function isLogoUrl(logo: string): boolean {
  return logo.startsWith('http://') || logo.startsWith('https://') || logo.startsWith('/')
}

/** Preview image for card: project.image or first of project.images (not logo). */
function previewImage(project: { image?: string; images?: string[] }): string | null {
  if (project.image) return project.image
  if (project.images?.length) return project.images[0]
  return null
}

const { data: projects } = useApiProjects(PROJECT_PAGE_ITEMS)
const { data: companyProjects } = useApiCompanyProjects(COMPANY_PROJECTS)
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
