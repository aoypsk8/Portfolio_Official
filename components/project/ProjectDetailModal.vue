<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="open"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        @click.self="close"
      >
        <!-- แสดงเนื้อหาโมดัลเฉพาะเมื่อมี project เพื่อกัน runtime error -->
        <div
          v-if="project"
          class="relative w-full max-w-2xl max-h-[90vh] rounded-2xl bg-white shadow-2xl overflow-hidden flex flex-col"
          role="dialog"
          aria-modal="true"
          :aria-label="project.title"
        >
          <!-- Header with logo + title + close -->
          <div class="flex items-center gap-4 p-4 sm:p-6 border-b border-slate-200 shrink-0">
            <div
              v-if="project.logo"
              class="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold shrink-0 overflow-hidden"
              :style="{ backgroundColor: isLogoUrl(project.logo) ? 'transparent' : (project.logoBg ?? '#0d9488'), color: isLogoUrl(project.logo) ? undefined : 'white' }"
            >
              <img v-if="isLogoUrl(project.logo)" :src="project.logo" :alt="project.title" class="w-full h-full object-contain">
              <span v-else>{{ project.logo }}</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-bold text-slate-800 flex-1 min-w-0 truncate">
              {{ project.title }}
            </h2>
            <button
              type="button"
              class="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
              aria-label="Close"
              @click="close"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <!-- Body: scrollable -->
          <div class="overflow-y-auto flex-1 p-4 sm:p-6 space-y-6">
            <p class="text-slate-600 text-sm sm:text-base leading-relaxed">
              {{ project.description }}
            </p>

            <!-- All images gallery -->
            <div v-if="allImages.length" class="space-y-3">
              <p class="text-xs font-semibold text-teal-600 uppercase tracking-wider">Screenshots & Prototypes</p>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <a
                  v-for="(img, j) in allImages"
                  :key="j"
                  :href="img"
                  target="_blank"
                  rel="noopener"
                  class="block aspect-video rounded-xl overflow-hidden bg-slate-100 ring-1 ring-slate-200 hover:ring-teal-400 focus:ring-2 focus:ring-teal-500 transition-shadow"
                >
                  <img :src="img" :alt="`${project.title} ${j + 1}`" class="w-full h-full object-contain" loading="lazy">
                </a>
              </div>
            </div>

            <!-- Tags -->
            <div v-if="project.tags?.length" class="flex flex-wrap gap-2">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200"
              >
                {{ tag }}
              </span>
            </div>

            <!-- Link -->
            <a
              v-if="project.link"
              :href="project.link"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 text-white font-medium text-sm hover:bg-teal-600 transition-colors"
            >
              View project
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { Project } from '~/types/portfolio'

const props = withDefaults(
  defineProps<{
    open: boolean
    project: Project | null
  }>(),
  { project: null }
)

const emit = defineEmits<{ close: [] }>()

function close() {
  emit('close')
}

// ใช้ document เฉพาะบน client (Nuxt SSR ไม่มี document)
watch(() => props.open, (isOpen) => {
  if (typeof document === 'undefined') return
  if (!isOpen) {
    document.body.style.overflow = ''
    return
  }
  document.body.style.overflow = 'hidden'
  const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
  document.addEventListener('keydown', onEsc)
  return () => {
    document.removeEventListener('keydown', onEsc)
    document.body.style.overflow = ''
  }
}, { immediate: true })

function isLogoUrl(logo: string): boolean {
  return logo.startsWith('http://') || logo.startsWith('https://') || logo.startsWith('/')
}

const allImages = computed(() => {
  const p = props.project
  if (!p) return []
  if (p.images?.length) return p.images
  if (p.image) return [p.image]
  return []
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.2s ease;
}
.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95);
}
</style>
