import React, { useEffect } from "react";
import CareerLayout from "@/components/career/CareerLayout";
import DimLabel from "@/components/career/DimLabel";
import { ExternalLink } from "lucide-react";

const playfair = { fontFamily: "'Playfair Display', serif" };
const dmSans = { fontFamily: "'DM Sans', sans-serif" };
const spaceMono = { fontFamily: "'Space Mono', monospace" };
const cairo = { fontFamily: "'Cairo', sans-serif" };

const aliensPlatformUrl = "https://dev-site-craftsman.lovable.app";

/* ── Segment Component ── */
interface SegmentProps {
  num: string;
  label: string;
  accent: string;
  title: string;
  subtitle?: string;
  tags: string[];
  children: React.ReactNode;
  ctaLabel: string;
}

const Segment = ({ num, label, accent, title, subtitle, tags, children, ctaLabel }: SegmentProps) => (
  <section className="py-12 border-t border-white/5">
    {/* Header pill */}
    <span
      className="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-4"
      style={{ ...spaceMono, background: `${accent}33`, color: accent }}
    >
      {num} — {label}
    </span>
    <h3 className="text-2xl sm:text-[32px] font-bold mb-1" style={{ ...cairo, color: accent }}>{title}</h3>
    {subtitle && <p className="text-sm text-white/40 mb-4" style={spaceMono}>{subtitle}</p>}

    {/* Tags */}
    <div className="flex flex-wrap gap-2 mb-6">
      {tags.map((t) => (
        <span
          key={t}
          className="px-3 py-1 rounded-[20px] text-[11px]"
          style={{ ...spaceMono, border: `0.5px solid ${accent}`, color: accent }}
        >
          {t}
        </span>
      ))}
    </div>

    {children}

    <a
      href={aliensPlatformUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full text-sm font-bold transition-colors"
      style={{ background: accent, color: "#0d0d0d" }}
    >
      {ctaLabel} <ExternalLink size={14} />
    </a>
  </section>
);

/* ── Bullet list helper ── */
const DotList = ({ items, accent }: { items: string[]; accent: string }) => (
  <ul className="space-y-2">
    {items.map((item) => (
      <li key={item} className="flex items-start gap-2.5 text-sm text-white/50" style={dmSans}>
        <span className="mt-1.5 w-2 h-2 rounded-full shrink-0" style={{ background: accent }} />
        {item}
      </li>
    ))}
  </ul>
);

/* ── Column grid helper ── */
const ColumnGrid = ({ columns, accent }: { columns: { label: string; items: string[] }[]; accent: string }) => (
  <div className={`grid gap-6 ${columns.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
    {columns.map((col) => (
      <div key={col.label}>
        <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ ...spaceMono, color: accent }}>
          {col.label}
        </p>
        <ul className="space-y-1.5">
          {col.items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-xs text-white/40" style={dmSans}>
              <span className="mt-1 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: accent }} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

const CareerICP = () => {
  useEffect(() => {
    document.title = "ICP & Partners — Ahmad Abdelaziz";
    if (window.location.hash) {
      setTimeout(() => {
        document.querySelector(window.location.hash)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);

  return (
    <CareerLayout>
      {/* ═══ LAYER 1 — Personal ICP ═══ */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 py-16">
        <h1 className="text-3xl sm:text-5xl font-black text-white mb-2" style={playfair}>Who I Work With</h1>
        <p className="text-white/40 italic mb-12" style={dmSans}>If this is you — we should talk.</p>

        {/* Human Side */}
        <section id="human" className="mb-16">
          <DimLabel>THE HUMAN SIDE</DimLabel>
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3" style={playfair}>People first. Always.</h2>
          <p className="text-sm text-white/40 mb-4 max-w-2xl" style={dmSans}>
            I work with early-career talents finding their path, humans building something meaningful, and anyone who values genuine collaboration over transactional work.
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {["Curious", "Self-learner", "Builder", "Early-career", "Career-switcher", "Ambitious"].map((t) => (
              <span key={t} className="px-3 py-1 rounded-full border border-[#4A9EFF]/30 text-[#4A9EFF] text-xs font-bold">{t}</span>
            ))}
          </div>
          <a href="https://www.linkedin.com/in/ahmad96abdelaziz/" target="_blank" rel="noopener noreferrer" className="text-[#4A9EFF] text-sm font-medium hover:underline">
            Let's connect →
          </a>
        </section>

        {/* Tech Side */}
        <section id="tech" className="mb-16">
          <DimLabel>THE TECH SIDE</DimLabel>
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-6" style={playfair}>Where I play best.</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: "🎯", title: "Talents", body: "Early-career & mid-level talents navigating global opportunities." },
              { icon: "🚀", title: "Entrepreneurs", body: "Founders building 0→1. GTM, product thinking, community-led growth." },
              { icon: "💼", title: "VCs & Investors", body: "Deal flow support, talent sourcing, ecosystem insights." },
              { icon: "⚡", title: "Startups", body: "Remote hiring strategy, GTM ops for early-stage teams." },
            ].map((c) => (
              <div key={c.title} className="rounded-xl border border-white/10 bg-white/[0.02] p-6 hover:border-[#4A9EFF]/40 transition-all">
                <span className="text-2xl mb-2 block">{c.icon}</span>
                <h3 className="text-lg font-bold text-white mb-1" style={playfair}>{c.title}</h3>
                <p className="text-sm text-white/40 mb-3" style={dmSans}>{c.body}</p>
                <span className="text-[#4A9EFF] text-sm font-medium">Work together →</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ═══ LAYER 2 — ALIENs Venture ICP ═══ */}
      <div id="aliens" className="bg-[#0d0d0d]">
        {/* Separator */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/20" style={spaceMono}>ALIENS VENTURE — ICP & PARTNERS</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 pb-20">
          <DimLabel>ALIENS VENTURE</DimLabel>
          <h2 className="text-3xl sm:text-[40px] font-bold text-white mb-1" style={cairo}>Who the Platform Serves</h2>
          <p className="text-sm text-white/40 mb-8" style={spaceMono}>Five segments. Five missions. One universe.</p>

          {/* Segment 01 */}
          <Segment num="01" label="TALENTS & JOB SEEKERS" accent="#AFA9EC" title="Career development + remote job landing" tags={["CV Review & Positioning", "Interview Prep", "Remote Job Landing", "Coffee Chats", "Career Mentorship"]} ctaLabel="I'm a Talent →">
            <DotList accent="#AFA9EC" items={["CV review & positioning", "Interview prep", "Landing remote jobs", "Coffee chats", "Career development mentorship"]} />
          </Segment>

          {/* Segment 02 */}
          <Segment num="02" label="HIRING MANAGERS & HUNTERS" accent="#5DCAA5" title="End-to-end employment operations" tags={["Talent Sourcing", "Screening & Evaluation", "Hiring Workflow Ops", "Employer Branding", "Community Pipelines"]} ctaLabel="I'm a Hunter →">
            <DotList accent="#5DCAA5" items={["Talent sourcing", "Screening & evaluation", "Hiring workflow ops", "Employer branding support", "Community-matched pipelines"]} />
          </Segment>

          {/* Segment 03 */}
          <Segment num="03" label="EARLY-STAGE STARTUPS" accent="#EF9F27" title="Idea → Prototype → MVP" subtitle="From talks to hands-on." tags={["Idea", "Prototype", "MVP"]} ctaLabel="I'm a Startup Founder →">
            <div className="flex flex-wrap gap-2 mb-4">
              {["Education", "Employment", "Agriculture", "Furniture", "Healthcare", "Wellbeing"].map((t) => (
                <span key={t} className="px-2 py-0.5 rounded-[20px] text-[10px]" style={{ ...spaceMono, border: "0.5px solid #EF9F27", color: "#EF9F27" }}>
                  {t}
                </span>
              ))}
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4" style={spaceMono}>MENTORING DIMENSIONS</p>
            <ColumnGrid accent="#EF9F27" columns={[
              { label: "BUSINESS", items: ["Ideation & problem framing", "Business model canvas", "Lean strategy", "Customer discovery", "Revenue & pricing models", "Go-to-market strategy", "Partnerships & distribution"] },
              { label: "TECH", items: ["Prototyping approach", "MVP scoping & prioritization", "Tech stack decisions", "No-code / low-code first", "Product-market fit testing", "Iteration loops", "Tool & infra selection"] },
              { label: "HUMAN", items: ["Navigate uncertainty as an entrepreneur", "Resilience & consistency", "Authenticity as a founder", "Leadership & team building", "Communication & storytelling", "Mental fitness", "Founder identity & purpose"] },
            ]} />
          </Segment>

          {/* Segment 04 */}
          <Segment num="04" label="VCs & ACCELERATORS" accent="#F0997B" title="Portfolio talent · Founder evaluation · Community-backed deal flow" tags={["Egypt & MENA", "EMEA", "Remote-first portfolios", "Early-stage funds", "Accelerator programs"]} ctaLabel="I'm a VC / Accelerator →">
            <ColumnGrid accent="#F0997B" columns={[
              { label: "DEAL FLOW & SOURCING", items: ["Community-sourced founder pipelines", "Structured founder evaluation (AALN framework)", "Startup screening & scoring", "Warm intros from trusted network", "Sector-specific talent mapping"] },
              { label: "PORTFOLIO SUPPORT", items: ["Talent hiring for portfolio companies", "Fractional mentor matching", "Founder coaching & accountability", "Go-to-market & growth guidance", "Community access for portfolio teams"] },
            ]} />
          </Segment>

          {/* Segment 05 */}
          <Segment num="05" label="EDUCATIONAL BUSINESSES" accent="#85B7EB" title="Skills-to-employment · AI-powered learning · Egypt & MENA market" tags={["Bootcamps", "EdTech platforms", "Training providers", "Universities & institutes", "Corporate L&D"]} ctaLabel="I'm an Education Provider →">
            <ColumnGrid accent="#85B7EB" columns={[
              { label: "PROGRAM DESIGN", items: ["Curriculum built around remote work readiness", "Skills-to-jobs pathway design", "AI integration in learning flows", "RVE methodology: Research → Validate → Execute", "Assessment & evaluation frameworks"] },
              { label: "OUTCOMES & PLACEMENT", items: ["Employment-linked graduation tracks", "Community hiring pipeline for graduates", "Employer partnerships & placement ops", "Learner community & alumni network", "Impact tracking: hired, promoted, freelancing"] },
            ]} />
          </Segment>
        </div>
      </div>
    </CareerLayout>
  );
};

export default CareerICP;
