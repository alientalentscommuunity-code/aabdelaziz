// HARDCODED CONTENT FROM PRD - Source of Truth
// All content extracted from PRD.md - No Supabase dependency

// ============================================
// 6.1 HOME PAGE CONTENT
// ============================================

export const homeContent = {
  hero: {
    headline: "Where Product Vision Meets Human Connection",
    subtitle: "Building products that matter. Growing communities that last. ALIEN-style.",
    videoPlaceholder: true,
    ctaPrimary: "Start Exploring",
    ctaSecondary: "View My Work"
  },
  
  manifesto: {
    title: "The Manifesto",
    content: `Product is chaos. Product is clarity.
Product is the invisible thread between "what could be" and "what is."

I don't just ship features—I architect experiences that honor the messy, beautiful, chaotic reality of being human.

Every pixel has purpose. Every interaction tells a story. Every product is a bridge between someone's current reality and their desired future.

This is ALIEN Product Management:
- Remote Mastery over location dependence
- Community-Led Growth over vanity metrics  
- Human-First Design over corporate polish
- Ship Fast, Learn Faster over perfect delays
- Authentic Connection over performative networking

Welcome to my universe.`
  },

  personas: {
    title: "Who Are You?",
    subtitle: "Different paths, same destination: building something meaningful",
    items: [
      {
        id: "learners",
        icon: "🎓",
        title: "Learners",
        subtitle: "Aspiring PMs, Students, Career Switchers",
        description: "You're hungry to break into product, level up your skills, or make a bold career move. I've been there. Let me show you the path.",
        cta: "Explore Framework",
        link: "/career/framework",
        accent: "green"
      },
      {
        id: "startups",
        icon: "🚀",
        title: "Startups",
        subtitle: "Founders, Hiring Managers, Talent Seekers",
        description: "You need product leadership that ships. Someone who understands chaos and turns it into clarity. Let's build together.",
        cta: "View Projects",
        link: "/career",
        accent: "orange"
      },
      {
        id: "community",
        icon: "🌐",
        title: "Community",
        subtitle: "Connectors, Collaborators, Humans",
        description: "You're building something in the human space—events, communities, movements. I see you. Let's amplify each other.",
        cta: "Let's Connect",
        link: "/partners",
        accent: "pink"
      }
    ]
  },

  projects: {
    title: "Featured Work",
    subtitle: "Shipped products. Real impact. ALIEN style.",
    items: [
      {
        id: "alien-talents",
        title: "ALIEN Talents Platform",
        category: "Live Product",
        description: "AI-enabled talent marketplace connecting emerging professionals with remote opportunities across MENA.",
        tags: ["React", "Supabase", "AI Integration", "Marketplace"],
        liveUrl: "https://guileless-daifuku-9c29b0.netlify.app/",
        status: "live",
        accent: "green"
      },
      {
        id: "remote-job-board",
        title: "Remote $$ Job Board",
        category: "Live Product", 
        description: "Curated remote job board focused on high-paying opportunities for MENA talent.",
        tags: ["Job Board", "Remote Work", "Curation"],
        liveUrl: "https://alientalents.com",
        status: "live",
        accent: "green"
      },
      {
        id: "atos-hiring",
        title: "ATOS Hiring Platform",
        category: "Live Product",
        description: "Psychometrics-powered hiring platform matching candidates with culture-fit companies.",
        tags: ["Hiring", "Psychometrics", "AI Matching"],
        liveUrl: "https://ubiquitous-custard-6d2ece.netlify.app/",
        status: "live",
        accent: "green"
      },
      {
        id: "career-hub-crm",
        title: "Career Hub CRM",
        category: "Live Product",
        description: "Personal CRM for managing professional relationships, opportunities, and career growth.",
        tags: ["CRM", "Career Management", "Relationships"],
        liveUrl: "https://preview--alien-career-hub.lovable.app/",
        status: "live",
        accent: "orange"
      },
      {
        id: "aaln-mentor",
        title: "AALN AI Mentor",
        category: "Live Product",
        description: "AI-powered career mentor providing personalized guidance for product professionals.",
        tags: ["AI", "Mentorship", "Career Guidance"],
        liveUrl: "https://tubular-melba-fade64.netlify.app/",
        status: "live",
        accent: "orange"
      },
      {
        id: "alien-ats",
        title: "ALIEN ATS",
        category: "Live Product",
        description: "Applicant tracking system designed for startups and remote-first teams.",
        tags: ["ATS", "Recruitment", "Startup Tools"],
        liveUrl: "https://alien-ats.lovable.app",
        status: "live",
        accent: "orange"
      }
    ]
  },

  socialProof: {
    title: "What People Say",
    items: [
      {
        quote: "Ahmad's product vision is unmatched. He sees connections others miss.",
        author: "Community Member",
        role: "Product Manager"
      },
      {
        quote: "Working with Ahmad transformed how we approach product development.",
        author: "Startup Founder",
        role: "Tech Startup"
      }
    ]
  },

  footerCTA: {
    title: "Ready to Build Something?",
    subtitle: "Curious? Aligned? Resonate with my journey?",
    cta: "Let's Talk",
    link: "/partners"
  }
};

