/** ViewModel: แอนิเมชัน Hero (fade + stagger) โหลด gsap แบบ dynamic เฉพาะ client */

const HERO_ANIMATION = {
  opacity: 0,
  y: 32,
  duration: 0.8,
  stagger: 0.12,
  ease: 'power2.out' as const
}

export function useHeroAnimation(refs: Ref<HTMLElement | null>[]) {
  onMounted(async () => {
    const el = refs[0]?.value
    if (!el) return
    const gsap = (await import('gsap')).default
    const targets = refs.map((r) => r.value).filter(Boolean)
    gsap.from(targets, HERO_ANIMATION)
  })
}
