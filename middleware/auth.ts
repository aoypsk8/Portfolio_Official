/**
 * ป้องกันหน้า admin — ถ้าไม่มี token ให้ redirect ไป /login
 */
export default defineNuxtRouteMiddleware(() => {
  const token = useCookie<string | null>('portfolio_admin_token')
  if (!token.value) {
    return navigateTo('/login', { replace: true })
  }
})
