<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out"
    :class="atTop ? 'pt-4 px-4 md:pt-5 md:px-6' : 'py-3 px-4'"
  >
    <nav
      class="mx-auto flex items-center justify-between transition-all duration-300 ease-out"
      :class="navBarClass"
    >
      <!-- Logo: ไอคอน + ชื่อ -->
      <NuxtLink
        to="/"
        class="flex items-center gap-2.5 shrink-0 transition-all duration-200 focus-visible:rounded-xl focus-visible:ring-2 focus-visible:ring-offset-2"
        :class="atTop
          ? 'text-white hover:text-white/95 focus-visible:ring-white/40'
          : 'text-slate-800 hover:text-teal-600 focus-visible:ring-teal-500/50'"
      >
        <span
          class="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200"
          :class="atTop ? 'bg-white/25 hover:bg-white/35' : 'bg-teal-100 text-teal-600 hover:bg-teal-200/80'"
          aria-hidden
        >
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="m12 6 0 6 4-2" />
          </svg>
        </span>
        <span class="text-lg font-semibold tracking-tight sm:text-xl">
          {{ siteName }}
        </span>
      </NuxtLink>

      <!-- Desktop: ลิงก์กลาง (แสดงเมื่อ scrolled) -->
      <ul
        v-show="!mobileOpen"
        class="hidden md:flex items-center gap-1 rounded-full bg-slate-100/90 px-1.5 py-1 transition-all duration-300"
        :class="atTop ? 'invisible opacity-0 pointer-events-none' : 'visible opacity-100'"
      >
        <li v-for="item in links" :key="item.href">
          <NuxtLink
            v-if="isInternalLink(item.href)"
            :to="item.href"
            :class="navLinkClass(item)"
            @click="mobileOpen = false"
          >
            {{ item.label }}
          </NuxtLink>
          <a
            v-else
            :href="item.href"
            :class="navLinkClass(item)"
            @click="mobileOpen = false"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>

      <!-- ขวา: ปุ่ม Contact + Hamburger -->
      <div class="flex items-center gap-1.5 sm:gap-2">
        <NuxtLink
          to="/contact"
          class="hidden sm:inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 min-h-[44px]"
          :class="atTop
            ? 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-md border border-white/30 focus-visible:ring-white/50'
            : 'bg-teal-500 text-white hover:bg-teal-600 shadow-sm hover:shadow-md focus-visible:ring-teal-400'"
        >
          Contact
        </NuxtLink>
        <button
          ref="menuButtonRef"
          type="button"
          class="flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200 md:h-10 md:w-10 focus-visible:ring-2 focus-visible:ring-offset-2"
          :class="atTop
            ? 'text-white hover:bg-white/20 focus-visible:ring-white/40'
            : 'text-slate-600 hover:bg-slate-100 hover:text-teal-600 focus-visible:ring-teal-500/50'"
          aria-label="Toggle menu"
          :aria-expanded="mobileOpen"
          @click="mobileOpen = !mobileOpen"
        >
          <span class="relative flex h-5 w-5 flex-col items-center justify-center gap-1.5">
            <span
              class="block h-0.5 w-5 shrink-0 rounded-full bg-current transition-all duration-200"
              :class="mobileOpen ? 'translate-y-[5px] rotate-45' : ''"
            />
            <span
              class="block h-0.5 w-5 shrink-0 rounded-full bg-current transition-all duration-200"
              :class="mobileOpen ? 'opacity-0 scale-x-0' : ''"
            />
            <span
              class="block h-0.5 w-5 shrink-0 rounded-full bg-current transition-all duration-200"
              :class="mobileOpen ? '-translate-y-[5px] -rotate-45' : ''"
            />
          </span>
        </button>
      </div>
    </nav>

    <!-- Dropdown menu: มือถือเต็มจอ / เดสก์ท็อปเล็กโผล่ขวาบน -->
    <Teleport to="body">
      <Transition name="mobile-menu">
        <div
          v-show="mobileOpen"
          class="fixed inset-0 z-[9999]"
          aria-hidden
        >
          <button
            type="button"
            class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm md:bg-slate-900/20"
            aria-label="Close menu"
            @click="mobileOpen = false"
          />
          <div
            data-menu-panel
            class="absolute left-4 right-4 top-20 z-[10000] rounded-2xl border border-slate-200/80 bg-white shadow-[var(--shadow-nav)] overflow-hidden md:left-auto md:w-48 md:min-w-[11rem] md:rounded-xl md:py-1"
            :style="dropdownPanelStyle"
          >
            <ul class="py-2 md:py-1">
              <li v-for="item in links" :key="item.href">
                <NuxtLink
                  v-if="isInternalLink(item.href)"
                  :to="item.href"
                  :class="[
                    'block px-5 py-3.5 text-[15px] font-medium transition-colors rounded-lg mx-2 md:px-3 md:py-2 md:text-sm md:mx-1.5 md:rounded-md',
                    isActive(item) ? 'bg-teal-50 text-teal-700' : 'text-slate-700 hover:bg-slate-50'
                  ]"
                  @click="mobileOpen = false"
                >
                  {{ item.label }}
                </NuxtLink>
                <a
                  v-else
                  :href="item.href"
                  :class="[
                    'block px-5 py-3.5 text-[15px] font-medium transition-colors rounded-lg mx-2 md:px-3 md:py-2 md:text-sm md:mx-1.5 md:rounded-md',
                    isActive(item) ? 'bg-teal-50 text-teal-700' : 'text-slate-700 hover:bg-slate-50'
                  ]"
                  @click="mobileOpen = false"
                >
                  {{ item.label }}
                </a>
              </li>
              <li class="mx-2 mt-1 border-t border-slate-100 md:mx-1.5 md:mt-1 md:pt-1">
                <NuxtLink
                  to="/contact"
                  class="mx-2 mt-2 flex items-center justify-center rounded-xl bg-teal-500 px-4 py-3.5 text-[15px] font-semibold text-white hover:bg-teal-600 transition-colors md:mx-1.5 md:mt-1.5 md:rounded-lg md:px-3 md:py-2 md:text-sm"
                  @click="mobileOpen = false"
                >
                  Contact
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<script setup lang="ts">
import type { NavLink } from '~/types/portfolio'
import { NAV_LINKS } from '~/constants/navigation'

