/** แอนิเมชันวงกลม teal ลอยขึ้นลงเบาๆ (ใช้ใน Hero) */

export function useTealCircleFloat(elementRef: Ref<HTMLElement | null>) {
  onMounted(async () => {
    const el = elementRef.value
    if (!el) return
    const gsap = (await import('gsap')).default
    gsap.to(el, {
      y: -15,
      duration: 2.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    })
  })
}
