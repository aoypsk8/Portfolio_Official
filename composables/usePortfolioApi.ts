/**
 * Composables เรียก Portfolio API ผ่าน service (services/portfolioApi.service.ts)
 * จัดการ reactive state (useFetch, fallback) แล้วเรียก service
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
import { getApiUrl } from '~/services/portfolioApi.service'
import type { ApiResponse } from '~/services/portfolioApi.service'

function getApiBase(): string {
  const base = useRuntimeConfig().public.apiBase
  return typeof base === 'string' ? base : ''
}

/** useFetch ผ่าน service URL — คืน data จาก response.data หรือ fallback */
function useApiFetch<T>(path: string, fallback: T) {
  const config = useRuntimeConfig()
  const base = getApiBase()
  const url = getApiUrl(base, path)

  if (!url) {
    const fallbackRef = ref(fallback) as Ref<T>
    return {
      data: fallbackRef,
      pending: ref(false),
      error: ref(null),
      refresh: () => {}
    }
  }

  const { data: raw, pending, error, refresh } = useFetch<ApiResponse<T>>(url, {
    default: () => ({ success: false, data: fallback } as ApiResponse<T>)
  })

  const data = computed(() => (raw.value?.success && raw.value?.data != null ? raw.value.data : fallback))
  return { data, pending, error, refresh }
}

/** ข้อมูลรวม portfolio */
export function useApiPortfolio(fallback: PortfolioConfig) {
  return useApiFetch<PortfolioConfig>('/api/portfolio', fallback)
}

/** Navigation: links + heroActions */
export function useApiNavigation(fallback: NavigationResponse) {
  return useApiFetch<NavigationResponse>('/api/navigation', fallback)
}

/** หน้า Home */
export function useApiHome(fallback: { projects: Project[]; blogPosts: BlogPost[]; workExperiences: WorkExperience[] }) {
  return useApiFetch<{ projects: Project[]; blogPosts: BlogPost[]; workExperiences: WorkExperience[] }>(
    '/api/home',
    fallback
  )
}

/** หน้า About เต็ม */
export function useApiAboutPage(fallback: AboutPageConfig | null) {
  return useApiFetch<AboutPageConfig | null>('/api/portfolio/about', fallback)
}

/** หน้า Contact เต็ม */
export function useApiContactPage(fallback: ContactPageConfig | null) {
  return useApiFetch<ContactPageConfig | null>('/api/portfolio/contact', fallback)
}

/** โปรเจกต์ timeline */
export function useApiProjects(fallback: Project[] = []) {
  const result = useApiFetch<{ projects: Project[] }>('/api/projects', { projects: fallback })
  return {
    data: computed(() => result.data.value.projects ?? fallback),
    pending: result.pending,
    error: result.error,
    refresh: result.refresh
  }
}

/** Company projects */
export function useApiCompanyProjects(fallback: CompanyProject[] = []) {
  const result = useApiFetch<{ companyProjects: CompanyProject[] }>('/api/projects/company', {
    companyProjects: fallback
  })
  return {
    data: computed(() => result.data.value.companyProjects ?? fallback),
    pending: result.pending,
    error: result.error,
    refresh: result.refresh
  }
}

/** Activities */
export function useApiActivities(fallback: { items: ActivityItem[]; initialCount: number } = { items: [], initialCount: 0 }) {
  return useApiFetch<{ items: ActivityItem[]; initialCount: number }>('/api/activities', fallback)
}

/** Certificates */
export function useApiCertificates(fallback: Certificate[] = []) {
  const result = useApiFetch<{ certificates: Certificate[] }>('/api/certificates', { certificates: fallback })
  return {
    data: computed(() => result.data.value.certificates ?? fallback),
    pending: result.pending,
    error: result.error,
    refresh: result.refresh
  }
}

/** ส่งข้อความ Contact form — เรียก service */
export function useSubmitContact() {
  const base = getApiBase()
  const url = getApiUrl(base, '/api/contact')

  async function submit(body: { name?: string; email: string; subject?: string; message: string }) {
    const { portfolioApiService } = await import('~/services/portfolioApi.service')
    return portfolioApiService.submitContact(base, body)
  }

  return { submit, isConfigured: !!url }
}
