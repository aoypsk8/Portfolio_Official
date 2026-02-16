<template>
  <section class="globe-section overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/80 shadow-[var(--shadow-card)]">
    <div class="flex flex-col items-center px-4 pt-8 pb-4 sm:pt-10 sm:pb-5">
      <p class="section-label mb-1 text-slate-500">
        Explore
      </p>
      <h2 class="text-xl font-bold text-slate-800 sm:text-2xl">
        Hello, Earth
      </h2>
      <p class="text-slate-600 text-sm mt-1 max-w-md text-center">
        ลองหมุนลูกโลกเล่นได้เลย
      </p>
    </div>
    <!-- Mapbox ใช้เฉพาะ client และต้องมี token -->
    <ClientOnly>
      <div
        v-if="hasToken"
        class="h-64 w-full sm:h-80 md:h-96 rounded-b-2xl overflow-hidden"
      >
        <HomePortfolioGlobeMap class="h-full w-full" />
      </div>
      <div
        v-else
        class="mx-4 mb-4 flex h-64 sm:h-80 md:h-96 items-center justify-center rounded-2xl bg-slate-200/60 text-slate-500 text-sm text-center px-4"
      >
        <span>ตั้งค่า NUXT_PUBLIC_MAPBOX_ACCESS_TOKEN ใน .env เพื่อแสดงลูกโลก</span>
      </div>
      <template #fallback>
        <div class="mx-4 mb-4 flex h-64 sm:h-80 md:h-96 items-center justify-center rounded-2xl bg-slate-200/60 text-slate-500 text-sm">
          Loading globe…
        </div>
      </template>
    </ClientOnly>
  </section>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const hasToken = computed(() => Boolean((config.public?.mapboxAccessToken as string)?.trim()))
</script>
