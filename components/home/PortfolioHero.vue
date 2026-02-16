<template>
  <section id="hero"
    class="relative min-h-[85vh] sm:min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
    <div
      class="absolute inset-x-0 top-0 h-48 sm:h-56 bg-gradient-to-b from-slate-800/75 via-teal-900/40 to-transparent pointer-events-none z-[1]"
      aria-hidden />
    <div  
      class="globe-scroll-wrapper fixed right-0 top-1/2 z-[2] hidden md:flex items-center justify-end pointer-events-none w-[45vw] min-w-[280px] h-[100vh] transition-opacity duration-500" 
      aria-hidden
      :style="globeScrollStyle"
    >
      <div class="h-[100vh] w-[100vh] flex-shrink-0 rounded-full overflow-hidden translate-x-72 md:translate-x-72">
        <ClientOnly>
          <HomePortfolioGlobeMap :background="true" :location="globeLocation" class="h-full w-full" />
          <template #fallback>
            <div class="h-full w-full rounded-full bg-gradient-to-br from-slate-200/50 to-teal-100/40" />
          </template>
        </ClientOnly>
      </div>
    </div>

    <div class="container-narrow section-pad relative z-10 pr-12 md:pr-[22vw] lg:pr-[20vw]">
      <div class="max-w-2xl">
        <h1 ref="titleRef"
          class="text-2xl font-bold text-slate-800 leading-[1.2] tracking-tight mb-4 sm:text-3xl sm:mb-5 md:text-4xl md:mb-6 lg:text-5xl lg:leading-[1.15]">
          {{ title }}
        </h1>
        <p ref="subtitleRef" class="text-slate-600 text-base leading-relaxed mb-6 sm:text-lg sm:mb-8 max-w-xl">
          {{ subtitle }}
        </p>
        <!-- Social Media Buttons - Enhanced -->
        <div ref="socialRef" class="flex flex-wrap gap-3 sm:gap-4 mb-8">
          <a 
            v-for="s in socialLinks" 
            :key="s.label" 
            :href="s.href" 
            target="_blank" 
            rel="noopener"
            class="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-slate-600 hover:text-white hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-slate-200 hover:border-transparent"
            :class="getSocialIconClass(s.label)"
            :aria-label="s.label"
          >
            <!-- Official Social Media Icons -->
            <component :is="getSocialIcon(s.label)" class="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 group-hover:scale-110" />
            <!-- Glow effect on hover -->
            <span class="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300" :class="getSocialGlowClass(s.label)"></span>
          </a>
        </div>
        
        <!-- CTA Buttons - Enhanced -->
        <div v-if="(primaryActions?.length || secondaryActions?.length)" ref="ctaRef"
          class="flex flex-wrap items-center gap-4 sm:gap-5">
          <NuxtLink 
            v-for="a in primaryActions" 
            :key="a.href" 
            :to="a.href"
            class="group relative inline-flex items-center justify-center min-h-[48px] sm:min-h-[52px] px-8 sm:px-10 py-3 sm:py-4 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl shadow-lg hover:shadow-xl hover:shadow-teal-500/50 hover:from-teal-600 hover:to-teal-700 transform hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
          >
            <!-- Shine effect -->
            <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
            <span class="relative z-10">{{ a.label }}</span>
          </NuxtLink>
          <NuxtLink 
            v-for="a in secondaryActions" 
            :key="a.href" 
            :to="a.href"
            class="group relative inline-flex items-center justify-center min-h-[48px] sm:min-h-[52px] px-8 sm:px-10 py-3 sm:py-4 text-sm sm:text-base font-semibold text-slate-700 bg-white rounded-xl border-2 border-slate-300 shadow-md hover:shadow-lg hover:border-teal-400 hover:text-teal-700 hover:bg-teal-50 transform hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span class="relative z-10">{{ a.label }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>
    
  </section>
</template>

<script setup lang="ts">
import { h } from 'vue'

const props = withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
    socialLinks?: { label: string; href: string; icon: string }[]
    primaryActions?: { label: string; href: string }[]
    secondaryActions?: { label: string; href: string }[]
  }>(),
  {
    title: "I'm Full-Stack web and mobile app development, UX/UI designer.",
    subtitle:
      'With experience in Flutter, React.js, Node.js, SQL and a passion for clean UX/UI. I focus on building scalable and user-friendly applications.',
    socialLinks: () => [
      { label: 'Facebook', href: 'https://facebook.com', icon: 'f' },
      { label: 'Instagram', href: 'https://instagram.com', icon: '📷' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/aoy-phongsakoun-a4163730b/', icon: 'in' }
    ],
    primaryActions: () => [],
    secondaryActions: () => []
  }
)

