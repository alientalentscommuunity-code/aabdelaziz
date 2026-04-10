# Product Requirements Document (PRD)
## ALIENs Portfolio — Ahmad Abdelaziz

---

# 1. PROJECT OVERVIEW

## 1.1 Project Summary
A personal portfolio and career framework website for Ahmad Abdelaziz, an AIProduct Manager with fullstac vibe coding craft. The site features a unique "ALIENs" sci-fi aesthetic (pure black + neon green + hunter orange + glassmorphism) and serves as both a professional portfolio and a career development resource hub.

## 1.2 Target Audience
- Hiring managers and recruiters
- Potential collaborators and partners
   - Global Companies
   - Incubations & VCs
   - Mentors
   - Educational & Recruitment institutions
- Fellow product managers and tech professionals
- Community members and mentees

## 1.3 Core Value Proposition
"Remote Mastery for Multipotentialites" — showcasing product management expertise, AI-enabled development approach, and community-led growth achievements. + my my own startup with Hiring co-founder page and job application + CTA for others to reach out/ request, etc

---

# 2. TECHNICAL SPECIFICATIONS

## 2.1 Tech Stack
| Layer | Technology |
|-------|------------|
| Framework | React 18.3.1 |
| Build Tool | Vite 5.4.1 |
| Language | TypeScript 5.5.3 |
| Styling | Tailwind CSS 3.4.11 |
| UI Components | shadcn/ui + Radix UI primitives |
| Icons | Lucide React |
| Routing | React Router DOM 6.26.2 |
| State/Data | TanStack Query 5.56.2 + Supabase |
| Animation | CSS animations + Tailwind |
| Fonts | Space Grotesk, Space Mono, DM Sans, Playfair Display, Cairo |
| Backend | Supabase (PostgreSQL + Auth + Storage) |

## 2.2 Project Structure
```
src/
├── components/
│   ├── ui/              # shadcn/ui components (49 items)
│   ├── career/          # Career section components
│   ├── human/           # Human side components
│   ├── shared/          # Shared components
│   └── RequestFormDialog.tsx  # Contact form modal
├── pages/
│   ├── Home.tsx
│   ├── CareerLanding.tsx
│   ├── CareerCV.tsx
│   ├── CareerPortfolio.tsx
│   ├── HumanSide.tsx
│   ├── Partners.tsx
│   ├── Handbook.tsx
│   ├── NotFound.tsx
│   └── admin/
│       ├── Login.tsx    # Admin login page
│       └── Dashboard.tsx # Request management dashboard
├── lib/
│   ├── utils.ts
│   ├── data.ts
│   └── supabase.ts      # Supabase client & types
├── hooks/
│   └── useSupabase.ts   # Custom hooks for auth & requests
├── App.tsx
└── index.css
```

## 2.3 Dependencies (Production)
```json
{
  "@hookform/resolvers": "^3.9.0",
  "@radix-ui/react-*": "^1.1.x",
  "@supabase/supabase-js": "^2.x.x",
  "@tanstack/react-query": "^5.56.2",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "cmdk": "^1.0.0",
  "date-fns": "^3.6.0",
  "embla-carousel-react": "^8.3.0",
  "input-otp": "^1.2.4",
  "lucide-react": "^0.462.0",
  "next-themes": "^0.3.0",
  "react": "^18.3.1",
  "react-day-picker": "^8.10.1",
  "react-dom": "^18.3.1",
  "react-hook-form": "^7.53.0",
  "react-resizable-panels": "^2.1.3",
  "react-router-dom": "^6.26.2",
  "recharts": "^2.12.7",
  "sonner": "^1.5.0",
  "tailwind-merge": "^2.5.2",
  "tailwindcss-animate": "^1.0.7",
  "vaul": "^0.9.3",
  "zod": "^3.23.8"
}
```

---

# 3. DESIGN SYSTEM

## 3.1 Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `#000000` (pure black) | Page background |
| `--foreground` | `#FFFFFF` | Primary text |
| `--primary` | `#22C55E` (green-500) | Primary accent, CTAs, highlights |
| `--primary-foreground` | `#000000` | Text on primary backgrounds |
| `--secondary` | `#F97316` (orange-500) | Secondary accent, special highlights |
| `--secondary-foreground` | `#000000` | Text on secondary backgrounds |
| `--card` | `hsl(0 0% 3%)` | Card backgrounds |
| `--border` | `rgba(255,255,255,0.1)` | Subtle borders |
| `--muted` | `hsl(0 0% 10%)` | Muted backgrounds |
| `--muted-foreground` | `rgba(255,255,255,0.6)` | Secondary text |

## 3.2 Typography

| Element | Font | Weight | Style | Size |
|---------|------|--------|-------|------|
| Headlines | Space Grotesk | 900 (black) | Italic, uppercase | text-5xl to text-8xl |
| Subheadings | Space Grotesk | 700 | Italic | text-xl to text-2xl |
| Body | Space Grotesk | 500 | Italic | text-base |
| Labels | Space Grotesk | 900 | Uppercase, tracking-widest | text-[10px] |
| Monospace | Space Mono | 400/700 | - | text-xs |
| Arabic | Cairo | 400-900 | - | varies |

### Typography Classes
```css
/* Section Titles */
.section-title {
  @apply text-3xl sm:text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-10 text-white;
}

/* Brutalist Headlines */
font-black italic uppercase tracking-tighter

/* Muted Paragraphs */
font-medium italic text-white/40

/* Labels */
text-[10px] font-black uppercase tracking-widest
```

## 3.3 Spacing System
| Token | Value |
|-------|-------|
| Section padding | `py-16 sm:py-24` |
| Container max-width | `max-w-7xl` |
| Container padding | `px-4 sm:px-6 lg:px-12` |
| Card padding | `p-6 to p-8` |
| Card border-radius | `3rem (rounded-[3rem])` |
| Small card radius | `1.5rem (rounded-3xl)` |

## 3.4 Glassmorphism System

### Primary Glass Card
```css
.glass {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 3rem;
}
```

### Small Glass Card
```css
.glass-sm {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.5rem;
}
```

### Glass Hover States
```css
hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)]
hover:border-orange-500/50 hover:shadow-[0_0_30px_rgba(249,115,22,0.2)]
```

## 3.5 Button System

| Variant | Class | Appearance |
|---------|-------|------------|
| Primary | `btn btn-primary` | Green background, black text, green glow shadow |
| Secondary | `btn btn-secondary` | Orange background, black text, orange glow shadow |
| Outline | `btn btn-outline` | Transparent, white border, hover glow |
| Ghost | `btn` + custom | White/5 background, subtle border |

