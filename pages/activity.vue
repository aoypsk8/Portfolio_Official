<template>
  <div class="min-h-screen bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
    <!-- Decorative background elements -->
    <div class="fixed inset-0 pointer-events-none z-0">
      <div class="absolute top-1/4 right-0 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
    </div>
    
    <section class="section-pad container-narrow relative z-10">
      <!-- Enhanced Header -->
      <div class="text-center mb-12 sm:mb-16">
        <h1 ref="activityTitleRef" class="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight bg-gradient-to-r from-slate-800 via-slate-700 to-teal-700 bg-clip-text text-transparent">
          Activity
        </h1>
        <div class="w-24 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent mx-auto mt-4"></div>
      </div>

      <!-- Enhanced Masonry-style grid -->
      <div
        ref="activityGridRef"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      >
        <article
          v-for="(item, i) in visibleItems"
          :key="`${item.title}-${i}`"
          :class="[
            gridCardClass(item),
            'group relative rounded-3xl border-2 bg-white/95 backdrop-blur-sm shadow-xl overflow-hidden transition-all duration-500 flex flex-col',
            item.size === 'small' 
              ? 'border-teal-300/60 hover:border-teal-400 hover:shadow-2xl hover:shadow-teal-500/40 hover:-translate-y-4 hover:rotate-1' 
              : 'border-slate-200/80 hover:shadow-2xl hover:shadow-teal-500/30 hover:border-teal-300/50 hover:-translate-y-3'
          ]"
        >
          <!-- Shine effect -->
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 z-10"></div>
          
          <!-- Gradient overlay -->
          <div class="absolute inset-0 bg-gradient-to-br from-teal-50/0 via-transparent to-blue-50/0 group-hover:from-teal-50/60 group-hover:to-blue-50/40 transition-all duration-500 z-10"></div>
          
          <!-- Decorative corner accent -->
          <div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-teal-100/0 to-transparent group-hover:from-teal-200/30 transition-all duration-500 rounded-bl-full z-10"></div>
          
          <!-- Size badge with icon - Always visible -->
          <div 
            :class="[
              'absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm transition-all duration-300',
              item.size === 'large' 
                ? 'bg-gradient-to-r from-purple-500/90 to-purple-600/90 text-white group-hover:scale-110' 
                : item.size === 'medium'
                ? 'bg-gradient-to-r from-blue-500/90 to-blue-600/90 text-white group-hover:scale-110'
                : 'bg-gradient-to-r from-teal-500/90 to-teal-600/90 text-white group-hover:scale-125 group-hover:shadow-teal-500/50'
            ]"
          >
            <svg 
              v-if="item.size === 'small'"
              class="w-3.5 h-3.5 animate-pulse" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <svg 
              v-else-if="item.size === 'medium'"
              class="w-3.5 h-3.5" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
            </svg>
            <svg 
              v-else
              class="w-3.5 h-3.5" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clip-rule="evenodd" />
            </svg>
            <span>{{ item.size === 'large' ? 'Large' : item.size === 'medium' ? 'Medium' : 'Small' }}</span>
          </div>
          
          <!-- Special indicator for small cards -->
          <div 
            v-if="item.size === 'small'"
            class="absolute top-4 right-4 z-20 w-3 h-3 rounded-full bg-gradient-to-r from-teal-400 to-teal-500 shadow-lg animate-pulse group-hover:scale-150 group-hover:animate-none transition-all duration-300"
          ></div>
          
          <!-- Image section -->
          <div class="relative aspect-[4/3] sm:aspect-[3/2] overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300">
            <!-- Enhanced image overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[1]"></div>
            <!-- Special shimmer effect for small cards -->
            <div 
              v-if="item.size === 'small'"
              class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-[2]"
            ></div>
            <img
              :src="item.image"
              :alt="item.title"
              :class="[
                'w-full h-full object-cover transition-transform duration-700',
                item.size === 'small' ? 'group-hover:scale-125' : 'group-hover:scale-110'
              ]"
              loading="lazy"
            >
          </div>
          
          <!-- Content section -->
          <div class="relative z-10 p-6 sm:p-8 flex flex-col flex-1 min-w-0">
            <!-- Special title styling for small cards -->
            <div 
              v-if="item.size === 'small'"
              class="absolute -top-2 right-6 w-12 h-1 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full opacity-50 group-hover:opacity-100 group-hover:w-16 transition-all duration-300"
            ></div>
            
            <h2 
              :class="[
                'font-bold mb-3 sm:mb-4 line-clamp-2 transition-colors duration-300 leading-tight',
                item.size === 'small'
                  ? 'text-lg sm:text-xl text-teal-800 group-hover:text-teal-600'
                  : 'text-xl sm:text-2xl text-slate-800 group-hover:text-teal-700'
              ]"
            >
              {{ item.title }}
            </h2>
            <p 
              :class="[
                'text-sm sm:text-base line-clamp-3 flex-1 leading-relaxed pl-4',
                item.size === 'small'
                  ? 'text-slate-700 border-l-4 border-teal-400/50 group-hover:border-teal-500'
                  : 'text-slate-600 border-l-4 border-teal-400/30'
              ]"
            >
              {{ item.description }}
            </p>
            
            <!-- Enhanced decorative bottom line -->
            <div 
              :class="[
                'mt-6 pt-6 border-t flex items-center gap-2',
                item.size === 'small'
                  ? 'border-teal-200/60'
                  : 'border-slate-200/50'
              ]"
            >
              <div 
                :class="[
                  'h-1 flex-1 rounded-full',
                  item.size === 'small'
                    ? 'bg-gradient-to-r from-teal-400 via-teal-500 to-transparent'
                    : 'bg-gradient-to-r from-teal-400 to-transparent'
                ]"
              ></div>
              <div 
                :class="[
                  'rounded-full transition-transform duration-300',
                  item.size === 'small'
                    ? 'w-2.5 h-2.5 bg-gradient-to-r from-teal-400 to-teal-500 group-hover:scale-200 group-hover:rotate-180'
                    : 'w-2 h-2 bg-teal-400 group-hover:scale-150'
                ]"
              ></div>
              <div 
                :class="[
                  'h-1 rounded-full',
                  item.size === 'small'
                    ? 'w-12 bg-gradient-to-l from-teal-400 via-teal-300 to-transparent'
                    : 'w-8 bg-gradient-to-l from-teal-300 to-transparent'
                ]"
              ></div>
            </div>
          </div>
        </article>
      </div>

      <!-- Enhanced Show more button -->
      <div v-if="hasMore" class="mt-12 sm:mt-16 flex justify-center">
        <button
          type="button"
          class="group/btn inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold text-base sm:text-lg hover:from-teal-600 hover:to-teal-700 hover:shadow-xl hover:shadow-teal-500/50 transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
          @click="showMore"
        >
          <!-- Button shine effect -->
          <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></span>
          <span class="relative z-10">Show more</span>
          <svg class="w-5 h-5 relative z-10 transform group-hover/btn:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ACTIVITY_ITEMS, ACTIVITY_INITIAL_COUNT } from '~/constants/activityPage'
