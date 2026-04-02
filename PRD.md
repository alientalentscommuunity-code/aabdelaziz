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
| State/Data | TanStack Query 5.56.2 |
| Animation | CSS animations + Tailwind |
| Fonts | Space Grotesk, Space Mono, DM Sans, Playfair Display, Cairo |

## 2.2 Project Structure
```
src/
├── components/
│   ├── ui/              # shadcn/ui components (49 items)
│   ├── career/          # Career section components
│   ├── human/           # Human side components
│   └── shared/          # Shared components
├── pages/
│   ├── CareerLanding.tsx
│   ├── CareerCV.tsx
│   ├── CareerPortfolio.tsx
│   ├── HumanSide.tsx
│   ├── Partners.tsx
│   ├── Handbook.tsx
│   └── NotFound.tsx
├── lib/
│   ├── utils.ts
│   └── data.ts
├── hooks/
├── App.tsx
└── index.css
```

## 2.3 Dependencies (Production)
```json
{
  "@hookform/resolvers": "^3.9.0",
  "@radix-ui/react-*": "^1.1.x",
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

| Route | Component | Title |
|-------|-----------|-------|
| `/` | Home | "Ahmad Abdelaziz \| AI Product Manager & Builder" |
| `/career` | CareerLanding | "Career Side — Ahmad Abdelaziz" |
| `/career/cv` | CareerCV | "CV — Ahmad Abdelaziz" |
| `/career/portfolio` | CareerPortfolio | "Portfolio — Ahmad Abdelaziz" |
| `/human` | HumanSide | "Human Side — Ahmad Abdelaziz" |
| `/partners` | Partners | "Work With Me — Ahmad Abdelaziz" |
| `/handbook` | Handbook | "Startup Handbook" |
| `*` | NotFound | "404" |

## 4.2 Navigation Structure

### Main Navigation (Navbar)
| Label | Path | Accent |
|-------|------|--------|
| ALIEN**S** (Logo) | `/` | Green "S" |
| Human Side | `/human` | White |
| Career Side | `/career` | White |
| Work With Me | `/partners` | White |
| Startup Handbook | `/handbook` | Orange (secondary) |
| Hire Me (CTA) | `mailto:ahmad@alientalents.com` | Green button |

### Navigation Styling
- Desktop: Glass pill, centered, floating at `top-4`
- Max-width: `max-w-5xl`
- Padding: `px-3 py-2`
- Active state: `bg-white/[0.07] text-white/90 border border-white/15`
- Inactive: `text-white/35 hover:text-white hover:bg-white/5`
- Special (Handbook): `bg-secondary/[0.12] text-secondary border border-secondary/35`

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

## 6.4 Handbook Page (`/handbook`)

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
| Handbook | Startup Handbook |
| CV | CV — Ahmad Abdelaziz |
| Portfolio | Portfolio — Ahmad Abdelaziz |

### Meta Description (Recommended)
```
Ahmad Abdelaziz — AI-enabled Product Manager specializing in community-led growth. 
Shipped 6+ MVPs using LLMs & Vibe coding. 20k+ visits, 3k+ applies, $2K+ ROI. 
Winner of Cairo AI Hackathon by Athar Accelerator.
```

## 10.2 Key Messaging

### Personal Tagline
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

## 11.2 Segment Interface (Partners)
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
None required for static deployment.

---

*End of PRD — ALIENs Portfolio*
