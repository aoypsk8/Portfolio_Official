<template>
  <div>
    <h1 class="text-2xl font-semibold text-white mb-6">Dashboard</h1>
    <p class="text-slate-400 mb-8">จัดการเนื้อหา Portfolio ผ่านเมนูด้านซ้าย</p>
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        v-for="item in links"
        :key="item.to"
        :to="item.to"
        class="rounded-xl bg-slate-800 border border-slate-700 p-4 hover:border-emerald-500/50 transition"
      >
        <span class="font-medium text-white">{{ item.label }}</span>
        <p class="text-sm text-slate-400 mt-1">{{ item.desc }}</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth', layout: 'admin' })

const links = [
  { to: '/admin/portfolio', label: 'About & Contact', desc: 'แก้ไขหน้า About และ Contact' },
  { to: '/admin/projects', label: 'Projects', desc: 'โปรเจกต์ timeline (เพิ่ม/แก้/ลบ)' },
  { to: '/admin/company-projects', label: 'Company Projects', desc: 'รายการบริษัท/โปรเจกต์' },
  { to: '/admin/activities', label: 'Activities', desc: 'กิจกรรม / การ์ด' },
  { to: '/admin/certificates', label: 'Certificates', desc: 'ใบรับรอง' },
  { to: '/admin/blog-posts', label: 'Blog Posts', desc: 'บทความ / บล็อก' },
  { to: '/admin/work-experiences', label: 'Work Experiences', desc: 'ประวัติการทำงาน' },
  { to: '/admin/submissions', label: 'Contact Submissions', desc: 'ข้อความจากฟอร์มติดต่อ' },
  { to: '/admin/settings', label: 'Settings', desc: 'Site settings ตาม key' },
]
</script>