### Button Base
```css
.btn {
  @apply px-6 py-3 rounded-full font-black uppercase tracking-widest text-[10px] italic transition-all duration-300;
}
.btn-primary {
  @apply bg-green-500 text-black hover:bg-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] active:scale-95;
}
```

## 3.6 Animation Specifications

| Animation | CSS | Duration |
|-----------|-----|----------|
| Fade In | `animate-fade-in` | 0.8s ease-out |
| Fade In Right | `animate-fade-in-right` | 0.8s ease-out |
| Neon Pulse | `animate-neon-pulse` | 4s infinite |
| Scroll Reveal | `.scroll-animation` | 0.6s ease-out |
| Accordion | `animate-accordion-down/up` | 0.2s ease-out |

### Scroll Animation
```css
.scroll-animation {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.scroll-animation.active {
  opacity: 1;
  transform: translateY(0);
}
```

---

# 4. PAGE SPECIFICATIONS

## 4.1 Route Structure

| Route | Component | Title | Access |
|-------|-----------|-------|--------|
| `/` | Home | "Ahmad Abdelaziz \| AI Product Manager & Builder" | Public |
| `/career` | CareerLanding | "Career Side — Ahmad Abdelaziz" | Public |
| `/career/cv` | CareerCV | "CV — Ahmad Abdelaziz" | Public |
| `/career/portfolio` | CareerPortfolio | "Portfolio — Ahmad Abdelaziz" | Public |
| `/human` | HumanSide | "Human Side — Ahmad Abdelaziz" | Public |
| `/partners` | Partners | "Work With Me — Ahmad Abdelaziz" | Public |
| `/handbook` | Handbook | "Startup Handbook" | Public |
| `/admin` | AdminLogin | "Admin Login" | Public |
| `/admin/dashboard` | AdminDashboard | "Admin Dashboard" | Authenticated |
| `/vision-board` | VisionBoard | "Vision Board" | Public |
| `/blog` | Blog | "Blog" | Public |
| `/sweet-spice` | SweetSpice | "Sweet Spice" | Public |
| `*` | NotFound | "404" | Public |

## 4.2 Navigation Structure

### Main Navigation (Navbar)
| Label | Path | Accent |
|-------|------|--------|
| ALIEN**S** (Logo) | `/` | Green "S" |
| Human Side | `/human` | White |
| Career Side | `/career` | White |
| Work With Me | `/partners` | White |
| Sweet Spice | `/sweet-spice` | Pink |
| Vision Board | `/vision-board` | Purple |
| Blog | `/blog` | Purple |
| Startup Handbook | `/handbook` | Orange (secondary) |
| Request Form (CTA) | Opens dialog | Green button |

**Request Form Dialog**: Replaces previous "Hire Me" button. Opens a modal with persona-based form for contact requests.

### Navigation Styling
- Desktop: Glass pill, centered, floating at `top-4`
- Max-width: `max-w-5xl`
- Padding: `px-3 py-2`
- Active state: `bg-white/[0.07] text-white/90 border border-white/15`
- Inactive: `text-white/35 hover:text-white hover:bg-white/5`
- Special (Handbook): `bg-secondary/[0.12] text-secondary border border-secondary/35`
- Special (Sweet Spice): `bg-pink-500/10 text-pink-400 border border-pink-500/30`
- Special (Vision/Blog): `bg-purple-500/10 text-purple-400 border border-purple-500/30`

---

# 5. COMPONENT SPECIFICATIONS

## 5.1 Hero Component (`src/components/Hero.tsx`)

### Layout
- Section: `min-h-screen flex items-center pt-20 bg-black ambient-glow`
- Container: `section-container w-full`
- Content max-width: `max-w-4xl`

### Content

**Headline:**
```
Ahmad
Abdelaziz
```
- Styling: `text-5xl sm:text-6xl md:text-8xl font-black italic uppercase tracking-tighter mb-4 text-white`
- "Abdelaziz" has: `text-green-500 neon-glow`

**Subtitle:**
```
AI-enabled Product Manager | Community-Led Growth
```
- Styling: `text-lg sm:text-xl font-medium italic text-white/40 mb-6`

**Contact Row:**
| Icon | Label | Link |
|------|-------|------|
| Mail | ahmad@alientalents.com | mailto:ahmad@alientalents.com |
| Linkedin | LinkedIn | https://www.linkedin.com/in/ahmad96abdelaziz/ |
| MapPin | Egypt • Global Remote | (text only) |

**Summary Bullets:**
```
• 1+ Year prototyping with LLMs & Vibe coding building AI copilot for global talent & hiring managers.

• Shipped Jobs & companies boards, talent marketplace, Mini ATS, and +2 in-progress MVPs
  → Achieving 20k+ visits, 3k+ applies, 500 Signups, and $2k+ Monetized with 100% Profit margin
  → 2 Closed-won partnerships with nsave.co, Athar Accelerator, and $5K inbound MRR Pipeline
  → Winner in Cairo AI Hackathon by Athar Accelerator

• Leveraged diverse tech stacks and AI tools: Lovable.dev, Antigravity, Cursor, Supabase, Airtable.
```

**CTA Buttons:**
| Label | Icon | Action | Style |
|-------|------|--------|-------|
| Career Dimension | Rocket | Link to `/career` | Blue gradient `#4A9EFF` |
| View Projects | ExternalLink | Anchor to `#projects` | `btn-primary` |
| Get In Touch | - | Anchor to `#contact` | `btn-outline` |

---

## 5.2 About Component (`src/components/About.tsx`)

### Layout
- Section: `py-20 bg-black`
- Grid: `lg:grid-cols-2 gap-8`

### Section Title
```
About Me
```
- "Me" has: `highlight` class (green-500)

### Left Column: LinkedIn Bio Card

**Opening:**
```
Hey, curious stalker—I'm Ahmad • Human being.
```
- Styling: `text-xl font-medium italic text-white/40 mb-6`

**Quick Stats:**
| Emoji | Text |
|-------|------|
| ✌🏻 (green) | Doing Product Management • Community Growth |
| 🏇 (green) | Shipped AI Sr. Recruiter w/ psychometrics (MVP) |
| 🎖 (orange) | $2K ROI (Partnerships & AI Hackathon Winner) |

**Handbook Section:**
- Label: "My ALIEN-Style Handbook" (green, uppercase)
- Tagline: "Non-Linear | Good Taste | High Standards"
- Items:
  - 🌵 Starting over.. from 0. But like an ALIEN.
  - 🎖 Surviving uncertainty w/ unstoppable resilience
    - ✧ like a Porsche with no brakes. (Sia 🩷)
    - ✧ Learning by doing → Curious • Kind • Wild