import type { ActivityItem } from '~/types/portfolio'
import { useApiActivities } from '~/composables/usePortfolioApi'

const { data: activitiesData } = useApiActivities({ items: ACTIVITY_ITEMS, initialCount: ACTIVITY_INITIAL_COUNT })
const items = computed(() => activitiesData.value?.items ?? ACTIVITY_ITEMS)
const initialCountRef = computed(() => activitiesData.value?.initialCount ?? ACTIVITY_INITIAL_COUNT)

const displayCount = ref(ACTIVITY_INITIAL_COUNT)
watch(initialCountRef, (n) => { displayCount.value = n }, { immediate: true })

const visibleItems = computed(() => items.value.slice(0, displayCount.value))
const hasMore = computed(() => displayCount.value < items.value.length)

function showMore() {
  displayCount.value = Math.min(displayCount.value + 6, items.value.length)
}

function gridCardClass(item: ActivityItem) {
  const size = item.size ?? 'medium'
  if (size === 'large') return 'sm:col-span-2'
  if (size === 'medium') return 'sm:col-span-2'
  return ''
}

const activityTitleRef = ref<HTMLElement | null>(null)
const activityGridRef = ref<HTMLElement | null>(null)
useScrollReveal(activityTitleRef, { start: 'top 88%' })
useStaggerReveal(activityGridRef, { childSelector: 'article', stagger: 0.1, y: 32 })
</script>
