import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const sectionStyle = "space-y-3 text-white/40 font-medium italic";
const bulletStyle = "flex items-start gap-2";
const subBulletStyle = "flex items-start gap-2 ml-4";
const headingStyle = "text-base font-bold text-green-500 mb-3 not-italic";
const subHeadingStyle = "text-sm font-bold text-orange-500 not-italic";

const AliensDeepDive = () => {
  return (
    <div className="mt-6 pt-6 border-t border-white/10">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="deep-dive" className="border-b-0">
          <AccordionTrigger className="text-lg font-bold text-white hover:no-underline py-3 [&>svg]:text-green-500">
            <span className="flex items-center gap-2">
              🛠️👽 Ecosystem & Feature Deep-Dive
            </span>
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="space-y-8">
              {/* Intro */}
              <p className="text-white/50 italic text-sm leading-relaxed">
                At the core of ALIENs Venture is <span className="text-green-500 font-bold not-italic">AALN</span> and{" "}
                <span className="text-green-500 font-bold not-italic">AALN OS</span>—an intelligent ecosystem that acts
                as an "AI Copilot" for authentic, curious, and kind humanity, seamlessly connecting global talents and
                hiring managers.
              </p>

              {/* 1. Core Technology */}
              <div>
                <h5 className={headingStyle}>1. The Core Technology Engine</h5>
                <p className="text-white/40 italic text-sm mb-4">
                  Instead of just matching resumes to job descriptions, the system evaluates human potential,
                  psychological readiness, and psychometric competencies.
                </p>

                <p className={subHeadingStyle + " mb-3"}>The Working Prototype Stack:</p>
                <div className="grid sm:grid-cols-2 gap-2 mb-4">
                  {[
                    { tool: "Lovable & Softr", desc: "Frontend interfaces & portals" },
                    { tool: "OpenAI", desc: "AI mentor, evaluation rubrics, AI Sr. Recruiter" },
                    { tool: "Airtable", desc: "Backend DB for talent, jobs & companies" },
                    { tool: "n8n & Make", desc: "Full workflow automation" },
                  ].map((s) => (
                    <div key={s.tool} className="glass-sm p-3 hover:border-green-500/50 transition-all">
                      <p className="text-xs font-bold text-green-500 not-italic">{s.tool}</p>
                      <p className="text-[11px] text-white/30 not-italic">{s.desc}</p>
                    </div>
                  ))}
                </div>

                <p className={subHeadingStyle + " mb-2"}>What the Engine Does Today:</p>
                <div className={sectionStyle}>
                  {[
                    "Autonomously collects, verifies, and analyzes jobs & companies.",
                    "Evaluates human talents before they even submit a resume.",
                    "Supports partners in employment, mental health, and financial growth.",
                    "Reaches and processes thousands of candidates across the MENA region.",
                  ].map((t) => (
                    <p key={t} className={bulletStyle}>
                      <span className="text-green-500 mt-1">•</span>
                      {t}
                    </p>
                  ))}
                </div>
              </div>

              {/* 2. B2C Features */}
              <div>
                <h5 className={headingStyle}>2. Features for Talents (B2C Engine)</h5>
                <p className="text-white/40 italic text-sm mb-4">
                  For emerging and multi-potential professionals — four phases:{" "}
                  <span className="text-green-500 font-bold">Learn, Earn, Survive, Thrive.</span>
                </p>
                <div className="space-y-4">
                  {[
                    {
                      phase: "🎓 Learn",
                      title: "Personal AI Tutor",
                      desc: "Shifts talents from passive consumption to a \"research & execution\" approach — guiding through learning techniques, career paths, and skill refinement.",
                    },
                    {
                      phase: "💰 Earn",
                      title: "Global Matching",
                      desc: "Connects users to verified USD-paying jobs, gigs, and paid learning opportunities. Apply or refer peers directly.",
                    },
                    {
                      phase: "🤝 Survive",
                      title: "AI-Matched P2P Mentorship",
                      desc: "Combats loneliness and isolation. AI matches talents with \"verified humanity\" — like-minded peers and mentors for emotional and professional support.",
                    },
                    {
                      phase: "🚀 Thrive",
                      title: "Roadmaps & Rituals",
                      desc: "Custom value creation tools, community rituals and meetups to foster growth, wellbeing, and financial stability.",
                    },
                  ].map((f) => (
                    <div key={f.phase} className="glass-sm p-4 hover:border-green-500/50 transition-all">
                      <p className="text-xs font-bold text-green-500 not-italic mb-1">{f.phase} — {f.title}</p>
                      <p className="text-[11px] text-white/40 not-italic">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. B2B Features */}
              <div>
                <h5 className={headingStyle}>3. Features for Hunters & Startups (B2B Engine)</h5>
                <p className="text-white/40 italic text-sm mb-4">
                  Replaces effort, time, and cost — an AI-powered Senior Recruiter executing global employment in
                  seconds, with up to <span className="text-green-500 font-bold">90% savings</span> in cost & time.
                </p>
                <div className="space-y-4">
                  {[
                    {
                      phase: "🎯 Hunt",
                      title: "Verified Sourcing",
                      desc: "Curated pool of referrals — top 1% psychometrically vetted talent. Evaluates humans comprehensively beyond standard CV parsing.",
                    },
                    {
                      phase: "⚡ Onboard",
                      title: "3-Click Hiring",
                      desc: "Frictionless onboarding. Secure a new hire within 3 clicks with total compliance regardless of location.",
                    },
                    {
                      phase: "💳 Pay",
                      title: "Seamless Transactions",
                      desc: "Pay remote employees and contractors in USD in mere seconds.",
                    },
                    {
                      phase: "🤖 Accelerate",
                      title: "AI Sr. Recruiter",
                      desc: "Write highly effective, value-based job descriptions. Boost hiring efficiency while accelerating employer branding worldwide.",
                    },
                  ].map((f) => (
                    <div key={f.phase} className="glass-sm p-4 hover:border-orange-500/50 transition-all">
                      <p className="text-xs font-bold text-orange-500 not-italic mb-1">{f.phase} — {f.title}</p>
                      <p className="text-[11px] text-white/40 not-italic">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. B2B/B2G Features */}
              <div>
                <h5 className={headingStyle}>4. Institutions & Ecosystem Partners (B2B / B2G)</h5>
                <p className="text-white/40 italic text-sm mb-3">
                  Extending technology to universities, academies, innovation hubs, and NGOs.
                </p>
                <div className={sectionStyle}>
                  {[
                    { label: "AALN Framework", desc: "Structured AI evaluation framework to measure human potential." },
                    { label: "Employability Insights", desc: "Dashboards for talent readiness and market demands." },
                    { label: "API Integrations", desc: "Plug the evaluation and matching engine into existing systems." },
                  ].map((item) => (
                    <p key={item.label} className={bulletStyle}>
                      <span className="text-green-500 mt-1">•</span>
                      <span>
                        <span className="text-white font-bold not-italic">{item.label}:</span> {item.desc}
                      </span>
                    </p>
                  ))}
                </div>
              </div>

              {/* 5. Evolution */}
              <div>
                <h5 className={headingStyle}>5. The Evolution: From V1 to Today</h5>
                <div className="glass-sm p-5 border-green-500/20">
                  <p className={subHeadingStyle + " mb-3"}>Phase 1 — The Lean Community Stack</p>
                  <p className="text-white/40 italic text-sm mb-3">
                    Before writing any code, features were validated using{" "}
                    <span className="text-white/60 not-italic">Notion, YouTube, Canva, and Google Meet</span>. This
                    manual, high-touch approach built:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2 mb-3">
                    {["Career Hub", "Job Board", "Human Evaluation System", "Hiring Referral Engine"].map((p) => (
                      <div key={p} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/5">
                        <span className="text-green-500 text-xs">✓</span>
                        <span className="text-xs text-white/50 not-italic font-medium">{p}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-white/30 italic">
                    All four pillars validated manually with{" "}
                    <span className="text-green-500 font-bold not-italic">$0 CAC</span>, ensuring that today's
                    automated AALN AI prototypes solve real, deeply-understood human problems.
                  </p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AliensDeepDive;
