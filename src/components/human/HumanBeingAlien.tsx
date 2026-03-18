import React from "react";

const HumanBeingAlien = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tighter text-white mb-3">
        What does it mean to be <span className="text-violet-300">ALIEN</span>?
      </h2>
      <p className="text-white/40 font-medium italic leading-relaxed">
        Being ALIEN is about being a human with superpowers.<br />
        Superpowers articulated in 2 main categories: <strong className="text-white/90 not-italic">Knowledge</strong> & <strong className="text-white/90 not-italic">Humanity</strong>.
      </p>
    </div>

    <div className="grid sm:grid-cols-2 gap-4">
      <div className="glass p-6 hover:border-violet-300/40 transition-all duration-500">
        <h3 className="text-lg font-black italic uppercase tracking-tighter text-violet-300 mb-3">Knowledge</h3>
        <p className="text-white/40 font-medium italic leading-relaxed text-sm">
          Power through noticing, analyzing, and learning. An ongoing adventure to uplevel awareness and understanding — driven by interest and curiosity.
        </p>
      </div>
      <div className="glass p-6 hover:border-pink-400/40 transition-all duration-500">
        <h3 className="text-lg font-black italic uppercase tracking-tighter text-pink-400 mb-3">Humanity</h3>
        <p className="text-white/40 font-medium italic leading-relaxed text-sm">
          Our being — mental, emotional, physical. Our personal handbook of thoughts, standards, and values. Knowledge is what we perceive. Humanity is how we communicate it.
        </p>
      </div>
    </div>

    <div className="glass p-6">
      <p className="text-white/40 font-medium italic leading-relaxed">
        "Life is tough. We are vulnerable to changes. It's up to you how these changes affect you and your defaults. It's about your desire to demystify your significant potential."
      </p>
    </div>

    <div className="glass p-6 sm:p-8 hover:border-primary/30 transition-all duration-500">
      <h3 className="text-xl font-black italic uppercase tracking-tighter text-white mb-2">Brief Story</h3>
      <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-4">Self-learner · Intrapreneur · Multipotential</p>
      <p className="text-white/40 font-medium italic leading-relaxed text-sm">
        Started an independent self-learning adventure in August 2013 around Entrepreneurship, Business Development, and Digital Marketing.
        Now over 10 years of cross-functional experience — led by an entrepreneurial spirit, backed by real experience in 2 tech startup business models (Education · Wellbeing).
      </p>
    </div>

    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-3">Values</p>
      <div className="flex flex-wrap gap-2">
        {["Humanity","Empathy","Transparency","Adaptability","Accountability"].map((v) => (
          <span key={v} className="px-3 py-1 bg-violet-300/10 text-violet-300 rounded-full text-xs font-bold">{v}</span>
        ))}
      </div>
    </div>

    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-3">Inspirations</p>
      <div className="flex flex-wrap gap-2">
        {["ALIENs","Adventures","Challenges","Curiosity"].map((v) => (
          <span key={v} className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-bold">{v}</span>
        ))}
      </div>
    </div>
  </div>
);

export default HumanBeingAlien;
