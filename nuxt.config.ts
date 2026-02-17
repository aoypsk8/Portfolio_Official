// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2025-02-16',
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    public: {
      /** Mapbox access token สำหรับ globe (ตั้งใน .env เป็น NUXT_PUBLIC_MAPBOX_ACCESS_TOKEN) */
      mapboxAccessToken: '',
      /** Base URL ของ Portfolio Backend API (ตั้งใน .env เป็น NUXT_PUBLIC_API_BASE เช่น http://localhost:4000) */
      apiBase: ''
    }
  },
  vite: {
    optimizeDeps: {
      include: ['gsap']
    }
  },
  app: {
    head: {
      title: 'Portfolio',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Personal portfolio' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Noto+Sans+Thai:wght@400;500;600;700&display=swap' }
      ]
    }
  },
  css: ['~/assets/css/main.css']
})
