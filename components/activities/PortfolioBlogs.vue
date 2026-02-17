<template>
  <section id="activity" class="section-pad ">
    <div class="container-narrow max-w-6xl mx-auto">
      <div class="text-center mb-12 sm:mb-16">
        <p class="section-label mb-3 text-teal-600">
          Writing
        </p>
        <h2
          ref="titleRef"
          class="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 text-center mb-4 tracking-tight bg-gradient-to-r from-slate-800 via-slate-700 to-teal-700 bg-clip-text text-transparent"
        >
          Blogs and posts
        </h2>
        <div class="w-24 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent mx-auto mt-4"></div>
      </div>

      <div class="grid grid-cols-1 gap-8 sm:gap-10 sm:grid-cols-2 lg:gap-12 lg:grid-cols-3">
        <article
          v-for="(post, i) in posts"
          :key="post.title"
          :ref="(el) => setPostRef(el as HTMLElement, i)"
          class="group relative rounded-3xl border-2 border-slate-200/80 bg-white/95 backdrop-blur-sm shadow-xl p-8 sm:p-10 transition-all duration-500 hover:shadow-2xl hover:shadow-teal-500/30 hover:border-teal-300/50 hover:-translate-y-3 overflow-hidden"
        >
          <!-- Shine effect -->
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          
          <!-- Gradient overlay -->
          <div class="absolute inset-0 bg-gradient-to-br from-teal-50/0 via-transparent to-blue-50/0 group-hover:from-teal-50/60 group-hover:to-blue-50/40 transition-all duration-500"></div>
          
          <!-- Decorative corner accent -->
          <div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-teal-100/0 to-transparent group-hover:from-teal-200/30 transition-all duration-500 rounded-bl-full"></div>
          
          <div class="relative z-10">
            <!-- Date Badge -->
            <div class="mb-5 flex items-center justify-between">
              <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-teal-50 to-teal-100/50 border border-teal-200/50">
                <svg class="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span class="text-teal-700 text-xs sm:text-sm font-semibold">{{ post.date }}</span>
              </div>
              <!-- Reading indicator -->
              <div class="w-2 h-2 rounded-full bg-teal-400 group-hover:scale-150 group-hover:bg-teal-500 transition-all duration-300"></div>
            </div>
            
            <!-- Title -->
            <h3 class="text-2xl sm:text-3xl font-bold text-slate-800 mb-4 sm:mb-5 line-clamp-2 group-hover:text-teal-700 transition-colors duration-300 leading-tight">
              {{ post.title }}
            </h3>
            
            <!-- Description -->
            <p class="text-slate-600 text-sm sm:text-base mb-6 sm:mb-8 line-clamp-3 leading-relaxed border-l-4 border-teal-400/30 pl-4">
              {{ post.description }}
            </p>
            
            <!-- Read More Button -->
            <a
              v-if="post.href"
              :href="post.href"
              class="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold text-sm sm:text-base hover:from-teal-600 hover:to-teal-700 hover:shadow-xl hover:shadow-teal-500/50 transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
            >
              <!-- Button shine effect -->
              <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></span>
              <span class="relative z-10">Read more</span>
              <svg class="w-5 h-5 relative z-10 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { BlogPost } from '~/types/portfolio'

const props = withDefaults(
  defineProps<{
    posts?: BlogPost[]
  }>(),
  { posts: () => [] }
)

const titleRef = ref<HTMLElement | null>(null)
const postRefs = ref<HTMLElement[]>([])

function setPostRef(el: HTMLElement | null, i: number) {
  if (el) postRefs.value[i] = el
}

useBlogsReveal(titleRef, postRefs)
</script>
