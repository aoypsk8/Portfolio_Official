/**
 * แอนิเมชันแบบ Polarsteps: เผยลูกหลายตัวเมื่อเลื่อนถึง (fade + slide up) แบบ stagger
 * ใช้กับ grid การ์ด หรือรายการใน section
 */
export function useStaggerReveal(
  containerRef: Ref<HTMLElement | null>,
  options?: {
    /** CSS selector สำหรับ element ที่จะ animate (default: direct children) */
    childSelector?: string
    /** ระยะ stagger ระหว่างแต่ละตัว (วินาที) */
    stagger?: number
    /** ระยะ y เริ่มต้น (px) */
    y?: number
    /** trigger เมื่อส่วนบนของ container อยู่ที่ % ของ viewport */
    start?: string
    /** duration ต่อ element */
    duration?: number
  }
) {
  const {
    childSelector = '> *',
    stagger = 0.1,
    y = 28,
    start = 'top 88%',
    duration = 0.75
  } = options ?? {}

  onMounted(async () => {
    const container = containerRef.value
    if (!container) return
    const gsap = (await import('gsap')).default
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    gsap.registerPlugin(ScrollTrigger)

    const children = container.querySelectorAll(childSelector)
    if (children.length === 0) return

    gsap.from(children, {
      opacity: 0,
      y,
      duration,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container,
        start,
        toggleActions: 'play none none reverse'
      }
    })
  })
}
