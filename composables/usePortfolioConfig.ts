import type { PortfolioConfig } from '~/types/portfolio'

/** ViewModel: อ่าน config พอร์ตโฟลิโอจาก app.config (typed) */
export function usePortfolioConfig(): PortfolioConfig {
  const config = useAppConfig()
  return (config.portfolio ?? {}) as PortfolioConfig
}
