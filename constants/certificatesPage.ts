import type { Certificate } from '~/types/portfolio'

/** รายการ Certificates ทั้งหมด */
export const CERTIFICATES: Certificate[] = [
  {
    title: 'Flutter Development',
    issuer: 'Google',
    issueDate: '2024',
    credentialId: 'FLUTTER-2024-001',
    credentialUrl: 'https://example.com/cert/flutter',
    category: 'technical',
    description: 'Complete Flutter development course covering mobile app development, state management, and API integration.'
  },
  {
    title: 'React.js Advanced',
    issuer: 'Meta',
    issueDate: '2023',
    credentialId: 'REACT-2023-002',
    credentialUrl: 'https://example.com/cert/react',
    category: 'technical',
    description: 'Advanced React.js concepts including hooks, context API, performance optimization, and testing.'
  },
  {
    title: 'Node.js Backend Development',
    issuer: 'Udemy',
    issueDate: '2023',
    credentialId: 'NODE-2023-003',
    credentialUrl: 'https://example.com/cert/nodejs',
    category: 'technical',
    description: 'Comprehensive Node.js backend development with Express.js, REST APIs, and database integration.'
  },
  {
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    issueDate: '2024',
    expiryDate: '2027',
    credentialId: 'AWS-CP-2024-004',
    credentialUrl: 'https://example.com/cert/aws',
    category: 'professional',
    description: 'Foundational AWS cloud knowledge covering core services, security, and cloud architecture.'
  },
  {
    title: 'Docker & Containerization',
    issuer: 'Docker Inc.',
    issueDate: '2023',
    credentialId: 'DOCKER-2023-005',
    credentialUrl: 'https://example.com/cert/docker',
    category: 'technical',
    description: 'Docker containerization, Docker Compose, and container orchestration fundamentals.'
  },
  {
    title: 'Git & Version Control',
    issuer: 'GitHub',
    issueDate: '2022',
    credentialId: 'GIT-2022-006',
    credentialUrl: 'https://example.com/cert/git',
    category: 'technical',
    description: 'Git version control, GitHub workflows, CI/CD pipelines, and collaborative development practices.'
  }
]
