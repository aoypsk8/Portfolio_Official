/** ViewModel: แอนิเมชัน scroll reveal (fade + y) ใช้กับ About, Contact */

const REVEAL_ANIMATION = {
  opacity: 0,
  y: 32,
  duration: 1,
  ease: 'power3.out' as const
}

const SCROLL_TRIGGER_DEFAULT = {
  start: 'top 85%' as const,
  toggleActions: 'play none none reverse' as const
}

export function useScrollReveal(
  elementRef: Ref<HTMLElement | null>,
  options?: { start?: string; end?: string }
) {
  onMounted(async () => {
    const el = elementRef.value
    if (!el) return
    const gsap = (await import('gsap')).default
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    gsap.registerPlugin(ScrollTrigger)
    gsap.from(el, {
      ...REVEAL_ANIMATION,
      scrollTrigger: {
        trigger: el,
        start: options?.start ?? SCROLL_TRIGGER_DEFAULT.start,
        end: options?.end,
        toggleActions: SCROLL_TRIGGER_DEFAULT.toggleActions
      }
    })
  })
}
