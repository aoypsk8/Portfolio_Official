// โหลด gsap เฉพาะบน client เพื่อไม่ให้ SSR หรือ Vite pre-bundle ต้อง resolve แพ็กเกจ
export default defineNuxtPlugin(async () => {
  const gsap = (await import('gsap')).default
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)
  return {
    provide: {
      gsap,
      ScrollTrigger
    }
  }
})