**Personal Section:**
| Icon/Emoji | Text |
|------------|------|
| Heart (red) | Obsessed with Knowledge • Trying things out |
| ✧ (orange) | + Any kind of: Art • Architecture • Adventures |
| ✧ (green) | 24/7 active to Connect & initiate talks/activities. |
| 🇵🇸 | Stand for Humanity • My ppl • Palestine |
| Sparkles (orange) | Exploring diverse lives & universe(s). |

**Interest Tags:**
- Icons: Globe, ChefHat, Gamepad2, Coffee
- Labels: Hangouts, Cooking, Gaming, Coffee

**Closing:**
```
🦄 Would it help? Yep.
Curious? Aligned? Resonate with my journey? 🙃
```

### Right Column: Working Style Card

**Section Title:**
```
💼 Working Style
```

**Subsections (glass-sm cards):**

| Section | Content |
|---------|---------|
| Commute | Global Remote / Open to Relocation |
| Employment | EOR, Direct, B2B Contractor (green badges) |
| Commitment | Full-Time, Project-Based (orange badges) |
| Compensation Ask | 💵 $1K – $1.5K / month + package<br>⏱️ $25 / hour<br>🤝 $0 for my peers (learning by doing together) |

---

## 5.3 Experience Component (`src/components/Experience.tsx`)

### Section Title
```
My Journey
```
- "Journey" has: `highlight` class

### ALIENs Venture Card (Current)

**Header:**
- Company: `ALIENs Venture` (green, brutalist)
- Period: July 2024 – Current
- Badge: "Current" (green pulse animation)

**Role 1: Product Manager | Entrepreneur in Residence**
- Period: January 2024 – Current
- Icon: Briefcase (green)

**Responsibilities:**
```
• Skilled in 0 → MVP: Ideate, Discovery, Research, PRD, Strategy, Prototyping with LLMs & Vibe coding tools.
  → Shipped Jobs & companies boards, talent marketplace, Mini ATS, and +2 in-progress MVPs
     ┌─────────────────┐ ┌─────────────────┐
     │ 📈 20k+ visits  │ │ 🏆 $2k+ ROI     │
     │ 3k+ applies     │ │ 100% Profit     │
     │ 500 Signups     │ │                 │
     └─────────────────┘ └─────────────────┘
• 2 Closed-won partnerships with nsave.co, Athar Accelerator, and $5K inbound MRR Pipeline
• Winner in Cairo AI Hackathon by Athar Accelerator (orange highlight)
• 1 talent secured a $1.5k/month full-time job, 1 talent earned $1.8K in a 3-month gig.
• +16 talents secured one or multiple interviews, and +50 in total interviews secured.
• Leveraged diverse tech stacks: Claude, Lovable.dev, Supabase, Airtable, Softr, Notion, Lark.
```

**Role 2: Community & Program**
- Period: July 2024 – December 2024
- Icon: Users (orange)

**Responsibilities:**
```
• Managing end-to-end programs, ops, design, content.
  → 70+ weeks of newsletter, Blog, and Meetups.
  → 100+ hours of weekly meetups & 1-to-1 calls
• Host & Creator @ ALIENs Talks Podcast.
  [YouTube: 250 subs | 6.3K views | 50 videos] [Watch on YouTube]
• 🛡️ Moderate 36k SubReddit members
```

### Commercial Experience Card

**Title:** Commercial Experience (Pre-Product Career)

**Section 1: Customer Lifecycle & GTM Roles**
- Location: Egypt, GCC, EMEA
- Period: 2020–2024

**Metrics:**
| Metric | Value | Badge |
|--------|-------|-------|
| B2B Pipeline | $240K | green |
| Details | 40+ SQOs delivered | - |
| B2C Revenue | $10K | orange |
| Breakdown | 60% new / 25% retention / 15% referrals | - |
| CSAT | 90%+ | Award icon |

**Section 2: Early Career in SMEs & Startups**
- Period: 2014–2020
- Highlights: Validated MVPs (AI/Bot therapist, VR Montessori), built internal processes, secured partnerships

### Education Card

| Item | Detail |
|------|--------|
| 📚 Faculty of Commerce | Beni Suef University - Dropped Out (2016–2019) |
| 🎓 High School Diploma | (2011–2016) |
| 🌱 Autodidact | Self-learner with RVE/Learning by doing Approach (2014–Now) |

**Skill Tags:** Entrepreneurship, Sales & BD, Product Management

---

## 5.4 Projects Component (`src/components/Projects.tsx`)

### Section Title
```
Shipped Products
```
- "Products" has: `highlight` class

### Subtitle
```
100% Human-Made, AI Delivered (Vibe Coding) at $0 — Shipped Jobs & companies boards, talent marketplace, Mini ATS, and +2 in-progress MVPs.
```

### Project Cards Grid
`grid md:grid-cols-2 lg:grid-cols-3 gap-6`

### Project Data

| # | Title | Category | Description | Status | URL | Tags |
|---|-------|----------|-------------|--------|-----|------|
| 1 | ALIEN Talents Platform | Platform | Complete talent marketplace connecting AI-enabled professionals with opportunities. Features job board, CRM, and community platform. | live | https://guileless-daifuku-9c29b0.netlify.app/ | React, Community, Job Board, MVP |
| 2 | Remote $$ Job Board | Job Board | Helping MENA talent land global remote USD-paying jobs. | live | https://alientalents.com | Remote, Job Board, MENA, USD, Global |
| 3 | ATOS Hiring Platform | Enterprise | Comprehensive hiring management system for startups to streamline their recruitment process from posting to onboarding. | demo | https://ubiquitous-custard-6d2ece.netlify.app/ | Enterprise, Recruitment, Management, B2B |
| 4 | Career Hub CRM | SaaS Tool | Job-seeking CRM to help professionals manage their career journey, track applications, and optimize their job search strategy. | demo | https://preview--alien-career-hub.lovable.app/ | CRM, Career, Job Search, Productivity |
| 5 | AALN \| AI Personal Mentor | AI Product | AI-powered mentoring platform with personalized learning paths for both individual learners and startup teams. | demo | https://tubular-melba-fade64.netlify.app/ | AI, Mentoring, Education, Personalized |
| 6 | ALIEN ATS | HR Tech | Applicant Tracking System with CV evaluation and mentoring features for both candidates and hiring teams. | demo | https://alien-ats.lovable.app | ATS, HR, CV Analysis, Hiring |

