<template>
  <Teleport to="body">
    <Transition name="mobile-alert">
      <div
        v-if="show"
        class="fixed inset-0 z-[10000] flex items-center justify-center p-4"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="close" />
        
        <!-- Popup Card -->
        <div class="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 sm:p-8 transform transition-all z-10">
          <!-- Close Button -->
          <button
            type="button"
            class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors z-20 cursor-pointer"
            aria-label="Close"
            @click="close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Icon -->
          <div class="flex justify-center mb-4">
            <div class="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>

          <!-- Content -->
          <div class="text-center">
            <h3 class="text-xl font-bold text-slate-800 mb-3">
              Better Experience Available
            </h3>
            <p class="text-slate-600 text-sm leading-relaxed mb-6">
              For the best experience with interactive globe and animations, please visit this website on a computer or iPad.
            </p>
            
            <!-- Action Button -->
            <button
              type="button"
              class="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl active:scale-95 cursor-pointer"
              @click="close"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    show?: boolean
  }>(),
  { show: false }
)

watch(() => props.show, (newVal) => {
  console.log('[MobileAlertPopup] show prop changed to:', newVal)
}, { immediate: true })

const emit = defineEmits<{
  close: []
}>()

function close() {
  console.log('[MobileAlertPopup] Close button clicked')
  emit('close')
}
</script>

<style scoped>
/* Transition animations */
.mobile-alert-enter-active,
.mobile-alert-leave-active {
  transition: opacity 0.3s ease;
}

.mobile-alert-enter-active .bg-white,
.mobile-alert-leave-active .bg-white {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.mobile-alert-enter-from {
  opacity: 0;
}

.mobile-alert-enter-from .bg-white {
  transform: scale(0.9) translateY(-10px);
  opacity: 0;
}

.mobile-alert-enter-to {
  opacity: 1;
}

.mobile-alert-enter-to .bg-white {
  transform: scale(1) translateY(0);
  opacity: 1;
}

.mobile-alert-leave-from {
  opacity: 1;
}

.mobile-alert-leave-from .bg-white {
  transform: scale(1) translateY(0);
  opacity: 1;
}

.mobile-alert-leave-to {
  opacity: 0;
}

.mobile-alert-leave-to .bg-white {
  transform: scale(0.9) translateY(-10px);
  opacity: 0;
}
</style>