// ============================================
// 6.2 CAREER PAGE CONTENT
// ============================================

export const careerContent = {
  landing: {
    hero: {
      title: "Career Galaxy",
      subtitle: "My journey through product management, community building, and ALIEN-style growth",
      tagline: "Remote Mastery for Multipotentialites"
    },
    intro: {
      title: "The Path",
      content: `I'm a product manager by craft, community builder by passion, and ALIEN by mindset.

My career isn't a straight line—it's a constellation of experiments, shipped products, and human connections. From leading product teams to building startups, every step has been about turning chaos into clarity.`
    },
    quickStats: {
      title: "At a Glance",
      items: [
        { label: "Years in Product", value: "5+" },
        { label: "Products Shipped", value: "10+" },
        { label: "Community Members", value: "2K+" },
        { label: "Industries", value: "6+" }
      ]
    }
  },

  framework: {
    hero: {
      title: "The ALIEN Framework",
      subtitle: "How I approach product, career, and life"
    },
    sections: [
      {
        id: "mindset",
        title: "The ALIEN Mindset",
        icon: "🧠",
        content: `ALIEN = Authentic, Limitless, Innovative, Empathetic, Non-linear

- **Authentic**: Build from truth, not trends
- **Limitless**: Constraints are starting points, not endings  
- **Innovative**: Question everything. Especially the "obvious"
- **Empathetic**: Feel the user's chaos. Design for it.
- **Non-linear**: Growth isn't a ladder. It's a constellation.`
      },
      {
        id: "skills",
        title: "Skills Matrix",
        icon: "📊",
        categories: [
          {
            name: "Product Core",
            skills: ["Product Strategy", "User Research", "Data Analysis", "Roadmapping", "Agile/Scrum", "Feature Prioritization"]
          },
          {
            name: "Growth & Community", 
            skills: ["Community-Led Growth", "Content Strategy", "Go-to-Market", "User Onboarding", "Retention Design"]
          },
          {
            name: "Technical",
            skills: ["SQL", "No-Code Tools", "API Design", "AI Integration", "System Architecture"]
          },
          {
            name: "Soft Skills",
            skills: ["Cross-functional Leadership", "Stakeholder Management", "Communication", "Chaos Navigation"]
          }
        ]
      },
      {
        id: "resources",
        title: "Learning Resources",
        icon: "📚",
        items: [
          "Continuous Discovery Habits - Teresa Torres",
          "Inspired - Marty Cagan",
          "The Lean Startup - Eric Ries",
          "Shape Up - Basecamp",
          "AKC Products (YouTube)"
        ]
      }
    ]
  },

  icp: {
    hero: {
      title: "Who I Serve",
      subtitle: "Understanding my impact across different segments"
    },
    segments: [
      {
        id: "emerging-talent",
        title: "Emerging Talent",
        subtitle: "Aspiring PMs & Career Switchers",
        description: "You're breaking into product or making a bold career pivot. You need frameworks, mentorship, and real-world guidance.",
        painPoints: ["Unclear career path", "Overwhelming resources", "No portfolio"],
        solutions: ["Career Framework", "Portfolio Projects", "1:1 Mentorship"],
        cta: "Explore Framework",
        accent: "green"
      },
      {
        id: "career-switchers", 
        title: "Career Switchers",
        subtitle: "Professionals in Transition",
        description: "You're moving from engineering, design, or business into product. You need to bridge the gap fast.",
        painPoints: ["Skill gaps", "No product experience", "Imposter syndrome"],
        solutions: ["Skills Translation", "Project-based Learning", "Community Support"],
        cta: "View Resources",
        accent: "orange"
      },
      {
        id: "hiring-managers",
        title: "Hiring Managers", 
        subtitle: "Startups & Scale-ups",
        description: "You need product leaders who can ship, communicate, and navigate chaos. Yesterday.",
        painPoints: ["Slow hiring", "Cultural fit", "Proven track record"],
        solutions: ["Portfolio Review", "Trial Projects", "Direct Collaboration"],
        cta: "Partner with Me",
        accent: "orange"
      },
      {
        id: "startup-founders",
        title: "Startup Founders",
        subtitle: "Early-stage Ventures",
        description: "You're building something from zero. You need product leadership that gets the startup chaos.",
        painPoints: ["No product direction", "Resource constraints", "Speed vs Quality"],
        solutions: ["Product Strategy", "MVP Definition", "Growth Loops"],
        cta: "Let's Build",
        accent: "pink"
      },
      {
        id: "community-leaders",
        title: "Community Leaders",
        subtitle: "Builders & Connectors",
        description: "You're growing communities, movements, or networks. You understand the power of human connection.",
        painPoints: ["Engagement drops", "Scaling challenges", "Monetization"],
        solutions: ["Community Strategy", "Engagement Playbooks", "Collaboration"],
        cta: "Connect",
        accent: "pink"
      }
    ]
  },

  progress: {
    hero: {
      title: "What I'm Building",
      subtitle: "Current work, active learning, and future exploration"
    },
    sections: [
      {
        id: "building",
        title: "Currently Building",
        icon: "🛠️",
        accent: "green",
        items: [
          {
            title: "ALIEN Talents Platform v2",
            description: "AI-powered matching algorithm for talent-opportunity fit",
            progress: 75,
            status: "In Progress"
          },
          {
            title: "Career Framework Course",
            description: "Comprehensive product management curriculum for MENA professionals",
            progress: 60,
            status: "In Progress"
          },
          {
            title: "Portfolio Website 2.0",
            description: "This site—fully hardcoded, CMS-free, PRD-perfect",
            progress: 90,
            status: "Almost Done"
          }
        ]
      },
      {
        id: "learning",
        title: "Currently Learning",
        icon: "📖",
        accent: "orange",
        items: [
          {
            title: "AI Integration Patterns",
            description: "LLM implementations, prompt engineering, vector databases",
            progress: 40,
            status: "Active"
          },
          {
            title: "Community-Led Growth",
            description: "Advanced strategies for scaling organic communities",
            progress: 55,
            status: "Active"
          },
          {
            title: "No-Code Automation",
            description: "n8n, Make, and workflow optimization",
            progress: 70,
            status: "Active"
          }
        ]
      },
      {
        id: "exploring",
        title: "Currently Exploring",
        icon: "🔭",
        accent: "pink",
        items: [
          {
            title: "Co-founder Partnership",
            description: "Backend & AI co-founder for ALIENs Venture",
            progress: 30,
            status: "Open"
          },
          {
            title: "Speaking Opportunities",
            description: "Product conferences, podcasts, community events",
            progress: 20,
            status: "Open"
          },
          {
            title: "Angel Investing",
            description: "Early-stage MENA startups, pre-seed to seed",
            progress: 10,
            status: "Research"
          }
        ]
      }
    ]
  },

  vision: {
    hero: {
      title: "Where I'm Going",
      subtitle: "1-year goals, 3-year vision, 5-year mission"
    },
    horizons: [
      {
        id: "one-year",
        title: "1 Year",
        subtitle: "2025",
        icon: "🎯",
        accent: "green",
        goals: [
          "Ship ALIEN Talents Platform to 1000+ active users",
          "Launch Career Framework Course with 100+ students",
          "Find Backend & AI Co-founder",
          "Grow community to 10,000 members",
          "Speak at 3+ product conferences"
        ]
      },
      {
        id: "three-year",
        title: "3 Years", 
        subtitle: "2027",
        icon: "🚀",
        accent: "orange",
        goals: [
          "Build ALIENs Venture into recognized MENA product studio",
          "Exit or scale first startup to Series A",
          "Mentor 100+ product managers",
          "Establish remote-first team of 10+",
          "Create sustainable revenue from products"
        ]
      },
      {
        id: "five-year",
        title: "5 Years",
        subtitle: "2029", 
        icon: "🌟",
        accent: "pink",
        goals: [
          "Impact 1M+ careers across MENA",
          "Build multiple successful product companies",
          "Become thought leader in remote product management",
          "Establish education platform for emerging markets",
          "Financial freedom through product equity"
        ]
      }
    ]
  }
};

