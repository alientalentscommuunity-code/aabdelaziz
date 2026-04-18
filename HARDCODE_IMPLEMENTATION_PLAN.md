# HARDCODE IMPLEMENTATION PLAN - Disconnect Supabase CMS

## Objective
Completely disconnect all Supabase CMS content fetching and hardcode all content from the PRD document across the entire platform.

---

## PHASE 1: Infrastructure Cleanup (Hooks & Context)

### 1.1 Identify all CMS-dependent files
**Files to audit:**
- `src/hooks/useContent.ts` - Main content fetching hook
- `src/hooks/useSupabase.ts` - Supabase client hook  
- `src/components/admin/InlineEdit.tsx` - CMS editing components
- `src/components/admin/ContentEditor.tsx` - CMS editor UI

### 1.2 Create hardcoded data files
Create `src/data/hardcodedContent.ts` with all PRD content structured by page/section.

### 1.3 Remove CMS imports from all pages
Replace `useContent` imports with direct data imports from hardcoded files.

---

## PHASE 2: Home Page (`/`)

### Sections from PRD 6.1:

| Section | Sub-sections | Content Source | Status |
|---------|--------------|----------------|--------|
| **Hero** | Video placeholder, headline, subtitle | PRD 6.1 Hero | ⏳ |
| | "Where Product Vision Meets Human Connection" | | |
| | CTA buttons (Start Exploring, View My Work) | | |
| **Manifesto** | Full manifesto text | PRD 6.1 Manifesto | ⏳ |
| | "Product is chaos. Product is clarity..." | | |
| **Personas** | 3 visitor personas with CTAs | PRD 6.1 Personas | ⏳ |
| | - Learners (Aspiring PMs, students) | | |
| | - Startups (Founders, hiring managers) | | |
| | - Community (Connectors, collaborators) | | |
| **Projects Showcase** | 6 projects with details | PRD 6.1 Projects + 9.1 URLs | ⏳ |
| | ALIEN Talents Platform | | |
| | Remote $$ Job Board | | |
| | ATOS Hiring Platform | | |
| | Career Hub CRM | | |
| | AALN AI Mentor | | |
| | ALIEN ATS | | |
| **Social Proof** | Testimonials/stats | PRD 6.1 Social Proof | ⏳ |
| **Footer CTA** | Final call to action | PRD 6.1 Footer | ⏳ |

---

## PHASE 3: Career Page (`/career`)

### Sub-navigation Tabs (PRD 6.2):

| Tab | Route | Sections to Hardcode | Status |
|-----|-------|---------------------|--------|
| **Landing** | `/career` | Intro, value prop, quick stats | ⏳ |
| **Framework** | `/career/framework` | Career framework content (PRD 6.2a) | ⏳ |
| **ICP** | `/career/icp` | 5 segment breakdown (PRD 6.2b) | ⏳ |
| **Progress** | `/career/progress` | What I'm building, learning, exploring (PRD 6.2c) | ⏳ |
| **Vision** | `/career/vision` | 1/3/5 year horizons (PRD 6.2d) | ⏳ |

### Career Framework Content (PRD 6.2a):
- Framework overview
- Skills matrix
- Learning resources
- Progress indicators

### ICP Segments (PRD 6.2b):
1. Emerging Talent
2. Career Switchers
3. Hiring Managers
4. Startup Founders
5. Community Leaders

### Progress Tracker (PRD 6.2c):
- Currently Building
- Currently Learning
- Currently Exploring

### Vision Horizons (PRD 6.2d):
- 1 Year Goals
- 3 Year Vision
- 5 Year Mission

---

## PHASE 4: Human Page (`/human`)

### Sub-navigation Tabs (PRD 6.2):

| Tab | Route | Sections to Hardcode | Status |
|-----|-------|---------------------|--------|
| **Landing** | `/human` | Personal intro, philosophy | ⏳ |
| **Behind the Scenes** | `/human/behind` | Day in the life, workflows | ⏳ |
| **The One** | `/human/the-one` | "Her Portrait" section | ⏳ |
| **Open Book** | `/human/open-book` | Universe I, II, III sections | ⏳ |

