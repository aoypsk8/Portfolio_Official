<template>
  <div>
    <h1 class="text-2xl font-semibold text-white mb-6">Site Settings</h1>
    <p class="text-slate-400 mb-4">จัดการ key-value ใน site_settings (เช่น hero, navigation, about_summary)</p>
    <p v-if="message" class="mb-4 text-sm" :class="messageError ? 'text-red-400' : 'text-emerald-400'">{{ message }}</p>
    <div class="max-w-xl space-y-4">
      <div class="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
        <h2 class="text-sm font-medium text-slate-300 mb-2">อ่านค่าโดย key</h2>
        <div class="flex gap-2">
          <input v-model="getKey" placeholder="key (e.g. hero)" class="input flex-1" />
          <button type="button" class="btn-secondary" @click="loadKey">Get</button>
        </div>
        <pre v-if="getResult !== null" class="mt-2 p-2 rounded bg-slate-900 text-slate-300 text-sm overflow-auto">{{ getResult }}</pre>
      </div>
      <div class="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
        <h2 class="text-sm font-medium text-slate-300 mb-2">ตั้งค่า (สร้างหรืออัปเดต)</h2>
        <div class="space-y-2">
          <input v-model="setKey" placeholder="key (เช่น hero)" class="input" />
          <textarea v-model="setValue" placeholder='JSON value e.g. {"title":"Hello"}' rows="6" class="input font-mono text-sm"></textarea>
          <div class="flex flex-wrap gap-2">
            <button type="button" class="btn-primary" @click="saveKey">Save</button>
            <button type="button" class="rounded-lg bg-slate-600 px-3 py-2 text-sm text-slate-200 hover:bg-slate-500" @click="fillHeroExample">
              ตัวอย่าง: เติม hero
            </button>
          </div>
        </div>
        <p class="mt-2 text-xs text-slate-500">ตัวอย่างอัปเดต hero: กด "ตัวอย่าง: เติม hero" แล้วกด Save</p>
      </div>
      <div class="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
        <h2 class="text-sm font-medium text-slate-300 mb-2">ลบ key</h2>
        <div class="flex gap-2">
          <input v-model="delKey" placeholder="key" class="input flex-1" />
          <button type="button" class="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-500" @click="deleteKey">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { adminGet, adminPut, adminDelete } from '~/services/adminApi.service'
definePageMeta({ middleware: 'auth', layout: 'admin' })
const { token } = useAuth()
const message = ref('')
const messageError = ref(false)
const getKey = ref('')
const getResult = ref<string | null>(null)
const setKey = ref('')
const setValue = ref('')
const delKey = ref('')

function setMsg(ok: boolean, msg?: string) {
  message.value = msg || (ok ? 'Done.' : 'Error')
  messageError.value = !ok
  setTimeout(() => { message.value = '' }, 3000)
}

/** ตัวอย่างอัปเดต hero — เติม key + JSON ให้แล้วกด Save ได้เลย */
const HERO_EXAMPLE = {
  title: "I'm Full-Stack web and mobile app development, UX/UI designer.",
  greeting: "Hi, I'm",
  subtitle: "I'm a full-stack software engineer with hands-on experience in building secure and scalable mobile and web applications using Flutter, React.js, Node.js, and SQL. My work focuses on fintech and telecom integration, including real-time e-wallet systems, QR payment solutions, and digital service platforms like MMoneyX and MMerchantX. I enjoy solving complex problems, from architecting backend services to crafting intuitive user interfaces. With a passion for clean code, system design, and continuous learning, I strive to deliver reliable solutions that align with business needs and user expectations.",
  socialLinks: [
    { href: "https://github.com/aoypsk8", icon: "github", label: "GitHub" },
    { href: "https://www.linkedin.com/in/aoy-phongsakoun-a4163730b/", icon: "linkedin", label: "LinkedIn" },
    { href: "https://www.facebook.com/Aoy.Phongsakoun2003/", icon: "facebook", label: "Facebook" },
    { href: "https://www.tiktok.com/@aox_psk", icon: "tiktok", label: "TikTok" },
  ],
}

function fillHeroExample() {
  setKey.value = 'hero'
  setValue.value = JSON.stringify(HERO_EXAMPLE, null, 2)
}

async function loadKey() {
  if (!getKey.value.trim()) return
  const res = await adminGet<{ key?: string; value?: unknown }>(`/api/settings/${encodeURIComponent(getKey.value.trim())}`, token.value)
  getResult.value = res.success && res.data ? JSON.stringify(res.data, null, 2) : (res.message || 'Not found')
}

async function saveKey() {
  if (!setKey.value.trim()) return
  let body: unknown
  try {
    body = setValue.value.trim() ? JSON.parse(setValue.value) : {}
  } catch {
    setMsg(false, 'Invalid JSON')
    return
  }
  const res = await adminPut(`/api/settings/${encodeURIComponent(setKey.value.trim())}`, { value: body }, token.value)
  setMsg(res.success, res.success ? 'Saved.' : res.message)
}

async function deleteKey() {
  if (!delKey.value.trim()) return
  const res = await adminDelete(`/api/settings/${encodeURIComponent(delKey.value.trim())}`, token.value)
  setMsg(res.success, res.success ? 'Deleted.' : res.message)
}
</script>

<style scoped>
.input { @apply w-full rounded-lg bg-slate-700 border border-slate-600 text-white px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none; }
.btn-primary { @apply rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-500; }
.btn-secondary { @apply rounded-lg bg-slate-600 px-4 py-2 text-slate-200 hover:bg-slate-500; }
</style>