// ============================================
// 6.3 PARTNERS PAGE CONTENT
// ============================================

export const partnersContent = {
  hero: {
    title: "Let's Build Together",
    subtitle: "Partnerships, mentorship, and collaboration opportunities",
    tagline: "Would it help? Yep."
  },

  waysToWork: {
    title: "How We Can Work Together",
    subtitle: "Different collaboration models for different needs",
    items: [
      {
        id: "mentorship",
        icon: "🎓",
        title: "1:1 Mentorship",
        subtitle: "For aspiring product managers",
        description: "Personal guidance for breaking into product, career transitions, or leveling up. Structured sessions with actionable feedback.",
        features: [
          "Bi-weekly 1-hour sessions",
          "Resume & portfolio review",
          "Interview preparation",
          "Career strategy planning",
          "Direct WhatsApp access"
        ],
        pricing: "$200/month",
        cta: "Apply for Mentorship",
        accent: "green",
        availability: "Limited spots"
      },
      {
        id: "consulting",
        icon: "💼",
        title: "Product Consulting",
        subtitle: "For startups & teams",
        description: "Strategic product leadership on demand. From MVP definition to growth strategy, I help you navigate the chaos.",
        features: [
          "Product strategy workshops",
          "MVP scoping & validation",
          "Growth loop design",
          "Team structure advice",
          "Investor pitch preparation"
        ],
        pricing: "Project-based",
        cta: "Discuss Your Project",
        accent: "orange",
        availability: "Select projects"
      },
      {
        id: "partnership",
        icon: "🤝",
        title: "Venture Partnership",
        subtitle: "For co-founders & collaborators",
        description: "Deep collaboration on building something meaningful. Equity-based partnerships for aligned visions.",
        features: [
          "Co-founder partnerships",
          "Equity-based collaboration",
          "Full product ownership",
          "Long-term commitment",
          "Shared vision & values"
        ],
        pricing: "Equity-based",
        cta: "Propose Partnership",
        accent: "pink",
        availability: "1 opportunity"
      },
      {
        id: "speaking",
        icon: "🎤",
        title: "Speaking & Events",
        subtitle: "For conferences & communities",
        description: "Engaging talks on product management, remote work, community building, and the ALIEN mindset.",
        features: [
          "Keynote presentations",
          "Workshop facilitation",
          "Panel discussions",
          "Podcast interviews",
          "Community Q&As"
        ],
        pricing: "Custom",
        cta: "Invite to Speak",
        accent: "green",
        availability: "Select events"
      }
    ]
  },

  testimonials: {
    title: "What Partners Say",
    items: [
      {
        quote: "Ahmad's mentorship transformed my product career. From confusion to clarity in 3 months.",
        author: "Sarah K.",
        role: "Now: PM at Fintech Startup",
        partnership: "Mentorship"
      },
      {
        quote: "His product vision helped us pivot our entire strategy. Worth 10x what we paid.",
        author: "Ahmed M.",
        role: "Founder, EdTech Startup",
        partnership: "Consulting"
      }
    ]
  },

  cta: {
    title: "Curious? Aligned? Resonate with my journey?",
    subtitle: "🙃 Let's talk.",
    cta: "Start a Conversation",
    personas: [
      { id: "learner", label: "I want mentorship" },
      { id: "startup", label: "I need consulting" },
      { id: "partner", label: "I want to partner" },
      { id: "event", label: "I want to invite you" }
    ]
  }
};