### Project Card Structure
```
┌─────────────────────────────────────┐
│ [CATEGORY]          [STATUS BADGE]  │
│                                     │
│ PROJECT TITLE                       │
│ Description text...                 │
│                                     │
│ [tag] [tag] [tag]                   │
│                                     │
│ [View Live] or [Try Demo]           │
└─────────────────────────────────────┘
```

**Status Badge Styling:**
- Live: `bg-green-500/10 text-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]`
- Demo: `bg-orange-500/10 text-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.3)]`

**Action Button Styling:**
- Live: `border-green-500/30 text-green-500 hover:bg-green-500 hover:text-black`
- Demo: `border-orange-500/30 text-orange-500 hover:bg-orange-500 hover:text-black`

---

## 5.5 Contact Component (`src/components/Contact.tsx`)

### Layout
- Section: `py-20 bg-black ambient-glow`
- Content: `max-w-2xl mx-auto`

### Section Title
```
Get In Touch
```
- "Touch" has: `highlight` class
- Alignment: `text-center`

### Subtitle
```
Curious? Aligned? Resonate with my journey? Let's connect and explore how we can work together.
```

### Contact Cards (2x2 Grid)

| Icon | Label | Value | Link | Glow Color |
|------|-------|-------|------|------------|
| Mail | Email | ahmad@alientalents.com | mailto | Green |
| Linkedin | LinkedIn | Connect | LinkedIn URL | Green |
| Phone | Phone | (+20) 106 715 6747 | tel | Orange |
| MapPin | Location | Egypt • Global Remote | - | Orange |

### Availability Badge
```
● Open to opportunities
```
- Green dot with pulse animation
- Green text, green background/10
- Shadow: `shadow-[0_0_20px_rgba(34,197,94,0.2)]`

---

## 5.6 Footer Component (`src/components/Footer.tsx`)

### Layout
- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Structure: Flex row (brand, social, copyright)
- Border: `border-t border-white/10`

### Brand
```
Ahmad Abdelaziz
AI-enabled Product Manager
```
- Name: Green, brutalist
- Title: white/20, italic

### Social Icons
| Icon | URL | Hover Color |
|------|-----|-------------|
| Linkedin | https://www.linkedin.com/in/ahmad96abdelaziz/ | Green |
| Mail | mailto:ahmad@alientalents.com | Green |
| Youtube | https://www.youtube.com/@ALIEN.Talents | Red |

### Copyright
```
Made with ❤️ by Ahmad
© 2025 All rights reserved
```

---

## 5.7 SubNav Component (`src/components/shared/SubNav.tsx`)

### Usage
Horizontal tab navigation for Career and Human pages.

### Props
```typescript
interface SubNavProps {
  items: string[];        // Tab labels
  active: string;         // Currently active
  onSelect: (item: string) => void;
  accentColor?: string;    // Default: text-green-500
}
```

### Styling
- Container: `glass px-3 py-2.5 w-fit max-w-full`
- Active: `bg-white/[0.07] text-white/90 border border-white/15`
- Inactive: `text-white/30 border border-transparent hover:text-white/60 hover:bg-white/[0.03]`
- Font: `font-mono text-[10px] font-bold uppercase tracking-widest rounded-full px-4 py-2`

---

## 5.8 RequestFormDialog Component (`src/components/RequestFormDialog.tsx`)

### Purpose
Multi-step contact form that replaces the "Hire Me" CTA. Collects persona, purpose, contact info, and message details. Submits to Supabase database.

### Dialog Specifications
- Width: `max-w-2xl` (wider than standard dialogs)
- Confirm on close: AlertDialog prompts if form has unsaved changes
- Animation: Fade in with scale

### Form Fields

**Step 1: Persona & Purpose**
| Field | Type | Options |
|-------|------|---------|
| Persona | Select | Peer, Talent Hunter, VC, Co-founder, Educational, Mentor, Mentee, Community, Other |
| Purpose | Select | Dynamically filtered based on persona |

**Step 2: Contact Information**
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Name | Input | Yes | Min 2 chars |
| Email | Input | Yes | Email format |
| Phone | Input | No | - |
| LinkedIn | Input | No | URL format |
| Organization | Input | No | - |

**Step 3: Details**
| Field | Type | Required | Max |
|-------|------|----------|-----|
| Message | Textarea | Yes | 2000 chars |
| File Upload | File | No | 5MB |

### Persona → Purpose Mapping
```typescript
const PERSONA_PURPOSES = {
  peer: ['Collaborate', 'Peer Review', 'Networking'],
  'talent-hunter': ['Job Opportunity', 'Consulting', 'Full-time Role'],
  vc: ['Pitch Deck Review', 'Investment', 'Mentorship'],
  'co-founder': ['Co-founder Match', 'Idea Validation'],
  educational: ['Guest Lecture', 'Workshop', 'Curriculum Review'],
  mentor: ['Mentorship Request', 'Advice', 'Career Guidance'],
  mentee: ['Reverse Mentorship', 'Skill Exchange'],
  community: ['Event Speaking', 'Community Partnership'],
  'sweet-spice': ['Just saying hi', "Let's grab coffee", 'Maybe something more', 'I know someone you should meet'],
  other: ['Other']
}
```

### Submission Flow
1. Validate all required fields
2. Upload file to Supabase Storage (if present) → `request-attachments` bucket
3. Insert request record to `requests` table
4. Show success toast
5. Auto-close dialog after 2 seconds

---

## 5.9 Admin Dashboard Component (`src/pages/admin/Dashboard.tsx`)

### Purpose
Comprehensive admin interface for managing the entire platform. Requires authentication via Supabase Auth.

