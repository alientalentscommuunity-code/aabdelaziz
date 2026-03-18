import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubNav from "@/components/shared/SubNav";
import PlatformSection from "@/components/career/PlatformSection";
import { EXPERIENCE, METRICS, DOMAINS, GEOS, SUB_ROLES, EXPERTISE_SECTIONS } from "@/lib/data";

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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SubNav items={subs} active={sub} onSelect={setSub} />

          {sub === "intro" && (
            <div className="flex flex-col gap-8">
              {/* ── HERO BLOCK ── */}
              <div>
                <h1 className="font-cairo text-[32px] sm:text-[38px] font-bold text-white/90 leading-[1.15] mb-1">
                  Ahmad Abdelaziz
                </h1>
                <p className="font-cairo text-lg sm:text-xl text-white/70 font-semibold mb-1">
                  AI Product Manager | Founder & Entrepreneur in Residence
                </p>

                {/* Sub-role chips */}
                <div className="flex flex-wrap gap-2 mt-3 mb-3">
                  {SUB_ROLES.map((r) => (
                    <span key={r} className="font-mono text-[10px] text-violet-300 border border-violet-400/25 rounded-full px-2.5 py-[3px]">
                      {r}
                    </span>
                  ))}
                </div>

                {/* Sub-tagged headlines */}
                <p className="font-cairo text-sm text-white/50 leading-relaxed">
                  AI Product Manager | Community Growth | Entrepreneur In Residence
                </p>
                <p className="font-cairo text-sm text-white/35 italic leading-relaxed">
                  Learning by doing → Curious • Kind • Wild
                </p>

                {/* Contact row */}
                <div className="flex flex-wrap gap-2.5 mt-4">
                  {[
                    { label: "📧 ahmad@alientalents.com", href: "mailto:ahmad@alientalents.com" },
                    { label: "💼 LinkedIn", href: "https://www.linkedin.com/in/ahmad96abdelaziz/" },
                    { label: "🎥 YouTube", href: "https://www.youtube.com/@ALIENs.venture" },
                    { label: "📞 (+20) 1067156747", href: "tel:+201067156747" },
                  ].map((c) => (
                    <a key={c.label} href={c.href} target="_blank" rel="noreferrer"
                      className="font-mono text-[11px] text-white/45 border border-white/10 rounded-md px-3 py-[5px] hover:text-white/90 hover:border-white/30 transition-all">
                      {c.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* ── EXPERTISE SUMMARY MAP ── */}
              <div className="flex gap-6 flex-wrap py-4 border-t border-b border-white/[0.06]">
                <div>
                  <div className="font-mono text-[22px] font-bold text-white/90">+12</div>
                  <div className="font-mono text-[10px] text-white/[0.38] mt-0.5">Years of Experience</div>
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

              {/* ── EXPERTISE SECTIONS ── */}
              <div className="flex flex-col gap-6">
                {EXPERTISE_SECTIONS.map((sec, i) => (
                  <div key={i} className="bg-white/[0.025] border border-white/[0.07] rounded-lg p-5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{sec.icon}</span>
                      <h3 className="font-cairo text-[15px] font-semibold text-white/90">{sec.title}</h3>
                    </div>
                    <p className="font-mono text-[11px] text-white/[0.38] mb-3">{sec.subtitle}</p>

                    <div className="flex flex-col gap-1.5">
                      {sec.bullets.map((b, j) => (
                        <div key={j} className="flex gap-2 items-start">
                          <span className="text-violet-300 opacity-50 text-[11px] mt-[3px] shrink-0">→</span>
                          <span className="font-cairo text-[13px] text-white/[0.55] leading-[1.7]">{b}</span>
                        </div>
                      ))}
                    </div>

                    {sec.highlight && (
                      <p className="font-cairo text-[13px] text-amber-400 font-semibold mt-3">{sec.highlight}</p>
                    )}
                    {sec.stack && (
                      <p className="font-mono text-[10px] text-white/30 mt-2">{sec.stack}</p>
                    )}

                    {sec.extra && (
                      <div className="mt-4 pt-3 border-t border-white/[0.06]">
                        <p className="font-mono text-[11px] text-white/[0.38] mb-2">{sec.extra.subtitle}</p>
                        <div className="flex flex-col gap-1.5">
                          {sec.extra.bullets.map((b, j) => (
                            <div key={j} className="flex gap-2 items-start">
                              <span className="text-violet-300 opacity-50 text-[11px] mt-[3px] shrink-0">→</span>
                              <span className="font-cairo text-[13px] text-white/[0.55] leading-[1.7]">{b}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* 🔒 FULL CV VIEW — DO NOT EDIT */}
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
