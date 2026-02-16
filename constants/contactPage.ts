import type { ContactPageConfig } from '~/types/portfolio'

/** ข้อมูลหน้า Contact (แก้ข้อความ/อีเมล/โซเชียลได้) */
export const CONTACT_PAGE: ContactPageConfig = {
  headingLine1: "Let's Get in Touch :",
  headingLine2: 'Ways to Connect with Me',
  paragraph1:
    "Thank you for your interest in connecting! I'm always open to discussing software projects, collaborations, or simply sharing ideas about technology, mobile apps, and fintech innovation.",
  paragraph2BeforeEmail:
    'If you have specific questions, feedback, or opportunities, feel free to reach out directly via email at ',
  paragraph2AfterEmail:
    '. I do my best to respond within 24 hours, though replies may take a bit longer during busy development cycles.',
  paragraph3:
    'Alternatively, you can message me through the contact form on my portfolio website for a more structured inquiry.',
  email: 'aoypsk8@gmail.com',
  socialLinks: [
    { label: 'Facebook', href: 'https://facebook.com', icon: 'f' },
    { label: 'GitHub', href: 'https://github.com', icon: '⌘' },
    { label: 'Instagram', href: 'https://instagram.com', icon: '📷' },
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'in' }
  ]
}
