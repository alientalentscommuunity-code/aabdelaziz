import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubNav from "@/components/shared/SubNav";

const HumanSide = () => {
  const [sub, setSub] = useState("intro");
  const subs = ["intro", "being alien", "connection", "universe"];

  useEffect(() => {
    document.title = "Human Side — Ahmad Abdelaziz";
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="max-w-[780px] mx-auto px-6">
          <SubNav items={subs} active={sub} onSelect={setSub} />

          {sub === "intro" && (
            <div className="flex flex-col gap-6">
              {/* Punchy hero */}
              <div className="border-l-2 border-pink-400 pl-5">
                <div className="font-mono text-[10px] text-pink-400 tracking-[0.2em] uppercase mb-2.5">Hey, curious stalker</div>
                <h2 className="font-cairo text-[26px] font-bold text-white/90 leading-[1.3] mb-1">I'm Ahmad • Human being.</h2>
                <p className="font-cairo text-sm text-white/40 leading-[1.7]">
                  Doing Product Management · Community Growth<br />
                  Shipped AI Sr. Recruiter w/ psychometrics (MVP)<br />
                  $2K ROI · Partnerships · AI Hackathon Winner
                </p>
              </div>

              {/* Handbook quote */}
              <div className="bg-pink-400/5 border border-pink-400/15 rounded-lg p-4">
                <div className="font-mono text-[10px] text-pink-400 tracking-[0.15em] uppercase mb-2.5">My ALIEN-Style Handbook</div>
                <div className="font-cairo text-[13px] text-white/35 italic mb-3">"Non-Linear | Good Taste | High Standards"</div>
                <div className="flex flex-col gap-[7px]">
                  {[
                    "Starting over.. from 0. But like an ALIEN.",
                    "Surviving uncertainty w/ unstoppable resilience.",
                    "Like a Porsche with no brakes. (Sia 💗)",
                    "Learning by doing → Curious • Kind • Wild",
                    "Obsessed with Knowledge • Trying things out",
                    "Any kind of: Art • Architecture • Adventures",
                    "24/7 active to Connect & initiate talks / activities.",
                  ].map((line, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <span className="text-pink-400 opacity-40 text-[11px] mt-[3px] shrink-0">✧</span>
                      <span className="font-cairo text-[13px] text-white/55 leading-[1.6]">{line}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vanilla snacks */}
              <div>
                <div className="font-mono text-[10px] text-white/[0.38] uppercase tracking-[0.12em] mb-2.5">Vanilla Snacks</div>
                <div className="flex flex-wrap gap-2">
                  {["Music 🎵","Learning","DIY","Movies","Video Games 🎮","Foodie + Cooking 👨‍🍳","Reading","Writing","Podcast","Walking 🚶","Hangouts","Architecture","Night planning","Table Tennis 🏓","Coffee ☕️"].map((s, i) => (
                    <span key={i} className="font-cairo text-xs text-white/40 bg-white/[0.03] border border-white/[0.08] rounded-full px-3 py-1">{s}</span>
                  ))}
                </div>
              </div>

              {/* Stand */}
              <div className="font-mono text-[11px] text-white/30 border-t border-white/[0.06] pt-4">
                🇵🇸 Stand for Humanity · My people · Palestine 𓂆 · Exploring diverse lives & universes.
              </div>
            </div>
          )}

          {sub === "being alien" && (
            <div className="flex flex-col gap-5">
              <div>
                <div className="font-mono text-[10px] text-violet-300 tracking-[0.15em] uppercase mb-2">What does it mean to be ALIEN?</div>
                <p className="font-cairo text-sm text-white/55 leading-[1.8]">
                  Being ALIEN is about being a human with superpowers.<br />
                  Superpowers articulated in 2 main categories: <strong className="text-white/90">Knowledge</strong> & <strong className="text-white/90">Humanity</strong>.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-violet-300/5 border border-violet-300/20 rounded-lg p-4">
                  <div className="font-mono text-[11px] text-violet-300 mb-2 uppercase tracking-[0.1em]">Knowledge</div>
                  <p className="font-cairo text-[13px] text-white/50 leading-[1.7]">
                    Power through noticing, analyzing, and learning. An ongoing adventure to uplevel awareness and understanding — driven by interest and curiosity.
                  </p>
                </div>
                <div className="bg-pink-400/5 border border-pink-400/20 rounded-lg p-4">
                  <div className="font-mono text-[11px] text-pink-400 mb-2 uppercase tracking-[0.1em]">Humanity</div>
                  <p className="font-cairo text-[13px] text-white/50 leading-[1.7]">
                    Our being — mental, emotional, physical. Our personal handbook of thoughts, standards, and values. Knowledge is what we perceive. Humanity is how we communicate it.
                  </p>
                </div>
              </div>

              <div className="bg-white/[0.025] border border-white/[0.07] rounded-lg p-4">
                <p className="font-cairo text-[13px] text-white/45 leading-[1.8] italic">
                  "Life is tough. We are vulnerable to changes. It's up to you how these changes affect you and your defaults. It's about your desire to demystify your significant potential."
                </p>
              </div>

              <div>
                <div className="font-mono text-[10px] text-white/[0.38] uppercase tracking-[0.12em] mb-2.5">Brief Story</div>
                <p className="font-cairo text-[13px] text-white/50 leading-[1.8]">
                  Self-learner. Intrapreneur. Multipotential. Started an independent self-learning adventure in August 2013 around Entrepreneurship, Business Development, and Digital Marketing.
                  Now over 10 years of cross-functional experience — led by an entrepreneurial spirit, backed by real experience in 2 tech startup business models (Education · Wellbeing).
                </p>
              </div>

              <div>
                <div className="font-mono text-[10px] text-white/[0.38] uppercase tracking-[0.12em] mb-2.5">Values</div>
                <div className="flex flex-wrap gap-2">
                  {["Humanity","Empathy","Transparency","Adaptability","Accountability"].map((v) => (
                    <span key={v} className="font-mono text-[11px] text-violet-300 border border-violet-300/30 rounded-full px-3 py-[3px]">{v}</span>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-mono text-[10px] text-white/[0.38] uppercase tracking-[0.12em] mb-2.5">Inspirations</div>
                <div className="flex flex-wrap gap-2">
                  {["ALIENs","Adventures","Challenges","Curiosity"].map((v) => (
                    <span key={v} className="font-cairo text-xs text-white/40 bg-white/[0.03] border border-white/[0.08] rounded-full px-3 py-1">{v}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {sub === "connection" && (
            <div className="flex flex-col gap-5">
              <div className="border-l-2 border-emerald-400 pl-4">
                <div className="font-cairo text-[15px] font-semibold text-white/90 mb-1.5">Extrovert Introvert — The Communication</div>
                <p className="font-cairo text-[13px] text-white/45 leading-[1.8]">
                  Context-dependent. In personal connection: introvert — driven by intuition, maturity, and matching level. In public & community: extrovert — active, sharing thoughts, building genuine connections.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-emerald-400/5 border border-emerald-400/20 rounded-lg p-3.5">
                  <div className="font-mono text-[11px] text-emerald-400 mb-1.5 uppercase tracking-[0.1em]">Introvert mode</div>
                  <p className="font-cairo text-[13px] text-white/45 leading-[1.65]">Depends on intuition, maturity, and matching level. Approaching or being approached — it's calibrated.</p>
                </div>
                <div className="bg-emerald-400/5 border border-emerald-400/20 rounded-lg p-3.5">
                  <div className="font-mono text-[11px] text-emerald-400 mb-1.5 uppercase tracking-[0.1em]">Extrovert mode</div>
                  <p className="font-cairo text-[13px] text-white/45 leading-[1.65]">Active in community. Loves to communicate, share thoughts, build genuine connections — and yes, prospecting included 100%.</p>
                </div>
              </div>

              <div className="bg-white/[0.025] border border-white/[0.07] rounded-lg p-4">
                <div className="font-mono text-[10px] text-white/[0.38] uppercase tracking-[0.12em] mb-2.5">The Connection</div>
                <p className="font-cairo text-[13px] text-white/50 leading-[1.8]">
                  Love to connect with like-minded people on different aspects.<br />
                  <span className="text-white/35">Genuine · Caring · Kind · Passionate · Loyal · Honest</span><br />
                  IRL & active communication are super important.
                </p>
              </div>

              <div className="bg-pink-400/[0.04] border border-pink-400/[0.12] rounded-lg p-3.5">
                <div className="font-cairo text-[13px] text-white/45 leading-[1.8] italic">
                  "Reformed and rebuilt by pain. In love with the adventure, direct and clear communication, meaningful talks, genuine human connection, challenges, and any kind of adventures."
                </div>
              </div>

              <div>
                <div className="font-mono text-[10px] text-pink-400 tracking-[0.15em] uppercase mb-2">Curious? Aligned? Resonate with the journey?</div>
                <div className="flex gap-2.5 flex-wrap">
                  {[
                    { label: "LinkedIn", href: "https://www.linkedin.com/in/ahmad96abdelaziz/" },
                    { label: "YouTube / Podcast", href: "https://www.youtube.com/@ALIENs.venture" },
                    { label: "Portfolio", href: "https://ahmad96.lovable.app/" },
                  ].map((l) => (
                    <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
                      className="font-mono text-[11px] text-pink-400 border border-pink-400/30 rounded-lg px-4 py-2 hover:opacity-80 transition-opacity">
                      {l.label} →
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {sub === "universe" && (
            <div className="flex flex-col gap-5">
              <div className="font-mono text-[10px] text-white/25 tracking-[0.2em] uppercase mb-1">In Love with the Adventure</div>
              <p className="font-cairo text-sm text-white/50 leading-[1.8]">
                24/7 active and super hungry to learn · develop · discover · explore every aspect of life.<br />
                Through discussions, sharing thoughts, perspectives, and experiences about everything.
              </p>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { topic: "Mental & Emotional Wellbeing", color: "text-pink-400 bg-pink-400/5 border-pink-400/15" },
                  { topic: "Relationships", color: "text-violet-300 bg-violet-300/5 border-violet-300/15" },
                  { topic: "Personal & Career Growth", color: "text-emerald-400 bg-emerald-400/5 border-emerald-400/15" },
                  { topic: "Art & Architecture", color: "text-amber-400 bg-amber-400/5 border-amber-400/15" },
                  { topic: "Technology & Systems", color: "text-sky-400 bg-sky-400/5 border-sky-400/15" },
                  { topic: "Human Minds", color: "text-orange-400 bg-orange-400/5 border-orange-400/15" },
                ].map((t) => (
                  <div key={t.topic} className={`${t.color} border rounded-lg p-3`}>
                    <div className="font-cairo text-xs leading-[1.5]">{t.topic}</div>
                  </div>
                ))}
              </div>

              <div className="bg-white/[0.025] border border-white/[0.07] rounded-lg p-4">
                <div className="font-mono text-[10px] text-white/[0.38] uppercase tracking-[0.12em] mb-2">To</div>
                <div className="flex flex-col gap-1.5">
                  {[
                    "Inspire and get inspired by each other's Humanity.",
                    "Support and guide each other to reach our potential even more.",
                    "Always watching myself and learning how to become BETTER — for me, my people, and the whole universe.",
                  ].map((line, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <span className="text-violet-300 opacity-40 text-[11px] mt-[3px] shrink-0">✧</span>
                      <span className="font-cairo text-[13px] text-white/50 leading-[1.65]">{line}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="font-mono text-[11px] text-white/20 border-t border-white/[0.06] pt-4 leading-[1.8]">
                🇵🇸 Stand for Humanity · My people · Palestine 𓂆
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HumanSide;
