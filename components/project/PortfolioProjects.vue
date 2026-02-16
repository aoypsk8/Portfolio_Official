<template>
  <section id="projects" class="py-24 px-6 bg-slate-900/40">
    <div class="container mx-auto max-w-6xl">
      <h2 class="text-3xl font-bold text-white mb-2">Projects</h2>
      <p class="text-amber-400 text-sm font-semibold tracking-wider uppercase mb-12">What I've built</p>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article
          v-for="project in projects"
          :key="project.title"
          class="rounded-xl border border-slate-700/50 bg-slate-800/50 overflow-hidden hover:border-amber-500/50 transition-colors"
        >
          <div class="aspect-video bg-slate-700 flex items-center justify-center text-slate-500">
            <span class="text-4xl">📦</span>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-semibold text-white mb-2">{{ project.title }}</h3>
            <p class="text-slate-400 text-sm mb-4">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in (project.tags ?? [])"
                :key="tag"
                class="text-xs px-2 py-1 rounded bg-slate-700 text-slate-400"
              >
                {{ tag }}
              </span>
            </div>
            <a
              v-if="project.link"
              :href="project.link"
              target="_blank"
              rel="noopener"
              class="inline-block mt-4 text-amber-400 hover:text-amber-300 text-sm font-medium"
            >
              View project →
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Project } from '~/types/portfolio'

withDefaults(
  defineProps<{
    projects?: Project[]
  }>(),
  {
    projects: () => [
      {
        title: 'Project One',
        description: 'A short description of the project and your role.',
        tags: ['Vue', 'Nuxt', 'Tailwind'],
        link: '#'
      },
      {
        title: 'Project Two',
        description: 'Another project with focus on performance.',
        tags: ['TypeScript', 'Vite'],
        link: '#'
      },
      {
        title: 'Project Three',
        description: 'Third project showcasing API integration.',
        tags: ['Nuxt', 'API'],
        link: '#'
      }
    ]
  }
)
</script>