### OpenBook Universe Content:
- **Universe I**: How He Thinks, How He Loves, How He Plays
- **Universe II**: Wifey - Cosmic Connection, Emotional Truth
- **Universe III**: My Lil Baby Lady Goddess - The Paradox, Physical, Origin, Traits

---

## PHASE 5: Partners Page (`/partners`)

### Sections from PRD 6.3:

| Section | Content | Status |
|---------|---------|--------|
| **Hero** | Partnership headline, subtitle | ⏳ |
| **Ways to Work** | Collaboration options | ⏳ |
| - Mentorship | Program details, pricing | ⏳ |
| - Consulting | Service offerings | ⏳ |
| - Partnerships | Venture collaboration | ⏳ |
| - Speaking | Event/keynote info | ⏳ |
| **Request Form** | Partnership request dialog | ⏳ |
| **Testimonials** | Partner quotes | ⏳ |
| **CTA** | Final partnership CTA | ⏳ |

---

## PHASE 6: Handbook Page (`/handbook`)

### Sub-navigation (PRD 6.4):

| Tab | Content | Status |
|-----|---------|--------|
| **intro** | Why we make it public, manifesto | ⏳ |
| **dna** | Ahmad's DNA - Core Principles, Mental Models | ✅ DONE |
| **playbook** | Startup frameworks, methodologies | ⏳ |
| **stack** | Tech stack, tools, resources | ⏳ |
| **hiring** | Co-founder job posting (PRD 6.4a) | ⏳ |

### Hiring Co-Founder Section (PRD 6.4a):
- Headline: "🚀 Looking for a CO-FOUNDER"
- What We're Looking For
- The Approach (Heisenberg style)
- Who We Are - ALIENs Venture
- The Problem We Exist to Solve
- What We're Building
- The Role: Backend & AI Co-Founder
- CTA Buttons

---

## PHASE 7: SweetSpice Page (`/sweet-spice`)

### Sections from PRD 6.5:

| Section | Content | Status |
|---------|---------|--------|
| **Hero** | "Not Just Business" (pink accent) | ⏳ |
| **Statement Card** | "Hey, curious stalker—I'm Ahmad • Human being." | ⏳ |
| **Quick Facts** | 3 facts with icons (Hand, Trophy, Award) | ⏳ |
| **Handbook Section** | "My ALIEN-Style Handbook" with items | ⏳ |
| **Personal Section** | Heart icon, obsessions, 24/7 active, Palestine, Sparkles | ⏳ |
| **Closing** | "🦄 Would it help? Yep." | ⏳ |

**Accent**: Pink (`text-pink-400`, `bg-pink-500/10`)

---

## PHASE 8: Vision Board Page (`/vision-board`)

### Content from PRD 6.6:

| Section | Content | Status |
|---------|---------|--------|
| **Header** | Dreams, goals, plans headline | ⏳ |
| **Vision Items** | 6+ vision cards with progress | ✅ DONE |
| **Categories** | Personal, Professional, Creative, etc. | ⏳ |
| **Privacy Controls** | Public/Private indicators | ⏳ |
| **Progress Tracking** | Visual progress bars | ⏳ |

**Vision Items to Include:**
1. Ship ALIEN Talents Platform (Professional)
2. Build AI Mentor MVP (Professional)
3. Launch Career Framework Course (Professional)
4. 10K Community Members (Community)
5. Remote Year Experiment (Personal)
6. Product Conference Speaking (Creative)

---

## PHASE 9: Blog Page (`/blog`)

### Content from PRD 6.7:

| Section | Content | Status |
|---------|---------|--------|
| **Header** | Blog headline, subtitle | ⏳ |
| **Categories** | Thoughts, Stories, Insights | ⏳ |
| **Sample Posts** | 3-5 hardcoded blog posts | ⏳ |
| **Privacy Controls** | Public/Private post status | ⏳ |
| **CTA** | Subscribe/Contact CTA | ⏳ |

