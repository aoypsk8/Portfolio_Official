<template>
  <section
    id="projects"
    ref="containerRef"
    class="project-container relative w-full h-[300vh] md:h-[400vh] bg-slate-900/40"
  >
    <div class="flex flex-col md:flex-row w-full h-full px-6 md:px-[10%]">
      <div class="project-content w-full md:w-1/2 relative z-10 order-2 md:order-1">
        <div
          v-for="(project, i) in projects"
          :key="project.title"
          class="project-step h-screen flex flex-col justify-center"
        >
          <span class="text-amber-400 font-bold tracking-widest text-sm mb-4">
            PROJECT {{ String(i + 1).padStart(2, '0') }}
          </span>
          <h2 class="text-4xl md:text-6xl font-bold text-white mb-6">{{ project.title }}</h2>
          <p class="text-lg md:text-xl text-slate-400 max-w-lg">{{ project.description }}</p>
          <a
            v-if="project.link"
            :href="project.link"
            target="_blank"
            rel="noopener"
            class="mt-6 inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium"
          >
            View project →
          </a>
        </div>
      </div>
      <div class="project-visual w-full md:w-1/2 h-[50vh] md:h-screen flex items-center justify-center order-1 md:order-2">
        <div class="phone-frame relative w-[240px] h-[480px] md:w-[300px] md:h-[620px] bg-black rounded-[40px] border-8 md:border-[12px] border-slate-800 shadow-2xl overflow-hidden scale-75 md:scale-100">
          <div class="phone-screen absolute top-0 left-0 w-full flex flex-col">
            <img
              v-for="(project, i) in projects"
              :key="`img-${i}`"
              :src="project.image ?? placeholderImages[i % placeholderImages.length]"
              :alt="project.title"
              class="w-full h-auto object-cover"
              loading="lazy"
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Project } from '~/types/portfolio'
import { PROJECT_PLACEHOLDER_IMAGES } from '~/constants/projects'

const props = withDefaults(
  defineProps<{
    projects?: Project[]
  }>(),
  { projects: () => [] }
)

const placeholderImages = PROJECT_PLACEHOLDER_IMAGES
const containerRef = ref<HTMLElement | null>(null)

useProjectsScroll(containerRef, (props.projects?.length ?? 0) > 0)
</script>
