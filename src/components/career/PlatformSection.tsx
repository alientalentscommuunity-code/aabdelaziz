import React, { useState } from "react";
import SubNav from "@/components/shared/SubNav";
import BulletList from "@/components/shared/BulletList";
import { PLATFORM } from "@/lib/data";

const PhaseCard = ({ item }: { item: { phase: string; accent: string; label: string; desc: string } }) => (
  <div className="bg-white/[0.025] rounded-lg p-3.5" style={{ border: `0.5px solid ${item.accent}33` }}>
    <div className="flex items-center gap-2 mb-2">
      <span className="font-mono text-[10px] font-bold rounded-full px-2.5 py-[2px]"
        style={{ color: item.accent, background: `${item.accent}1F` }}>
        {item.phase}
      </span>
      <span className="font-cairo text-[13px] font-semibold text-white/90">{item.label}</span>
    </div>
    <p className="font-cairo text-xs text-white/45 leading-[1.65]">{item.desc}</p>
  </div>
);

const PlatformSection = () => {
  const [sub, setSub] = useState("overview");
  const subs = ["overview", "b2c", "b2b", "institutions", "evolution"];

  return (
    <div>
      <div className="mb-5">
        <div className="font-mono text-[10px] text-amber-400 tracking-[0.2em] uppercase mb-1.5">AALN OS · AI Copilot</div>
        <p className="font-cairo text-[13px] text-white/40 leading-[1.7]">
          Intelligent ecosystem connecting global talents and hiring managers — evaluating human potential, psychological readiness, and psychometric competencies. Not just resume-to-job matching.
        </p>
      </div>

      <SubNav items={subs} active={sub} onSelect={setSub} />

      {sub === "overview" && (
        <div className="flex flex-col gap-4">
          <div>
            <div className="font-mono text-[10px] text-white/[0.38] uppercase tracking-[0.12em] mb-2.5">Working Prototype Stack</div>
            <div className="grid sm:grid-cols-2 gap-2">
              {PLATFORM.stack.map((s) => (
                <div key={s.name} className="bg-white/[0.025] border border-white/[0.07] rounded-lg p-3">
                  <div className="font-mono text-[11px] text-amber-400 mb-1">{s.name}</div>
                  <div className="font-cairo text-xs text-white/40 leading-[1.5]">{s.role}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="font-mono text-[10px] text-white/[0.38] uppercase tracking-[0.12em] mb-2.5">What the Engine Does Today</div>
            <div className="flex flex-col gap-1.5">
              {PLATFORM.engineDoes.map((item) => (
                <div key={item} className="flex gap-2 items-start">
                  <span className="text-amber-400 opacity-50 text-[11px] mt-[3px] shrink-0">→</span>
                  <span className="font-cairo text-[13px] text-white/55 leading-[1.65]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {sub === "b2c" && (
        <div className="flex flex-col gap-2.5">
          {PLATFORM.b2c.map((item) => <PhaseCard key={item.phase} item={item} />)}
        </div>
      )}

      {sub === "b2b" && (
        <div className="flex flex-col gap-2.5">
          {PLATFORM.b2b.map((item) => <PhaseCard key={item.phase} item={item} />)}
        </div>
      )}

      {sub === "institutions" && (
        <div className="flex flex-col gap-2.5">
          {PLATFORM.institutions.map((item) => (
            <div key={item.name} className="bg-white/[0.025] border border-white/[0.07] rounded-lg p-3.5">
              <div className="font-mono text-[11px] text-sky-400 mb-1">{item.name}</div>
              <p className="font-cairo text-xs text-white/45 leading-[1.65]">{item.desc}</p>
            </div>
          ))}
        </div>
      )}

      {sub === "evolution" && (
        <div className="flex flex-col gap-2.5">
          {PLATFORM.evolution.map((item, i) => (
            <div key={i} className={`border-l-2 pl-4 pb-2 ${i === 0 ? "border-white/10" : "border-amber-400"}`}>
              <div className={`font-mono text-[11px] mb-1.5 ${i === 0 ? "text-white/40" : "text-amber-400"}`}>{item.phase}</div>
              <p className="font-cairo text-[13px] text-white/50 leading-[1.65]">{item.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlatformSection;
