<template>
  <div class="min-h-screen bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
    <!-- Decorative background elements -->
    <div class="fixed inset-0 pointer-events-none z-0">
      <div class="absolute top-1/4 right-0 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
    </div>
    
    <!-- Intro: Enhanced profile section -->
    <section ref="introRef" class="section-pad container-narrow relative z-10">
      <div class="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
        <!-- Enhanced Profile placeholders -->
        <div class="flex-shrink-0 order-2 lg:order-1">
          <div class="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 group">
            <div
              class="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-100 to-teal-200 shadow-2xl transition-all duration-500 group-hover:shadow-teal-500/30 group-hover:scale-105"
              style="transform: rotate(-3deg)"
            />
            <div
              class="absolute inset-0 rounded-3xl bg-gradient-to-br from-slate-200 to-slate-300 shadow-xl translate-x-4 translate-y-4 transition-all duration-500 group-hover:translate-x-5 group-hover:translate-y-5"
              style="transform: rotate(4deg)"
            />
            <!-- Decorative glow -->
            <div class="absolute inset-0 rounded-3xl bg-teal-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>
        <div class="flex-1 min-w-0 order-1 lg:order-2">
          <div class="mb-6">
            <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-6 tracking-tight bg-gradient-to-r from-slate-800 via-slate-700 to-teal-700 bg-clip-text text-transparent">
              {{ about.name }}
            </h1>
            <div class="w-24 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent mb-6"></div>
          </div>
          <p class="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 border-l-4 border-teal-400/50 pl-6">
            {{ about.bio1 }}
          </p>
          <!-- Enhanced Social Media Icons -->
          <div class="flex flex-wrap gap-4">
            <a
              v-for="s in about.socialLinks"
              :key="s.label"
              :href="s.href"
              target="_blank"
              rel="noopener"
              class="group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-slate-600 hover:text-white hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-slate-200 hover:border-transparent"
              :class="getSocialIconClass(s.label)"
              :aria-label="s.label"
            >
              <component :is="getSocialIcon(s.label)" class="w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-300 group-hover:scale-110" />
              <span class="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300" :class="getSocialGlowClass(s.label)"></span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Second paragraph + enhanced placeholder -->
    <section ref="bio2Ref" class="section-pad container-narrow border-t-2 border-gradient-to-r from-transparent via-slate-200 to-transparent relative z-10">
      <div class="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
        <div class="flex-1">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-1 h-12 bg-gradient-to-b from-teal-400 via-teal-500 to-teal-400 rounded-full"></div>
            <span class="text-xs font-semibold text-teal-600 uppercase tracking-wider">More About Me</span>
          </div>
          <p class="text-slate-600 text-base sm:text-lg leading-relaxed pl-4">
            {{ about.bio2 }}
          </p>
        </div>
        <div class="flex-shrink-0 hidden md:block group">
          <div class="w-40 h-40 rounded-3xl bg-gradient-to-br from-teal-100 to-teal-200 shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-teal-500/30" style="transform: rotate(2deg)" />
        </div>
      </div>
    </section>

    <!-- Technical skills - Enhanced -->
    <section ref="skillsRef" class="section-pad container-narrow border-t-2 border-gradient-to-r from-transparent via-slate-200 to-transparent relative z-10">
      <div class="mb-12 sm:mb-16">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight bg-gradient-to-r from-slate-800 via-slate-700 to-teal-700 bg-clip-text text-transparent">
          Technical skills
        </h2>
        <div class="w-24 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent"></div>
      </div>

      <div class="space-y-10 sm:space-y-12">
        <!-- Programming languages -->
        <div class="group relative rounded-2xl border-2 border-slate-200/80 bg-white/95 backdrop-blur-sm shadow-lg p-6 sm:p-8 transition-all duration-500 hover:shadow-xl hover:shadow-teal-500/20 hover:border-teal-300/50 overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-teal-50/0 via-transparent to-blue-50/0 group-hover:from-teal-50/50 group-hover:to-blue-50/30 transition-all duration-500"></div>
          
          <div class="relative z-10">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-3 h-3 rounded-full bg-teal-500 animate-pulse"></div>
              <h3 class="text-lg sm:text-xl font-bold text-slate-800 flex items-center gap-2">
                <svg class="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Programming languages
              </h3>
            </div>
            <div class="h-0.5 bg-gradient-to-r from-teal-400 via-teal-300 to-transparent mb-6"></div>
            <div class="flex flex-wrap gap-3">
              <span
                v-for="lang in about.programmingLanguages"
                :key="lang"
                class="group/lang px-4 py-2 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100/80 text-slate-700 text-sm sm:text-base font-semibold border-2 border-slate-200/70 hover:from-teal-50 hover:to-teal-100 hover:border-teal-300 hover:text-teal-800 hover:scale-110 hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300"
              >
                {{ lang }}
              </span>
            </div>
          </div>
        </div>

        <!-- Frameworks - Fluency -->
        <div class="group relative rounded-2xl border-2 border-slate-200/80 bg-white/95 backdrop-blur-sm shadow-lg p-6 sm:p-8 transition-all duration-500 hover:shadow-xl hover:shadow-teal-500/20 hover:border-teal-300/50 overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-teal-50/0 via-transparent to-blue-50/0 group-hover:from-teal-50/50 group-hover:to-blue-50/30 transition-all duration-500"></div>
          
          <div class="relative z-10">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-3 h-3 rounded-full bg-teal-500 animate-pulse"></div>
              <h3 class="text-lg sm:text-xl font-bold text-slate-800 flex items-center gap-2">
                <svg class="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Frameworks – Fluency
              </h3>
            </div>
            <div class="h-0.5 bg-gradient-to-r from-teal-400 via-teal-300 to-transparent mb-6"></div>
            <ul class="space-y-5">
              <li
                v-for="fw in about.frameworks"
                :key="fw.name"
                class="group/item"
              >
                <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                  <span class="text-base font-bold text-slate-800 sm:w-48 group-hover/item:text-teal-700 transition-colors">{{ fw.name }}</span>
                  <div class="flex-1 flex items-center gap-4">
                    <div class="flex-1 h-3 sm:h-4 rounded-full bg-slate-200 overflow-hidden shadow-inner max-w-md">
                      <div
                        class="h-full rounded-full bg-gradient-to-r from-teal-500 via-teal-600 to-teal-500 transition-all duration-1000 shadow-lg relative overflow-hidden"
                        :style="{ width: `${fw.level}%` }"
                      >
                        <!-- Progress bar shine -->
                        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                      </div>
                    </div>
                    <span class="text-sm font-bold text-teal-700 w-14 sm:w-16 text-right">{{ fw.level }}%</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Libraries & Tools -->
        <div class="group relative rounded-2xl border-2 border-slate-200/80 bg-white/95 backdrop-blur-sm shadow-lg p-6 sm:p-8 transition-all duration-500 hover:shadow-xl hover:shadow-teal-500/20 hover:border-teal-300/50 overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-teal-50/0 via-transparent to-blue-50/0 group-hover:from-teal-50/50 group-hover:to-blue-50/30 transition-all duration-500"></div>
          
          <div class="relative z-10">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-3 h-3 rounded-full bg-teal-500 animate-pulse"></div>
              <h3 class="text-lg sm:text-xl font-bold text-slate-800 flex items-center gap-2">
                <svg class="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Libraries & Tools
              </h3>
            </div>
            <div class="h-0.5 bg-gradient-to-r from-teal-400 via-teal-300 to-transparent mb-6"></div>
            <div class="flex flex-wrap gap-3">
              <span
                v-for="tool in about.librariesAndTools"
                :key="tool"
                class="group/tool px-4 py-2 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100/80 text-slate-700 text-sm sm:text-base font-semibold border-2 border-slate-200/70 hover:from-teal-50 hover:to-teal-100 hover:border-teal-300 hover:text-teal-800 hover:scale-110 hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300"
              >
                {{ tool }}
              </span>
            </div>
          </div>
        </div>

        <!-- Other skills -->
        <div class="group relative rounded-2xl border-2 border-slate-200/80 bg-white/95 backdrop-blur-sm shadow-lg p-6 sm:p-8 transition-all duration-500 hover:shadow-xl hover:shadow-teal-500/20 hover:border-teal-300/50 overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-teal-50/0 via-transparent to-blue-50/0 group-hover:from-teal-50/50 group-hover:to-blue-50/30 transition-all duration-500"></div>
          
          <div class="relative z-10">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-3 h-3 rounded-full bg-teal-500 animate-pulse"></div>
              <h3 class="text-lg sm:text-xl font-bold text-slate-800 flex items-center gap-2">
                <svg class="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Other skills
              </h3>
            </div>
            <div class="h-0.5 bg-gradient-to-r from-teal-400 via-teal-300 to-transparent mb-6"></div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                v-for="skill in about.otherSkills"
                :key="skill"
                class="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-slate-50/50 to-transparent hover:from-teal-50/50 hover:to-teal-100/30 border-l-4 border-teal-400/50 hover:border-teal-500 transition-all duration-300 group/skill"
              >
                <svg class="w-5 h-5 text-teal-600 group-hover/skill:scale-125 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-slate-700 text-sm sm:text-base font-medium group-hover/skill:text-teal-800 transition-colors">{{ skill }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Language skills - Enhanced -->
    <section ref="langRef" class="section-pad container-narrow border-t-2 border-gradient-to-r from-transparent via-slate-200 to-transparent relative z-10">
      <div class="mb-12 sm:mb-16">
        <div class="text-center">
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight bg-gradient-to-r from-slate-800 via-slate-700 to-teal-700 bg-clip-text text-transparent">
            Languages skills
          </h2>
          <div class="w-24 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent mx-auto"></div>
          <p class="text-slate-600 text-sm sm:text-base mt-4">Communicating across cultures and borders</p>
        </div>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div
          v-for="(item, index) in about.languageSkills"
          :key="item.language"
          class="group relative rounded-3xl border-2 border-slate-200/80 bg-white/95 backdrop-blur-sm shadow-xl p-8 sm:p-10 transition-all duration-500 hover:shadow-2xl hover:shadow-teal-500/30 hover:border-teal-300/50 hover:-translate-y-3 overflow-hidden"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <!-- Shine effect -->
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          
          <!-- Gradient overlay -->
          <div class="absolute inset-0 bg-gradient-to-br from-teal-50/0 via-transparent to-blue-50/0 group-hover:from-teal-50/70 group-hover:to-blue-50/40 transition-all duration-500"></div>
          
          <!-- Decorative corner -->
          <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-100/0 to-transparent group-hover:from-teal-200/40 transition-all duration-500 rounded-bl-full"></div>
          
          <div class="relative z-10 text-center">
            <!-- Flag Display with enhanced design -->
            <div class="relative mb-6">
              <div class="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-3xl bg-gradient-to-br from-white to-slate-50 shadow-2xl flex items-center justify-center text-5xl sm:text-6xl ring-4 ring-teal-100/50 group-hover:ring-teal-300/70 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative overflow-hidden">
                <!-- Flag background glow -->
                <div class="absolute inset-0 bg-teal-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span class="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                  {{ getLanguageFlag(item.language) }}
                </span>
              </div>
              <!-- Decorative circles around flag -->
              <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-teal-400 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
              <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-teal-300 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300"></div>
            </div>
            
            <!-- Language Name -->
            <h3 class="text-2xl sm:text-3xl font-bold text-slate-800 mb-4 group-hover:text-teal-700 transition-colors duration-300 flex items-center justify-center gap-2">
              <span>{{ item.language }}</span>
              <svg class="w-5 h-5 text-teal-600 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </h3>
            
            <!-- Level Badge with enhanced design -->
            <div class="relative inline-block">
              <div class="px-6 py-3 rounded-full bg-gradient-to-r from-teal-500 via-teal-600 to-teal-500 text-white text-sm sm:text-base font-bold shadow-xl group-hover:shadow-2xl group-hover:shadow-teal-500/50 transform group-hover:scale-105 transition-all duration-300 relative overflow-hidden">
                <!-- Badge shine effect -->
                <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                <span class="relative z-10 flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ item.level }}
                </span>
              </div>
            </div>
            
            <!-- Decorative bottom elements -->
            <div class="mt-8 pt-6 border-t border-slate-200/50 flex items-center justify-center gap-2">
              <div class="h-1 w-12 bg-gradient-to-r from-transparent via-teal-400 to-transparent rounded-full"></div>
              <div class="w-2 h-2 rounded-full bg-teal-400"></div>
              <div class="h-1 w-12 bg-gradient-to-l from-transparent via-teal-400 to-transparent rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { ABOUT_PAGE } from '~/constants/about'

const about = ABOUT_PAGE
const introRef = ref<HTMLElement | null>(null)
const bio2Ref = ref<HTMLElement | null>(null)
const skillsRef = ref<HTMLElement | null>(null)
const langRef = ref<HTMLElement | null>(null)

// Official Social Media Icons (same as Hero)
function getSocialIcon(label: string) {
  const icons: Record<string, any> = {
    'Facebook': () => h('svg', {
      viewBox: '0 0 24 24',
      fill: 'currentColor',
      xmlns: 'http://www.w3.org/2000/svg'
    }, [
      h('path', {
        d: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'
      })
    ]),
    'Instagram': () => h('svg', {
      viewBox: '0 0 24 24',
      fill: 'currentColor',
      xmlns: 'http://www.w3.org/2000/svg'
    }, [
      h('path', {
        d: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'
      })
    ]),
    'LinkedIn': () => h('svg', {
      viewBox: '0 0 24 24',
      fill: 'currentColor',
      xmlns: 'http://www.w3.org/2000/svg'
    }, [
      h('path', {
        d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
      })
    ]),
    'GitHub': () => h('svg', {
      viewBox: '0 0 24 24',
      fill: 'currentColor',
      xmlns: 'http://www.w3.org/2000/svg'
    }, [
      h('path', {
        d: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'
      })
    ])
  }
  const fallbackIcon = about.socialLinks?.find((link) => link.label === label)?.icon || ''
  return icons[label] || (() => h('span', fallbackIcon))
}

function getSocialIconClass(label: string) {
  const classes: Record<string, string> = {
    'Facebook': 'hover:bg-[#1877F2]',
    'Instagram': 'hover:bg-gradient-to-br hover:from-[#F56040] hover:via-[#E1306C] hover:to-[#C13584]',
    'LinkedIn': 'hover:bg-[#0077B5]',
    'GitHub': 'hover:bg-[#181717]'
  }
  return classes[label] || 'hover:bg-teal-500'
}

function getSocialGlowClass(label: string) {
  const classes: Record<string, string> = {
    'Facebook': 'bg-[#1877F2]',
    'Instagram': 'bg-[#E1306C]',
    'LinkedIn': 'bg-[#0077B5]',
    'GitHub': 'bg-[#181717]'
  }
  return classes[label] || 'bg-teal-500'
}

// Language Flags
function getLanguageFlag(language: string) {
  const flags: Record<string, string> = {
    'Lao': '🇱🇦',
    'Thai': '🇹🇭',
    'English': '🇬🇧'
  }
  return flags[language] || '🌐'
}

useScrollReveal(introRef, { start: 'top 88%' })
useScrollReveal(bio2Ref, { start: 'top 88%' })
useScrollReveal(skillsRef, { start: 'top 88%' })
useScrollReveal(langRef, { start: 'top 88%' })
</script>

<style scoped>
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}
</style>
