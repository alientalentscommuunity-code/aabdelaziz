import React from "react";

const HumanConnection = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tighter text-white mb-3">
        Extrovert Introvert — <span className="text-emerald-400">The Communication</span>
      </h2>
      <p className="text-white/40 font-medium italic leading-relaxed">
        Context-dependent. In personal connection: introvert — driven by intuition, maturity, and matching level. In public & community: extrovert — active, sharing thoughts, building genuine connections.
      </p>
    </div>

    <div className="grid sm:grid-cols-2 gap-4">
      <div className="glass p-6 hover:border-emerald-400/40 transition-all duration-500">
        <h3 className="text-lg font-black italic uppercase tracking-tighter text-emerald-400 mb-3">Introvert Mode</h3>
        <p className="text-white/40 font-medium italic leading-relaxed text-sm">
          Depends on intuition, maturity, and matching level. Approaching or being approached — it's calibrated.
        </p>
      </div>
      <div className="glass p-6 hover:border-emerald-400/40 transition-all duration-500">
        <h3 className="text-lg font-black italic uppercase tracking-tighter text-emerald-400 mb-3">Extrovert Mode</h3>
        <p className="text-white/40 font-medium italic leading-relaxed text-sm">
          Active in community. Loves to communicate, share thoughts, build genuine connections — and yes, prospecting included 100%.
        </p>
      </div>
    </div>

    <div className="glass p-6 sm:p-8">
      <h3 className="text-xl font-black italic uppercase tracking-tighter text-white mb-4">The Connection</h3>
      <p className="text-white/40 font-medium italic leading-relaxed mb-3">
        Love to connect with like-minded people on different aspects.
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {["Genuine","Caring","Kind","Passionate","Loyal","Honest"].map((v) => (
          <span key={v} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold">{v}</span>
        ))}
      </div>
      <p className="text-white/25 text-sm font-medium italic">
        IRL & active communication are super important.
      </p>
    </div>

    <div className="glass p-6 hover:border-pink-400/30 transition-all duration-500">
      <p className="text-white/40 font-medium italic leading-relaxed">
        "Reformed and rebuilt by pain. In love with the adventure, direct and clear communication, meaningful talks, genuine human connection, challenges, and any kind of adventures."
      </p>
    </div>

    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-pink-400 mb-3">
        CURIOUS? ALIGNED? RESONATE WITH THE JOURNEY?
      </p>
      <div className="flex gap-3 flex-wrap">
        {[
          { label: "LinkedIn", href: "https://www.linkedin.com/in/ahmad96abdelaziz/" },
          { label: "YouTube / Podcast", href: "https://www.youtube.com/@ALIENs.venture" },
          { label: "Portfolio", href: "https://ahmad96.lovable.app/" },
        ].map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
            className="btn btn-outline text-pink-400 border-pink-400/30 hover:border-pink-400/60 hover:shadow-[0_0_15px_rgba(244,114,182,0.3)]">
            {l.label} →
          </a>
        ))}
      </div>
    </div>
  </div>
);

export default HumanConnection;
