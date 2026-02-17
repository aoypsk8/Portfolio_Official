/**
 * Auth สำหรับ admin — เก็บ token ใน cookie (SSR-safe), login/logout
 */
const AUTH_COOKIE = 'portfolio_admin_token'

export function useAuth() {
  const token = useCookie<string | null>(AUTH_COOKIE, {
    maxAge: 60 * 60 * 24 * 7, // 7 วัน
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })

  const isLoggedIn = computed(() => !!token.value)

  async function login(email: string, password: string): Promise<{ success: boolean; message?: string }> {
    const config = useRuntimeConfig()
    const base = (config.public.apiBase as string) || ''
    if (!base) return { success: false, message: 'API not configured' }
    try {
      const res = await $fetch<{ success?: boolean; data?: { token?: string }; message?: string }>(
        `${base.replace(/\/$/, '')}/api/auth/login`,
        {
          method: 'POST',
          body: { email, password },
          headers: { 'Content-Type': 'application/json' },
        }
      )
      if (res?.success && res?.data?.token) {
        token.value = res.data.token
        return { success: true }
      }
      return { success: false, message: res?.message || 'Login failed' }
    } catch (e: unknown) {
      const err = e as { data?: { message?: string } }
      return { success: false, message: err?.data?.message || 'Request failed' }
    }
  }

  function logout() {
    token.value = null
    navigateTo('/login')
  }

  return { token, isLoggedIn, login, logout }
}
