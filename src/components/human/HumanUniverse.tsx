import React from "react";

const HumanUniverse = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tighter text-white mb-3">
        In Love with the <span className="text-primary">Adventure</span>
      </h2>
      <p className="text-white/40 font-medium italic leading-relaxed">
        24/7 active and super hungry to learn · develop · discover · explore every aspect of life.<br />
        Through discussions, sharing thoughts, perspectives, and experiences about everything.
      </p>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {[
        { topic: "Mental & Emotional Wellbeing", color: "text-pink-400", borderColor: "hover:border-pink-400/40" },
        { topic: "Relationships", color: "text-violet-300", borderColor: "hover:border-violet-300/40" },
        { topic: "Personal & Career Growth", color: "text-emerald-400", borderColor: "hover:border-emerald-400/40" },
        { topic: "Art & Architecture", color: "text-secondary", borderColor: "hover:border-secondary/40" },
        { topic: "Technology & Systems", color: "text-sky-400", borderColor: "hover:border-sky-400/40" },
        { topic: "Human Minds", color: "text-orange-400", borderColor: "hover:border-orange-400/40" },
      ].map((t) => (
        <div key={t.topic} className={`glass p-4 ${t.borderColor} transition-all duration-500`}>
          <div className={`text-sm font-bold ${t.color}`}>{t.topic}</div>
        </div>
      ))}
    </div>

    <div className="glass p-6 sm:p-8">
      <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-4">To</p>
      <div className="space-y-2.5 text-white/40 font-medium italic">
        {[
          "Inspire and get inspired by each other's Humanity.",
          "Support and guide each other to reach our potential even more.",
          "Always watching myself and learning how to become BETTER — for me, my people, and the whole universe.",
        ].map((line, i) => (
          <p key={i} className="flex items-start gap-2">
            <span className="text-violet-300 mt-1">•</span>
            {line}
          </p>
        ))}
      </div>
    </div>

    <div className="border-t border-white/10 pt-6">
      <p className="text-white/20 text-sm font-medium italic">
        🇵🇸 Stand for Humanity · My people · Palestine 𓂆
      </p>
    </div>
  </div>
);

export default HumanUniverse;
