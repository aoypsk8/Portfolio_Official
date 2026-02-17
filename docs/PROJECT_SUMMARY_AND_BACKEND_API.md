# Portfolio — Backend Project Spec

> เอกสารนี้เป็น **spec โปรเจกต์ Backend เท่านั้น** — ใช้สร้าง Backend แยกในอีก repo/project (ไม่สร้างโค้ด backend ใน repo นี้)

---

## 1. บริบท (Context)

### 1.1 Tech Stack (Backend)
- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express (หรือ Fastify / NestJS ตามถนัด)
- **Database**: PostgreSQL หรือ MySQL (ตาม schema ใน Section 3)

Backend นี้ให้ **REST API** สำหรับเว็บ Portfolio (Frontend เป็น Nuxt 3 แยกอยู่คนละโปรเจกต์) โดยให้ข้อมูลเนื้อหาหน้า Hero, About, Contact, Projects, Activity, Certificates, Navigation และ Home (projects, blogs, work experience) รวมถึงรับส่งข้อความจาก Contact form (POST).

- Client จะเรียก API ผ่าน base URL (เช่น `https://api.yourportfolio.com` หรือ `http://localhost:4000`) ที่ตั้งใน Frontend
- รูปแบบ response ควรตรงกับ TypeScript types ของ Frontend (อ้างอิงจาก `types/portfolio.ts` ใน repo Frontend) เพื่อให้ bind type ได้

---

## 2. Backend API

### 2.1 วัตถุประสงค์
- ให้ Frontend ดึงข้อมูลจาก API แทน static/constants
- รองรับการแก้เนื้อหาโดยไม่ต้อง build ใหม่ (หรือต่อยอดเป็น CMS)
- รองรับ Contact form (POST) และบันทึก/ส่งอีเมล

### 2.2 Base URL
- Development: เช่น `http://localhost:4000`
- Production: ใช้ domain ที่ deploy Backend

### 2.3 Endpoints

| Method | Endpoint | คำอธิบาย | Response shape |
|--------|----------|----------|----------------|
| GET | `/api/portfolio` | ข้อมูลรวม hero + about ย่อ + contact ย่อ | `{ hero, about, contact }` |
| GET | `/api/portfolio/hero` | Hero | `HeroConfig` |
| GET | `/api/portfolio/about` | About หน้าเต็ม | `AboutPageConfig` |
| GET | `/api/portfolio/contact` | Contact หน้าเต็ม | `ContactPageConfig` |
| GET | `/api/navigation` | Nav links + Hero actions | `{ links, heroActions }` |
| GET | `/api/projects` | โปรเจกต์ timeline | `Project[]` |
| GET | `/api/projects/company` | Company's projects | `CompanyProject[]` |
| GET | `/api/activities` | Activity grid + initialCount | `{ items, initialCount }` |
| GET | `/api/certificates` | Certificates | `Certificate[]` |
| GET | `/api/home` | Home: projects, blogPosts, workExperiences | `{ projects, blogPosts, workExperiences }` |
| POST | `/api/contact` | ส่งข้อความจาก Contact form | `{ success, message }` |

### 2.4 รายละเอียด Request / Response / Status

- **Response**: `Content-Type: application/json`
- **Status codes**: `200` OK, `400` Bad Request, `404` Not Found, `500` Internal Server Error
- **CORS**: เปิดให้ origin ของ Frontend (เช่น `https://your-portfolio.com`, `http://localhost:3000`)

#### GET `/api/portfolio`
- **Response 200**: `{ hero: HeroConfig, about: AboutConfig, contact: ContactConfig }`

#### GET `/api/portfolio/hero`
- **Response 200**: `HeroConfig` — `{ title?, subtitle?, socialLinks?: { label, href, icon }[] }`

#### GET `/api/portfolio/about`
- **Response 200**: `AboutPageConfig` — name, bio1, bio2, socialLinks, programmingLanguages, frameworks, librariesAndTools, otherSkills, languageSkills

#### GET `/api/portfolio/contact`
- **Response 200**: `ContactPageConfig` — headingLine1, headingLine2, paragraph1, paragraph2BeforeEmail, paragraph2AfterEmail, paragraph3, email, socialLinks

#### GET `/api/navigation`
- **Response 200**: `{ links: NavLink[], heroActions: { primary: ActionButton[], secondary: ActionButton[] } }`  
  `NavLink`: `{ href, label }`; `ActionButton`: `{ label, href }`

