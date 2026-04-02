import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const HumanIntro = () => (
  <div className="space-y-8">
    {/* Hero */}
    <div>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-black italic uppercase tracking-tighter mb-4 animate-fade-in text-white">
        Ahmad <span className="text-pink-400">Abdelaziz</span>
      </h1>
      <p className="text-lg sm:text-xl font-medium italic text-white/40 mb-1">
        Human being · Product Management · Community Growth
      </p>
      <p className="text-sm font-medium italic text-white/25">
        Shipped AI Sr. Recruiter w/ psychometrics (MVP) · $2K ROI · AI Hackathon Winner
      </p>
    </div>

    {/* Handbook quote */}
    <div className="glass p-6 sm:p-8 hover:border-pink-400/30 transition-all duration-500">
      <h3 className="text-xl sm:text-2xl font-black italic uppercase tracking-tighter text-white flex items-center gap-2 mb-2">
        <span>📓</span> My ALIEN-Style Handbook
      </h3>
      <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-5">
        Non-Linear | Good Taste | High Standards
      </p>
      <div className="space-y-2.5 text-white/40 font-medium italic">
        {[
          "Starting over.. from 0. But like an ALIEN.",
          "Surviving uncertainty w/ unstoppable resilience.",
          "Like a Porsche with no brakes. (Sia 💗)",
          "Learning by doing → Curious • Kind • Wild",
          "Obsessed with Knowledge • Trying things out",
          "Any kind of: Art • Architecture • Adventures",
          "24/7 active to Connect & initiate talks / activities.",
        ].map((line, i) => (
          <p key={i} className="flex items-start gap-2">
            <span className="text-pink-400 mt-1">•</span>
            {line}
          </p>
        ))}
      </div>
    </div>

    {/* Vanilla snacks */}
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-3">Vanilla Snacks</p>
      <div className="flex flex-wrap gap-2">
        {["Music 🎵","Learning","DIY","Movies","Video Games 🎮","Foodie + Cooking 👨‍🍳","Reading","Writing","Podcast","Walking 🚶","Hangouts","Architecture","Night planning","Table Tennis 🏓","Coffee ☕️"].map((s, i) => (
          <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold">{s}</span>
        ))}
      </div>
    </div>

    {/* Sweet Spice Easter Egg */}
    <Link to="/sweet-spice" className="block">
      <div className="glass border-pink-500/20 hover:border-pink-500/50 hover:shadow-[0_0_30px_rgba(244,114,182,0.15)] transition-all duration-300 p-4 rounded-xl cursor-pointer group">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl">🌶️</span>
            <span className="text-sm font-medium italic text-white/60 group-hover:text-pink-400 transition-colors">
              There's one more dimension
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-pink-400/60 group-hover:text-pink-400 group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>

    {/* Stand */}
    <div className="border-t border-white/10 pt-6">
      <p className="text-white/20 text-sm font-medium italic">
        🇵🇸 Stand for Humanity · My people · Palestine 𓂆 · Exploring diverse lives & universes.
      </p>
    </div>
  </div>
);

export default HumanIntro;
