import type { AboutPageConfig } from '~/types/portfolio'

/** ข้อมูลหน้า About ตามดีไซน์ (แก้ชื่อ, bio, skills ได้) */
export const ABOUT_PAGE: AboutPageConfig = {
  name: 'AOY PHONGSAKOUN',
  bio1:
    'Software Engineer | Full-Stack & Mobile Developer (Fintech) based in Vientiane, Laos. Software Engineer with 2+ years of professional experience in fintech, e-wallets, and digital banking systems. Strong expertise in mobile, frontend, and backend development, with hands-on experience in payment gateways, QR payments, OTP verification, and transaction systems.',
  bio2:
    'Skilled in system analysis, data analysis, and problem-solving, with a strong focus on secure and scalable financial applications. Currently working at IndochinaBank (Sep 2025 – Present) developing and maintaining mobile and web applications for banking systems. Previously worked at Lao Mobile Money (Lao Telecom) from Oct 2023 – Sep 2025, developing fintech, e-wallet and telecom services applications.',
  socialLinks: [
    { label: 'Facebook', href: 'https://facebook.com', icon: 'f' },
    { label: 'GitHub', href: 'https://github.com', icon: '⌘' },
    { label: 'Instagram', href: 'https://instagram.com', icon: '📷' },
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'in' }
  ],
  programmingLanguages: ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'Java', 'Python', 'Dart', 'SQL', 'C', 'C#', 'Visual Basic', 'EJS'],
  frameworks: [
    { name: 'Flutter', level: 85 },
    { name: 'React.js', level: 85 },
    { name: 'Next.js', level: 80 },
    { name: 'Vue.js', level: 80 },
    { name: 'Nuxt.js', level: 80 },
    { name: 'Node.js - Express', level: 85 },
    { name: 'Spring Boot', level: 40 }
  ],
  librariesAndTools: ['Tailwind CSS', 'Bootstrap', 'REST APIs', 'Docker', 'Docker Compose', 'GitHub Actions', 'GitLab CI/CD', 'Firebase', 'Postman'],
  otherSkills: [
    'MySQL',
    'PostgreSQL',
    'MongoDB',
    'SQL Server',
    'SQL Lite',
    'System Analysis (Structure and OOP)',
    'Data Analysis',
    'Data Visualization',
    'Basic Machine Learning',
    'Python (Pandas)'
  ],
  languageSkills: [
    { language: 'Lao', level: 'Native' },
    { language: 'Thai', level: 'Advanced' },
    { language: 'English', level: 'Intermediate Upper Intermediate' }
  ]
}
