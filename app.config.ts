export default defineAppConfig({
  // แก้ค่าตรงนี้หรือใช้ runtimeConfig จาก env ใน production
  portfolio: {
    hero: {
      title: "I'm AOY PHONGSAKOUN - Software Engineer | Full-Stack & Mobile Developer",
      subtitle:
        'Software Engineer with 2+ years of professional experience in fintech, e-wallets, and digital banking systems. Strong expertise in mobile, frontend, and backend development, with hands-on experience in payment gateways, QR payments, OTP verification, and transaction systems.',
      socialLinks: [
        { label: 'Facebook', href: 'https://facebook.com', icon: 'f' },
        { label: 'Instagram', href: 'https://instagram.com', icon: '📷' },
        { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'in' }
      ]
    },
    about: {
      text: 'Software Engineer with 2+ years of professional experience in fintech, e-wallets, and digital banking systems. Strong expertise in mobile, frontend, and backend development, with hands-on experience in payment gateways, QR payments, OTP verification, and transaction systems. Skilled in system analysis, data analysis, and problem-solving, with a strong focus on secure and scalable financial applications.',
      skills: ['Flutter', 'React.js', 'Next.js', 'Vue.js', 'Nuxt.js', 'Node.js', 'Express.js', 'TypeScript', 'JavaScript', 'Python', 'Java', 'Dart', 'MySQL', 'PostgreSQL', 'MongoDB', 'Docker', 'GitHub Actions']
    },
    contact: {
      message: 'Open to collaboration and new opportunities. Reach out via the links below.',
      links: [
        { label: 'GitHub', href: 'https://github.com', icon: '↗' },
        { label: 'LinkedIn', href: 'https://linkedin.com', icon: '↗' },
        { label: 'Email', href: 'mailto:aoypsk8@gmail.com', icon: '✉' }
      ]
    }
  }
})
