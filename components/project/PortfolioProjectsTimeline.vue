<template>
  <section id="projects" class="section-pad relative">
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

      <div class="relative">
        <div ref="lineRef"
          class="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-300 via-teal-400 to-teal-300 origin-top hidden md:block rounded-full shadow-lg"
          style="transform: translateX(-50%) scaleY(0)" />

        <div class="relative space-y-8 md:space-y-0">
          <template v-for="(project, i) in projects" :key="project.title">
            <div :ref="(el) => setCardRef(el as HTMLElement, i)" :class="[
              'relative flex flex-col md:flex-row md:items-center gap-4 md:gap-6',
              i < projects.length - 1 ? 'md:mb-20' : ''
            ]">
              <div :class="[
                'w-full flex md:w-[calc(50%-1.5rem)]',
                i % 2 === 0 ? 'md:justify-end md:pr-6' : 'md:justify-start md:pl-6 md:order-2'
              ]">
                <!-- Card: preview image + logo + name + description only; click opens modal -->
                <button
                  type="button"
                  class="group w-full max-w-md rounded-3xl border-2 border-slate-200/80 bg-white/95 backdrop-blur-sm shadow-xl overflow-hidden text-left transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/20 hover:border-teal-300/50 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                  @click="openModal(project)"
                >
                  <!-- Preview image only (not logo): project.image or first of project.images -->
                  <div v-if="previewImage(project)" class="w-full aspect-video bg-slate-100 overflow-hidden">
                    <img
                      :src="previewImage(project) ?? ''"
                      :alt="project.title"
                      class="w-full h-full object-contain"
                      loading="lazy"
                    >
                  </div>
                  <div class="p-5 sm:p-6">
                    <!-- Logo (separate from preview image): letter or small logo -->
                    <div class="flex items-center gap-3 mb-3">
                      <div
                        v-if="project.logo"
                        class="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold shrink-0 overflow-hidden"
                        :style="{ backgroundColor: isLogoUrl(project.logo) ? 'transparent' : (project.logoBg ?? '#0d9488'), color: isLogoUrl(project.logo) ? undefined : 'white' }"
                      >
                        <img v-if="isLogoUrl(project.logo)" :src="project.logo" :alt="project.title" class="w-full h-full object-contain">
                        <span v-else>{{ project.logo }}</span>
                      </div>
                      <h3 class="text-xl sm:text-2xl font-bold text-slate-800 group-hover:text-teal-700 transition-colors truncate">
                        {{ project.title }}
                      </h3>
                    </div>
                    <p class="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3">
                      {{ project.description }}
                    </p>
                    <p class="mt-3 text-teal-600 text-sm font-medium">
                      View details →
                    </p>
                  </div>
                </button>
              </div>

              <div
                class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 border-4 md:border-[6px] border-white shadow-xl z-10 shrink-0 hidden md:block"
              />
              <div :class="['hidden md:block w-[calc(50%-1.5rem)]', i % 2 === 0 ? 'md:order-2' : '']" />
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- Modal: full details + all images -->
    <ProjectDetailModal
      :open="!!selectedProject"
      :project="selectedProject"
      @close="selectedProject = null"
    />
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

const selectedProject = ref<Project | null>(null)

function openModal(project: Project) {
  selectedProject.value = project
}

function isLogoUrl(logo: string): boolean {
  return logo.startsWith('http://') || logo.startsWith('https://') || logo.startsWith('/')
}

/** Preview image for card (one image only): prefer project.image, else first of project.images. Not logo. */
function previewImage(project: { image?: string; images?: string[] }): string | null {
  if (project.image) return project.image
  if (project.images?.length) return project.images[0]
  return null
}

const titleRef = ref<HTMLElement | null>(null)
const lineRef = ref<HTMLElement | null>(null)
const cardRefs = ref<HTMLElement[]>([])

function setCardRef(el: HTMLElement | null, i: number) {
  if (el) cardRefs.value[i] = el
}

useProjectsTimelineAnimation(titleRef, lineRef, cardRefs, () => props.projects?.length ?? 0)
</script>