// ============================================
// 6.4 HANDBOOK PAGE CONTENT
// ============================================

export const handbookContent = {
  hero: {
    title: "🚀 MY ALIEN-STYLE STARTUP HANDBOOK",
    subtitle: "Operating principles, mental models, and the frameworks I use to navigate life and build products."
  },

  navigation: [
    { id: "intro", label: "Intro", icon: "👋" },
    { id: "dna", label: "AHMAD", icon: "🧬" },
    { id: "playbook", label: "Playbook", icon: "📚" },
    { id: "stack", label: "Stack", icon: "🛠️" },
    { id: "hiring", label: "🚀 Hiring", icon: "🚀" }
  ],

  intro: {
    whyPublic: {
      title: "Why we make it public",
      items: [
        "On a quest to build an authentic & thriving ecosystem for humanity — global talents & hiring managers, worldwide, MENA focused.",
        "Everything here is a living document. It evolves as I learn.",
        "Steal what works. Ignore what doesn't. Build your own version.",
        "Transparency builds trust. Trust builds community."
      ]
    },
    manifesto: {
      title: "The ALIEN Manifesto",
      content: `We are the aliens.
The ones who don't fit.
The ones who see things differently.

We don't just build products.
We architect experiences.
We craft communities.
We turn chaos into clarity.

We're not here to play the game.
We're here to change it.

ALIEN-style:
- Remote mastery over location dependence
- Community-led growth over vanity metrics
- Human-first design over corporate polish
- Ship fast, learn faster over perfect delays
- Authentic connection over performative networking

Welcome to the handbook.
Welcome to the universe.`
    }
  },

  dna: {
    principles: {
      title: "📋 Core Principles",
      items: [
        { text: "Transparency — Build in public. Share the journey.", icon: "🔍" },
        { text: "Community First — Human connection over metrics.", icon: "🤝" },
        { text: "Ship Fast — Launch, learn, iterate. Perfect is the enemy of shipped.", icon: "🚀" },
        { text: "Honor the Chaos — Life is messy. Build for the mess.", icon: "🌪️" },
        { text: "Alien Mindset — Think differently. Challenge norms.", icon: "👽" },
        { text: "Remote Mastery — Location-independent excellence.", icon: "🌍" }
      ]
    },
    mentalModels: {
      title: "Mental Models",
      tags: [
        "First Principles Thinking",
        "Systems Thinking", 
        "Second-Order Thinking",
        "Inversion",
        "Occam's Razor",
        "Pareto Principle (80/20)",
        "Regret Minimization",
        "Optionality",
        "Compounding",
        "Asymmetric Risk",
        "Network Effects",
        "Antifragility"
      ]
    }
  },

  playbook: {
    title: "The ALIEN Playbook",
    subtitle: "Frameworks and methodologies for building products",
    frameworks: [
      {
        id: "discovery",
        title: "Continuous Discovery",
        icon: "🔍",
        content: "Weekly touchpoints with customers. Always be interviewing. Build deep empathy, not shallow metrics."
      },
      {
        id: "prioritization", 
        title: "RICE + Intuition",
        icon: "📊",
        content: "Use RICE (Reach, Impact, Confidence, Effort) as a starting point. Then trust your gut. Data informs, humans decide."
      },
      {
        id: "shipping",
        title: "Ship Fast Framework",
        icon: "🚀",
        content: "2-week cycles. MVP over perfect. Test with real users on day 1. Iterate in public."
      },
      {
        id: "growth",
        title: "Community-Led Growth",
        icon: "🌱",
        content: "Build for your community first. They become your evangelists. Organic > Paid. Always."
      }
    ]
  },

  stack: {
    title: "The ALIEN Stack",
    subtitle: "Tools and technologies I use to build",
    categories: [
      {
        title: "Frontend",
        icon: "💻",
        items: ["React", "TypeScript", "Tailwind CSS", "Vite", "shadcn/ui"]
      },
      {
        title: "Backend & Database",
        icon: "⚙️",
        items: ["Supabase", "PostgreSQL", "Edge Functions", "Row Level Security"]
      },
      {
        title: "AI & Automation",
        icon: "🤖",
        items: ["OpenAI API", "Claude", "n8n", "Make", "Vector Databases"]
      },
      {
        title: "Design & Product",
        icon: "🎨",
        items: ["Figma", "Notion", "Loom", "Whimsical"]
      },
      {
        title: "Community & Growth",
        icon: "🌐",
        items: ["Discord", "LinkedIn", "YouTube", "Newsletter"]
      },
      {
        title: "DevOps",
        icon: "🚀",
        items: ["Netlify", "GitHub", "Vercel", "CI/CD"]
      }
    ]
  },

  hiring: {
    headline: "🚀 Looking for a CO-FOUNDER",
    subheadline: "Partner in Crime to ARCHITECT LIVES & Communities with ART OF HUMANITY",
    
    lookingFor: {
      title: "What We're Looking For",
      content: `🎯 Someone who brings: Curiosity, wildness, kindness — and comes with Backend & AI competencies.

💡 Feel free to reach out if you own a different gift/craft but you think it's awesome.`
    },

    approach: {
      title: "The Approach",
      items: [
        "🧪 Joining us means you wanna try something out",
        "🎭 Doing it Heisenberg style — learning by doing",
        "🔄 Breaking into product management through practice", 
        "🌟 Starting over with something unique and aligned",
        "🌍 Opportunity to change people's lives — FOR REAL"
      ]
    },

    whoWeAre: {
      title: "Who We Are — ALIENs Venture",
      subtitle: "We're prototyping thoughts, emotions, and chaos using Code × AI × No-Code tools.",
      mission: "Turn uncertainty in global employment, wealth, and wellbeing into clear wins for talents and hiring managers across MENA and emerging markets."
    },

    problem: {
      title: "The Problem We Exist to Solve",
      subtitle: "Across MENA, both talent and hiring managers face:",
      items: [
        "Hidden job markets — opportunities never see daylight",
        "Fragmented information — scattered across 20+ platforms",
        "Low trust — resumes lie, interviews are theatrical, ghosting is standard",
        "Unclear growth paths — no guidance on what to learn or where to go"
      ],
      whoWeServe: {
        title: "Who we serve:",
        items: [
          { role: "Talents (B2C)", description: "Emerging, unseen, multi-potential humanity" },
          { role: "Hiring Managers (B2B)", description: "Startups, SMEs, remote-first teams" },
          { role: "Institutions (B2B/B2G)", description: "Universities, academies, innovation hubs, NGOs" }
        ]
      }
    },

    building: {
      title: "What We're Building",
      content: "An AI-enabled, Human-First Venture Hub powered by ALIEN AI — a bestie-style AI for employment, wealth, and wellbeing."
    },

    role: {
      title: "The Role: Backend & AI Co-Founder",
      responsibilities: [
        "Backend architecture & API design (Supabase/PostgreSQL)",
        "AI integration (OpenAI/Claude APIs, prompt engineering)",
        "Vector database implementation for semantic search",
        "Automation workflows (n8n/Make)",
        "Technical co-leadership and product decisions"
      ],
      idealProfile: [
        "Backend development experience (Node.js/Python/Go)",
        "AI/ML familiarity (LLMs, embeddings, RAG)",
        "Builder mindset — ships fast, learns faster",
        "Human-first approach — cares about impact",
        "Curious, wild, kind"
      ],
      whatYouGet: [
        "Equal co-founder status & equity",
        "Learning-by-doing environment",
        "Portfolio of shipped products",
        "Real impact on real people's lives",
        "Flexible, remote-first culture"
      ]
    },

    cta: {
      apply: "Apply Now",
      readMore: "Read Full Description"
    }
  }
};

