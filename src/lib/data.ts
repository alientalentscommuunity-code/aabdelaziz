// ─── Shared data constants ───────────────────────────────────────────────────

export const SEGMENTS = [
  {
    id: "01", title: "Talents & Job Seekers",
    sub: "Career development + remote job landing",
    accent: "196 69% 85%", accentHex: "#C4B5FD",
    tags: ["CV review & positioning","Interview prep","Landing remote jobs","Coffee chats","Career mentorship"],
    dims: null, industries: null,
  },
  {
    id: "02", title: "Hiring Managers & Hunters",
    sub: "End-to-end employment operations",
    accent: "160 64% 52%", accentHex: "#34D399",
    tags: ["Talent sourcing","Screening & evaluation","Hiring workflow ops","Employer branding","Community pipelines"],
    dims: null, industries: null,
  },
  {
    id: "03", title: "Early-Stage Startups",
    sub: "Idea → Prototype → MVP · From talks to hands-on",
    accent: "37 96% 62%", accentHex: "#FBB040",
    tags: ["Idea","Prototype","MVP"],
    industries: ["Education","Employment","Agriculture","Furniture","Healthcare","Wellbeing"],
    dims: [
      { label: "Business", color: "#60A5FA", items: ["Ideation & problem framing","Business model canvas","Lean strategy","Customer discovery","Revenue & pricing","Go-to-market strategy","Partnerships & distribution"] },
      { label: "Tech", color: "#4ADE80", items: ["Prototyping approach","MVP scoping & prioritization","Tech stack decisions","No-code / low-code first","Product-market fit testing","Iteration loops","Tool & infra selection"] },
      { label: "Human", color: "#F472B6", items: ["Navigate uncertainty","Resilience & consistency","Authenticity as a founder","Leadership & team building","Communication & storytelling","Mental fitness","Founder identity & purpose"] },
    ],
  },
  {
    id: "04", title: "VCs & Accelerators",
    sub: "Portfolio talent · Founder evaluation · Community-backed deal flow",
    accent: "24 96% 57%", accentHex: "#FB923C",
    tags: ["Egypt & MENA","EMEA","Remote-first portfolios","Early-stage funds","Accelerator programs"],
    dims: [
      { label: "Deal Flow & Sourcing", color: "#FB923C", items: ["Community-sourced founder pipelines","Structured evaluation (AALN framework)","Startup screening & scoring","Warm intros from trusted network","Sector-specific talent mapping"] },
      { label: "Portfolio Support", color: "#34D399", items: ["Talent hiring for portfolio companies","Fractional mentor matching","Founder coaching & accountability","Go-to-market & growth guidance","Community access for portfolio teams"] },
    ],
  },
  {
    id: "05", title: "Educational Businesses",
    sub: "Skills-to-employment · AI-powered learning · Egypt & MENA",
    accent: "199 89% 60%", accentHex: "#38BDF8",
    tags: ["Bootcamps","EdTech platforms","Training providers","Universities & institutes","Corporate L&D"],
    dims: [
      { label: "Program Design", color: "#818CF8", items: ["Remote work readiness curriculum","Skills-to-jobs pathway design","AI integration in learning flows","RVE: Research → Validate → Execute","Assessment & evaluation frameworks"] },
      { label: "Outcomes & Placement", color: "#38BDF8", items: ["Employment-linked graduation tracks","Community hiring pipeline for graduates","Employer partnerships & placement","Learner community & alumni network","Impact: hired, promoted, freelancing"] },
    ],
  },
];

