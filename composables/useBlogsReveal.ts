/** แอนิเมชันส่วน Blogs: title + การ์ด slide-up / fade-in */

export function useBlogsReveal(
  titleRef: Ref<HTMLElement | null>,
  postRefs: Ref<HTMLElement[]>
) {
  onMounted(async () => {
    const gsap = (await import('gsap')).default
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    gsap.registerPlugin(ScrollTrigger)

    const title = titleRef.value
    const posts = postRefs.value.filter(Boolean)
    if (!title) return

    gsap.from(title, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      scrollTrigger: { trigger: title, start: 'top 85%', toggleActions: 'play none none reverse' }
    })

    posts.forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 50,
        duration: 0.6,
        scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' }
      })
    })
  })
}
