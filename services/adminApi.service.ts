/**
 * Service เรียก Backend API แบบมี auth (สำหรับ admin) — GET/POST/PUT/DELETE
 */
import type { ApiResponse } from '~/services/portfolioApi.service'

function getBase(): string {
  const config = useRuntimeConfig()
  const base = (config.public.apiBase as string) || ''
  return base.replace(/\/$/, '')
}

function headers(token: string | null): Record<string, string> {
  const h: Record<string, string> = { 'Content-Type': 'application/json' }
  if (token) h.Authorization = `Bearer ${token}`
  return h
}

export async function adminFetch<T>(
  path: string,
  options: { method?: string; body?: unknown; token?: string | null } = {}
): Promise<{ success: boolean; data?: T; message?: string }> {
  const base = getBase()
  if (!base) return { success: false, message: 'API not configured' }
  const url = path.startsWith('http') ? path : `${base}${path.startsWith('/') ? path : `/${path}`}`
  const token = options.token ?? useCookie<string | null>('portfolio_admin_token').value
  try {
    const res = await $fetch<ApiResponse<T>>(url, {
      method: options.method || 'GET',
      body: options.body,
      headers: headers(token),
    })
    return {
      success: !!res?.success,
      data: res?.data as T | undefined,
      message: res?.message,
    }
  } catch (e: unknown) {
    const err = e as { data?: { message?: string } }
    return { success: false, message: err?.data?.message || 'Request failed' }
  }
}

/** GET */
export function adminGet<T>(path: string, token?: string | null) {
  return adminFetch<T>(path, { method: 'GET', token })
}

/** POST */
export function adminPost<T>(path: string, body: unknown, token?: string | null) {
  return adminFetch<T>(path, { method: 'POST', body, token })
}

/** PUT */
export function adminPut<T>(path: string, body: unknown, token?: string | null) {
  return adminFetch<T>(path, { method: 'PUT', body, token })
}

/** DELETE */
export function adminDelete(path: string, token?: string | null) {
  return adminFetch<unknown>(path, { method: 'DELETE', token })
}

/** อัปโหลดรูปไป Cloudinary ผ่าน Backend — คืน URL */
export async function adminUploadImage(
  file: File,
  options?: { folder?: string; token?: string | null }
): Promise<{ success: boolean; url?: string; message?: string }> {
  const base = getBase()
  if (!base) return { success: false, message: 'API not configured' }
  const token = options?.token ?? useCookie<string | null>('portfolio_admin_token').value
  const formData = new FormData()
  formData.append('image', file)
  if (options?.folder) formData.append('folder', options.folder)
  try {
    const res = await $fetch<{ success?: boolean; data?: { url?: string }; message?: string }>(
      `${base}/api/upload/image`,
      {
        method: 'POST',
        body: formData,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    )
    const url = res?.data?.url
    return { success: !!res?.success && !!url, url, message: res?.message }
  } catch (e: unknown) {
    const err = e as { data?: { message?: string } }
    return { success: false, message: err?.data?.message || 'Upload failed' }
  }
}