#### GET `/api/projects`
- **Response 200**: `Project[]` — title, description, tags?, link?, image?, logo?, logoBg?

#### GET `/api/projects/company`
- **Response 200**: `CompanyProject[]` — name, logo?, logoBg?

#### GET `/api/activities`
- **Response 200**: `{ items: ActivityItem[], initialCount: number }`  
  `ActivityItem`: title, image, description, size?: 'small'|'medium'|'large'

#### GET `/api/certificates`
- **Response 200**: `Certificate[]` — title, issuer, issueDate, expiryDate?, credentialId?, credentialUrl?, image?, description?, category?

#### GET `/api/home`
- **Response 200**: `{ projects: Project[], blogPosts: BlogPost[], workExperiences: WorkExperience[] }`  
  `BlogPost`: date, title, description, href?  
  `WorkExperience`: company, role, period, logo?, description?

#### POST `/api/contact`
- **Request body**: `{ name?: string, email: string, subject?: string, message: string }`
- **Validation**: email บังคับและ format ถูกต้อง, message ไม่ว่าง
- **Response 200**: `{ success: true, message: 'Sent' }`
- **Response 400**: `{ success: false, message: 'Validation error', errors?: string[] }`

### 2.5 หมายเหตุ Response
- คืน object/array ตรงตามตาราง ไม่ต้องห่อ `{ data: ... }` ถ้าไม่จำเป็น
- โครงสร้างให้สอดคล้องกับ `types/portfolio.ts` ใน Frontend

---

## 3. Database Design

แนะนำใช้ **PostgreSQL** หรือ **MySQL**

### 3.1 Entity (สรุป)
- **site_settings** — key-value (hero, about_summary, contact_summary, navigation) เก็บ JSON
- **about_page** — 1 row ต่อ site
- **contact_page** — 1 row ต่อ site
- **nav_links** — ลิงก์เมนู
- **hero_actions** — ปุ่ม Hero (primary/secondary)
- **projects** — โปรเจกต์ timeline
- **company_projects** — โปรเจกต์ของบริษัท
- **activities** — รายการ Activity
- **certificates** — ใบรับรอง
- **blog_posts** — โพสต์หน้า Home (Blogs)
- **work_experiences** — ประสบการณ์ทำงาน (หน้า Home)
- **contact_submissions** — ข้อความจาก Contact form (POST /api/contact)

### 3.2 Schema ตาราง

#### `site_settings` (optional — ถ้าใช้ key-value)
| Column | Type | Note |
|--------|------|------|
| id | PK, serial/uuid | |
| key | VARCHAR(64), UNIQUE | เช่น `hero`, `about_summary`, `contact_summary`, `navigation` |
| value | JSONB/JSON | เก็บ object ตาม type |
| updated_at | TIMESTAMP | |

#### `about_page`
| Column | Type | Note |
|--------|------|------|
| id | PK, serial | |
| name | VARCHAR(255) | |
| bio1 | TEXT | |
| bio2 | TEXT | |
| programming_languages | JSONB | array of string |
| frameworks | JSONB | array of { name, level } |
| libraries_and_tools | JSONB | array of string |
| other_skills | JSONB | array of string |
| language_skills | JSONB | array of { language, level } |
| social_links | JSONB | array of { label, href, icon } |
| updated_at | TIMESTAMP | |

#### `contact_page`
| Column | Type | Note |
|--------|------|------|
| id | PK, serial | |
| heading_line1 | VARCHAR(255) | |
| heading_line2 | VARCHAR(255) | |
| paragraph1 | TEXT | |
| paragraph2_before_email | TEXT | |
| paragraph2_after_email | TEXT | |
| paragraph3 | TEXT | |
| email | VARCHAR(255) | |
| social_links | JSONB | |
| updated_at | TIMESTAMP | |

#### `nav_links`
| Column | Type | Note |
|--------|------|------|
| id | PK, serial | |
| href | VARCHAR(255) | |
| label | VARCHAR(64) | |
| sort_order | INT | |

#### `hero_actions`
| Column | Type | Note |
|--------|------|------|
| id | PK, serial | |
| kind | VARCHAR(16) | 'primary' | 'secondary' |
| label | VARCHAR(128) | |
| href | VARCHAR(512) | |
| sort_order | INT | |

