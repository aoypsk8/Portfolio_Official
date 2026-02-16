<template>
  <div class="min-h-screen flex flex-col bg-slate-50/80">
    <PortfolioHeader />
    <!-- หน้าแรกให้ Hero ลอยใต้ Nav; หน้าอื่นเพิ่ม padding กันเนื้อทับ Nav -->
    <main class="flex-1" :class="{ 'pt-[4.5rem]': route.path !== '/' }">
      <slot />
    </main>
    <footer class="border-t border-slate-200/80 bg-white py-6 px-4 sm:py-8 sm:px-6">
      <div class="container-narrow flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <ul class="flex flex-wrap justify-center gap-4 sm:gap-6">
          <li v-for="item in navLinks" :key="item.href">
            <NuxtLink
              v-if="isInternal(item.href)"
              :to="item.href"
              class="text-xs text-slate-600 hover:text-teal-600 transition-colors sm:text-sm"
            >
              {{ item.label }}
            </NuxtLink>
            <a
              v-else
              :href="item.href"
              class="text-xs text-slate-600 hover:text-teal-600 transition-colors sm:text-sm"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
        <p class="text-slate-500 text-xs text-center sm:text-sm">
          © {{ currentYear }} AOY PHONGSAKOUN. All Rights Reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { NAV_LINKS } from '~/constants/navigation'

const route = useRoute()
const currentYear = new Date().getFullYear()
const navLinks = NAV_LINKS

function isInternal(href: string) {
  return href === '/' || href === '/about' || href === '/project' || href === '/activity' || href === '/certificates' || href === '/contact'
}
</script>