export const EXPERIENCE = [
  {
    company: "ALIENs Venture",
    period: "Jul 2024 – Present",
    roles: [
      {
        title: "Product Manager · Entrepreneur in Residence",
        period: "Jan 2024 – Present",
        bullets: [
          "Shipped AI-enabled platform for global talent & hiring managers — 20K+ visits, 3K+ applies, 500+ signups",
          "$2K monetized at 100% profit margin · 2 partnerships (nsave.co + Athar Accelerator)",
          "$5K inbound MRR pipeline · 2 talents placed in USD jobs ($8K total earnings)",
          "16+ talents secured multiple interviews · 50+ total interviews across the platform",
          "10+ recruiter referral requests · 5+ startups consulted on global remote hiring",
          "Stack: Claude, Lovable.dev, Antigravity, Supabase, Airtable, Softr, Notion",
        ],
      },
      {
        title: "Community & Program Lead",
        period: "Jul 2024 – Dec 2024",
        bullets: [
          "70+ weeks of newsletter, blog, and meetups · 100+ hours of weekly meetups & 1-to-1 calls",
          "Host & Creator @ ALIENs Talks Podcast — 308 YouTube subs · 11.5K views · 90 videos",
          "Moderating 36K SubReddit members",
        ],
      },
    ],
  },
  {
    company: "Revenue Growth & Customer Acquisition",
    period: "Nov 2022 – Dec 2023",
    roles: [{ title: "Freelancer · Remote, Global", period: "", bullets: ["Outreach strategies and sales sequences for clients across Egypt, GCC, US, and EMEA markets."] }],
  },
  {
    company: "Soleek Lab",
    period: "Mar 2022 – Oct 2022",
    roles: [{
      title: "Versatile Account Executive · On-site, Egypt",
      period: "",
      bullets: [
        "Selling custom tech & SaaS solutions to C-Levels in SMBs & Enterprises — Egypt and GCC",
        "120+ daily touchpoints · full sales cycle management · one-person GTM team",
        "$240K pipeline from 40 SQOs in 6 months · 5 deals totaling $120K · $5K MRR renewal portfolio",
      ],
    }],
  },
  {
    company: "MRSOOL Egypt",
    period: "Jun 2021 – Jan 2022",
    roles: [{ title: "Customer Success Manager · Hybrid, Egypt", period: "", bullets: ["Onboarded 127 partners in 3 months · 200 accounts · 9,000+ items managed","90%+ CSAT · drove retention and expansion through check-ins and educational content"] }],
  },
  {
    company: "OTO Courses",
    period: "Sep 2020 – May 2021",
    roles: [{ title: "Sales Executive · Remote, Egypt", period: "", bullets: ["Managed 4,800 clients (48% of total leads) · $10.8K pipeline · 90%+ CSAT","60% net new · 25% upsell · 15% referrals"] }],
  },
  {
    company: "EasyKash",
    period: "Jun 2020 – Aug 2020",
    roles: [{ title: "Business Development Intern · Remote, Egypt", period: "", bullets: ["SaaS payment solutions for B2B/B2C startups, SMEs, and freelancers · GTM strategy"] }],
  },
  {
    company: "Early Career · SMEs & Startups",
    period: "2014 – 2020",
    roles: [{ title: "", period: "", bullets: ["Validated MVPs (AI/Bot therapist, VR Montessori) · built internal processes · secured partnerships","Hands-on: sales, support, ops, and stakeholder management"] }],
  },
];

export const PLATFORM = {
  stack: [
    { name: "Lovable & Softr", role: "Frontend interfaces & portals" },
    { name: "OpenAI", role: "AI mentor, evaluation rubrics, AI Sr. Recruiter" },
    { name: "Airtable", role: "Backend DB — talent profiles, jobs, companies" },
    { name: "n8n & Make", role: "Full workflow automation — sourcing to comms" },
  ],
  engineDoes: [
    "Autonomously collects, verifies, and analyzes jobs & companies",
    "Evaluates human talents before they submit a resume",
    "Supports partners in employment, mental health, and financial growth",
    "Reaches and processes thousands of candidates across MENA",
  ],
  b2c: [
    { phase: "Learn", accent: "#C4B5FD", label: "Personal AI Tutor", desc: "Shifts talents from passive consumption to research & execution — career paths, skill refinement, effective learning techniques." },
    { phase: "Earn", accent: "#34D399", label: "Global Matching", desc: "Connects users to verified USD-paying jobs, gigs, and paid learning opportunities. Apply or refer peers directly." },
    { phase: "Survive", accent: "#FBB040", label: "AI-Matched P2P Mentorship", desc: "Combats career loneliness. AI matches talents with verified humanity — like-minded peers and mentors for emotional and professional support." },
    { phase: "Thrive", accent: "#38BDF8", label: "Roadmaps & Rituals", desc: "Custom value creation tools, community rituals, and meetups to foster growth, wellbeing, and financial stability." },
  ],
  b2b: [
    { phase: "Hunt", accent: "#FB923C", label: "Verified Sourcing", desc: "Curated pool of referrals — top 1% of psychometrically vetted talent. Evaluates humans, not just CVs." },
    { phase: "Onboard", accent: "#C4B5FD", label: "3-Click Hiring", desc: "Frictionless onboarding — secure a new hire in 3 clicks with total compliance regardless of talent location." },
    { phase: "Pay", accent: "#34D399", label: "Seamless Transactions", desc: "Pay remote employees and contractors in USD in seconds." },
    { phase: "Accelerate", accent: "#F472B6", label: "AI Sr. Recruiter", desc: "Helps hiring managers write value-based JDs. Boosts hiring efficiency and accelerates employer branding worldwide." },
  ],
  institutions: [
    { name: "AALN Framework", desc: "Structured AI evaluation framework for measuring human potential — plug into any university or academy program." },
    { name: "Employability Insights", desc: "Dashboards providing deep insights into talent readiness and market demands." },
    { name: "API Integrations", desc: "Plug the ALIENs evaluation and matching engine directly into existing institutional systems." },
  ],
  evolution: [
    { phase: "Phase 1 — Lean Community Stack", desc: "Before writing any code: Notion, YouTube, Canva, Google Meet. $0 CAC. Validated Career Hub, Job Board, Human Evaluation System, and Hiring Referral Engine manually." },
    { phase: "Today — AALN AI Prototypes", desc: "Automated, AI-powered versions of the same four pillars — built on deeply understood, real human problems." },
  ],
};

