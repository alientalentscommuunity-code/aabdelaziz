import React, { useEffect, useState } from "react";
import CareerLayout from "@/components/career/CareerLayout";
import DimLabel from "@/components/career/DimLabel";
import { Badge } from "@/components/ui/badge";

const playfair = { fontFamily: "'Playfair Display', serif" };
const dmSans = { fontFamily: "'DM Sans', sans-serif" };
const spaceMono = { fontFamily: "'Space Mono', monospace" };

const tabs = ["Summary", "Current", "Commercial", "Early Career", "Education", "Skills"] as const;
type Tab = (typeof tabs)[number];

/* ── Data ── */
const summaryHighlights = [
  "1+ Year AI/LLM Prototyping",
  "30K+ Platform Visits",
  "Cairo AI Hackathon Winner",
  "$2K+ Monetized",
];

const commercialEntries = [
  {
    role: "Revenue Growth & Customer Acquisition Strategist",
    company: "Freelancer",
    location: "Remote, Global",
    dates: "Nov 2022 – Dec 2023",
    bullets: ["Crafted outreach strategies and sales sequences for clients across Egypt, GCC, US, and EMEA markets."],
    tags: ["Sales", "GTM", "Outreach", "Revenue Growth"],
  },
  {
    role: "Account Executive",
    company: "Soleek Lab",
    location: "Cairo, Egypt",
    dates: "Mar 2022 – Oct 2022",
    bullets: [
      "Selling custom tech & SaaS solutions to C-Levels in SMBs & Enterprises — Egypt and GCC markets",
      "120+ daily touchpoints; managed full sales cycle; built Go-to-Market and sales strategies",
      "Operated as a one-person GTM team managing cross-functional stakeholders",
      "Generated $240K in pipeline from 40 SQOs in 6 months; secured 5 deals totaling $120K; maintained $5K MRR renewal portfolio",
    ],
    tags: ["SaaS Sales", "GTM", "Account Executive", "Pipeline"],
  },
  {
    role: "Customer Success Manager",
    company: "MRSOOL",
    location: "Cairo, Egypt",
    dates: "Jun 2021 – Jan 2022",
    bullets: [
      "Onboarded 127 partners in 3 months; reviewed and managed 200 accounts with 9,000+ items",
      "Drove retention and expansion through check-ins, support, and educational content",
      "Achieved +90% CSAT and contributed directly to revenue growth",
    ],
    tags: ["Customer Success", "Onboarding", "Retention", "CSAT"],
  },
  {
    role: "Sales Executive",
    company: "OTO Courses",
    location: "Remote, Egypt",
    dates: "Sep 2020 – May 2021",
    bullets: [
      "Managed a portfolio of 4,800 clients (48% of total company leads) — B2C sales",
      "Built a $10.8K pipeline: 60% net new, 25% upsell, 15% referrals",
      "90%+ CSAT score",
    ],
    tags: ["B2C Sales", "Pipeline", "Upsell", "CSAT"],
  },
  {
    role: "Business Development Intern",
    company: "EasyKash",
    location: "Remote, Egypt",
    dates: "Jun 2020 – Aug 2020",
    bullets: [
      "Advocated SaaS payment solutions for B2B/B2C startups, SMEs, and freelancers",
      "Onboarded new merchants and contributed to GTM strategy across sales, product, and revenue ops",
    ],
    tags: ["Business Development", "SaaS", "GTM", "B2B"],
  },
];

const skillGroups = [
  { category: "Product", skills: ["Product Management", "PRD Writing", "0→1 Discovery", "AI Prototyping", "Product Marketing", "MVP Scoping", "User Research"] },
  { category: "Tech Stack", skills: ["Lovable.dev", "Supabase", "Antigravity", "Cursor", "Claude API", "Airtable", "Notion"] },
  { category: "Commercial", skills: ["Business Development", "GTM Strategy", "Sales Cycles", "Account Management", "Customer Success", "Revenue Operations", "Outreach Sequencing"] },
  { category: "Community & Content", skills: ["Community Building", "Newsletter", "Podcast Hosting", "Reddit Moderation", "YouTube Content", "Program Management"] },
  { category: "Soft Skills", skills: ["Stakeholder Management", "Cross-functional Collaboration", "Adaptability", "Accountability", "Empathy-driven Communication"] },
];