// Official Social Media Icons
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
    ])
  }
  const fallbackIcon = props.socialLinks?.find((link) => link.label === label)?.icon || ''
  return icons[label] || (() => h('span', fallbackIcon))
}

function getSocialIconClass(label: string) {
  const classes: Record<string, string> = {
    'Facebook': 'hover:bg-[#1877F2]',
    'Instagram': 'hover:bg-gradient-to-br hover:from-[#F56040] hover:via-[#E1306C] hover:to-[#C13584]',
    'LinkedIn': 'hover:bg-[#0077B5]'
  }
  return classes[label] || 'hover:bg-teal-500'
}

function getSocialGlowClass(label: string) {
  const classes: Record<string, string> = {
    'Facebook': 'bg-[#1877F2]',
    'Instagram': 'bg-[#E1306C]',
    'LinkedIn': 'bg-[#0077B5]'
  }
  return classes[label] || 'bg-teal-500'
}

const titleRef = ref<HTMLElement | null>(null)
const subtitleRef = ref<HTMLElement | null>(null)
const socialRef = ref<HTMLElement | null>(null)
const tealCircleRef = ref<HTMLElement | null>(null)
const blob1Ref = ref<HTMLElement | null>(null)
const blob2Ref = ref<HTMLElement | null>(null)
const ctaRef = ref<HTMLElement | null>(null)

const scrollY = ref(0)
const SCROLL_RANGE = 0.75
/** เลื่อนลงมาก = เยอรมนี, อยู่บน = ลาว - ปรับให้เปลี่ยนเร็วขึ้น (scroll เล็กน้อยก็เปลี่ยน) */
const LOCATION_SCROLL_THRESHOLD = 0.1 // ลดจาก 0.4 เป็น 0.1 (10% ของ viewport height)
/** จุดที่ลูกโลกเริ่ม fade out จนหายไป (เมื่อ scroll ลงมาถึง About) */
const FADE_OUT_START = 0.6 // เริ่ม fade out เมื่อ scroll 60% ของ SCROLL_RANGE
const FADE_OUT_END = 0.85 // หายไปหมดเมื่อ scroll 85% ของ SCROLL_RANGE

const globeLocation = computed(() => {
  if (import.meta.server) return 'laos'
  const vh = typeof window !== 'undefined' ? window.innerHeight : 600
  return scrollY.value > vh * LOCATION_SCROLL_THRESHOLD ? 'germany' : 'laos'
})

const globeScrollStyle = computed((): Record<string, string | number> => {
  if (import.meta.server) return { transform: 'translateY(-50%) translateX(0)', opacity: 1 }
  const vh = typeof window !== 'undefined' ? window.innerHeight : 600
  const threshold = vh * SCROLL_RANGE
  const progress = Math.min(1, Math.max(0, scrollY.value / threshold))
  // เลื่อนไปซ้ายมากขึ้น (จาก 50vw เป็น 65vw) เพื่อให้เห็นบางส่วนใน About section
  const translateX = -progress * 65
  
  // คำนวณ opacity: fade out เมื่อ scroll ลงมาถึง About section
  let opacity = 1
  if (progress >= FADE_OUT_START) {
    const fadeProgress = (progress - FADE_OUT_START) / (FADE_OUT_END - FADE_OUT_START)
    opacity = Math.max(0, 1 - fadeProgress) // จาก 1 → 0
  }
  
  return {
    transform: `translateY(-50%) translateX(${translateX}vw)`,
    willChange: 'transform',
    opacity
  }
})

function onScroll() {
  if (import.meta.server) return
  scrollY.value = window.scrollY ?? 0
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    scrollY.value = window.scrollY
    window.addEventListener('scroll', onScroll, { passive: true })
  }
})
onUnmounted(() => {
  if (typeof window !== 'undefined') window.removeEventListener('scroll', onScroll)
})

useHeroAnimation([
  titleRef,
  subtitleRef,
  socialRef,
  ctaRef,
  tealCircleRef,
  blob1Ref,
  blob2Ref
])
useTealCircleFloat(tealCircleRef)
</script>
