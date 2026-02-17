import type { PortfolioConfig } from '~/types/portfolio'
import { useApiPortfolio } from '~/composables/usePortfolioApi'

/** อ่าน config พอร์ตโฟลิโอ — จาก API (ถ้ามี NUXT_PUBLIC_API_BASE) ไม่ก็จาก app.config */
export function usePortfolioConfig() {
  const appConfig = useAppConfig()
  const fallback = (appConfig.portfolio ?? {}) as PortfolioConfig
  const { data } = useApiPortfolio(fallback)
  return data
}
