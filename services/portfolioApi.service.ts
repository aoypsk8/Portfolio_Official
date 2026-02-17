/**
 * Service: เรียก Portfolio Backend API (pure functions)
 * Composables ใช้ service นี้ + จัดการ reactive state
 */
import type {
  PortfolioConfig,
  AboutPageConfig,
  ContactPageConfig,
  NavigationResponse,
  Project,
  CompanyProject,
  ActivityItem,
  Certificate,
  BlogPost,
  WorkExperience
} from '~/types/portfolio'

/** Response shape จาก Backend */
export interface ApiResponse<T> {
  success?: boolean
  data?: T
  message?: string
  errors?: string[]
}

/** สร้าง full URL สำหรับเรียก API (composables ใช้กับ useFetch) */
export function getApiUrl(baseUrl: string, path: string): string {
  if (!baseUrl) return ''
  const base = baseUrl.replace(/\/$/, '')
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

function buildUrl(baseUrl: string, path: string): string {
  return getApiUrl(baseUrl, path)
}

/** GET แล้วคืน data หรือ null */
export async function fetchGet<T>(baseUrl: string, path: string): Promise<T | null> {
  if (!baseUrl) return null
  try {
    const res = await $fetch<ApiResponse<T>>(buildUrl(baseUrl, path), { responseType: 'json' })
    return res?.success && res?.data != null ? res.data : null
  } catch {
    return null
  }
}

/** POST /api/contact */
export async function postContact(
  baseUrl: string,
  body: { name?: string; email: string; subject?: string; message: string }
): Promise<{ success: boolean; message?: string; errors?: string[] }> {
  if (!baseUrl) return { success: false, message: 'API not configured' }
  try {
    const res = await $fetch<ApiResponse<unknown> & { errors?: string[] }>(buildUrl(baseUrl, '/api/contact'), {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/json' }
    })
    return {
      success: !!res?.success,
      message: res?.message,
      errors: res?.errors
    }
  } catch (e: unknown) {
    const err = e as { data?: { message?: string; errors?: string[] } }
    return {
      success: false,
      message: err?.data?.message || 'Request failed',
      errors: err?.data?.errors
    }
  }
}

// ——— Endpoint helpers (ใช้ใน composables) ———

export const portfolioApiService = {
  getPortfolio: (base: string) => fetchGet<PortfolioConfig>(base, '/api/portfolio'),
  getNavigation: (base: string) => fetchGet<NavigationResponse>(base, '/api/navigation'),
  getHome: (base: string) =>
    fetchGet<{ projects: Project[]; blogPosts: BlogPost[]; workExperiences: WorkExperience[] }>(base, '/api/home'),
  getAboutPage: (base: string) => fetchGet<AboutPageConfig | null>(base, '/api/portfolio/about'),
  getContactPage: (base: string) => fetchGet<ContactPageConfig | null>(base, '/api/portfolio/contact'),
  getProjects: (base: string) => fetchGet<{ projects: Project[] }>(base, '/api/projects'),
  getCompanyProjects: (base: string) => fetchGet<{ companyProjects: CompanyProject[] }>(base, '/api/projects/company'),
  getActivities: (base: string) =>
    fetchGet<{ items: ActivityItem[]; initialCount: number }>(base, '/api/activities'),
  getCertificates: (base: string) => fetchGet<{ certificates: Certificate[] }>(base, '/api/certificates'),
  submitContact: (base: string, body: { name?: string; email: string; subject?: string; message: string }) =>
    postContact(base, body)
}
