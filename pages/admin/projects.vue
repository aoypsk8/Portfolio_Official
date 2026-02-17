<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-semibold text-white">Projects</h1>
      <button
        type="button"
        class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500"
        @click="openForm()"
      >
        Add Project
      </button>
    </div>
    <p v-if="message" class="mb-4 text-sm" :class="messageError ? 'text-red-400' : 'text-emerald-400'">{{ message }}</p>
    <div v-if="pending" class="text-slate-400">Loading...</div>
    <div v-else class="rounded-xl border border-slate-700 overflow-hidden bg-slate-800/50">
      <table class="w-full text-left">
        <thead class="bg-slate-800 text-slate-400 text-sm">
          <tr>
            <th class="p-3 font-medium">Title</th>
            <th class="p-3 font-medium">Description</th>
            <th class="p-3 font-medium w-28">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="p in list"
            :key="(p as { id?: number }).id ?? p.title"
            class="border-t border-slate-700 hover:bg-slate-800/80"
          >
            <td class="p-3 text-white">{{ (p as { id?: number; title?: string }).title }}</td>
            <td class="p-3 text-slate-400 max-w-xs truncate">{{ (p as { description?: string }).description }}</td>
            <td class="p-3">
              <button
                type="button"
                class="text-emerald-400 hover:underline mr-2 text-sm"
                @click="openForm(p)"
              >
                Edit
              </button>
              <button
                type="button"
                class="text-red-400 hover:underline text-sm"
                @click="confirmDelete(p as { id?: number; title?: string })"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="list.length === 0 && !pending" class="p-6 text-slate-400">No projects yet.</p>
    </div>

    <!-- Modal form -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      @click.self="showModal = false"
    >
      <div class="w-full max-w-lg rounded-xl bg-slate-800 border border-slate-700 p-6 shadow-xl">
        <h2 class="text-lg font-semibold text-white mb-4">{{ editId ? 'Edit' : 'Add' }} Project</h2>
        <form @submit.prevent="submitForm" class="space-y-3">
          <div>
            <label class="block text-sm text-slate-400 mb-1">Title *</label>
            <input v-model="form.title" required class="input" />
          </div>
          <div>
            <label class="block text-sm text-slate-400 mb-1">Description *</label>
            <textarea v-model="form.description" required rows="3" class="input"></textarea>
          </div>
          <div>
            <label class="block text-sm text-slate-400 mb-1">Link</label>
            <input v-model="form.link" class="input" />
          </div>
          <div>
            <label class="block text-sm text-slate-400 mb-1">Image URL (ภาพหลัก)</label>
            <div class="flex gap-2">
              <input v-model="form.image" class="input flex-1" placeholder="หรืออัปโหลดด้านล่าง" />
              <input
                ref="imageInputRef"
                type="file"
                accept="image/*"
                class="hidden"
                @change="onImageSelected"
              />
              <button
                type="button"
                class="btn-secondary shrink-0"
                :disabled="uploadingImage"
                @click="imageInputRef?.click()"
              >
                {{ uploadingImage ? 'Uploading...' : 'Upload' }}
              </button>
            </div>
            <p v-if="uploadError" class="mt-1 text-xs text-red-400">{{ uploadError }}</p>
          </div>
          <div>
            <label class="block text-sm text-slate-400 mb-1">Prototype / Gallery (หลายรูป)</label>
            <div class="flex flex-wrap gap-2 mb-2">
              <div
                v-for="(url, idx) in form.images"
                :key="idx"
                class="relative group"
              >
                <img :src="url" alt="" class="w-16 h-16 object-cover rounded-lg border border-slate-600" @error="($event.target as HTMLImageElement).style.display='none'">
                <button
                  type="button"
                  class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-600"
                  :aria-label="'Remove image ' + (idx + 1)"
                  @click="removeGalleryImage(idx)"
                >
                  ×
                </button>
              </div>
            </div>
            <input
              ref="galleryInputRef"
              type="file"
              accept="image/*"
              multiple
              class="hidden"
              @change="onGalleryImagesSelected"
            />
            <button
              type="button"
              class="btn-secondary text-sm w-full"
              :disabled="uploadingImage"
              @click="galleryInputRef?.click()"
            >
              {{ uploadingImage ? 'Uploading...' : 'เลือกหลายรูป (Select multiple images)' }}
            </button>
          </div>
          <div class="flex justify-end gap-2 pt-2">
            <button type="button" class="btn-secondary" @click="showModal = false">Cancel</button>
            <button type="submit" class="btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete confirm -->
    <div
      v-if="toDelete"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      @click.self="toDelete = null"
    >
      <div class="w-full max-w-sm rounded-xl bg-slate-800 border border-slate-700 p-6">
        <p class="text-white">Delete "{{ toDelete.title }}"?</p>
        <div class="flex justify-end gap-2 mt-4">
          <button type="button" class="btn-secondary" @click="toDelete = null">Cancel</button>
          <button type="button" class="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-500" @click="doDelete">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { adminGet, adminPost, adminPut, adminDelete, adminUploadImage } from '~/services/adminApi.service'