### Layout Structure
```
┌─────────────────────────────────────────────────────────────┐
│ SIDEBAR (left, 280px)                                        │
│ [Logo] Ahmad's Dashboard                                    │
│                                                              │
│ ── REQUESTS ───────────────────────────────────────────────  │
│    ● Requests                    [count badge]              │
│                                                              │
│ ── CONTENT ────────────────────────────────────────────────  │
│    ○ Vision Board                                           │
│    ○ Blog                                                   │
│    ○ Universe Sections                                      │
│                                                              │
│ ── SYSTEM ─────────────────────────────────────────────────  │
│    [Logout]                                                  │
├─────────────────────────────────────────────────────────────┤
│ MAIN CONTENT (right, flex-1)                                 │
│ ┌───────────────────────────────────────────────────────────┐│
│ │ Tab Title + Action Button                                 ││
│ ├───────────────────────────────────────────────────────────┤│
│ │                                                           ││
│ │  [Content based on active tab]                            ││
│ │                                                           ││
│ └───────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

### Tab: Requests
Same functionality as previous dashboard:
- Request list with filters
- Status management: `new` → `in_review` → `responded` → `archived`
- Priority levels: `low` | `medium` | `high` | `urgent`
- Search and file viewing

### Tab: Vision Board
Full CRUD for vision items:
- Create/edit visions with title, description, category, status, priority
- Progress tracking (0-100%)
- Target dates
- Links and file attachments
- Subtasks management
- Privacy settings: `private` | `shared` | `public`

### Tab: Blog
Full CRUD for blog posts:
- Create/edit posts with title, excerpt, content
- Category selection (human, career, sweet-spice, universe)
- Tags management
- Cover image URL
- Media URLs
- Privacy settings: `private` | `shared` | `public`
- Published date

### Tab: Universe Sections
Management for site sections:
- Toggle section visibility (Active/Hidden)
- View section metadata: name, path, description, accent color, order
- Sections stored in localStorage for persistence
- Manual instructions for adding new sections via code edits

### Authentication
- Login at `/admin` with Supabase Auth
- Protected route: redirects to `/admin` if not authenticated
- Auto-redirect after successful login

---

# 6. PAGE CONTENT SPECIFICATIONS

## 6.1 Home/Landing Page (`/`)

### Purpose
Central entry point that introduces the site, explains why it exists, and guides different visitor personas to the right destination. Features a video/photo placeholder and persona-based CTAs.

### Layout Structure
```
┌─────────────────────────────────────────────────────────────┐
│ NAVBAR                                                      │
├─────────────────────────────────────────────────────────────┤
│ HERO SECTION                                                │
│ ┌─────────────────┐  ┌──────────────────────────────────┐   │
│ │                 │  │ "Welcome to my digital space"    │   │
│ │   VIDEO/PHOTO   │  │ I'm Ahmad • ALIEN                │   │
│ │   PLACEHOLDER   │  │ AI Product Manager with...       │   │
│ │   (Play Icon)   │  │ • I build AI-enabled products    │   │
│ │                 │  │ • I run ALIENs Venture           │   │
│ │                 │  │ • I'm open to opportunities      │   │
│ │                 │  │ [Explore My Work]                │   │
│ └─────────────────┘  └──────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│ WHY THIS SPACE EXISTS (Glass Card)                          │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐          │
│ │ For Hiring   │ │ For Partner- │ │ For Connection│          │
│ │              │ │ ship         │ │               │          │
│ └──────────────┘ └──────────────┘ └──────────────┘          │
├─────────────────────────────────────────────────────────────┤
│ WHO ARE YOU? (Persona Cards)                                │
│ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐              │
│ │Hiring  │ │Startups│ │Mentors │ │Community│              │
│ │Managers│ │  VCs   │ │& Eds   │ │  & Peers │              │
│ └────────┘ └────────┘ └────────┘ └────────┘              │
├─────────────────────────────────────────────────────────────┤
│ QUICK STATS (4 columns)                                     │
│  6+ MVPs  │ 20K+ Visits │ $2K+ ROI │ Hackathon Winner       │
├─────────────────────────────────────────────────────────────┤
│ BOTTOM CTA                                                  │
│ "Not sure where to start?" [Just Say Hi] [Meet the Human] │
├─────────────────────────────────────────────────────────────┤
│ FOOTER                                                      │
└─────────────────────────────────────────────────────────────┘
```

### Hero Section Content

**Left Column: Video/Photo Placeholder**
- Container: `glass p-2` with `hover:border-green-500/50` glow
- Inner: `aspect-video rounded-[2.5rem] bg-white/5`
- Center: Play icon with "Video intro coming soon" text
- Decorative corners: Green border accents

**Right Column: Intro Text**
- Eyebrow: `"Welcome to my digital space"` (green, uppercase)
- Headline: `I'm Ahmad • ALIEN` (brutalist, green glow on ALIEN)
- Subheadline: `AI Product Manager with fullstack vibe coding craft.`

**Quick Bullets:**
| Bullet | Color | Text |
|--------|-------|------|
| 1 | green | I build **AI-enabled products** from 0 → MVP using LLMs & vibe coding tools. |
| 2 | orange | I run **ALIENs Venture** — a talent platform with 20k+ visits, 3k+ applies, and $2K+ ROI. |
| 3 | green | I'm **open to opportunities** — full-time, project-based, or co-founder roles. |

**CTA:** `Explore My Work` → `/career` (btn-primary)

### Why This Space Exists Section

**Title:** `Why This Space Exists` with MessageCircle icon

**Three Columns:**
| Column | Heading | Description |
|--------|---------|-------------|
| For Hiring | To showcase my product work, achievements, and approach — beyond a traditional CV. |
| For Partnership | To find the right co-founder, mentor, or collaborator for my startup journey. |
| For Connection | To authentically share who I am — professionally and humanly. |

### Persona Cards Section

**Title:** `Who are you? I'll guide you.`
- "you" highlighted in green

**Four Persona Cards:**

| # | Icon | Title | Description | CTA | Link | Color |
|---|------|-------|-------------|-----|------|-------|
| 1 | Briefcase | Hiring Managers & Recruiters | Looking for an AI-enabled Product Manager with proven MVP shipping experience? | View My Work | /career | green |
| 2 | Rocket | Startups, VCs & Incubators | Seeking a technical co-founder or product partner for your next venture? | Let's Partner | /partners | orange |
| 3 | GraduationCap | Mentors & Educators | Want to connect, mentor, or collaborate on educational initiatives? | Connect | /human | green |
| 4 | Heart | Community & Peers | Fellow builders, PMs, or curious minds who resonate with the ALIEN journey. | Meet the Human | /human | orange |

**Card Styling:**
- Glass container with hover glow (green/orange based on color prop)
- Icon in rounded square with bg-*/10
- Title: uppercase, tracking-wider
- Description: italic, white/40
- CTA row: color-coded text with arrow icon, expands on hover

### Quick Stats Row

**Four Stat Cards (glass-sm):**
| Value | Label |
|-------|-------|
| 6+ | MVPs Shipped |
| 20K+ | Platform Visits |
| $2K+ | ROI Generated |
| Winner | Cairo AI Hackathon |

### Bottom CTA Section

**Text:** `Not sure where to start? That's okay.`
- "That's okay" in white (bold)

**Buttons:**
| Label | Icon | Style | Action |
|-------|------|-------|--------|
| Just Say Hi | MessageCircle | btn-outline | mailto:ahmad@alientalents.com |
| Meet the Human | Users | btn-secondary | /human |

---

## 6.2 Career Landing Page (`/career`)

