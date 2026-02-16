import type { ActionButton, NavLink } from '~/types/portfolio'

/** ลิงก์เมนูหลัก (ตรงกับดีไซน์: Home, About, Project, Activity, Certificates, Contact) */
export const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/project', label: 'Project' },
  { href: '/activity', label: 'Activity' },
  { href: '/certificates', label: 'Certificates' },
  { href: '/contact', label: 'Contact' }
]

/** ปุ่ม Hero (primary / secondary) */
export const HERO_ACTIONS: { primary: ActionButton[]; secondary: ActionButton[] } = {
  primary: [{ label: 'View Projects', href: '#projects' }],
  secondary: [{ label: 'Contact', href: '/contact' }]
}
