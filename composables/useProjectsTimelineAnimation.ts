/** แอนิเมชันส่วน Projects: title reveal, เส้น timeline วาด, การ์ด slide-in ซ้าย/ขวา */

export function useProjectsTimelineAnimation(
  titleRef: Ref<HTMLElement | null>,
  lineRef: Ref<HTMLElement | null>,
  cardRefs: Ref<HTMLElement[]>,
  getCount: () => number
) {
  onMounted(async () => {
    const gsap = (await import('gsap')).default
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    gsap.registerPlugin(ScrollTrigger)

    const title = titleRef.value
    const line = lineRef.value
    const cards = cardRefs.value.filter(Boolean)
    const count = getCount()

    if (!title || !line || !count) return

    // Title: fade + y
    gsap.from(title, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      scrollTrigger: { trigger: title, start: 'top 85%', toggleActions: 'play none none reverse' }
    })

    // เส้น timeline วาดจากบนลงล่าง
    gsap.to(line, {
      scaleY: 1,
      duration: 1.2,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: line,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })

    // การ์ดแต่ละใบ: slide จากซ้ายหรือขวา
    cards.forEach((card, i) => {
      const fromX = i % 2 === 0 ? -60 : 60
      gsap.from(card, {
        opacity: 0,
        x: fromX,
        duration: 0.7,
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none reverse'
        }
      })
    })
  })
}
