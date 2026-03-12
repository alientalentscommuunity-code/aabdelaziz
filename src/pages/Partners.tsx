import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import CareerLayout from "@/components/career/CareerLayout";
import DimLabel from "@/components/career/DimLabel";

const playfair = { fontFamily: "'Playfair Display', serif" };
const dmSans = { fontFamily: "'DM Sans', sans-serif" };
const spaceMono = { fontFamily: "'Space Mono', monospace" };

const currentMoment = [
  {
    icon: "🚀",
    label: "Building",
    title: "Product Manager @ ALIENs Venture",
    body: "AI-enabled talent & hiring platform. 30K+ visits. $2K+ monetized. Cairo AI Hackathon winner.",
    linkText: "See the project →",
    linkTo: "/career/portfolio",
  },
  {
    icon: "👽",
    label: "Creating",
    title: "Vibe Coding with AI",
    body: "Prototyping with LLMs. Full-stack with Lovable, Antigravity, Supabase, Claude.",
    linkText: "See the stack →",
    linkTo: "/career/cv#skills",
  },
  {
    icon: "🧠",
    label: "Growing",
    title: "Community & Program Builder",
    body: "70+ weeks of content. 36K Reddit members. 308 YouTube subs. 100+ hours of meetups.",
    linkText: "See the community →",
    linkTo: "/career/portfolio#community",
  },
];

const stats = [
  { icon: "🌍", value: "30K+", label: "Platform Visits" },
  { icon: "📋", value: "3K+", label: "Job Applications" },
  { icon: "👥", value: "500+", label: "Signups" },
  { icon: "💰", value: "$2K+", label: "Monetized (100% margin)" },
  { icon: "🤝", value: "36K", label: "Reddit Community" },
  { icon: "⏳", value: "10+", label: "Years Experience" },
];

const Partners = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Friends & Partners — Ahmad Abdelaziz";
  }, []);

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.hash]);

  return (
    <CareerLayout>
      {/* Hero */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
          <DimLabel>FRIENDS & PARTNERS</DimLabel>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4" style={playfair}>
            Who I Work With
          </h1>
          <p className="text-lg text-white/40 mb-6" style={dmSans}>
            The people and organizations I collaborate with — from early-career talents to VCs and startups.
          </p>
        </div>
      </section>

      {/* Current Moment */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
          <DimLabel>RIGHT NOW</DimLabel>
          <h2 className="text-2xl sm:text-[32px] font-bold text-white mb-8" style={playfair}>
            What I'm doing at this moment
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {currentMoment.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-6 hover:border-[#4A9EFF]/40 transition-all duration-300"
              >
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1" style={spaceMono}>
                  {item.label}
                </p>
                <h3 className="text-lg font-bold text-white mb-2" style={playfair}>{item.title}</h3>
                <p className="text-sm text-white/40 mb-4" style={dmSans}>{item.body}</p>
                <Link to={item.linkTo} className="text-[#4A9EFF] text-sm font-medium hover:underline" style={dmSans}>
                  {item.linkText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ICP — Human Side */}
      <section id="human" className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
          <DimLabel>THE HUMAN SIDE</DimLabel>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4" style={playfair}>
            People first. Always.
          </h2>
          <p className="text-white/40 text-base mb-6" style={dmSans}>
            I work with early-career talents finding their path, humans building something meaningful,
            and anyone who values genuine collaboration over transactional work.
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {["Curious", "Self-learner", "Builder", "Early-career", "Career-switcher", "Ambitious"].map((t) => (
              <span key={t} className="px-3 py-1.5 rounded-full border border-[#4A9EFF]/20 text-[#4A9EFF] text-xs font-bold uppercase tracking-wider">
                {t}
              </span>
            ))}
          </div>
          <a
            href="https://www.linkedin.com/in/ahmad96abdelaziz/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#4A9EFF] text-sm font-medium hover:underline"
          >
            Let's connect →
          </a>
        </div>
      </section>

      {/* ICP — Tech Side */}
      <section id="tech" className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
          <DimLabel>THE TECH SIDE</DimLabel>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8" style={playfair}>
            Where I play best.
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { icon: "🎯", title: "Talents", desc: "Early-career & mid-level talents navigating global opportunities." },
              { icon: "🚀", title: "Entrepreneurs", desc: "Founders building 0→1. GTM, product thinking, community-led growth." },
              { icon: "💼", title: "VCs & Investors", desc: "Deal flow support, talent sourcing, ecosystem insights." },
              { icon: "⚡", title: "Startups", desc: "Remote hiring strategy, GTM ops for early-stage teams." },
            ].map((card) => (
              <div key={card.title} className="rounded-xl border border-white/10 bg-white/[0.02] p-6 hover:border-[#4A9EFF]/40 transition-all">
                <span className="text-2xl mb-2 block">{card.icon}</span>
                <h4 className="text-base font-bold text-white mb-1" style={playfair}>{card.title}</h4>
                <p className="text-sm text-white/40 mb-3" style={dmSans}>{card.desc}</p>
                <span className="text-[#4A9EFF] text-sm font-medium hover:underline cursor-pointer">Work together →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Numbers */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
          <DimLabel>BY THE NUMBERS</DimLabel>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center py-6">
                <p className="text-3xl mb-1">{s.icon}</p>
                <p className="text-3xl sm:text-4xl font-bold text-[#4A9EFF]" style={playfair}>{s.value}</p>
                <p className="text-xs text-white/40 mt-1" style={dmSans}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Teaser */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <DimLabel className="text-center">THE VISION</DimLabel>
          <p className="text-xl sm:text-2xl text-white/40 italic mb-8" style={playfair}>
            "Where I'm going is more interesting than where I've been."
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/career/vision"
              className="px-6 py-3 rounded-full border border-[#4A9EFF]/30 text-[#4A9EFF] text-sm font-medium hover:bg-[#4A9EFF]/10 transition-colors"
            >
              Career Vision Board →
            </Link>
            <Link
              to="/career/progress"
              className="px-6 py-3 rounded-full border border-[#4A9EFF]/30 text-[#4A9EFF] text-sm font-medium hover:bg-[#4A9EFF]/10 transition-colors"
            >
              Progress Tracker →
            </Link>
          </div>
        </div>
      </section>
    </CareerLayout>
  );
};

export default Partners;
