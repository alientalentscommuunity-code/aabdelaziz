import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEGMENTS } from "@/lib/data";

const DimCard = ({ dim }: { dim: { label: string; color: string; items: string[] } }) => (
  <div className="glass p-5 hover:border-white/20 transition-all duration-500">
    <div className="font-mono text-[10px] uppercase tracking-[0.1em] font-bold mb-3" style={{ color: dim.color }}>{dim.label}</div>
    <div className="space-y-2">
      {dim.items.map((item) => (
        <div key={item} className="flex gap-2 items-start">
          <span className="opacity-60 text-sm mt-0.5 shrink-0" style={{ color: dim.color }}>•</span>
          <span className="text-white/40 font-medium italic text-sm leading-relaxed">{item}</span>
        </div>
      ))}
    </div>
  </div>
);

const Partners = () => {
  const [active, setActive] = useState("01");
  const seg = SEGMENTS.find((s) => s.id === active)!;

  useEffect(() => {
    document.title = "Work With Me — Ahmad Abdelaziz";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="section-container !py-0">
          {/* Sub-nav: segment pills */}
          <div className="flex gap-1.5 flex-wrap mb-10 glass px-3 py-2.5 w-fit max-w-full">
            {SEGMENTS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`font-mono text-[10px] font-bold uppercase tracking-widest rounded-full px-4 py-2 transition-all duration-200 whitespace-nowrap border ${
                  active === s.id
                    ? "border-current bg-current/10"
                    : "bg-transparent text-white/30 border-transparent hover:text-white/60 hover:bg-white/[0.03]"
                }`}
                style={active === s.id ? { color: seg.accentHex } : {}}
              >
                {s.id} {s.title.split(" ").slice(0, 2).join(" ")}
              </button>
            ))}
          </div>

          {/* Segment content */}
          <div className="glass overflow-hidden hover:border-white/20 transition-all duration-500" style={{ borderColor: `${seg.accentHex}33` }}>
            <div className="px-6 sm:px-8 py-5 border-b border-white/10">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[11px] font-bold rounded-full px-3 py-[3px]"
                  style={{ color: seg.accentHex, background: `${seg.accentHex}1F`, border: `1px solid ${seg.accentHex}40` }}>
                  {seg.id}
                </span>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black italic uppercase tracking-tighter text-white">{seg.title}</h2>
                  <p className="text-white/30 text-sm font-medium italic mt-0.5">{seg.sub}</p>
                </div>
              </div>
            </div>
            <div className="px-6 sm:px-8 py-6 space-y-5">
              <div className="flex flex-wrap gap-2">
                {seg.tags.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{ color: seg.accentHex, background: `${seg.accentHex}1A`, border: `1px solid ${seg.accentHex}40` }}>
                    {t}
                  </span>
                ))}
              </div>
              {seg.industries && (
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-3">Industries</p>
                  <div className="flex flex-wrap gap-2">
                    {seg.industries.map((t) => (
                      <span key={t} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold">{t}</span>
                    ))}
                  </div>
                </div>
              )}
              {seg.dims && (
                <>
                  <div className="border-t border-white/10" />
                  <div className={`grid gap-4 ${seg.dims.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
                    {seg.dims.map((d) => <DimCard key={d.label} dim={d} />)}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Partners;