export const METRICS = [
  { value: "20K+", label: "Platform visits" },
  { value: "3K+", label: "Job applies" },
  { value: "500+", label: "Signups" },
  { value: "$2K+", label: "Monetized · 100% margin" },
  { value: "2", label: "Closed partnerships" },
  { value: "90+", label: "Podcast episodes" },
];

export const DOMAINS = ["EdTech","SW House","Marketing Agency","HR Tech","FinTech"];
export const GEOS = ["SMEs & Tech/SaaS Startups","Egypt","GCC","EMEA","USA"];

export const SUB_ROLES = [
  "Full-Stack Vibe Coding",
  "Community-Led Growth Builder",
  "Commercial & GTM Background",
];

export const EXPERTISE_SECTIONS = [
  {
    icon: "🧠",
    title: "Product Expertise",
    subtitle: 'Acting "Entrepreneur in Residence" (Learning) | Jul 2025 – Present',
    bullets: [
      "Shipped an AI-enabled talent & hiring platform — 20K+ visits, 500+ signups, $2K revenue at 100% margin",
      "$5K inbound MRR pipeline across 3 leads: talent referrals, employment academy, and AI subscription",
      "Placed 2 talents in USD roles — $8K total earnings; 16+ talents secured interviews",
      "5+ startups consulted on remote hiring; 10+ recruiter referral requests supported",
    ],
    highlight: "🏆 Winner — Cairo AI Hackathon by Athar Accelerator",
    stack: "Stack: Claude · Lovable.dev · Supabase · Airtable · Softr · Notion",
  },
  {
    icon: "🌍",
    title: "Community Management Expertise",
    subtitle: "Jul 2024 – Oct 2025",
    bullets: [
      "Managed end-to-end program ops — 70+ newsletters, 100+ hours of weekly meetups & 1-to-1 calls",
      "Host & Creator of ALIENs Talks Podcast — 50 episodes, 250 YouTube subs, 6.3K views",
      "Moderated 36K-member Reddit community",
      "Secured 2 formal partnerships: nsave.co & Athar Accelerator",
    ],
    highlight: null,
    stack: null,
  },
  {
    icon: "💼",
    title: "Commercial Experience",
    subtitle: "Customer Lifecycle & GTM Roles | Tech & SaaS | Egypt, GCC, EMEA | 2020–2024",
    bullets: [
      "B2B: Delivered 40+ Sales Qualified Opportunities and built a $240K pipeline",
      "B2C: Generated $10K revenue (60% new acquisition · 25% retention · 15% referrals) & 90%+ CSAT",
    ],
    highlight: null,
    stack: null,
    extra: {
      subtitle: "Early Career in SMEs & Startups | 2014–2020",
      bullets: [
        "Validated MVPs (AI/Bot therapist, VR Montessori), built internal processes, and secured partnerships",
        "Hands-on in sales, support, ops, stakeholder management, and 1 year of digital marketing & community growth",
      ],
    },
  },
];
