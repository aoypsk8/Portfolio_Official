/** ViewModel: timeline scroll (pin visual, side swap, step reveal) */

export function useProjectsScroll(
  containerRef: Ref<HTMLElement | null>,
  hasProjects: boolean
) {
  onMounted(async () => {
    const container = containerRef.value
    if (!container || !hasProjects) return

    const gsap = (await import('gsap')).default
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    gsap.registerPlugin(ScrollTrigger)

    const isMobile = window.innerWidth < 768

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        pin: '.project-visual',
        pinSpacing: false,
        invalidateOnRefresh: true
      }
    })

    tl.to(
      '.phone-screen',
      {
        y: () => {
          const screen = container.querySelector('.phone-screen') as HTMLElement
          const frame = container.querySelector('.phone-frame') as HTMLElement
          if (!screen?.offsetHeight || !frame?.offsetHeight) return 0
          return -(screen.offsetHeight - frame.offsetHeight)
        },
        ease: 'none'
      },
      0
    )

    if (!isMobile) {
      tl.to('.project-visual', { xPercent: -100, ease: 'power2.inOut' }, 0.2)
      tl.to('.project-content', { xPercent: 100, ease: 'power2.inOut' }, 0.2)
      tl.to('.project-visual', { xPercent: 0, ease: 'power2.inOut' }, 0.6)
      tl.to('.project-content', { xPercent: 0, ease: 'power2.inOut' }, 0.6)
    } else {
      tl.fromTo('.phone-frame', { scale: 0.8 }, { scale: 1, ease: 'none' }, 0)
    }

    container.querySelectorAll('.project-step').forEach((step) => {
      gsap.from(step as HTMLElement, {
        opacity: 0,
        y: 30,
        scrollTrigger: {
          trigger: step as HTMLElement,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play reverse play reverse'
        }
      })
    })
  })

  onBeforeUnmount(async () => {
    const el = containerRef.value
    if (!el) return
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    ScrollTrigger.getAll().forEach((t) => {
      if (t.trigger && el.contains(t.trigger as Node)) t.kill()
    })
  })
}
