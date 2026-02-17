<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-semibold text-white">Certificates</h1>
      <button type="button" class="btn-primary" @click="openForm()">Add</button>
    </div>
    <p v-if="message" class="mb-4 text-sm" :class="messageError ? 'text-red-400' : 'text-emerald-400'">{{ message }}</p>
    <div v-if="pending" class="text-slate-400">Loading...</div>
    <div v-else class="rounded-xl border border-slate-700 overflow-hidden bg-slate-800/50">
      <table class="w-full text-left">
        <thead class="bg-slate-800 text-slate-400 text-sm">
          <tr><th class="p-3 font-medium">Title</th><th class="p-3 font-medium">Issuer</th><th class="p-3 w-28">Actions</th></tr>
        </thead>
        <tbody>
          <tr v-for="c in list" :key="(c as { id?: number }).id ?? (c as { title?: string }).title" class="border-t border-slate-700 hover:bg-slate-800/80">
            <td class="p-3 text-white">{{ (c as { title?: string }).title }}</td>
            <td class="p-3 text-slate-400">{{ (c as { issuer?: string }).issuer }}</td>
            <td class="p-3">
              <button type="button" class="text-emerald-400 hover:underline mr-2 text-sm" @click="openForm(c as Record<string, unknown>)">Edit</button>
              <button type="button" class="text-red-400 hover:underline text-sm" @click="confirmDelete(c as { id?: number; title?: string })">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="list.length === 0 && !pending" class="p-6 text-slate-400">No certificates.</p>
    </div>
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-y-auto py-8" @click.self="showModal = false">
      <div class="w-full max-w-lg rounded-xl bg-slate-800 border border-slate-700 p-6 my-auto">
        <h2 class="text-lg font-semibold text-white mb-4">{{ editId ? 'Edit' : 'Add' }} Certificate</h2>
        <form @submit.prevent="submitForm" class="space-y-3">
          <div><label class="block text-sm text-slate-400 mb-1">Title *</label><input v-model="form.title" required class="input" /></div>
          <div><label class="block text-sm text-slate-400 mb-1">Issuer *</label><input v-model="form.issuer" required class="input" /></div>
          <div><label class="block text-sm text-slate-400 mb-1">Issue Date *</label><input v-model="form.issueDate" required class="input" type="date" /></div>
          <div><label class="block text-sm text-slate-400 mb-1">Expiry Date</label><input v-model="form.expiryDate" class="input" type="date" /></div>
          <div><label class="block text-sm text-slate-400 mb-1">Credential URL</label><input v-model="form.credentialUrl" class="input" /></div>
          <div><label class="block text-sm text-slate-400 mb-1">Image URL</label><input v-model="form.image" class="input" /></div>
          <div class="flex justify-end gap-2 pt-2"><button type="button" class="btn-secondary" @click="showModal = false">Cancel</button><button type="submit" class="btn-primary">Save</button></div>
        </form>
      </div>
    </div>
    <div v-if="toDelete" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" @click.self="toDelete = null">
      <div class="w-full max-w-sm rounded-xl bg-slate-800 border border-slate-700 p-6">
        <p class="text-white">Delete "{{ toDelete.title }}"?</p>
        <div class="flex justify-end gap-2 mt-4"><button type="button" class="btn-secondary" @click="toDelete = null">Cancel</button><button type="button" class="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-500" @click="doDelete">Delete</button></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { adminGet, adminPost, adminPut, adminDelete } from '~/services/adminApi.service'
definePageMeta({ middleware: 'auth', layout: 'admin' })
const { token } = useAuth()
const list = ref<Record<string, unknown>[]>([])
const pending = ref(true)
const message = ref('')
const messageError = ref(false)
const showModal = ref(false)
const editId = ref<number | null>(null)
const toDelete = ref<{ id?: number; title?: string } | null>(null)
const form = ref({ title: '', issuer: '', issueDate: '', expiryDate: '', credentialUrl: '', image: '' })

async function load() {
  pending.value = true
  const res = await adminGet<{ certificates?: Record<string, unknown>[] }>('/api/certificates', token.value)
  pending.value = false
  list.value = res.data?.certificates ?? []
}

function openForm(item?: Record<string, unknown>) {
  editId.value = (item?.id as number) ?? null
  const d = item as { issueDate?: string; expiryDate?: string }
  form.value = {
    title: (item?.title as string) ?? '',
    issuer: (item?.issuer as string) ?? '',
    issueDate: d?.issueDate ?? '',
    expiryDate: d?.expiryDate ?? '',
    credentialUrl: (item?.credentialUrl as string) ?? '',
    image: (item?.image as string) ?? '',
  }
  showModal.value = true
}

async function submitForm() {
  const body = { ...form.value }
  if (editId.value) {
    const res = await adminPut(`/api/certificates/${editId.value}`, body, token.value)
    setMsg(res.success, res.success ? 'Updated.' : res.message)
  } else {
    const res = await adminPost('/api/certificates', body, token.value)
    setMsg(res.success, res.success ? 'Created.' : res.message)
  }
  if (!messageError.value) { showModal.value = false; await load() }
}

function confirmDelete(p: { id?: number; title?: string }) { toDelete.value = p }
async function doDelete() {
  if (!toDelete.value?.id) return
  const res = await adminDelete(`/api/certificates/${toDelete.value.id}`, token.value)
  setMsg(res.success, res.success ? 'Deleted.' : res.message)
  toDelete.value = null
  if (!messageError.value) await load()
}

function setMsg(ok: boolean, msg?: string) { message.value = msg || (ok ? 'Done.' : 'Error'); messageError.value = !ok; if (msg) setTimeout(() => { message.value = '' }, 3000) }
onMounted(load)
</script>

<style scoped>
.input { @apply w-full rounded-lg bg-slate-700 border border-slate-600 text-white px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none; }
.btn-primary { @apply rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-500; }
.btn-secondary { @apply rounded-lg bg-slate-600 px-4 py-2 text-slate-200 hover:bg-slate-500; }
</style>
