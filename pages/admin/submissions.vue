<template>
  <div>
    <h1 class="text-2xl font-semibold text-white mb-6">Contact Submissions</h1>
    <p v-if="message" class="mb-4 text-sm" :class="messageError ? 'text-red-400' : 'text-emerald-400'">{{ message }}</p>
    <div v-if="pending" class="text-slate-400">Loading...</div>
    <div v-else class="rounded-xl border border-slate-700 overflow-hidden bg-slate-800/50">
      <table class="w-full text-left">
        <thead class="bg-slate-800 text-slate-400 text-sm">
          <tr><th class="p-3 font-medium">Date</th><th class="p-3 font-medium">Name</th><th class="p-3 font-medium">Email</th><th class="p-3 font-medium">Message</th><th class="p-3 w-24">Actions</th></tr>
        </thead>
        <tbody>
          <tr v-for="s in list" :key="(s as { id?: number }).id" class="border-t border-slate-700 hover:bg-slate-800/80">
            <td class="p-3 text-slate-400 text-sm">{{ formatDate((s as { created_at?: string }).created_at) }}</td>
            <td class="p-3 text-white">{{ (s as { name?: string }).name || '—' }}</td>
            <td class="p-3 text-slate-300">{{ (s as { email?: string }).email }}</td>
            <td class="p-3 text-slate-400 max-w-xs truncate">{{ (s as { message?: string }).message }}</td>
            <td class="p-3">
              <button type="button" class="text-red-400 hover:underline text-sm" @click="confirmDelete(s as { id?: number; email?: string })">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="list.length === 0 && !pending" class="p-6 text-slate-400">No submissions.</p>
    </div>
    <div v-if="toDelete" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" @click.self="toDelete = null">
      <div class="w-full max-w-sm rounded-xl bg-slate-800 border border-slate-700 p-6">
        <p class="text-white">Delete submission from {{ toDelete.email }}?</p>
        <div class="flex justify-end gap-2 mt-4"><button type="button" class="btn-secondary" @click="toDelete = null">Cancel</button><button type="button" class="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-500" @click="doDelete">Delete</button></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { adminGet, adminDelete } from '~/services/adminApi.service'
definePageMeta({ middleware: 'auth', layout: 'admin' })
const { token } = useAuth()
const list = ref<Record<string, unknown>[]>([])
const pending = ref(true)
const message = ref('')
const messageError = ref(false)
const toDelete = ref<{ id?: number; email?: string } | null>(null)

function formatDate(iso?: string) {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleDateString()
  } catch {
    return iso
  }
}

async function load() {
  pending.value = true
  const res = await adminGet<{ submissions?: Record<string, unknown>[] }>('/api/contact/submissions', token.value)
  pending.value = false
  list.value = res.data?.submissions ?? []
}

function confirmDelete(s: { id?: number; email?: string }) { toDelete.value = s }

async function doDelete() {
  if (!toDelete.value?.id) return
  const res = await adminDelete(`/api/contact/submissions/${toDelete.value.id}`, token.value)
  message.value = res.success ? 'Deleted.' : (res.message || 'Error')
  messageError.value = !res.success
  toDelete.value = null
  if (res.success) await load()
  setTimeout(() => { message.value = '' }, 3000)
}
onMounted(load)
</script>

<style scoped>
.btn-secondary { @apply rounded-lg bg-slate-600 px-4 py-2 text-slate-200 hover:bg-slate-500; }
</style>
