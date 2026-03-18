import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEGMENTS } from "@/lib/data";

const DimCard = ({ dim }: { dim: { label: string; color: string; items: string[] } }) => (
  <div className="bg-white/[0.025] border border-white/[0.07] rounded-lg p-3.5">
    <div className="font-mono text-[10px] uppercase tracking-[0.1em] font-bold mb-2" style={{ color: dim.color }}>{dim.label}</div>
    {dim.items.map((item) => (
      <div key={item} className="flex gap-2 items-start mb-1.5">
        <span className="opacity-40 text-[11px] mt-[1px] shrink-0" style={{ color: dim.color }}>–</span>
        <span className="font-cairo text-xs text-white/50 leading-[1.5]">{item}</span>
      </div>
    ))}
  </div>
);

const Partners = () => {
  const [active, setActive] = useState("01");
  const seg = SEGMENTS.find((s) => s.id === active)!;

  useEffect(() => {
    document.title = "Work With Me — Ahmad Abdelaziz";
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="max-w-[780px] mx-auto px-6">
          {/* Sub-nav: segment pills */}
          <div className="flex gap-1.5 flex-wrap mb-8">
            {SEGMENTS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`font-mono text-[11px] rounded-full px-3.5 py-1.5 transition-all duration-200 whitespace-nowrap border ${
                  active === s.id
                    ? "bg-white/[0.08] text-white/90 border-white/[0.18]"
                    : "bg-transparent text-white/35 border-transparent hover:text-white/60"
                }`}
                style={active === s.id ? { color: seg.accentHex, background: `${seg.accentHex}1A`, borderColor: `${seg.accentHex}59` } : {}}
              >
                {s.id} {s.title.split(" ").slice(0, 2).join(" ")}
              </button>
            ))}
          </div>

          {/* Segment content */}
          <div className="rounded-xl overflow-hidden" style={{ border: `0.5px solid ${seg.accentHex}33`, background: `${seg.accentHex}0A` }}>
            <div className="px-5 py-4" style={{ borderBottom: `0.5px solid ${seg.accentHex}1F` }}>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] font-bold rounded-full px-3 py-[3px]"
                  style={{ color: seg.accentHex, background: `${seg.accentHex}1F`, border: `0.5px solid ${seg.accentHex}40` }}>
                  {seg.id}
                </span>
                <div>
                  <div className="font-cairo text-[15px] font-semibold text-white/90">{seg.title}</div>
                  <div className="font-cairo text-xs text-white/[0.38] mt-0.5">{seg.sub}</div>
                </div>
              </div>
            </div>
            <div className="px-5 py-4 flex flex-col gap-3.5">
              <div className="flex flex-wrap gap-2">
                {seg.tags.map((t) => (
                  <span key={t} className="font-mono text-[11px] rounded-full px-2.5 py-[3px] opacity-85"
                    style={{ color: seg.accentHex, border: `0.5px solid ${seg.accentHex}`, whiteSpace: "nowrap" }}>
                    {t}
                  </span>
                ))}
              </div>
              {seg.industries && (
                <div>
                  <div className="font-mono text-[10px] text-white/[0.38] uppercase tracking-[0.1em] mb-2">Industries</div>
                  <div className="flex flex-wrap gap-2">
                    {seg.industries.map((t) => (
                      <span key={t} className="font-cairo text-xs text-white/45 bg-white/[0.04] border border-white/[0.08] rounded-md px-2.5 py-1">{t}</span>
                    ))}
                  </div>
                </div>
              )}
              {seg.dims && (
                <>
                  <div className="border-t border-white/[0.06]" />
                  <div className={`grid gap-2.5 ${seg.dims.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
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