// ============================================
// 6.5 SWEETSPICE PAGE CONTENT
// ============================================

export const sweetSpiceContent = {
  hero: {
    headline: "Not Just Business.",
    highlight: "Just",
    subtitle: "Exploring the personal side, the human connection, the real story behind the work.",
    icons: ["ChefHat", "Gamepad2", "Globe", "Coffee"]
  },

  statement: {
    text: "Hey, curious stalker—I'm Ahmad • Human being."
  },

  quickFacts: {
    title: "Quick Facts",
    items: [
      { icon: "✌🏻", label: "Doing", text: "Product Management • Community Growth" },
      { icon: "🏇", label: "Shipped", text: "AI Sr. Recruiter w/ psychometrics (MVP)" },
      { icon: "🎖", label: "Won", text: "$2K ROI (Partnerships & AI Hackathon Winner)" }
    ]
  },

  handbook: {
    label: "My ALIEN-Style Handbook",
    tagline: "Non-Linear | Good Taste | High Standards",
    items: [
      "🌵 Starting over.. from 0. But like an ALIEN.",
      "🎖 Surviving uncertainty w/ unstoppable resilience"
    ]
  },

  personal: {
    items: [
      { icon: "❤️", text: "Obsessed with Knowledge • Trying things out" },
      { icon: "✧", text: "+ Any kind of: Art • Architecture • Adventures" },
      { icon: "✧", text: "24/7 active to Connect & initiate talks/activities." },
      { icon: "🇵🇸", text: "Stand for Humanity • My ppl • Palestine" },
      { icon: "✨", text: "Exploring diverse lives & universe(s)." }
    ]
  },

  closing: {
    text: "🦄 Would it help? Yep.",
    cta: "Curious? Aligned? Resonate with my journey? 🙃"
  }
};

