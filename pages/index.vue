<template>
  <div class="page-home relative overflow-hidden">
    <!-- Decorative background elements -->
    <div class="fixed inset-0 pointer-events-none z-0">
      <div class="absolute top-1/4 right-0 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
    </div>
    
    <!-- Mobile Alert Popup -->
    <MobileAlertPopup :show="showMobilePopup" @close="mobileAlert.closePopup" />
    
    <HomePortfolioHero
      :title="config.hero?.title"
      :subtitle="config.hero?.subtitle"
      :social-links="config.hero?.socialLinks"
      :primary-actions="heroActions.primary"
      :secondary-actions="heroActions.secondary"
    />
    
    <section aria-label="About" class="page-home-section relative z-10">
      <AboutPortfolioAbout :about-text="config.about?.text" :skills="config.about?.skills" />
    </section>
    <section aria-label="Projects" class="page-home-section page-home-section-alt relative z-10">
      <ProjectPortfolioProjectsTimeline :projects="projects" />
    </section>
    <section aria-label="Blogs" class="page-home-section relative z-10">
      <ActivitiesPortfolioBlogs :posts="blogPosts" />
    </section>
    <section aria-label="Work" class="page-home-section page-home-section-alt relative z-10">
      <ActivitiesPortfolioWorkExperience :experiences="workExperiences" />
    </section>
  
    <section aria-label="Contact" class="page-home-section relative z-10">
      <ContactPortfolioContact :message="config.contact?.message" :links="config.contact?.links" />
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Project, BlogPost, WorkExperience } from '~/types/portfolio'
import { HERO_ACTIONS } from '~/constants/navigation'

// แสดง alert เฉพาะ mobile ทุกครั้งที่เข้า home page
const mobileAlert = useMobileAlert()
const showMobilePopup = computed(() => mobileAlert.showPopup.value)

// Debug: ตรวจสอบว่า mobileAlert ทำงานหรือไม่
watch(showMobilePopup, (newVal) => {
  console.log('[index.vue] showMobilePopup changed to:', newVal)
}, { immediate: true })

const config = usePortfolioConfig()
const heroActions = HERO_ACTIONS

const projects: Project[] = [
  {
    title: 'MMoneyX',
    description:
      'MMoneyX is a e-wallet app by Lao Mobile Money which is sub company of Lao Telecom. That combines payment, transfer, and telecom services in one platform.',
    logo: 'm',
    logoBg: '#ef4444',
    link: '#',
    tags: ['Flutter', 'Mobile']
  },
  {
    title: 'Project Two',
    description: 'Another project with focus on performance and clean architecture.',
    logo: 'P',
    logoBg: '#0ea5e9',
    link: '#',
    tags: ['React', 'Node.js']
  },
  {
    title: 'Project Three',
    description: 'Third project showcasing API integration and UX/UI design.',
    logo: '3',
    logoBg: '#10b981',
    link: '#',
    tags: ['Vue', 'SQL']
  }
]

const blogPosts: BlogPost[] = [
  {
    date: '17 May 2025',
    title: 'The Benefits of Cloud Computing',
    description:
      'Explore how cloud computing can help your business scale and reduce infrastructure costs.',
    href: '#'
  },
  {
    date: '10 May 2025',
    title: 'Modern Frontend in 2025',
    description: 'A look at the latest trends in frontend development and tooling.',
    href: '#'
  },
  {
    date: '01 May 2025',
    title: 'Design Systems That Scale',
    description: 'Building consistent and maintainable design systems for product teams.',
    href: '#'
  }
]

const workExperiences: WorkExperience[] = [
  {
    company: 'IndochinaBank',
    role: 'Software Engineer',
    period: 'Sep 2025 – Present',
    logo: '🏦',
    description: 'Develop and maintain mobile and web applications for banking systems. Work on frontend, backend, and mobile development, primarily Flutter and Nuxt.js. Implement application flows and UX/UI improvements.'
  },
  {
    company: 'Lao Mobile Money (Lao Telecom)',
    role: 'Software Engineer',
    period: 'Oct 2023 – Sep 2025',
    logo: '💳',
    description: 'Developed and maintained fintech, e-wallet and telecom services applications. Built React and Next.js applications with Redux. Integrated payment gateways, QR payment systems, and OTP verification.'
  }
]
</script>