definePageMeta({ middleware: 'auth', layout: 'admin' })

const { token } = useAuth()
const imageInputRef = ref<HTMLInputElement | null>(null)
const galleryInputRef = ref<HTMLInputElement | null>(null)
const uploadingImage = ref(false)
const uploadError = ref('')
const list = ref<Array<{ id?: number; title?: string; description?: string; link?: string; image?: string; images?: string[] }>>([])
const pending = ref(true)
const message = ref('')
const messageError = ref(false)
const showModal = ref(false)
const editId = ref<number | null>(null)
const toDelete = ref<{ id?: number; title?: string } | null>(null)
const form = ref<{ title: string; description: string; link: string; image: string; images: string[] }>({ title: '', description: '', link: '', image: '', images: [] })

async function load() {
  pending.value = true
  const res = await adminGet<{ projects?: typeof list.value }>('/api/projects', token.value)
  pending.value = false
  if (res.success && res.data?.projects) list.value = res.data.projects
  else list.value = []
}

function openForm(item?: { id?: number; title?: string; description?: string; link?: string; image?: string; images?: string[] }) {
  editId.value = item?.id ?? null
  form.value = {
    title: item?.title ?? '',
    description: item?.description ?? '',
    link: item?.link ?? '',
    image: item?.image ?? '',
    images: Array.isArray(item?.images) ? [...item.images] : [],
  }
  showModal.value = true
}

function getPayload() {
  const images = form.value.images.filter(Boolean)
  return {
    title: form.value.title,
    description: form.value.description,
    link: form.value.link || undefined,
    image: form.value.image || undefined,
    images: images.length ? images : undefined,
  }
}

async function submitForm() {
  const payload = getPayload()
  if (editId.value) {
    const res = await adminPut(`/api/projects/${editId.value}`, payload, token.value)
    setMsg(res.success, res.success ? 'Updated.' : res.message)
  } else {
    const res = await adminPost<unknown>('/api/projects', payload, token.value)
    setMsg(res.success, res.success ? 'Created.' : res.message)
  }
  if (messageError.value) return
  showModal.value = false
  await load()
}

function confirmDelete(p: { id?: number; title?: string }) {
  toDelete.value = p
}

async function doDelete() {
  if (!toDelete.value?.id) return
  const res = await adminDelete(`/api/projects/${toDelete.value.id}`, token.value)
  setMsg(res.success, res.success ? 'Deleted.' : res.message)
  toDelete.value = null
  if (!messageError.value) await load()
}

function setMsg(ok: boolean, msg?: string) {
  message.value = msg || (ok ? 'Done.' : 'Error')
  messageError.value = !ok
  if (msg) setTimeout(() => { message.value = '' }, 3000)
}

async function onImageSelected(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  uploadError.value = ''
  uploadingImage.value = true
  const result = await adminUploadImage(file, { folder: 'portfolio/projects', token: token.value })
  uploadingImage.value = false
  input.value = ''
  if (result.success && result.url) {
    form.value.image = result.url
  } else {
    uploadError.value = result.message || 'Upload failed'
  }
}

function removeGalleryImage(idx: number) {
  form.value.images = form.value.images.filter((_, i) => i !== idx)
}

async function onGalleryImagesSelected(e: Event) {
  const input = e.target as HTMLInputElement
  const files = input.files ? Array.from(input.files) : []
  input.value = ''
  if (files.length === 0) return
  uploadError.value = ''
  uploadingImage.value = true
  const urls: string[] = []
  for (const file of files) {
    const result = await adminUploadImage(file, { folder: 'portfolio/projects', token: token.value })
    if (result.success && result.url) urls.push(result.url)
    else uploadError.value = result.message || 'Upload failed'
  }
  form.value.images = [...form.value.images, ...urls]
  uploadingImage.value = false
}

onMounted(load)
</script>

<style scoped>
.input {
  @apply w-full rounded-lg bg-slate-700 border border-slate-600 text-white px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none;
}
.btn-primary {
  @apply rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-500;
}
.btn-secondary {
  @apply rounded-lg bg-slate-600 px-4 py-2 text-slate-200 hover:bg-slate-500;
}
</style>