// ============================================
// 6.6 VISION BOARD CONTENT
// ============================================

export const visionBoardContent = {
  hero: {
    title: "Vision Board",
    subtitle: "Dreams, goals, and plans. The things I'm working toward.",
    tagline: "What could be → What is"
  },

  filters: {
    categories: ["All", "Personal", "Professional", "Creative", "Community"],
    statuses: ["All", "In Progress", "Planned", "Completed"]
  },

  visions: [
    {
      id: "1",
      title: "Ship ALIEN Talents Platform v2",
      description: "AI-powered talent marketplace with 1000+ active users, making remote work accessible to MENA talent.",
      category: "Professional",
      status: "In Progress",
      priority: "High",
      progress: 75,
      targetDate: "2025-06-30",
      subtasks: [
        { title: "Build AI matching algorithm", completed: true },
        { title: "Launch beta with 100 users", completed: true },
        { title: "Scale to 1000 users", completed: false },
        { title: "Add payment integration", completed: false }
      ],
      links: [
        { label: "Live Demo", url: "https://guileless-daifuku-9c29b0.netlify.app/" }
      ]
    },
    {
      id: "2",
      title: "Build AI Mentor MVP",
      description: "Personal AI career mentor for product professionals. GPT-powered guidance, personalized advice.",
      category: "Professional",
      status: "In Progress",
      priority: "High",
      progress: 60,
      targetDate: "2025-04-30",
      subtasks: [
        { title: "Design conversation flows", completed: true },
        { title: "Implement RAG system", completed: true },
        { title: "Build React frontend", completed: false },
        { title: "User testing", completed: false }
      ]
    },
    {
      id: "3",
      title: "Launch Career Framework Course",
      description: "Comprehensive product management curriculum for MENA professionals. 10 modules, 50+ lessons.",
      category: "Community",
      status: "In Progress",
      priority: "Medium",
      progress: 45,
      targetDate: "2025-08-31",
      subtasks: [
        { title: "Outline curriculum", completed: true },
        { title: "Record first 3 modules", completed: false },
        { title: "Build course platform", completed: false },
        { title: "Launch with 100 students", completed: false }
      ]
    },
    {
      id: "4",
      title: "10K Community Members",
      description: "Grow ALIEN community to 10,000 engaged members across Discord, LinkedIn, and newsletter.",
      category: "Community",
      status: "In Progress",
      priority: "Medium",
      progress: 20,
      targetDate: "2025-12-31",
      subtasks: [
        { title: "Launch newsletter", completed: true },
        { title: "Grow Discord to 1000", completed: false },
        { title: "LinkedIn to 5000 followers", completed: false },
        { title: "Host 6 community events", completed: false }
      ]
    },
    {
      id: "5",
      title: "Remote Year Experiment",
      description: "Spend one year working from different countries. Document the journey. Build in public.",
      category: "Personal",
      status: "Planned",
      priority: "Low",
      progress: 10,
      targetDate: "2026-01-01",
      subtasks: [
        { title: "Plan destinations", completed: false },
        { title: "Set up remote work setup", completed: false },
        { title: "Document journey", completed: false },
        { title: "Build nomad guide", completed: false }
      ]
    },
    {
      id: "6",
      title: "Product Conference Speaking",
      description: "Speak at 3 major product conferences. Share the ALIEN framework. Build thought leadership.",
      category: "Creative",
      status: "Planned",
      priority: "Medium",
      progress: 5,
      targetDate: "2025-10-31",
      subtasks: [
        { title: "Submit CFPs", completed: false },
        { title: "Prepare talk deck", completed: false },
        { title: "Practice delivery", completed: false },
        { title: "Deliver talks", completed: false }
      ]
    }
  ]
};

