/** Model layer: โครงสร้างข้อมูลพอร์ตโฟลิโอ */

export interface NavLink {
  href: string
  label: string
}

export interface ActionButton {
  label: string
  href: string
}

/** GET /api/navigation response */
export interface NavigationResponse {
  links: NavLink[]
  heroActions: { primary: ActionButton[]; secondary: ActionButton[] }
}

export interface ContactLink extends ActionButton {
  icon: string
}

export interface Project {
  title: string
  description: string
  tags?: string[]
  link?: string
  image?: string
  /** แกลเลอรีรูป prototype/screenshot หลายรูปต่อโปรเจกต์ */
  images?: string[]
  /** โลโก้หรือตัวอักษรย่อ (เช่น "m" สำหรับ MMoneyX) */
  logo?: string
  logoBg?: string
}

export interface BlogPost {
  date: string
  title: string
  description: string
  href?: string
}

export interface WorkExperience {
  company: string
  role: string
  period: string
  logo?: string
  description?: string
}

export interface SocialLink {
  label: string
  href: string
  icon: string
}

export interface HeroConfig {
  greeting?: string
  title: string
  subtitle: string
  socialLinks?: SocialLink[]
}

export interface AboutConfig {
  text: string
  skills: string[]
}

/** หน้า About แยก (intro + technical + language) */
export interface FrameworkSkill {
  name: string
  level: number
}

export interface LanguageSkill {
  language: string
  level: string
}

export interface AboutPageConfig {
  name: string
  bio1: string
  bio2: string
  socialLinks: SocialLink[]
  programmingLanguages: string[]
  frameworks: FrameworkSkill[]
  librariesAndTools: string[]
  otherSkills: string[]
  languageSkills: LanguageSkill[]
}

export interface ContactConfig {
  message: string
  links: ContactLink[]
}

/** รายการโปรเจกต์ของบริษัท (หน้า Project) */
export interface CompanyProject {
  name: string
  logo?: string
  logoBg?: string
}

/** รายการ Activity (หน้า Activity: รูป + ชื่อ + คำอธิบาย) */
export interface ActivityItem {
  title: string
  image: string
  description: string
  /** ขนาดการ์ดใน grid: 'small' | 'medium' | 'large' สำหรับ masonry */
  size?: 'small' | 'medium' | 'large'
}

export interface PortfolioConfig {
  hero: HeroConfig
  about: AboutConfig
  contact: ContactConfig
}

/** หน้า Contact แยก (heading, ย่อหน้า, อีเมล, โซเชียล) */
export interface ContactPageConfig {
  headingLine1: string
  headingLine2: string
  paragraph1: string
  /** ข้อความก่อนอีเมล ในย่อหน้าที่ 2 */
  paragraph2BeforeEmail: string
  /** ข้อความหลังอีเมล ในย่อหน้าที่ 2 */
  paragraph2AfterEmail: string
  paragraph3: string
  email: string
  socialLinks: SocialLink[]
}

/** Certificate/Certification */
export interface Certificate {
  title: string
  issuer: string
  issueDate: string
  expiryDate?: string
  credentialId?: string
  credentialUrl?: string
  image?: string
  description?: string
  category?: 'technical' | 'professional' | 'academic' | 'other'
}