**Sample Blog Posts to Create:**
1. "Starting Over from Zero: The ALIEN Way"
2. "Why I Built My Portfolio in Public"
3. "The Chaos of Product Management"
4. "Finding My Co-Founder: The Journey"
5. "Remote Mastery: A New Framework"

---

## PHASE 10: Build, Test, and Deploy

### 10.1 Build Process:
```bash
npm run build
```

### 10.2 Verification Checklist:
- [ ] All pages load without errors
- [ ] No blank sections
- [ ] All content matches PRD
- [ ] Navigation works between pages
- [ ] Responsive on mobile/desktop
- [ ] No Supabase connection errors in console

### 10.3 Deploy:
- [ ] Deploy to Netlify
- [ ] Verify all routes work
- [ ] Test on mobile device
- [ ] Share preview link for review

---

## FILES TO MODIFY - COMPLETE LIST

### High Priority (Pages):
1. `src/pages/Home.tsx` or `src/pages/Index.tsx`
2. `src/pages/Career.tsx` + sub-pages
3. `src/pages/Human.tsx` + sub-pages
4. `src/pages/Partners.tsx`
5. `src/pages/Handbook.tsx` ✅ (Partially done)
6. `src/pages/SweetSpice.tsx`
7. `src/pages/VisionBoard.tsx` ✅ (Partially done)
8. `src/pages/Blog.tsx`

### Medium Priority (Components):
1. `src/components/Navbar.tsx` - Check for CMS content
2. `src/components/Footer.tsx` - Check for CMS content
3. `src/components/Hero.tsx` - Check for CMS content
4. `src/components/ProjectCard.tsx` - Hardcode project data
5. `src/components/PersonaCard.tsx` - Hardcode persona data

### Low Priority (Cleanup):
1. `src/hooks/useContent.ts` - Deprecate/remove
2. `src/hooks/useSupabase.ts` - Keep for auth only
3. `src/components/admin/*` - Keep but disable CMS features

---

## SOURCE OF TRUTH

All content must match **PRD.md** exactly. Key content sources:

- **Home Page**: PRD Section 6.1
- **Career Pages**: PRD Sections 6.2, 6.2a-d
- **Human Pages**: PRD Section 6.2 + OpenBook sections
- **Partners**: PRD Section 6.3
- **Handbook**: PRD Sections 6.4, 6.4a
- **SweetSpice**: PRD Section 6.5
- **Vision Board**: PRD Section 6.6
- **Blog**: PRD Section 6.7

---

## TESTING PROTOCOL

After each page is hardcoded:

1. **Visual Check**: Load page, verify no blank sections
2. **Content Check**: Compare text to PRD line-by-line
3. **Link Check**: Click all internal navigation
4. **Console Check**: No Supabase errors
5. **Build Check**: `npm run build` succeeds

---

## PROGRESS TRACKER

| Phase | Status | Completion % |
|-------|--------|--------------|
| Phase 1: Infrastructure | ⏳ | 0% |
| Phase 2: Home Page | ⏳ | 0% |
| Phase 3: Career Page | ⏳ | 0% |
| Phase 4: Human Page | ⏳ | 0% |
| Phase 5: Partners Page | ⏳ | 0% |
| Phase 6: Handbook Page | 🟡 | 40% |
| Phase 7: SweetSpice Page | ⏳ | 0% |
| Phase 8: Vision Board | 🟡 | 60% |
| Phase 9: Blog Page | ⏳ | 0% |
| Phase 10: Build & Deploy | ⏳ | 0% |

**Overall Progress: 10%**

---

## NOTES

- All content must be **hardcoded JSX**, no dynamic fetching
- Use **static imports** for data
- Keep components **type-safe** with TypeScript
- Maintain **existing styling** (Tailwind classes)
- Preserve **responsive design**
- Keep **animation behaviors** intact
