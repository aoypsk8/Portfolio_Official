import type { ActivityItem } from '~/types/portfolio'

/** รายการ Activity (แสดงใน grid; แก้รูป/ชื่อ/คำอธิบายได้) */
export const ACTIVITY_ITEMS: ActivityItem[] = [
  {
    title: 'The Benefits of Cloud Computing',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600',
    description: 'Explore how cloud computing can help your business scale and reduce infrastructure costs.',
    size: 'large'
  },
  {
    title: 'Modern Frontend in 2025',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
    description: 'A look at the latest trends in frontend development and tooling.',
    size: 'small'
  },
  {
    title: 'Design Systems That Scale',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
    description: 'Building consistent and maintainable design systems for product teams.',
    size: 'small'
  },
  {
    title: 'CI/CD Best Practices',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600',
    description: 'Automate your deployment pipeline and ship with confidence.',
    size: 'medium'
  },
  {
    title: 'Mobile-First Design',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400',
    description: 'Why mobile-first approaches lead to better user experiences.',
    size: 'small'
  },
  {
    title: 'API Design Patterns',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
    description: 'REST, GraphQL, and when to use each for your next project.',
    size: 'large'
  },
  {
    title: 'Accessibility Matters',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    description: 'Making the web inclusive for everyone with WCAG guidelines.',
    size: 'small'
  },
  {
    title: 'Performance Optimization',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
    description: 'Techniques to make your applications faster and more efficient.',
    size: 'medium'
  },
  {
    title: 'Team Collaboration',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400',
    description: 'Tools and practices for effective remote and async teamwork.',
    size: 'small'
  },
  {
    title: 'Database Design',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600',
    description: 'Schema design, indexing, and scaling relational and NoSQL databases.',
    size: 'large'
  },
  {
    title: 'Security in Web Apps',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400',
    description: 'Common vulnerabilities and how to protect your users.',
    size: 'small'
  },
  {
    title: 'Testing Strategies',
    image: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=600',
    description: 'Unit, integration, and E2E testing for reliable software.',
    size: 'medium'
  }
]

/** จำนวนที่แสดงครั้งแรก ก่อนกด "Show more" */
export const ACTIVITY_INITIAL_COUNT = 6