const CareerCV = () => {
  const [activeTab, setActiveTab] = useState<Tab>("Summary");

  useEffect(() => {
    document.title = "Full CV — Ahmad Abdelaziz";
    // Handle hash navigation to Skills tab
    if (window.location.hash === "#skills") setActiveTab("Skills");
  }, []);

  return (
    <CareerLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black text-white" style={playfair}>The Full Story</h1>
            <p className="text-white/40 mt-2" style={dmSans}>10+ years. Every role. Every lesson.</p>
          </div>
          <button className="px-5 py-2.5 rounded-full border border-[#4A9EFF]/30 text-[#4A9EFF] text-sm font-medium hover:bg-[#4A9EFF]/10 transition-colors self-start sm:self-auto">
            Download PDF ↓
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar / Tabs */}
          <div className="lg:w-48 shrink-0">
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible lg:sticky lg:top-20 pb-2 lg:pb-0">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all ${
                    activeTab === tab
                      ? "bg-[#4A9EFF]/20 text-[#4A9EFF]"
                      : "text-white/30 hover:text-white hover:bg-white/5"
                  }`}
                  style={spaceMono}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {activeTab === "Summary" && (
              <div className="space-y-6">
                <p className="text-white/50 text-base leading-relaxed" style={dmSans}>
                  AI-enabled Product Manager with 1+ year prototyping with LLMs & vibe coding. Shipped multiple MVPs achieving 30K+ visits, $2K+ monetized. Cairo AI Hackathon winner. Background spanning sales, GTM, customer success, and community building.
                </p>
                <div className="flex flex-wrap gap-3">
                  {summaryHighlights.map((h) => (
                    <span key={h} className="px-4 py-2 rounded-full border border-[#4A9EFF]/30 text-[#4A9EFF] text-xs font-bold" style={spaceMono}>
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "Current" && (
              <div className="space-y-6">
                {/* Featured */}
                <div className="rounded-xl border-l-4 border-[#4A9EFF] bg-white/[0.02] p-6">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-bold text-white" style={playfair}>Product Manager | Entrepreneur in Residence</h3>
                    <span className="px-2 py-0.5 rounded-full bg-[#4A9EFF]/20 text-[#4A9EFF] text-[10px] font-bold uppercase">Featured</span>
                  </div>
                  <p className="text-sm font-bold text-white/60" style={dmSans}>ALIENs Venture · Cairo, Egypt</p>
                  <p className="text-xs text-white/30 mb-4" style={spaceMono}>July 2024 — Present</p>
                  <ul className="space-y-2 text-sm text-white/40" style={dmSans}>
                    {[
                      "Skilled in 0→MVP: Ideate, Discovery, PRD, AI Prototyping, and Product Marketing",
                      "Shipped AI-enabled talent & hiring platform: 20K+ visits, 3K+ applies, 500+ signups",
                      "$2K monetized at 100% profit margin — 2 partnerships (nsave.co + Athar Accelerator)",
                      "$5K inbound MRR pipeline across 3 leads (closed-lost)",
                      "2 talents placed in USD jobs — avg. $1K/month, $8K total earnings",
                      "16+ talents secured multiple interviews; 50+ total interviews secured",
                      "Cairo AI Hackathon Winner by Athar Accelerator",
                      "Leveraged: Claude, Antigravity, Lovable.dev, Supabase, Airtable, Softr, Notion",
                    ].map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#4A9EFF] mt-0.5">•</span> {b}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sub-role */}
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                  <h3 className="text-lg font-bold text-white" style={playfair}>Community & Program Lead</h3>
                  <p className="text-sm font-bold text-white/60" style={dmSans}>ALIENs Venture · Cairo, Egypt</p>
                  <p className="text-xs text-white/30 mb-4" style={spaceMono}>July 2024 — December 2024</p>
                  <ul className="space-y-2 text-sm text-white/40" style={dmSans}>
                    {[
                      "Managing end-to-end programs, ops, design, content",
                      "70+ weeks of newsletter, blog, and meetups",
                      "100+ hours of weekly meetups & 1-to-1 calls",
                      "Host & Creator @ ALIENs Talks Podcast: 308 YouTube subs | 11.5K views | 90 videos",
                      "Moderate 36K SubReddit members",
                    ].map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#4A9EFF] mt-0.5">•</span> {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "Commercial" && (
              <div className="relative pl-6 border-l-2 border-[#4A9EFF]/20 space-y-8">
                {commercialEntries.map((entry, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-[#4A9EFF] border-2 border-black" />
                    <h3 className="text-lg font-semibold text-white" style={playfair}>{entry.role}</h3>
                    <p className="text-sm font-bold text-white/60" style={dmSans}>{entry.company} · {entry.location}</p>
                    <p className="text-xs text-white/30 mb-3" style={spaceMono}>{entry.dates}</p>
                    <ul className="space-y-1.5 text-sm text-white/40 mb-3" style={dmSans}>
                      {entry.bullets.map((b, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <span className="text-[#4A9EFF] mt-0.5">•</span> {b}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5">
                      {entry.tags.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded-full border border-[#4A9EFF]/20 text-[#4A9EFF] text-[10px] font-bold">{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "Early Career" && (
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <h3 className="text-lg font-bold text-white mb-1" style={playfair}>Early Career in SMEs & Startups</h3>
                <p className="text-xs text-white/30 mb-4" style={spaceMono}>2014 – 2020</p>
                <p className="text-sm text-white/40" style={dmSans}>
                  Validated MVPs (AI/Bot therapist, VR Montessori), built internal processes, secured partnerships. Hands-on experience in sales, support, ops, and stakeholder management.
                </p>
              </div>
            )}

            {activeTab === "Education" && (
              <div className="space-y-5">
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                  <h3 className="text-base font-bold text-white" style={playfair}>Faculty of Commerce</h3>
                  <p className="text-sm text-white/60" style={dmSans}>Beni Suef University · Egypt</p>
                  <p className="text-xs text-white/30" style={spaceMono}>2016 – 2019 · Dropped Out</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                  <h3 className="text-base font-bold text-white" style={playfair}>High School Diploma</h3>
                  <p className="text-xs text-white/30" style={spaceMono}>2011 – 2016</p>
                </div>
                <div className="rounded-xl border-l-4 border-[#4A9EFF] bg-white/[0.02] p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-white" style={playfair}>Autodidact / Self-learner</h3>
                    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#4A9EFF]/20 text-[#4A9EFF] text-[10px] font-bold uppercase">
                      <span className="w-1.5 h-1.5 bg-[#4A9EFF] rounded-full animate-pulse" />
                      Ongoing
                    </span>
                  </div>
                  <p className="text-xs text-white/30 mb-3" style={spaceMono}>2014 — Present</p>
                  <p className="text-sm text-white/40 mb-3" style={dmSans}>
                    Learning scopes: Entrepreneurship · Sales & Business Development · Product Management
                  </p>
                </div>
              </div>
            )}

            {activeTab === "Skills" && (
              <div className="space-y-8" id="skills">
                {skillGroups.map((group) => (
                  <div key={group.category}>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-3" style={spaceMono}>
                      {group.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 rounded-full border border-[#4A9EFF]/30 text-[#4A9EFF] text-xs font-medium hover:bg-[#4A9EFF]/10 transition-colors cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </CareerLayout>
  );
};

export default CareerCV;
