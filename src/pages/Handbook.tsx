import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubNav from "@/components/shared/SubNav";
import BulletList from "@/components/shared/BulletList";
import InfoCard from "@/components/shared/InfoCard";

const Handbook = () => {
  const [sub, setSub] = useState("intro");
  const subs = ["intro", "what we do", "how it started", "where we are", "where we're going", "the product"];

  useEffect(() => {
    document.title = "Startup Handbook — Ahmad Abdelaziz";
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-6">
            <div className="font-mono text-[10px] text-amber-400 tracking-[0.2em] uppercase mb-1.5">ALIENs Venture Handbook</div>
            <p className="font-cairo text-[13px] text-white/35 leading-[1.7]">
              Building (and overthinking) in public since day 0. This wiki takes you through everything — how it started, where it is now, where we're heading.
            </p>
          </div>

          <SubNav items={subs} active={sub} onSelect={setSub} />

          {/* INTRO */}
          {sub === "intro" && (
            <div className="flex flex-col gap-5">
              <InfoCard title="Why we make it public" accentColor="text-amber-400">
                <BulletList accentColor="text-amber-400" items={[
                  "On a quest to build an authentic & thriving ecosystem for humanity — global talents & hiring managers, worldwide, MENA focused.",
                  "Help, inspire, and encourage everyone to build upon this or learn from our experiments.",
                  "We welcome any kind of contribution — feedback, suggestions, or raising your hand to build with us.",
                  "Kind of an open-source thing (to be updated).",
                  "You are welcome as a member, partner, shareholder, or co-founder.",
                ]} />
              </InfoCard>

              {/* Ahmad */}
              <div className="border border-violet-300/20 rounded-xl overflow-hidden">
                <div className="bg-violet-300/[0.06] px-5 py-3.5 border-b border-violet-300/10">
                  <div className="font-mono text-[11px] text-violet-300 mb-0.5">Ahmad Abdelaziz</div>
                  <div className="font-cairo text-xs text-white/35">Founder · Product & Community Manager · Started 29 July 2024</div>
                </div>
                <div className="px-5 py-4 flex flex-col gap-3">
                  <div className="font-cairo text-[13px] text-white/50 leading-[1.8] italic border-l-2 border-violet-300/30 pl-3.5">
                    "Desperate, scarred but never surrendered — back to the battlefield over and over."
                  </div>
                  <BulletList accentColor="text-violet-300" items={[
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
              <div className="border border-emerald-400/20 rounded-xl overflow-hidden">
                <div className="bg-emerald-400/[0.06] px-5 py-3.5 border-b border-emerald-400/10">
                  <div className="font-mono text-[11px] text-emerald-400 mb-0.5">Hussien M Almahdy</div>
                  <div className="font-cairo text-xs text-white/35">Front-End Developer & Designer · Joined 3 Oct 2025</div>
                </div>
                <div className="px-5 py-4">
                  <div className="font-cairo text-[13px] text-white/50 leading-[1.8] italic border-l-2 border-emerald-400/30 pl-3.5 mb-3">
                    "Human at the first stage — loves to go on adventures and wants to change the world."
                  </div>
                  <BulletList accentColor="text-emerald-400" items={[
                    "Joined ALIENs Venture to learn at the first stage.",
                    "By the time — why not earn?",
                    "Realized there's a connection between learn, earn, thrive, and survive — no matter how you arrange it. The important thing is that you understand it.",
                  ]} />
                </div>
              </div>

              {/* One-liner */}
              <div className="bg-amber-400/[0.06] border border-amber-400/20 rounded-lg px-5 py-4">
                <div className="font-mono text-[10px] text-amber-400 tracking-[0.12em] uppercase mb-1.5">In 3 seconds</div>
                <div className="font-cairo text-base font-semibold text-white/90">ALIENs Venture is "Y Combinator for Humanity."</div>
                <div className="font-cairo text-[13px] text-white/40 mt-1.5 leading-[1.7]">
                  A community-led, AI Human Venture combining knowledge and humanity principles with AI — to architect concepts that turn humanity's chaos and uncertainty into victories.
                </div>
              </div>

              <InfoCard title="Our Style" accentColor="text-pink-400">
                <div className="font-cairo text-[13px] text-white/50 leading-[1.7] italic">
                  "Crafting with good taste & high standards — like the blood of House Targaryen and the honor of House Stark."
                </div>
              </InfoCard>
            </div>
          )}

          {/* WHAT WE DO */}
          {sub === "what we do" && (
            <div className="flex flex-col gap-5">
              <InfoCard title="3-second brief" accentColor="text-amber-400">
                <div className="font-cairo text-sm text-white/90 leading-[1.7]">
                  Prototyping in Employment and Wellbeing — building <strong>AALN</strong> and <strong>AALN OS</strong>.<br />
                  <span className="text-white/40 text-[13px]">
                    AI Copilot for Authentic · Curious · Kind humanity (talents & hiring managers) — worldwide.<br />
                    Imagine ChatGPT being your bestie as a Sr. Recruiter with psychometric competencies.
                  </span>
                </div>
              </InfoCard>

              <InfoCard title="Problem" accentColor="text-pink-400">
                <BulletList accentColor="text-pink-400" items={[
                  "Across MENA, both talent and hiring managers face hidden job markets, fragmented information, low trust, and unclear growth paths.",
                  "Constant uncertainty in employment, financial stability, and wellbeing.",
                  "No unified, human-centered system that guides people or companies with clarity and depth.",
                  "Psychological layer: chaos, uncertainty, self-doubt, unclear learning paths, authenticity gaps — for both B2C and B2B.",
                ]} />
              </InfoCard>

              <div>
                <div className="font-mono text-[10px] text-white/[0.38] uppercase tracking-[0.12em] mb-3">Value</div>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {[
                    {
                      title: "Talents (B2C)", accent: "text-violet-300", border: "border-violet-300/[0.18]", bg: "bg-violet-300/5",
                      items: ["Learn: Personal AI Tutor — research & execution approach","Earn: Match and apply to USD-paying jobs, gigs, and paid learning","Survive: AI-matched peer-to-peer mentorship with verified humanity","Thrive: Custom value creation, roadmaps, rituals, meetups"],
                    },
                    {
                      title: "Hunters (B2B)", accent: "text-emerald-400", border: "border-emerald-400/[0.18]", bg: "bg-emerald-400/5",
                      items: ["Hunt: Top 1% psychometrically vetted talent referrals","Onboard: New hire in 3 clicks, totally compliant anywhere","Pay: Pay remote employees in USD in seconds","Accelerate: AI Sr. Recruiter — better JDs, faster hiring, global employer branding"],
                    },
                  ].map((v) => (
                    <div key={v.title} className={`${v.bg} ${v.border} border rounded-lg p-3.5`}>
                      <div className={`font-mono text-[10px] ${v.accent} uppercase tracking-[0.1em] mb-2.5`}>{v.title}</div>
                      <BulletList accentColor={v.accent} items={v.items} />
                    </div>
                  ))}
                </div>
              </div>

              <InfoCard title="Institutions & Stakeholders (B2B/B2G)" accentColor="text-sky-400">
                <BulletList accentColor="text-sky-400" items={[
                  "Structured AI evaluation framework (AALN) for universities, academies, NGOs, and innovation hubs.",
                  "Talent readiness and employability insights dashboards.",
                  "API / integration into existing institutional systems and programs.",
                ]} />
              </InfoCard>

              <InfoCard title="Positioning — A new blend of:" accentColor="text-amber-400">
                <div className="flex flex-wrap gap-2">
                  {["LinkedIn","Toptal","Contra","Andela","Upwork","Remote.com"].map((p) => (
                    <span key={p} className="font-mono text-[11px] text-white/40 border border-white/10 rounded-full px-2.5 py-[3px]">{p}</span>
                  ))}
                </div>
              </InfoCard>
            </div>
          )}

          {/* HOW IT STARTED */}
          {sub === "how it started" && (
            <div className="flex flex-col gap-5">
              <InfoCard title="Community first — not platform first" accentColor="text-emerald-400">
                <BulletList accentColor="text-emerald-400" items={[
                  "Before writing a single line of code, the first iterations were validated using Notion, YouTube, Canva, and Google Meet.",
                  "$0 CAC strategy — continuous market research, real early validation, zero artificial growth.",
                ]} />
              </InfoCard>

              <div className="grid sm:grid-cols-2 gap-2.5">
                <InfoCard title="Talents connect for" accentColor="text-violet-300">
                  <BulletList accentColor="text-violet-300" items={["Clarity","Skill refinement","Career growth","Emotional & professional support"]} />
                </InfoCard>
                <InfoCard title="Startups connect for" accentColor="text-amber-400">
                  <BulletList accentColor="text-amber-400" items={["Hiring support","Market feedback","Talent access"]} />
                </InfoCard>
              </div>

              <InfoCard title="Phase 01 · Lean Community Stack" accentColor="text-orange-400">
                <div className="font-mono text-[11px] text-white/35 mb-2.5">Tools: Notion · YouTube · Canva · Google Meet</div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {["Career Hub","Job Board","Human Evaluation System","Hiring Referral Engine"].map((f) => (
                    <div key={f} className="flex gap-2 items-center">
                      <span className="text-orange-400 text-[11px] opacity-50">✓</span>
                      <span className="font-cairo text-[13px] text-white/50">{f}</span>
                    </div>
                  ))}
                </div>
                <div className="font-cairo text-xs text-white/30 mt-2.5">
                  500 members · 5 global startups · authentic, trusted community
                </div>
              </InfoCard>

              <InfoCard title="Phase 02 · AALN AI Prototypes" accentColor="text-amber-400">
                <div className="font-cairo text-[13px] text-white/50 leading-[1.7]">
                  Automated, AI-powered versions of the same four pillars — built on deeply understood, real human problems. 6 months of research & iteration.
                </div>
              </InfoCard>
            </div>
          )}

          {/* WHERE WE ARE */}
          {sub === "where we are" && (
            <div className="flex flex-col gap-5">
              <div>
                <div className="font-mono text-[10px] text-white/[0.38] uppercase tracking-[0.12em] mb-3">Traction & Validation</div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { v: "$2K", l: "Monetized · 100% margin" },
                    { v: "500+", l: "Signups (100+ top-tier)" },
                    { v: "30K+", l: "Platform visits" },
                    { v: "4.5K+", l: "Job applies" },
                    { v: "3K+", l: "Jobs sourced" },
                    { v: "2K+", l: "Companies sourced" },
                  ].map((m) => (
                    <div key={m.l} className="bg-white/[0.025] border border-white/[0.07] rounded-lg p-3.5">
                      <div className="font-mono text-xl font-bold text-white/90">{m.v}</div>
                      <div className="font-mono text-[10px] text-white/[0.38] mt-1 leading-[1.4]">{m.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              <InfoCard title="ROI Breakdown" accentColor="text-amber-400">
                <div className="flex flex-col gap-2">
                  {[
                    "$1K — Closed-won partnerships: nsave.co + Athar Accelerator + stealth startup consultation",
                    "$1K — Winner prize @ Cairo AI Hackathon by Athar",
                    "$5K MRR pipeline (closed-lost): talent referrals $1.5K/mo · one-time $2K · academy program $1K + AALN AI subscription $2K",
                  ].map((line, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <span className="text-amber-400 opacity-50 text-[11px] mt-[3px] shrink-0">$</span>
                      <span className="font-cairo text-[13px] text-white/50 leading-[1.65]">{line}</span>
                    </div>
                  ))}
                </div>
              </InfoCard>

              <div className="grid sm:grid-cols-2 gap-2.5">
                <InfoCard title="Talents" accentColor="text-violet-300">
                  <BulletList accentColor="text-violet-300" items={["2 job placements · avg. $1K/mo · $8K total earnings","50+ interview replacements","20–50 talents secured 100+ interviews"]} />
                </InfoCard>
                <InfoCard title="Hunters" accentColor="text-emerald-400">
                  <BulletList accentColor="text-emerald-400" items={["10+ referral requests supported","5+ startups consulted on global remote hiring"]} />
                </InfoCard>
              </div>

              <InfoCard title="Working Prototype Stack" accentColor="text-sky-400">
                <div className="grid sm:grid-cols-2 gap-1.5">
                  {["Airtable","OpenAI","Softr","Lovable","n8n & Make automations","Claude"].map((t) => (
                    <div key={t} className="font-mono text-[11px] text-sky-400 border border-sky-400/20 rounded-md px-2.5 py-1">{t}</div>
                  ))}
                </div>
              </InfoCard>
            </div>
          )}

          {/* WHERE WE'RE GOING */}
          {sub === "where we're going" && (
            <div className="flex flex-col gap-5">
              <InfoCard title="Next" accentColor="text-amber-400">
                <BulletList accentColor="text-amber-400" items={[
                  "Turning the working prototype into a fully functional MVP.",
                  "Scaling validated features and functionality.",
                ]} />
              </InfoCard>

              <InfoCard title="Market Positioning — We compete with" accentColor="text-pink-400">
                <div className="flex flex-wrap gap-2 mb-3">
                  {["Upwork","Andela","Manara","Glassdoor","Remote.com","LinkedIn","HireEZ","Eightfold"].map((c) => (
                    <span key={c} className="font-mono text-[10px] text-white/35 border border-white/10 rounded-full px-2.5 py-[3px]">{c}</span>
                  ))}
                </div>
                <div className="font-mono text-[10px] text-pink-400 mb-2 uppercase tracking-[0.1em]">We differ because</div>
                <BulletList accentColor="text-pink-400" items={[
                  "We evaluate humans before resumes.",
                  "We offer a real AI mentor, not just job matching.",
                  "Community-led · Zero paid CAC.",
                  "We merge employment, mental wellbeing, and financial enablement into one ecosystem.",
                ]} />
              </InfoCard>

              <InfoCard title="Growth Strategy — Lean & Community-Led" accentColor="text-emerald-400">
                <BulletList accentColor="text-emerald-400" items={[
                  "Content-first education.",
                  "Community-driven hiring.",
                  "Zero paid ads.",
                  "Real human relationships.",
                  "Shareholder model: pay talents who secure interviews a percentage · enable talents to monetize expertise.",
                  "Continuous loop: Test → Improve → Repeat.",
                ]} />
              </InfoCard>

              <InfoCard title="90-Day Execution Focus" accentColor="text-amber-400">
                <div className="font-cairo text-[13px] text-white/50 leading-[1.7]">
                  Refine AI evaluation prototypes · close 3+ partnerships · reach $5K MRR · ship the MVP version of AALN OS for hunters.
                </div>
              </InfoCard>
            </div>
          )}

          {/* THE PRODUCT */}
          {sub === "the product" && (
            <div className="flex flex-col gap-5">
              {/* ALIEN AI — Talent Hub */}
              <div className="border border-violet-300/20 rounded-xl overflow-hidden">
                <div className="bg-violet-300/[0.06] px-5 py-3.5 border-b border-violet-300/10">
                  <div className="font-mono text-[11px] text-violet-300">01 · ALIEN AI</div>
                  <div className="font-cairo text-[15px] font-semibold text-white/90 mt-0.5">The Talent Hub 👽</div>
                  <div className="font-cairo text-xs text-white/35 mt-0.5">Immersive, multi-layered environment for career development, mental wellbeing, and financial growth</div>
                </div>
                <div className="px-5 py-4 flex flex-col gap-3.5">
                  {[
                    { title: "Intelligent Career Board & Hub", accent: "text-violet-300", items: ["Jobs & Companies Board — vetted jobs and company profiles","Job Hunting Hub — centralized space for active hunting ops"] },
                    { title: "AI Career Mentor Suite", accent: "text-pink-400", items: ["Pre-Interview Prep — specialized flows for upcoming interviews","Practice Interviews — mock interview environment","Interview & Offers Trackers — track progress, compare offers"] },
                    { title: "Virtual Identity", accent: "text-sky-400", items: ["CV Dashboard — create, manage, and preview optimized resumes","Portfolio Builder — Virtual Portfolio beyond a standard resume"] },
                    { title: "Career Academy", accent: "text-emerald-400", items: ["Internal LMS — tutorials, insights, course details, and interactive lesson views"] },
                    { title: "Mentor Ecosystem", accent: "text-amber-400", items: ["Talents can transition into mentors — Mentor Handbook, public/private handbooks, mentor reports"] },
                    { title: "Community Rituals & Wellbeing", accent: "text-orange-400", items: ["Community Meetups · Find a Peer · P2P Chat · Coffee Chat Requests · Talks · Diaries · Newsletters"] },
                    { title: "Alien Squad — Financial Tools", accent: "text-amber-400", items: ["Interview Referrals — manage community referrals","Employment Contracts & Earnings — contracts, account cards, personal earnings tracker"] },
                    { title: "AI Mode — Deep Psychological Integration", accent: "text-violet-300", items: ["AI coach for Learning Strategies · Emotions & Thoughts · Tasks & Responsibilities"] },
                  ].map((group) => (
                    <div key={group.title}>
                      <div className={`font-mono text-[10px] ${group.accent} uppercase tracking-[0.1em] mb-1.5`}>{group.title}</div>
                      <BulletList accentColor={group.accent} items={group.items} />
                    </div>
                  ))}
                </div>
              </div>

              {/* ALIEN OS — Hunter Dashboard */}
              <div className="border border-emerald-400/20 rounded-xl overflow-hidden">
                <div className="bg-emerald-400/[0.06] px-5 py-3.5 border-b border-emerald-400/10">
                  <div className="font-mono text-[11px] text-emerald-400">02 · ALIEN OS</div>
                  <div className="font-cairo text-[15px] font-semibold text-white/90 mt-0.5">The Hunter Dashboard 🎯</div>
                  <div className="font-cairo text-xs text-white/35 mt-0.5">ATS + sourcing tool + HR suite — powerhouse OS for startups and B2B users</div>
                </div>
                <div className="px-5 py-4 flex flex-col gap-3.5">
                  {[
                    { title: "Applicant Tracking System (ATS)", accent: "text-emerald-400", items: ["Job Pipelines & Kanban Boards — track candidate flows","Candidate Profiles & Hired Trackers","Evaluation Queue — manage pending assessments"] },
                    { title: "Advanced Evaluation Engine", accent: "text-sky-400", items: ["Scenario 01 (Intake) — upload CVs and run initial AI analysis","Scenario 02 (Deep Assessment) — deep analytics, evaluation kanban, AI-driven actions"] },
                    { title: "Company Management", accent: "text-amber-400", items: ["Company Board & Profiles — internal + public-facing employer branding profile","Internal Feedback Loop — data and feedback before going to market"] },
                    { title: "Active Sourcing — Hunt & Accelerate", accent: "text-orange-400", items: ["Accelerate Handbook & Squad Viewer — verified talent pools","Referral Requests — request referrals from Alien Squad directly"] },
                    { title: "Global HR Operations — Onboard & Pay", accent: "text-violet-300", items: ["Add & Manage Contractors — integrated global view","Add & Manage Global Payments — financial portals"] },
                    { title: "Hunter AI Mode", accent: "text-emerald-400", items: ["B2B AI copilots: Company Mentor · Hunter Mentor · Market Intelligence"] },
                  ].map((group) => (
                    <div key={group.title}>
                      <div className={`font-mono text-[10px] ${group.accent} uppercase tracking-[0.1em] mb-1.5`}>{group.title}</div>
                      <BulletList accentColor={group.accent} items={group.items} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Infrastructure */}
              <div className="border border-amber-400/20 rounded-xl overflow-hidden">
                <div className="bg-amber-400/[0.06] px-5 py-3.5 border-b border-amber-400/10">
                  <div className="font-mono text-[11px] text-amber-400">03 · Infrastructure</div>
                  <div className="font-cairo text-[15px] font-semibold text-white/90 mt-0.5">Core Infrastructure & Onboarding 🏗️</div>
                </div>
                <div className="px-5 py-4">
                  <BulletList accentColor="text-amber-400" items={[
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