withDefaults(
  defineProps<{
    links?: NavLink[]
    siteName?: string
  }>(),
  { links: () => NAV_LINKS, siteName: 'Portfolio' }
)

const route = useRoute()
const mobileOpen = ref(false)
const menuButtonRef = ref<HTMLElement | null>(null)
/** ตำแหน่ง dropdown ให้โผล่ใต้ไอคอนเมนู (เดสก์ท็อป) */
const dropdownPosition = ref({ top: 0, right: 0 })
const isDesktop = ref(false)

const scrollY = ref(0)
const SCROLL_THRESHOLD = 56

const atTop = computed(() => {
  if (route.path !== '/') return false
  return scrollY.value < SCROLL_THRESHOLD
})

const navBarClass = computed(() => {
  if (atTop.value) {
    return 'container-narrow max-w-6xl border-none rounded-none'
  }
  return 'max-w-3xl xl:max-w-4xl w-full rounded-full bg-white/95 backdrop-blur-xl shadow-[var(--shadow-nav)] border border-slate-200/70 px-4 py-2.5 sm:px-5 sm:py-3'
})

/** สไตล์ตำแหน่ง panel: เดสก์ท็อปโผล่ใต้ปุ่มเมนู */
const dropdownPanelStyle = computed(() => {
  if (!isDesktop.value || !mobileOpen.value) return {}
  return {
    top: `${dropdownPosition.value.top}px`,
    right: `${dropdownPosition.value.right}px`
  }
})

function updateDropdownPosition() {
  if (typeof window === 'undefined' || !menuButtonRef.value) return
  const rect = menuButtonRef.value.getBoundingClientRect()
  const gap = 6
  dropdownPosition.value = {
    top: rect.bottom + gap,
    right: window.innerWidth - rect.right
  }
}

function onScroll() {
  if (import.meta.server) return
  scrollY.value = window.scrollY ?? 0
}

watch(mobileOpen, (open) => {
  if (open) nextTick(updateDropdownPosition)
})

function updateIsDesktop() {
  isDesktop.value = typeof window !== 'undefined' && window.innerWidth >= 768
}

onMounted(() => {
  if (typeof window === 'undefined') return
  scrollY.value = window.scrollY
  window.addEventListener('scroll', onScroll, { passive: true })
  updateIsDesktop()
  window.addEventListener('resize', updateIsDesktop)
})
onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', updateIsDesktop)
  }
})

function isInternalLink(href: string) {
  return href === '/' || href === '/about' || href === '/project' || href === '/activity' || href === '/certificates' || href === '/contact' || (!href.startsWith('http') && !href.includes('#'))
}

function isActive(item: NavLink) {
  const path = route.path
  if (item.href === '/') return path === '/'
  if (item.href === '/about') return path === '/about'
  if (item.href === '/project') return path === '/project'
  if (item.href === '/activity') return path === '/activity'
  if (item.href === '/certificates') return path === '/certificates'
  if (item.href === '/contact') return path === '/contact'
  if (item.href.startsWith('/#')) return path === '/' && (typeof window !== 'undefined' && window.location.hash === item.href.slice(1))
  return false
}

function navLinkClass(item: NavLink) {
  const base = 'relative px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200'
  if (isActive(item)) {
    return `${base} bg-white text-teal-700 shadow-sm`
  }
  return `${base} text-slate-600 hover:text-slate-800 hover:bg-white/70`
}
</script>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.2s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
}
.mobile-menu-enter-to,
.mobile-menu-leave-from {
  opacity: 1;
}
.mobile-menu-enter-active [data-menu-panel],
.mobile-menu-leave-active [data-menu-panel] {
  transition: transform 0.2s ease;
}
.mobile-menu-enter-from [data-menu-panel],
.mobile-menu-leave-to [data-menu-panel] {
  transform: translateY(-8px);
}
</style>