### Sub-navigation Tabs
| Tab | Component | Description |
|-----|-----------|-------------|
| intro | CareerIntro | Career summary with CV modal |
| platform | PlatformSection | ALIENs platform overview |
| experience | CareerExperienceTab | Detailed work history |
| education | CareerEducationTab | Learning & certifications |

### CareerIntro Component
- Quick intro paragraph
- CV/Resume download/view button
- Key stats cards
- Skills tags

### PlatformSection Component
- ALIENs Venture platform showcase
- Metrics dashboard
- Feature highlights

### CareerExperienceTab Component
- Detailed timeline of roles
- Expandable role descriptions
- Achievement metrics

### CareerEducationTab Component
- Formal education (dropped out note)
- Self-learning path
- Certifications and courses

---

## 6.2 Human Side Page (`/human`)

### Sub-navigation Tabs
| Tab | Component | Description |
|-----|-----------|-------------|
| intro | HumanIntro | Personal introduction |
| being alien | HumanBeingAlien | Philosophy & mindset |
| connection | HumanConnection | How to connect |
| universe | HumanUniverse | Broader interests |

### Styling Note
Uses pink accent: `accentColor="text-pink-400"`

---

## 6.3 Partners Page (`/partners`)

### Purpose
Showcase different ways to work with Ahmad.

### Segment Structure (from SEGMENTS data)
Each segment has:
- ID (01, 02, 03, etc.)
- Title
- Subtitle
- Tags
- Industries (optional)
- Dimensions (dims) with color-coded cards

### Segment Display
```
┌─────────────────────────────────────────────┐
│ [ID BADGE]  Segment Title                   │
│             Subtitle                        │
├─────────────────────────────────────────────┤
│ [tag] [tag] [tag]                           │
│                                             │
│ INDUSTRIES                                  │
│ [industry] [industry]                       │
│                                             │
│ ─────────────────────────────────────────  │
│ ┌─────────────┐ ┌─────────────┐             │
│ │ Dimension 1 │ │ Dimension 2 │             │
│ └─────────────┘ └─────────────┘             │
└─────────────────────────────────────────────┘
```

---

## 6.5 Sweet Spice Page (`/sweet-spice`)

### Purpose
Personal connection page with a different, more intimate vibe. Uses pink accent instead of green.

### Content Sections

**Hero Section**
- Headline: "Not Just Business." (pink accent on "Just")
- Subtitle about exploring the personal side
- Icons representing different interests (ChefHat, Gamepad2, Globe, Coffee)

**Statement Card**
```
"Hey, curious stalker—I'm Ahmad • Human being."
```

**Quick Facts Grid**
| Item | Icon | Text |
|------|------|------|
| ✌🏻 | Hand | Doing Product Management • Community Growth |
| 🏇 | Trophy | Shipped AI Sr. Recruiter w/ psychometrics (MVP) |
| 🎖 | Award | $2K ROI (Partnerships & AI Hackathon Winner) |

**Handbook Section**
- Label: "My ALIEN-Style Handbook" (pink)
- Tagline: "Non-Linear | Good Taste | High Standards"
- Items:
  - 🌵 Starting over.. from 0. But like an ALIEN.
  - 🎖 Surviving uncertainty w/ unstoppable resilience

**Personal Section**
- Heart icon: "Obsessed with Knowledge • Trying things out"
- ✧ "+ Any kind of: Art • Architecture • Adventures"
- ✧ "24/7 active to Connect & initiate talks/activities."
- 🇵🇸 "Stand for Humanity • My ppl • Palestine"
- Sparkles: "Exploring diverse lives & universe(s)."

**Closing**
```
🦄 Would it help? Yep.
Curious? Aligned? Resonate with my journey? 🙃
```

### Styling
- Accent: Pink (`text-pink-400`, `bg-pink-500/10`)
- Layout: Centered content, glass cards
- Standard Navbar and Footer (not minimal)

---

## 6.6 Vision Board Page (`/vision-board`)

### Purpose
Showcase dreams, goals, and plans with progress tracking. Personal vision tracker with privacy controls.

### Features
- **Vision Grid**: Card-based display of all vision items
- **Category Filtering**: human, career, sweet-spice, universe
- **Privacy Filtering**: private, shared, public (admin only)
- **Status Filtering**: not-started, in-progress, completed, on-hold
- **Progress Visualization**: Visual progress bars (0-100%)
- **CRUD Operations**: Create, edit, delete (admin only)

### Vision Card Structure
```
┌─────────────────────────────────────┐
│ [Category Icon]      [Privacy Icon] │
│                                     │
│ VISION TITLE                        │
│ Description...                      │
│                                     │
│ Progress: [████████░░░░] 65%       │
│                                     │
│ Due: Dec 2024  •  3 subtasks       │
│                                     │
│ [Edit] [Delete] (admin only)       │
└─────────────────────────────────────┘
```

### Privacy Levels
| Level | Icon | Visibility |
|-------|------|------------|
| Private | Lock | Admin only |
| Shared | Users | Logged-in users |
| Public | Globe | Everyone |

### Category Icons
- Human: `User`
- Career: `Briefcase`
- Sweet Spice: `Heart`
- Universe: `Zap`

---

## 6.7 Blog Page (`/blog`)

### Purpose
Personal blog for thoughts, stories, and insights. Content management with privacy controls.

### Features
- **Post Grid**: Card-based display with cover images
- **Category Filtering**: human, career, sweet-spice, universe
- **Privacy Filtering**: private, shared, public (admin only)
- **Tag System**: Filter posts by tags
- **CRUD Operations**: Create, edit, delete (admin only)

### Post Card Structure
```
┌─────────────────────────────────────┐
│ [Cover Image]                      │
├─────────────────────────────────────┤
│ [Category Icon] [Privacy Icon]      │
│                                     │
│ POST TITLE                          │
│ Excerpt preview...                  │
│                                     │
│ [tag] [tag]                         │
│                                     │
│ Jan 1, 2024  •  5 min read         │
└─────────────────────────────────────┘
```

### Post Detail View (Modal/Dialog)
- Full cover image header
- Category badge
- Title and metadata
- Full content (markdown-like)
- Tags
- Media gallery (if media_urls present)

---

### Purpose
Comprehensive startup guide/resource hub.

### Structure
- Table of contents navigation
- Collapsible sections
- Code snippets and examples
- External resource links

---

# 7. ANIMATION & INTERACTION SPECIFICATIONS

## 7.1 Global Animations

### Page Load Sequence
1. Navbar fades in (immediate)
2. Hero content staggers in (0.1s delay between elements)
3. Scroll animations activate on intersection

