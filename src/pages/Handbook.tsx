import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubNav from "@/components/shared/SubNav";
import BulletList from "@/components/shared/BulletList";
import InfoCard from "@/components/shared/InfoCard";

const GlassBullets = ({ accentColor, items }: { accentColor: string; items: string[] }) => (
  <div className="space-y-2 text-white/40 font-medium italic">
    {items.map((b, j) => (
      <p key={j} className="flex items-start gap-2">
        <span className={`${accentColor} mt-1`}>•</span>
        {b}
      </p>
    ))}
  </div>
);

const GlassCard = ({ title, accentColor, subtitle, children }: { title: string; accentColor: string; subtitle?: string; children: React.ReactNode }) => (
  <div className="glass p-6 sm:p-8 hover:border-white/20 transition-all duration-500">
    <h3 className={`text-xl sm:text-2xl font-black italic uppercase tracking-tighter ${accentColor} mb-2`}>{title}</h3>
    {subtitle && <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-5">{subtitle}</p>}
    {children}
  </div>
);

const Handbook = () => {
  const [sub, setSub] = useState("intro");
  const subs = ["intro", "what we do", "how it started", "where we are", "where we're going", "the product"];

  useEffect(() => {
    document.title = "Startup Handbook — Ahmad Abdelaziz";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="section-container !py-0">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white mb-3">
              ALIENs <span className="text-secondary">Venture</span> Handbook
            </h1>
            <p className="text-white/30 font-medium italic">
              Building (and overthinking) in public since day 0. This wiki takes you through everything — how it started, where it is now, where we're heading.
            </p>
          </div>

          <SubNav items={subs} active={sub} onSelect={setSub} accentColor="text-secondary" />

          {/* INTRO */}
          {sub === "intro" && (
            <div className="space-y-6">
              <GlassCard title="Why we make it public" accentColor="text-secondary">
                <GlassBullets accentColor="text-secondary" items={[
                  "On a quest to build an authentic & thriving ecosystem for humanity — global talents & hiring managers, worldwide, MENA focused.",
                  "Help, inspire, and encourage everyone to build upon this or learn from our experiments.",
                  "We welcome any kind of contribution — feedback, suggestions, or raising your hand to build with us.",
                  "Kind of an open-source thing (to be updated).",
                  "You are welcome as a member, partner, shareholder, or co-founder.",
                ]} />
              </GlassCard>

              {/* Ahmad */}
              <div className="glass overflow-hidden hover:border-violet-300/30 transition-all duration-500">
                <div className="px-6 sm:px-8 py-4 border-b border-white/10">
                  <h3 className="text-xl font-black italic uppercase tracking-tighter text-violet-300">Ahmad Abdelaziz</h3>
                  <p className="text-white/30 text-sm font-medium italic mt-0.5">Founder · Product & Community Manager · Started 29 July 2024</p>
                </div>
                <div className="px-6 sm:px-8 py-5 space-y-4">
                  <p className="text-white/40 font-medium italic border-l-2 border-violet-300/30 pl-4">
                    "Desperate, scarred but never surrendered — back to the battlefield over and over."
                  </p>
                  <GlassBullets accentColor="text-violet-300" items={[
                    "Started this to break into product management — the first time choosing my own path.",
                    "Building a portfolio, connections, and a network of peers for my own growth — and for yours.",
                    "Solving real problems, making people happy, finding gratitude, and making more $$ (me and you too).",
                    "I do it for me ✖️🧪 — Heisenberg. And I'd do it every day — for myself & my people.",
                    "Today it feels like home 🏠 — and even better, like king in the north 👑❄️",
                    "I want to: Learn 📚 · Earn 💸 · Survive 💪 · Thrive 🌱 — finding financial stability & wellbeing together.",
                  ]} />
                </div>
              </div>

              {/* Hussien */}
              <div className="glass overflow-hidden hover:border-emerald-400/30 transition-all duration-500">
                <div className="px-6 sm:px-8 py-4 border-b border-white/10">
                  <h3 className="text-xl font-black italic uppercase tracking-tighter text-emerald-400">Hussien M Almahdy</h3>
                  <p className="text-white/30 text-sm font-medium italic mt-0.5">Front-End Developer & Designer · Joined 3 Oct 2025</p>
                </div>
                <div className="px-6 sm:px-8 py-5 space-y-4">
                  <p className="text-white/40 font-medium italic border-l-2 border-emerald-400/30 pl-4">
                    "Human at the first stage — loves to go on adventures and wants to change the world."
                  </p>
                  <GlassBullets accentColor="text-emerald-400" items={[
                    "Joined ALIENs Venture to learn at the first stage.",
                    "By the time — why not earn?",
                    "Realized there's a connection between learn, earn, thrive, and survive — no matter how you arrange it.",
                  ]} />
                </div>
              </div>

              {/* One-liner */}
              <GlassCard title="ALIENs Venture" accentColor="text-secondary" subtitle="In 3 seconds">
                <p className="text-xl sm:text-2xl font-black italic text-white mb-2">"Y Combinator for Humanity."</p>
                <p className="text-white/40 font-medium italic leading-relaxed">
                  A community-led, AI Human Venture combining knowledge and humanity principles with AI — to architect concepts that turn humanity's chaos and uncertainty into victories.
                </p>
              </GlassCard>

              <GlassCard title="Our Style" accentColor="text-pink-400">
                <p className="text-white/40 font-medium italic leading-relaxed">
                  "Crafting with good taste & high standards — like the blood of House Targaryen and the honor of House Stark."
                </p>
              </GlassCard>
            </div>
          )}

          {/* WHAT WE DO */}
          {sub === "what we do" && (
            <div className="space-y-6">
              <GlassCard title="3-Second Brief" accentColor="text-secondary">
                <p className="text-white/90 font-bold italic text-lg mb-2">
                  Prototyping in Employment and Wellbeing — building AALN and AALN OS.
                </p>
                <p className="text-white/40 font-medium italic leading-relaxed">
                  AI Copilot for Authentic · Curious · Kind humanity (talents & hiring managers) — worldwide.<br />
                  Imagine ChatGPT being your bestie as a Sr. Recruiter with psychometric competencies.
                </p>
              </GlassCard>

              <GlassCard title="Problem" accentColor="text-pink-400">
                <GlassBullets accentColor="text-pink-400" items={[
                  "Across MENA, both talent and hiring managers face hidden job markets, fragmented information, low trust, and unclear growth paths.",
                  "Constant uncertainty in employment, financial stability, and wellbeing.",
                  "No unified, human-centered system that guides people or companies with clarity and depth.",
                  "Psychological layer: chaos, uncertainty, self-doubt, unclear learning paths, authenticity gaps — for both B2C and B2B.",
                ]} />
              </GlassCard>

              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-4">Value</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Talents (B2C)", accent: "text-violet-300",
                      items: ["Learn: Personal AI Tutor — research & execution approach","Earn: Match and apply to USD-paying jobs, gigs, and paid learning","Survive: AI-matched peer-to-peer mentorship with verified humanity","Thrive: Custom value creation, roadmaps, rituals, meetups"],
                    },
                    {
                      title: "Hunters (B2B)", accent: "text-emerald-400",
                      items: ["Hunt: Top 1% psychometrically vetted talent referrals","Onboard: New hire in 3 clicks, totally compliant anywhere","Pay: Pay remote employees in USD in seconds","Accelerate: AI Sr. Recruiter — better JDs, faster hiring, global employer branding"],
                    },
                  ].map((v) => (
                    <GlassCard key={v.title} title={v.title} accentColor={v.accent}>
                      <GlassBullets accentColor={v.accent} items={v.items} />
                    </GlassCard>
                  ))}
                </div>
              </div>

              <GlassCard title="Institutions & Stakeholders (B2B/B2G)" accentColor="text-sky-400">
                <GlassBullets accentColor="text-sky-400" items={[
                  "Structured AI evaluation framework (AALN) for universities, academies, NGOs, and innovation hubs.",
                  "Talent readiness and employability insights dashboards.",
                  "API / integration into existing institutional systems and programs.",
                ]} />
              </GlassCard>

              <GlassCard title="Positioning — A new blend of:" accentColor="text-secondary">
                <div className="flex flex-wrap gap-2">
                  {["LinkedIn","Toptal","Contra","Andela","Upwork","Remote.com"].map((p) => (
                    <span key={p} className="px-3 py-1 bg-white/5 text-white/40 rounded-full text-xs font-bold border border-white/10">{p}</span>
                  ))}
                </div>
              </GlassCard>
            </div>
          )}

          {/* HOW IT STARTED */}
          {sub === "how it started" && (
            <div className="space-y-6">
              <GlassCard title="Community first — not platform first" accentColor="text-emerald-400">
                <GlassBullets accentColor="text-emerald-400" items={[
                  "Before writing a single line of code, the first iterations were validated using Notion, YouTube, Canva, and Google Meet.",
                  "$0 CAC strategy — continuous market research, real early validation, zero artificial growth.",
                ]} />
              </GlassCard>

              <div className="grid sm:grid-cols-2 gap-4">
                <GlassCard title="Talents connect for" accentColor="text-violet-300">
                  <GlassBullets accentColor="text-violet-300" items={["Clarity","Skill refinement","Career growth","Emotional & professional support"]} />
                </GlassCard>
                <GlassCard title="Startups connect for" accentColor="text-secondary">
                  <GlassBullets accentColor="text-secondary" items={["Hiring support","Market feedback","Talent access"]} />
                </GlassCard>
              </div>

              <GlassCard title="Phase 01 · Lean Community Stack" accentColor="text-orange-400" subtitle="Tools: Notion · YouTube · Canva · Google Meet">
                <div className="grid sm:grid-cols-2 gap-2 mb-3">
                  {["Career Hub","Job Board","Human Evaluation System","Hiring Referral Engine"].map((f) => (
                    <p key={f} className="flex items-center gap-2 text-white/40 font-medium italic">
                      <span className="text-primary">✓</span> {f}
                    </p>
                  ))}
                </div>
                <p className="text-white/25 text-sm font-medium italic">500 members · 5 global startups · authentic, trusted community</p>
              </GlassCard>

              <GlassCard title="Phase 02 · AALN AI Prototypes" accentColor="text-secondary">
                <p className="text-white/40 font-medium italic leading-relaxed">
                  Automated, AI-powered versions of the same four pillars — built on deeply understood, real human problems. 6 months of research & iteration.
                </p>
              </GlassCard>
            </div>
          )}

          {/* WHERE WE ARE */}
          {sub === "where we are" && (
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-4">Traction & Validation</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { v: "$2K", l: "Monetized · 100% margin" },
                    { v: "500+", l: "Signups (100+ top-tier)" },
                    { v: "30K+", l: "Platform visits" },
                    { v: "4.5K+", l: "Job applies" },
                    { v: "3K+", l: "Jobs sourced" },
                    { v: "2K+", l: "Companies sourced" },
                  ].map((m) => (
                    <div key={m.l} className="glass p-5 hover:border-primary/30 transition-all duration-500">
                      <div className="text-2xl sm:text-3xl font-black text-primary">{m.v}</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-white/20 mt-1.5 leading-[1.4]">{m.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              <GlassCard title="ROI Breakdown" accentColor="text-secondary">
                <div className="space-y-2 text-white/40 font-medium italic">
                  {[
                    "$1K — Closed-won partnerships: nsave.co + Athar Accelerator + stealth startup consultation",
                    "$1K — Winner prize @ Cairo AI Hackathon by Athar",
                    "$5K MRR pipeline (closed-lost): talent referrals $1.5K/mo · one-time $2K · academy program $1K + AALN AI subscription $2K",
                  ].map((line, i) => (
                    <p key={i} className="flex items-start gap-2">
                      <span className="text-secondary mt-1">$</span>
                      {line}
                    </p>
                  ))}
                </div>
              </GlassCard>

              <div className="grid sm:grid-cols-2 gap-4">
                <GlassCard title="Talents" accentColor="text-violet-300">
                  <GlassBullets accentColor="text-violet-300" items={["2 job placements · avg. $1K/mo · $8K total earnings","50+ interview replacements","20–50 talents secured 100+ interviews"]} />
                </GlassCard>
                <GlassCard title="Hunters" accentColor="text-emerald-400">
                  <GlassBullets accentColor="text-emerald-400" items={["10+ referral requests supported","5+ startups consulted on global remote hiring"]} />
                </GlassCard>
              </div>

              <GlassCard title="Working Prototype Stack" accentColor="text-sky-400">
                <div className="grid sm:grid-cols-3 gap-2">
                  {["Airtable","OpenAI","Softr","Lovable","n8n & Make","Claude"].map((t) => (
                    <span key={t} className="px-3 py-1.5 bg-sky-400/10 text-sky-400 rounded-full text-xs font-bold text-center">{t}</span>
                  ))}
                </div>
              </GlassCard>
            </div>
          )}

          {/* WHERE WE'RE GOING */}
          {sub === "where we're going" && (
            <div className="space-y-6">
              <GlassCard title="Next" accentColor="text-secondary">
                <GlassBullets accentColor="text-secondary" items={[
                  "Turning the working prototype into a fully functional MVP.",
                  "Scaling validated features and functionality.",
                ]} />
              </GlassCard>

              <GlassCard title="Market Positioning" accentColor="text-pink-400" subtitle="We compete with">
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Upwork","Andela","Manara","Glassdoor","Remote.com","LinkedIn","HireEZ","Eightfold"].map((c) => (
                    <span key={c} className="px-3 py-1 bg-white/5 text-white/35 border border-white/10 rounded-full text-xs font-bold">{c}</span>
                  ))}
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-pink-400 mb-3">We differ because</p>
                <GlassBullets accentColor="text-pink-400" items={[
                  "We evaluate humans before resumes.",
                  "We offer a real AI mentor, not just job matching.",
                  "Community-led · Zero paid CAC.",
                  "We merge employment, mental wellbeing, and financial enablement into one ecosystem.",
                ]} />
              </GlassCard>

              <GlassCard title="Growth Strategy" accentColor="text-emerald-400" subtitle="Lean & Community-Led">
                <GlassBullets accentColor="text-emerald-400" items={[
                  "Content-first education.",
                  "Community-driven hiring.",
                  "Zero paid ads.",
                  "Real human relationships.",
                  "Shareholder model: pay talents who secure interviews a percentage · enable talents to monetize expertise.",
                  "Continuous loop: Test → Improve → Repeat.",
                ]} />
              </GlassCard>

              <GlassCard title="90-Day Execution Focus" accentColor="text-secondary">
                <p className="text-white/40 font-medium italic leading-relaxed">
                  Refine AI evaluation prototypes · close 3+ partnerships · reach $5K MRR · ship the MVP version of AALN OS for hunters.
                </p>
              </GlassCard>
            </div>
          )}

          {/* THE PRODUCT */}
          {sub === "the product" && (
            <div className="space-y-6">
              {/* ALIEN AI — Talent Hub */}
              <div className="glass overflow-hidden hover:border-violet-300/30 transition-all duration-500">
                <div className="px-6 sm:px-8 py-5 border-b border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-violet-300 mb-1">01 · ALIEN AI</p>
                  <h3 className="text-xl sm:text-2xl font-black italic uppercase tracking-tighter text-white">The Talent Hub 👽</h3>
                  <p className="text-white/30 text-sm font-medium italic mt-0.5">Immersive, multi-layered environment for career development, mental wellbeing, and financial growth</p>
                </div>
                <div className="px-6 sm:px-8 py-6 space-y-5">
                  {[
                    { title: "Intelligent Career Board & Hub", accent: "text-violet-300", items: ["Jobs & Companies Board — vetted jobs and company profiles","Job Hunting Hub — centralized space for active hunting ops"] },
                    { title: "AI Career Mentor Suite", accent: "text-pink-400", items: ["Pre-Interview Prep — specialized flows for upcoming interviews","Practice Interviews — mock interview environment","Interview & Offers Trackers — track progress, compare offers"] },
                    { title: "Virtual Identity", accent: "text-sky-400", items: ["CV Dashboard — create, manage, and preview optimized resumes","Portfolio Builder — Virtual Portfolio beyond a standard resume"] },
                    { title: "Career Academy", accent: "text-emerald-400", items: ["Internal LMS — tutorials, insights, course details, and interactive lesson views"] },
                    { title: "Mentor Ecosystem", accent: "text-secondary", items: ["Talents can transition into mentors — Mentor Handbook, public/private handbooks, mentor reports"] },
                    { title: "Community Rituals & Wellbeing", accent: "text-orange-400", items: ["Community Meetups · Find a Peer · P2P Chat · Coffee Chat Requests · Talks · Diaries · Newsletters"] },
                    { title: "Alien Squad — Financial Tools", accent: "text-secondary", items: ["Interview Referrals — manage community referrals","Employment Contracts & Earnings — contracts, account cards, personal earnings tracker"] },
                    { title: "AI Mode — Deep Psychological Integration", accent: "text-violet-300", items: ["AI coach for Learning Strategies · Emotions & Thoughts · Tasks & Responsibilities"] },
                  ].map((group) => (
                    <div key={group.title}>
                      <p className={`text-[10px] font-black uppercase tracking-widest ${group.accent} mb-2`}>{group.title}</p>
                      <GlassBullets accentColor={group.accent} items={group.items} />
                    </div>
                  ))}
                </div>
              </div>

              {/* ALIEN OS — Hunter Dashboard */}
              <div className="glass overflow-hidden hover:border-emerald-400/30 transition-all duration-500">
                <div className="px-6 sm:px-8 py-5 border-b border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1">02 · ALIEN OS</p>
                  <h3 className="text-xl sm:text-2xl font-black italic uppercase tracking-tighter text-white">The Hunter Dashboard 🎯</h3>
                  <p className="text-white/30 text-sm font-medium italic mt-0.5">ATS + sourcing tool + HR suite — powerhouse OS for startups and B2B users</p>
                </div>
                <div className="px-6 sm:px-8 py-6 space-y-5">
                  {[
                    { title: "Applicant Tracking System (ATS)", accent: "text-emerald-400", items: ["Job Pipelines & Kanban Boards — track candidate flows","Candidate Profiles & Hired Trackers","Evaluation Queue — manage pending assessments"] },
                    { title: "Advanced Evaluation Engine", accent: "text-sky-400", items: ["Scenario 01 (Intake) — upload CVs and run initial AI analysis","Scenario 02 (Deep Assessment) — deep analytics, evaluation kanban, AI-driven actions"] },
                    { title: "Company Management", accent: "text-secondary", items: ["Company Board & Profiles — internal + public-facing employer branding profile","Internal Feedback Loop — data and feedback before going to market"] },
                    { title: "Active Sourcing — Hunt & Accelerate", accent: "text-orange-400", items: ["Accelerate Handbook & Squad Viewer — verified talent pools","Referral Requests — request referrals from Alien Squad directly"] },
                    { title: "Global HR Operations — Onboard & Pay", accent: "text-violet-300", items: ["Add & Manage Contractors — integrated global view","Add & Manage Global Payments — financial portals"] },
                    { title: "Hunter AI Mode", accent: "text-emerald-400", items: ["B2B AI copilots: Company Mentor · Hunter Mentor · Market Intelligence"] },
                  ].map((group) => (
                    <div key={group.title}>
                      <p className={`text-[10px] font-black uppercase tracking-widest ${group.accent} mb-2`}>{group.title}</p>
                      <GlassBullets accentColor={group.accent} items={group.items} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Infrastructure */}
              <div className="glass overflow-hidden hover:border-secondary/30 transition-all duration-500">
                <div className="px-6 sm:px-8 py-5 border-b border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-1">03 · Infrastructure</p>
                  <h3 className="text-xl sm:text-2xl font-black italic uppercase tracking-tighter text-white">Core Infrastructure & Onboarding 🏗️</h3>
                </div>
                <div className="px-6 sm:px-8 py-6">
                  <GlassBullets accentColor="text-secondary" items={[
                    "Split Onboarding — separate funnels for OnboardingAlien vs. OnboardingHunter.",
                    "Quick Setup Flows — frictionless paths to get verified talents and hunters into the app immediately.",
                    "Deep Integrations — specialized sub-pages including dedicated nsave.co integration.",
                  ]} />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Handbook;
