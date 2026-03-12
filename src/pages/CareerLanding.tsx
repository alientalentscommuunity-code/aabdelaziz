import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubNav from "@/components/shared/SubNav";
import PlatformSection from "@/components/career/PlatformSection";
import { EXPERIENCE, METRICS, DOMAINS, GEOS } from "@/lib/data";

const CareerLanding = () => {
  const [sub, setSub] = useState("intro");
  const [cvOpen, setCvOpen] = useState(false);
  const subs = ["intro", "platform", "experience", "education"];

  useEffect(() => {
    document.title = "Career Side — Ahmad Abdelaziz";
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="max-w-[780px] mx-auto px-6">
          <SubNav items={subs} active={sub} onSelect={setSub} />

          {sub === "intro" && (
            <div className="flex flex-col gap-7">
              {/* Hero */}
              <div>
                <div className="font-mono text-[10px] text-white/[0.38] tracking-[0.2em] uppercase mb-2.5">Ahmad Abdelaziz</div>
                <h2 className="font-cairo text-[28px] font-bold text-white/90 leading-[1.2] mb-2">
                  AI-enabled Product Manager<br />
                  <span className="text-white/40 font-normal text-xl">Community-Led Growth · Entrepreneur in Residence</span>
                </h2>

                {/* Contacts */}
                <div className="flex flex-wrap gap-3 mt-4">
                  {[
                    { label: "ahmad@alientalents.com", href: "mailto:ahmad@alientalents.com" },
                    { label: "LinkedIn", href: "https://www.linkedin.com/in/ahmad96abdelaziz/" },
                    { label: "Portfolio", href: "https://ahmad96.lovable.app/" },
                    { label: "YouTube", href: "https://www.youtube.com/@ALIENs.venture" },
                    { label: "(20) 106 715 6747", href: "tel:+201067156747" },
                  ].map((c) => (
                    <a key={c.label} href={c.href} target="_blank" rel="noreferrer"
                      className="font-mono text-[11px] text-white/45 border border-white/10 rounded-md px-3 py-[5px] hover:text-white/90 hover:border-white/30 transition-all">
                      {c.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Experience strip */}
              <div className="flex gap-6 flex-wrap py-4 border-t border-b border-white/[0.06]">
                <div>
                  <div className="font-mono text-[22px] font-bold text-white/90">12</div>
                  <div className="font-mono text-[10px] text-white/[0.38] mt-0.5">Years of experience</div>
                </div>
                <div className="w-px bg-white/[0.08]" />
                <div>
                  <div className="font-mono text-[11px] text-white/50 mb-1.5">Domains</div>
                  <div className="flex flex-wrap gap-1.5">
                    {DOMAINS.map((d) => (
                      <span key={d} className="font-mono text-[10px] text-amber-400 border border-amber-400/30 rounded-full px-2 py-[2px]">{d}</span>
                    ))}
                  </div>
                </div>
                <div className="w-px bg-white/[0.08]" />
                <div>
                  <div className="font-mono text-[11px] text-white/50 mb-1.5">Markets</div>
                  <div className="flex flex-wrap gap-1.5">
                    {GEOS.map((g) => (
                      <span key={g} className="font-mono text-[10px] text-sky-400 border border-sky-400/30 rounded-full px-2 py-[2px]">{g}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div>
                <div className="font-mono text-[10px] text-white/[0.38] tracking-[0.15em] uppercase mb-3">Summary</div>
                <div className="flex flex-col gap-2">
                  {[
                    "1+ year prototyping with LLMs & vibe coding — building AI copilots for global talent & hiring managers.",
                    "Shipped Jobs & Companies boards, Talent Marketplace, Mini ATS, and 2+ in-progress MVPs.",
                    "30K+ visits · 3K+ applies · 500 signups · $2K+ monetized · Winner @ Cairo AI Hackathon by Athar Accelerator.",
                    "2 closed-won partnerships (nsave.co + Athar Accelerator) · $5K inbound MRR pipeline.",
                  ].map((line, i) => (
                    <div key={i} className="flex gap-2.5 items-start">
                      <span className="text-violet-300 opacity-50 text-xs mt-[3px] shrink-0">→</span>
                      <span className="font-cairo text-sm text-white/60 leading-[1.7]">{line}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2.5">
                {METRICS.map((m) => (
                  <div key={m.label} className="bg-white/[0.025] border border-white/[0.07] rounded-lg p-3.5">
                    <div className="font-mono text-xl font-bold text-white/90">{m.value}</div>
                    <div className="font-mono text-[10px] text-white/[0.38] mt-1 leading-[1.4]">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA — view full CV toggle */}
              <div>
                <button onClick={() => setCvOpen(o => !o)}
                  className={`font-mono text-xs border border-white/15 rounded-lg px-5 py-2.5 flex items-center gap-2 transition-all ${
                    cvOpen ? "text-white/90 bg-white/[0.06]" : "text-white/50 bg-transparent"
                  }`}>
                  <span className={`inline-block transition-transform duration-300 ${cvOpen ? "rotate-45" : ""}`}>+</span>
                  {cvOpen ? "Collapse full CV" : "View full CV"}
                </button>

                {cvOpen && (
                  <div className="mt-5">
                    {EXPERIENCE.map((exp, i) => (
                      <div key={i} className="border-l border-white/[0.08] pl-5 mb-7">
                        <div className="flex justify-between items-start flex-wrap gap-1 mb-2.5">
                          <span className="font-cairo text-sm font-semibold text-white/90">{exp.company}</span>
                          <span className="font-mono text-[10px] text-white/[0.38]">{exp.period}</span>
                        </div>
                        {exp.roles.map((role, j) => (
                          <div key={j} className="mb-3">
                            {role.title && <div className="font-mono text-[11px] text-violet-300 mb-1.5">{role.title}</div>}
                            {role.bullets.map((b, k) => (
                              <div key={k} className="flex gap-2 items-start mb-1">
                                <span className="text-white/[0.38] text-[10px] mt-1 shrink-0">–</span>
                                <span className="font-cairo text-[13px] text-white/50 leading-[1.6]">{b}</span>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {sub === "platform" && <PlatformSection />}

          {sub === "experience" && (
            <div className="flex flex-col gap-6">
              {EXPERIENCE.map((exp, i) => (
                <div key={i} className="border-l border-white/[0.08] pl-5">
                  <div className="flex justify-between flex-wrap gap-1 mb-2.5">
                    <span className="font-cairo text-[15px] font-semibold text-white/90">{exp.company}</span>
                    <span className="font-mono text-[10px] text-white/[0.38]">{exp.period}</span>
                  </div>
                  {exp.roles.map((role, j) => (
                    <div key={j} className="mb-3.5">
                      {role.title && <div className="font-mono text-[11px] text-violet-300 mb-2">{role.title}</div>}
                      {role.bullets.map((b, k) => (
                        <div key={k} className="flex gap-2 items-start mb-1.5">
                          <span className="text-white/[0.38] text-[10px] mt-1 shrink-0">–</span>
                          <span className="font-cairo text-[13px] text-white/[0.52] leading-[1.65]">{b}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {sub === "education" && (
            <div className="flex flex-col gap-4">
              {[
                { title: "Autodidact — Self-learner", period: "2014 – Now", detail: "RVE approach: Research → Validate → Execute · Entrepreneurship · Sales & BD · Product Management" },
                { title: "Faculty of Commerce — Beni Suef University", period: "2016 – 2019", detail: "Dropped out" },
                { title: "High School Diploma", period: "2011 – 2016", detail: "" },
              ].map((e) => (
                <div key={e.title} className="bg-white/[0.025] border border-white/[0.07] rounded-lg p-4">
                  <div className="flex justify-between flex-wrap gap-1">
                    <span className="font-cairo text-sm font-semibold text-white/90">{e.title}</span>
                    <span className="font-mono text-[10px] text-white/[0.38]">{e.period}</span>
                  </div>
                  {e.detail && <div className="font-cairo text-[13px] text-white/40 mt-1.5 leading-[1.6]">{e.detail}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CareerLanding;