### Scroll Behavior
```css
html {
  scroll-behavior: smooth;
}
```

### Scrollbar Styling
```css
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #000;
}
::-webkit-scrollbar-thumb {
  background: #22c55e;
  border-radius: 10px;
}
```

### Selection Styling
```css
::selection {
  background-color: #22c55e;
  color: #000000;
}
```

## 7.2 Component Animations

### Scroll Reveal
- Trigger: IntersectionObserver at 10% threshold
- Animation: `opacity: 0 → 1`, `translateY(20px) → 0`
- Duration: 600ms
- Easing: ease-out
- Stagger: 100ms, 200ms, 300ms, 400ms via delay classes

### Card Hover Effects
```css
/* Primary (Green) */
hover:border-green-500/50 
hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] 
transition-all duration-500

/* Secondary (Orange) */
hover:border-orange-500/50 
hover:shadow-[0_0_30px_rgba(249,115,22,0.2)] 
transition-all duration-500
```

### Button Interactions
- Hover: Brightness increase, shadow expansion
- Active: `scale-95`
- Duration: 300ms

### Neon Pulse (Current Badge)
```css
@keyframes neon-pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.3); }
  50% { box-shadow: 0 0 40px rgba(34, 197, 94, 0.6); }
}
animation: neon-pulse 4s infinite ease-in-out;
```

### Availability Pulse
```css
animate-pulse /* Tailwind default */
```

## 7.3 Mobile Interactions

### Mobile Menu
- Overlay: `bg-black/98 backdrop-blur-2xl`
- Animation: `animate-fade-in`
- Body scroll: Locked when open
- Close on: Route change, link click, X button

### Menu Button
- Icons: Menu (closed), X (open)
- Size: 22px
- Color: `text-white/60 hover:text-white`

---

# 8. RESPONSIVE BREAKPOINTS

| Breakpoint | Tailwind | Layout Changes |
|------------|----------|----------------|
| Mobile | default | Single column, stacked layout |
| Small | `sm:` (640px) | Slightly larger text, 2-col grids start |
| Medium | `md:` (768px) | Full navigation pill visible |
| Large | `lg:` (1024px) | 2-column About layout, 3-col Projects |
| XL | `xl:` (1280px) | Max-width containers |
| 2XL | `2xl:` (1400px) | Container limit |

## 8.1 Responsive Typography Scale

| Element | Mobile | sm | md | lg |
|---------|--------|-----|-----|-----|
| Hero Title | text-5xl | text-6xl | text-8xl | text-8xl |
| Section Title | text-3xl | text-4xl | text-5xl | text-5xl |
| Card Title | text-lg | text-xl | text-2xl | text-2xl |
| Body | text-base | text-base | text-base | text-base |

---

# 9. ASSETS & RESOURCES

## 9.1 External URLs

### Live Projects
| Project | URL |
|---------|-----|
| ALIEN Talents Platform | https://guileless-daifuku-9c29b0.netlify.app/ |
| Remote $$ Job Board | https://alientalents.com |
| ATOS Hiring Platform | https://ubiquitous-custard-6d2ece.netlify.app/ |
| Career Hub CRM | https://preview--alien-career-hub.lovable.app/ |
| AALN AI Mentor | https://tubular-melba-fade64.netlify.app/ |
| ALIEN ATS | https://alien-ats.lovable.app |

### Social Links
| Platform | URL |
|----------|-----|
| LinkedIn | https://www.linkedin.com/in/ahmad96abdelaziz/ |
| YouTube | https://www.youtube.com/@ALIEN.Talents |
| Email | ahmad@alientalents.com |

## 9.2 Font URLs (Google Fonts)
```
https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap
https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap
https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&display=swap
https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap
https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&display=swap
```

---

# 10. CONTENT COPY

## 10.1 Meta Information

### Page Titles
| Page | Title |
|------|-------|
| Home | Ahmad Abdelaziz \| AI Product Manager & Builder |
| Career | Career Side — Ahmad Abdelaziz |
| Human Side | Human Side — Ahmad Abdelaziz |
| Partners | Work With Me — Ahmad Abdelaziz |
| Sweet Spice | Sweet Spice — Ahmad Abdelaziz |
| Vision Board | Vision Board — Ahmad Abdelaziz |
| Blog | Blog — Ahmad Abdelaziz |
| Handbook | Startup Handbook |
| CV | CV — Ahmad Abdelaziz |
| Portfolio | Portfolio — Ahmad Abdelaziz |
| Admin | Admin Dashboard |

### Meta Description (Recommended)
```
Ahmad Abdelaziz — AI-enabled Product Manager specializing in community-led growth. 
Shipped 6+ MVPs using LLMs & Vibe coding. 20k+ visits, 3k+ applies, $2K+ ROI. 
Winner of Cairo AI Hackathon by Athar Accelerator.
```

## 10.2 Key Messaging

### Personal Tagline (3-Line Animated)
```
Line 1: 0→1 • AI Products • Vibe Coding Craft • Community-Led
Line 2: ✧ Learning by doing → Curious • Kind • Wild ✧
Line 3: Palestine ⚖ 🇵🇸 Sudan 🇸🇩 | ⏣ ⦿ ⌬ ⌖ ⌘ ⧉ ⚘ ✺ ⚚
```
- **Line 1**: Primary color (white), italic, uppercase, tracking-tighter
- **Line 2**: Secondary color (orange-400), smaller, subtle
- **Line 3**: Mixed colors (green for Palestine/Sudan), symbols aligned

### Quote Card (Hero)
- **Text**: "🔥 Crafting with taste & high standards — like House Targaryen 🐉 or House Stark 🐺 ❄️. I execute relentlessly."
- **Video**: Click to open YouTube video in modal popup
- **Styling**: Glass card, gradient play button, hover glow

### Personal Tagline (Legacy)
"AI-enabled Product Manager | Community-Led Growth"

### Value Proposition
"Remote Mastery for Multipotentialites"

### Handshake Lines
- "Curious? Aligned? Resonate with my journey?"
- "Would it help? Yep."
- "🙃"

### Brand Identity
- "ALIENs" — with green "S"
- "Non-Linear | Good Taste | High Standards"
- "Starting over.. from 0. But like an ALIEN."

---

# 11. DATA STRUCTURES

## 11.1 Project Interface
```typescript
interface Project {
  title: string;
  category: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  demoUrl?: string;
  status: "live" | "demo";
  credentials?: {
    learner?: string;
    startup?: string;
    password?: string;
  };
}
```