// ============================================
// 6.7 BLOG PAGE CONTENT
// ============================================

export const blogContent = {
  hero: {
    title: "Blog",
    subtitle: "Thoughts, stories, and insights from the journey.",
    tagline: "Building in public. Learning out loud."
  },

  categories: [
    { id: "all", label: "All" },
    { id: "thoughts", label: "Thoughts" },
    { id: "stories", label: "Stories" },
    { id: "insights", label: "Insights" }
  ],

  posts: [
    {
      id: "1",
      title: "Starting Over from Zero: The ALIEN Way",
      excerpt: "Why I decided to rebuild everything from scratch, and why you should consider doing the same. The power of zero-based thinking.",
      category: "Stories",
      date: "2024-03-15",
      readTime: "5 min read",
      privacy: "public",
      featured: true,
      tags: ["Career", "Mindset", "ALIEN"]
    },
    {
      id: "2", 
      title: "Why I Built My Portfolio in Public",
      excerpt: "The lessons learned from sharing every step of building this portfolio. Transparency as a strategy.",
      category: "Insights",
      date: "2024-03-10",
      readTime: "4 min read",
      privacy: "public",
      featured: false,
      tags: ["Building in Public", "Transparency", "Portfolio"]
    },
    {
      id: "3",
      title: "The Chaos of Product Management",
      excerpt: "Why the best product managers embrace chaos rather than fight it. Lessons from shipping 10+ products.",
      category: "Thoughts",
      date: "2024-03-05",
      readTime: "6 min read",
      privacy: "public",
      featured: false,
      tags: ["Product Management", "Chaos", "Leadership"]
    },
    {
      id: "4",
      title: "Finding My Co-Founder: The Journey",
      excerpt: "What I'm looking for in a co-founder and why finding the right partner is the most important decision you'll make.",
      category: "Stories",
      date: "2024-02-28",
      readTime: "7 min read",
      privacy: "public",
      featured: true,
      tags: ["Co-founder", "Startups", "Partnerships"]
    },
    {
      id: "5",
      title: "Remote Mastery: A New Framework",
      excerpt: "Why remote work isn't about location—it's about intention. The ALIEN framework for remote excellence.",
      category: "Insights",
      date: "2024-02-20",
      readTime: "5 min read",
      privacy: "public",
      featured: false,
      tags: ["Remote Work", "Framework", "Productivity"]
    }
  ]
};