#### `projects`
| Column | Type | Note |
|--------|------|------|
| id | PK, serial | |
| title | VARCHAR(255) | |
| description | TEXT | |
| link | VARCHAR(512) | nullable |
| image | VARCHAR(512) | nullable |
| logo | VARCHAR(16) | nullable |
| logo_bg | VARCHAR(32) | nullable |
| tags | JSONB | nullable |
| sort_order | INT | |

#### `company_projects`
| Column | Type | Note |
|--------|------|------|
| id | PK, serial | |
| name | VARCHAR(255) | |
| logo | VARCHAR(16) | nullable |
| logo_bg | VARCHAR(32) | nullable |
| sort_order | INT | |

#### `activities`
| Column | Type | Note |
|--------|------|------|
| id | PK, serial | |
| title | VARCHAR(255) | |
| image | VARCHAR(512) | |
| description | TEXT | |
| size | VARCHAR(16) | 'small'|'medium'|'large', default 'medium' |
| sort_order | INT | |

#### `certificates`
| Column | Type | Note |
|--------|------|------|
| id | PK, serial | |
| title | VARCHAR(255) | |
| issuer | VARCHAR(255) | |
| issue_date | VARCHAR(32) | |
| expiry_date | VARCHAR(32) | nullable |
| credential_id | VARCHAR(128) | nullable |
| credential_url | VARCHAR(512) | nullable |
| image | VARCHAR(512) | nullable |
| description | TEXT | nullable |
| category | VARCHAR(32) | nullable |
| sort_order | INT | |

#### `blog_posts`
| Column | Type | Note |
|--------|------|------|
| id | PK, serial | |
| date | VARCHAR(32) | e.g. "17 May 2025" |
| title | VARCHAR(255) | |
| description | TEXT | |
| href | VARCHAR(512) | nullable |
| sort_order | INT | |

#### `work_experiences`
| Column | Type | Note |
|--------|------|------|
| id | PK, serial | |
| company | VARCHAR(255) | |
| role | VARCHAR(255) | |
| period | VARCHAR(128) | |
| logo | VARCHAR(16) | nullable |
| description | TEXT | nullable |
| sort_order | INT | |

#### `contact_submissions`
| Column | Type | Note |
|--------|------|------|
| id | PK, serial | |
| name | VARCHAR(255) | nullable |
| email | VARCHAR(255) | |
| subject | VARCHAR(255) | nullable |
| message | TEXT | |
| created_at | TIMESTAMP | |

### 3.3 Indexes แนะนำ
- `nav_links(sort_order)`, `projects(sort_order)`, `company_projects(sort_order)`, `activities(sort_order)`, `certificates(sort_order)`, `blog_posts(sort_order)`, `work_experiences(sort_order)`
- `contact_submissions(created_at)`

### 3.4 ทางเลือกแบบง่าย
- ใช้ตารางเดียว **`content_blocks`**: `key` (เช่น `hero`, `about_page`, `projects`, …) + `value` (JSONB) — อ่านมาส่งให้ API ตรง shape ข้างต้น
- ตาราง **`contact_submissions`** ยังใช้แยกสำหรับ POST /api/contact

---

## 4. Environment Variables (Backend)

| Variable | คำอธิบาย |
|----------|----------|
| `PORT` | พอร์ต server (default เช่น 4000) |
| `NODE_ENV` | development \| production |
| `DATABASE_URL` | connection string (PostgreSQL/MySQL) |
| `CORS_ORIGIN` | origin ที่อนุญาต (หรือหลาย origin คั่นด้วย comma) |
| `SMTP_*` / mail service (optional) | ถ้า POST /api/contact ส่งอีเมลจริง |

---

## 5. ขั้นตอนทำ Backend (โปรเจกต์ Backend เท่านั้น)

- สร้างโปรเจกต์ Backend แยก (Express/Fastify/Nest ฯลฯ)
- อ้างอิงเอกสารนี้สำหรับ endpoints และ response shape; อ้างอิง `types/portfolio.ts` ใน repo Frontend สำหรับ TypeScript types
- เลือกใช้ DB ตาม schema ด้านบน หรือเริ่มจาก JSON/in-memory แล้วค่อยย้ายไป DB
- เปิด CORS ให้ origin ของ Frontend
- Implement GET ทุก endpoint แล้วตามด้วย POST `/api/contact` (บันทึกใน `contact_submissions` และ/หรือส่งอีเมล)
