/** แอนิเมชันส่วน Work experience: การ์ด fade-in + รายการ stagger */

export function useWorkExperienceReveal(
  titleRef: Ref<HTMLElement | null>,
  cardRef: Ref<HTMLElement | null>,
  itemRefs: Ref<HTMLElement[]>
) {
  onMounted(async () => {
    const gsap = (await import('gsap')).default
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    gsap.registerPlugin(ScrollTrigger)

    const title = titleRef.value
    const card = cardRef.value
    const items = itemRefs.value.filter(Boolean)
    if (!title || !card) return

    gsap.from(title, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      scrollTrigger: { trigger: title, start: 'top 85%', toggleActions: 'play none none reverse' }
    })

    gsap.from(card, {
      opacity: 0,
      scale: 0.98,
      y: 30,
      duration: 0.7,
      scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none reverse' }
    })

    items.forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        x: -20,
        duration: 0.5,
        scrollTrigger: { trigger: el, start: 'top 95%', toggleActions: 'play none none reverse' }
      })
    })
  })
}
