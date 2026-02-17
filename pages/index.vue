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
      :title="config?.hero?.title"
      :subtitle="config?.hero?.subtitle"
      :social-links="config?.hero?.socialLinks"
      :primary-actions="heroActions?.primary ?? []"
      :secondary-actions="heroActions?.secondary ?? []"
    />
    
    <section aria-label="About" class="page-home-section relative z-10">
      <AboutPortfolioAbout :about-text="config?.about?.text" :skills="config?.about?.skills" />
    </section>
    <section aria-label="Projects" class="page-home-section page-home-section-alt relative z-10">
      <ProjectPortfolioProjectsTimeline :projects="projects ?? []" />
    </section>
    <section aria-label="Blogs" class="page-home-section relative z-10">
      <ActivitiesPortfolioBlogs :posts="blogPosts ?? []" />
    </section>
    <section aria-label="Work" class="page-home-section page-home-section-alt relative z-10">
      <ActivitiesPortfolioWorkExperience :experiences="workExperiences ?? []" />
    </section>
  
    <section aria-label="Contact" class="page-home-section relative z-10">
      <ContactPortfolioContact :message="config?.contact?.message" :links="config?.contact?.links" />
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Project, BlogPost, WorkExperience } from '~/types/portfolio'
import { HERO_ACTIONS } from '~/constants/navigation'
import { useApiNavigation, useApiHome } from '~/composables/usePortfolioApi'

const mobileAlert = useMobileAlert()
const showMobilePopup = computed(() => mobileAlert.showPopup.value)

watch(showMobilePopup, (newVal) => {
  console.log('[index.vue] showMobilePopup changed to:', newVal)
}, { immediate: true })

const config = usePortfolioConfig()

const navFallback = { links: [] as { href: string; label: string }[], heroActions: HERO_ACTIONS }
const { data: navData } = useApiNavigation(navFallback)
const heroActions = computed(() => navData.value?.heroActions ?? HERO_ACTIONS)

const homeFallback = { projects: [] as Project[], blogPosts: [] as BlogPost[], workExperiences: [] as WorkExperience[] }
const { data: homeData } = useApiHome(homeFallback)
const projects = computed(() => homeData.value?.projects ?? [])
const blogPosts = computed(() => homeData.value?.blogPosts ?? [])
const workExperiences = computed(() => homeData.value?.workExperiences ?? [])
</script>
