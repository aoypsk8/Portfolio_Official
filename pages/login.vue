<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-900 px-4">
    <div class="w-full max-w-sm rounded-2xl bg-slate-800/80 p-8 shadow-xl border border-slate-700">
      <h1 class="text-2xl font-semibold text-white mb-1">Admin Login</h1>
      <p class="text-slate-400 text-sm mb-6">Portfolio CMS</p>
      <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-slate-300 mb-1">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            autocomplete="email"
            class="w-full rounded-lg bg-slate-700/80 border border-slate-600 text-white px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
            placeholder="admin@localhost"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-slate-300 mb-1">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            autocomplete="current-password"
            class="w-full rounded-lg bg-slate-700/80 border border-slate-600 text-white px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
            placeholder="••••••••"
          />
        </div>
        <p v-if="message" class="text-sm" :class="isError ? 'text-red-400' : 'text-emerald-400'">
          {{ message }}
        </p>
        <button
          type="submit"
          :disabled="pending"
          class="w-full rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-medium py-2.5 transition"
        >
          {{ pending ? 'Signing in...' : 'Sign in' }}
        </button>
      </form>
      <NuxtLink to="/" class="mt-4 block text-center text-sm text-slate-400 hover:text-white">
        ← Back to site
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const { login, isLoggedIn } = useAuth()
const email = ref('')
const password = ref('')
const pending = ref(false)
const message = ref('')
const isError = ref(false)

if (isLoggedIn.value) {
  await navigateTo('/admin', { replace: true })
}

async function onSubmit() {
  pending.value = true
  message.value = ''
  isError.value = false
  const result = await login(email.value, password.value)
  pending.value = false
  if (result.success) {
    await navigateTo('/admin', { replace: true })
  } else {
    message.value = result.message || 'Login failed'
    isError.value = true
  }
}
</script>