// ============================================
// 4. NAVIGATION & FOOTER CONTENT
// ============================================

export const navigationContent = {
  mainNav: [
    { label: "Home", path: "/" },
    { label: "Career", path: "/career" },
    { label: "Human", path: "/human" },
    { label: "Partners", path: "/partners" },
    { label: "Handbook", path: "/handbook" },
    { label: "Vision", path: "/vision-board" },
    { label: "Blog", path: "/blog" }
  ],

  footer: {
    tagline: "Product is chaos. Product is clarity.",
    copyright: "© 2024 Ahmad Abdelaziz. All rights reserved.",
    links: {
      social: [
        { label: "LinkedIn", url: "https://www.linkedin.com/in/ahmad96abdelaziz/" },
        { label: "YouTube", url: "https://www.youtube.com/@ALIEN.Talents" },
        { label: "Email", url: "mailto:ahmad@alientalents.com" }
      ],
      projects: [
        { label: "ALIEN Talents", url: "https://guileless-daifuku-9c29b0.netlify.app/" },
        { label: "Job Board", url: "https://alientalents.com" },
        { label: "AI Mentor", url: "https://tubular-melba-fade64.netlify.app/" }
      ]
    }
  }
};

// ============================================
// 10. BRAND & META CONTENT
// ============================================

export const brandContent = {
  name: "ALIEN",
  fullName: "ALIENs Venture",
  tagline: "Where Product Vision Meets Human Connection",
  personalTagline: "AI-enabled Product Manager | Community-Led Growth",
  valueProposition: "Remote Mastery for Multipotentialites",
  handshakeLines: [
    "Curious? Aligned? Resonate with my journey?",
    "Would it help? Yep.",
    "🙃"
  ],
  brandIdentity: {
    name: "ALIENs",
    highlight: "S",
    highlightColor: "green",
    descriptors: "Non-Linear | Good Taste | High Standards",
    motto: "Starting over.. from 0. But like an ALIEN."
  }
};

// Default export for easy importing
export default {
  home: homeContent,
  career: careerContent,
  partners: partnersContent,
  handbook: handbookContent,
  sweetSpice: sweetSpiceContent,
  visionBoard: visionBoardContent,
  blog: blogContent,
  navigation: navigationContent,
  brand: brandContent
};