## 11.2 VisionItem Interface
```typescript
interface VisionItem {
  id: string;
  title: string;
  description?: string;
  category: 'human' | 'career' | 'sweet-spice' | 'universe';
  status: 'not-started' | 'in-progress' | 'completed' | 'on-hold';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  progress: number; // 0-100
  target_date?: string;
  links: string[];
  files: string[];
  privacy: 'private' | 'shared' | 'public';
  created_at: string;
  updated_at: string;
}
```

## 11.3 BlogPost Interface
```typescript
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  category: 'human' | 'career' | 'sweet-spice' | 'universe';
  tags: string[];
  cover_image?: string;
  media_urls: string[];
  privacy: 'private' | 'shared' | 'public';
  published_at?: string;
  created_at: string;
  updated_at: string;
}
```

## 11.4 UniverseSection Interface
```typescript
interface UniverseSection {
  id: string;
  name: string;
  path: string;
  description: string;
  icon: string;
  accent: 'white' | 'green' | 'pink' | 'purple' | 'orange';
  isActive: boolean;
  order: number;
}
```

## 11.5 Segment Interface (Partners)
```typescript
interface Segment {
  id: string;
  title: string;
  sub: string;
  accentHex: string;
  tags: string[];
  industries?: string[];
  dims?: Array<{
    label: string;
    color: string;
    items: string[];
  }>;
}
```

---

# 12. ACCESSIBILITY CONSIDERATIONS

- All images must have alt text
- Color contrast: Green (#22C55E) on black passes WCAG AA
- Focus states: Visible focus rings on interactive elements
- Reduced motion: Respect `prefers-reduced-motion` media query
- Semantic HTML: Proper heading hierarchy (h1 → h2 → h3)

---

# 13. PERFORMANCE TARGETS

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive | < 3.5s |
| Cumulative Layout Shift | < 0.1 |

---

# 14. DEPLOYMENT NOTES

## Build Commands
```bash
dev:     vite
build:   vite build
preview: vite preview
```

## Recommended Hosting
- Netlify (current)
- Vercel
- GitHub Pages

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous/public key | Yes |

### Netlify Configuration (`netlify.toml`)
```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

*End of PRD — ALIENs Portfolio*

---

# 15. DATABASE SCHEMA (Supabase)

## 15.1 Tables

### `requests` — Contact Form Submissions
| Column | Type | Default | Description |
|--------|------|---------|-------------|
| `id` | UUID | gen_random_uuid() | Primary key |
| `created_at` | timestamptz | now() | Submission timestamp |
| `updated_at` | timestamptz | now() | Last update |
| `persona` | text | - | User's role (peer, vc, etc.) |
| `purpose` | text | - | Reason for contact |
| `name` | text | - | Full name |
| `email` | text | - | Email address |
| `phone` | text | null | Phone number |
| `linkedin` | text | null | LinkedIn URL |
| `organization` | text | null | Company/institution |
| `details` | text | - | Message content |
| `file_name` | text | null | Attachment filename |
| `file_url` | text | null | Attachment URL |
| `status` | text | 'new' | new/in_review/responded/archived |
| `priority` | text | 'medium' | low/medium/high/urgent |
| `notes` | text | null | Admin notes |
| `viewed_at` | timestamptz | null | When admin first viewed |
| `responded_at` | timestamptz | null | When marked as responded |

### `vision_board_items` — Vision Board Items
| Column | Type | Default | Description |
|--------|------|---------|-------------|
| `id` | UUID | gen_random_uuid() | Primary key |
| `title` | text | - | Vision title |
| `description` | text | null | Description |
| `category` | text | - | human/career/sweet-spice/universe |
| `status` | text | 'not-started' | not-started/in-progress/completed/on-hold |
| `priority` | text | 'medium' | low/medium/high/urgent |
| `progress` | integer | 0 | 0-100 percentage |
| `target_date` | date | null | Target completion date |
| `links` | jsonb | '[]' | Array of URL strings |
| `files` | jsonb | '[]' | Array of file objects |
| `privacy` | text | 'private' | private/shared/public |
| `created_at` | timestamptz | now() | Creation timestamp |
| `updated_at` | timestamptz | now() | Last update |

### `vision_board_subtasks` — Vision Subtasks
| Column | Type | Default | Description |
|--------|------|---------|-------------|
| `id` | UUID | gen_random_uuid() | Primary key |
| `vision_item_id` | UUID | - | FK to vision_board_items |
| `title` | text | - | Subtask title |
| `completed` | boolean | false | Completion status |
| `created_at` | timestamptz | now() | Creation timestamp |

### `blog_posts` — Blog Posts
| Column | Type | Default | Description |
|--------|------|---------|-------------|
| `id` | UUID | gen_random_uuid() | Primary key |
| `title` | text | - | Post title |
| `slug` | text | - | URL slug (unique) |
| `excerpt` | text | null | Short preview |
| `content` | text | - | Full post content |
| `category` | text | - | human/career/sweet-spice/universe |
| `tags` | text[] | '{}' | Array of tags |
| `cover_image` | text | null | Cover image URL |
| `media_urls` | jsonb | '[]' | Additional media URLs |
| `privacy` | text | 'private' | private/shared/public |
| `published_at` | timestamptz | null | When published |
| `created_at` | timestamptz | now() | Creation timestamp |
| `updated_at` | timestamptz | now() | Last update |

### `request_stats` — View for Dashboard
```sql
CREATE VIEW request_stats AS
SELECT status, COUNT(*) as count, MAX(created_at) as latest_request
FROM requests GROUP BY status;
```

## 15.2 RLS Policies

### requests table
- **INSERT**: Public (anyone can submit)
- **SELECT**: Authenticated users only
- **UPDATE**: Authenticated users only
- **DELETE**: Authenticated users only

### vision_board_items table
- **INSERT**: Authenticated users only (admin)
- **SELECT**: Public can view public items; admin can view all
- **UPDATE**: Authenticated users only (admin)
- **DELETE**: Authenticated users only (admin)

### vision_board_subtasks table
- **INSERT**: Authenticated users only (admin)
- **SELECT**: Follows parent item visibility
- **UPDATE**: Authenticated users only (admin)
- **DELETE**: Authenticated users only (admin)

### blog_posts table
- **INSERT**: Authenticated users only (admin)
- **SELECT**: Public can view public posts; admin can view all
- **UPDATE**: Authenticated users only (admin)
- **DELETE**: Authenticated users only (admin)

### storage.request-attachments
- **INSERT**: Public (for file uploads)
- **SELECT**: Authenticated users only

## 15.3 Storage Buckets
- `request-attachments` — Form file uploads (5MB limit)
