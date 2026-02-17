<template>
  <div>
    <h1 class="text-2xl font-semibold text-white mb-6">About & Contact Pages</h1>
    <p v-if="message" class="mb-4 text-sm" :class="messageError ? 'text-red-400' : 'text-emerald-400'">{{ message }}</p>
    <div class="space-y-8 max-w-3xl">
      <section class="rounded-xl border border-slate-700 bg-slate-800/50 p-6">
        <h2 class="text-lg font-medium text-white mb-4">About Page</h2>
        <div v-if="aboutPending" class="text-slate-400">Loading...</div>
        <form v-else @submit.prevent="saveAbout" class="space-y-3">
          <div><label class="block text-sm text-slate-400 mb-1">Name</label><input v-model="aboutForm.name" class="input" /></div>
          <div><label class="block text-sm text-slate-400 mb-1">Bio 1</label><textarea v-model="aboutForm.bio1" rows="2" class="input"></textarea></div>
          <div><label class="block text-sm text-slate-400 mb-1">Bio 2</label><textarea v-model="aboutForm.bio2" rows="2" class="input"></textarea></div>
          <button type="submit" class="btn-primary">Save About</button>
        </form>
      </section>
      <section class="rounded-xl border border-slate-700 bg-slate-800/50 p-6">
        <h2 class="text-lg font-medium text-white mb-4">Contact Page</h2>
        <div v-if="contactPending" class="text-slate-400">Loading...</div>
        <form v-else @submit.prevent="saveContact" class="space-y-3">
          <div><label class="block text-sm text-slate-400 mb-1">Heading Line 1</label><input v-model="contactForm.headingLine1" class="input" /></div>
          <div><label class="block text-sm text-slate-400 mb-1">Heading Line 2</label><input v-model="contactForm.headingLine2" class="input" /></div>
          <div><label class="block text-sm text-slate-400 mb-1">Paragraph 1</label><textarea v-model="contactForm.paragraph1" rows="2" class="input"></textarea></div>
          <div><label class="block text-sm text-slate-400 mb-1">Email</label><input v-model="contactForm.email" type="email" class="input" /></div>
          <button type="submit" class="btn-primary">Save Contact</button>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { adminGet, adminPut } from '~/services/adminApi.service'
definePageMeta({ middleware: 'auth', layout: 'admin' })
const { token } = useAuth()
const message = ref('')
const messageError = ref(false)
const aboutPending = ref(true)
const contactPending = ref(true)
const aboutForm = ref({ name: '', bio1: '', bio2: '' })
const contactForm = ref({ headingLine1: '', headingLine2: '', paragraph1: '', email: '' })

function setMsg(ok: boolean, msg?: string) {
  message.value = msg || (ok ? 'Done.' : 'Error')
  messageError.value = !ok
  setTimeout(() => { message.value = '' }, 3000)
}

async function loadAbout() {
  aboutPending.value = true
  const res = await adminGet<{ name?: string; bio1?: string; bio2?: string }>('/api/portfolio/about', token.value)
  aboutPending.value = false
  if (res.success && res.data) {
    aboutForm.value = { name: res.data.name ?? '', bio1: res.data.bio1 ?? '', bio2: res.data.bio2 ?? '' }
  }
}

async function loadContact() {
  contactPending.value = true
  const res = await adminGet<{ headingLine1?: string; headingLine2?: string; paragraph1?: string; email?: string }>('/api/portfolio/contact', token.value)
  contactPending.value = false
  if (res.success && res.data) {
    contactForm.value = {
      headingLine1: res.data.headingLine1 ?? '',
      headingLine2: res.data.headingLine2 ?? '',
      paragraph1: res.data.paragraph1 ?? '',
      email: res.data.email ?? '',
    }
  }
}

async function saveAbout() {
  const res = await adminPut('/api/portfolio/about', aboutForm.value, token.value)
  setMsg(res.success, res.success ? 'About saved.' : res.message)
}

async function saveContact() {
  const res = await adminPut('/api/portfolio/contact', contactForm.value, token.value)
  setMsg(res.success, res.success ? 'Contact saved.' : res.message)
}

onMounted(() => {
  loadAbout()
  loadContact()
})
</script>

<style scoped>
.input { @apply w-full rounded-lg bg-slate-700 border border-slate-600 text-white px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none; }
.btn-primary { @apply rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-500; }
</style>
