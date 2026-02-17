<template>
  <div class="min-h-screen bg-slate-900 text-slate-200 flex">
    <aside class="w-56 bg-slate-800 border-r border-slate-700 flex flex-col shrink-0">
      <div class="p-4 border-b border-slate-700">
        <NuxtLink to="/admin" class="font-semibold text-white">Portfolio Admin</NuxtLink>
      </div>
      <nav class="p-2 flex-1 overflow-y-auto">
        <NuxtLink to="/admin" class="block rounded-lg px-3 py-2 text-sm transition"
          :class="$route.path === '/admin' ? 'bg-emerald-600/20 text-emerald-400' : 'hover:bg-slate-700'">
          Dashboard
        </NuxtLink>
        <NuxtLink to="/admin/portfolio" class="block rounded-lg px-3 py-2 text-sm transition hover:bg-slate-700"
          :class="$route.path.startsWith('/admin/portfolio') ? 'bg-emerald-600/20 text-emerald-400' : ''">
          About & Contact
        </NuxtLink>
        <NuxtLink to="/admin/projects" class="block rounded-lg px-3 py-2 text-sm transition hover:bg-slate-700"
          :class="$route.path.startsWith('/admin/projects') ? 'bg-emerald-600/20 text-emerald-400' : ''">
          Projects
        </NuxtLink>
        <NuxtLink to="/admin/company-projects" class="block rounded-lg px-3 py-2 text-sm transition hover:bg-slate-700"
          :class="$route.path.startsWith('/admin/company-projects') ? 'bg-emerald-600/20 text-emerald-400' : ''">
          Company Projects
        </NuxtLink>
        <NuxtLink to="/admin/activities" class="block rounded-lg px-3 py-2 text-sm transition hover:bg-slate-700"
          :class="$route.path.startsWith('/admin/activities') ? 'bg-emerald-600/20 text-emerald-400' : ''">
          Activities
        </NuxtLink>
        <NuxtLink to="/admin/certificates" class="block rounded-lg px-3 py-2 text-sm transition hover:bg-slate-700"
          :class="$route.path.startsWith('/admin/certificates') ? 'bg-emerald-600/20 text-emerald-400' : ''">
          Certificates
        </NuxtLink>
        <NuxtLink to="/admin/blog-posts" class="block rounded-lg px-3 py-2 text-sm transition hover:bg-slate-700"
          :class="$route.path.startsWith('/admin/blog-posts') ? 'bg-emerald-600/20 text-emerald-400' : ''">
          Blog Posts
        </NuxtLink>
        <NuxtLink to="/admin/work-experiences" class="block rounded-lg px-3 py-2 text-sm transition hover:bg-slate-700"
          :class="$route.path.startsWith('/admin/work-experiences') ? 'bg-emerald-600/20 text-emerald-400' : ''">
          Work Experiences
        </NuxtLink>
        <NuxtLink to="/admin/submissions" class="block rounded-lg px-3 py-2 text-sm transition hover:bg-slate-700"
          :class="$route.path.startsWith('/admin/submissions') ? 'bg-emerald-600/20 text-emerald-400' : ''">
          Contact Submissions
        </NuxtLink>
        <NuxtLink to="/admin/settings" class="block rounded-lg px-3 py-2 text-sm transition hover:bg-slate-700"
          :class="$route.path.startsWith('/admin/settings') ? 'bg-emerald-600/20 text-emerald-400' : ''">
          Settings
        </NuxtLink>
      </nav>
      <div class="p-2 border-t border-slate-700">
        <NuxtLink to="/" class="block rounded-lg px-3 py-2 text-sm text-slate-400 hover:text-white">View site</NuxtLink>
        <button type="button"
          class="block w-full text-left rounded-lg px-3 py-2 text-sm text-slate-400 hover:text-white" @click="logout">
          Logout
        </button>
      </div>
    </aside>
    <main class="flex-1 overflow-auto p-6">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const { logout } = useAuth()
</script>
