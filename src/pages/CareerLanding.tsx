import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CareerLayout from "@/components/career/CareerLayout";
import DimLabel from "@/components/career/DimLabel";
import { Mail, Linkedin, Phone, Globe, ExternalLink } from "lucide-react";

/* ── helpers ── */
const playfair = { fontFamily: "'Playfair Display', serif" };
const dmSans = { fontFamily: "'DM Sans', sans-serif" };
const spaceMono = { fontFamily: "'Space Mono', monospace" };

const mainTitles = ["AI-Enabled Product Manager", "Community Builder", "Vibe Coder"];
const subTitles = "GTM Strategist · Revenue Growth · Customer Success · Account Management";
const manifesto = "Building from 0→1. Human ventures. AI-enabled. Learning by doing.";

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

const CareerLanding = () => {
  useEffect(() => {
    document.title = "Career Dimension — Ahmad Abdelaziz";
  }, []);

  return (
    <CareerLayout>
      {/* ═══ BLOCK 1 — Hero ═══ */}
      <section className="min-h-[80vh] flex items-center py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
          <DimLabel>CAREER DIMENSION — 01</DimLabel>

          <div className="space-y-1 mb-6">
            {mainTitles.map((t, i) => (
              <h1
                key={i}
                className="text-4xl sm:text-5xl md:text-7xl font-black leading-[1.05] text-white animate-fade-in"
                style={{ ...playfair, animationDelay: `${i * 0.12}s` }}
              >
                {t}
              </h1>
            ))}
          </div>

          <p className="text-base sm:text-lg text-white/40 mb-2" style={{ ...dmSans, fontWeight: 500 }}>
            {subTitles}
          </p>
          <p className="text-sm text-white/30 italic mb-8" style={{ ...dmSans, fontWeight: 300 }}>
            {manifesto}
          </p>

          {/* Contact bar */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-6 text-white/40 text-xs" style={spaceMono}>
            <a href="mailto:ahmad@alientalents.com" className="flex items-center gap-2 hover:text-[#4A9EFF] transition-colors">
              <Mail size={14} /> ahmad@alientalents.com
            </a>
            <a href="https://www.linkedin.com/in/ahmad96abdelaziz/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#4A9EFF] transition-colors">
              <Linkedin size={14} /> linkedin.com/in/ahmad96abdelaziz
            </a>
            <a href="tel:+201067156747" className="flex items-center gap-2 hover:text-[#4A9EFF] transition-colors">
              <Phone size={14} /> +20 106 715 6747
            </a>
            <a href="/" className="flex items-center gap-2 hover:text-[#4A9EFF] transition-colors">
              <Globe size={14} /> Portfolio
            </a>
          </div>
        </div>
      </section>

      {/* ═══ BLOCK 2 — Current Moment ═══ */}
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

      {/* ═══ BLOCK 3 — CTA Navigation ═══ */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
          <DimLabel>EXPLORE THE DIMENSION</DimLabel>
          <h2 className="text-2xl sm:text-[32px] font-bold text-white mb-8" style={playfair}>
            Where do you want to go?
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* GROUP A */}
            <div className="space-y-5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/30" style={spaceMono}>
                The Full Story
              </h3>
              {/* CTA Card 1 */}
              <Link to="/career/cv" className="block rounded-xl border border-[#4A9EFF]/30 bg-white/[0.02] p-6 hover:border-[#4A9EFF]/60 transition-all group">
                <span className="text-2xl mb-2 block">📄</span>
                <h4 className="text-lg font-bold text-white mb-1" style={playfair}>Full CV →</h4>
                <p className="text-sm text-white/40 mb-3" style={dmSans}>
                  10+ years across sales, GTM, customer success, and product. The complete timeline.
                </p>
                <span className="text-[#4A9EFF] text-sm font-medium group-hover:underline">View Full CV</span>
              </Link>
              {/* CTA Card 2 */}
              <div>
                <Link to="/career/portfolio" className="block rounded-xl border border-[#4A9EFF]/30 bg-white/[0.02] p-6 hover:border-[#4A9EFF]/60 transition-all group">
                  <span className="text-2xl mb-2 block">🗂️</span>
                  <h4 className="text-lg font-bold text-white mb-1" style={playfair}>Full Portfolio →</h4>
                  <p className="text-sm text-white/40 mb-3" style={dmSans}>
                    Products shipped. Projects built. Results delivered.
                  </p>
                  <span className="text-[#4A9EFF] text-sm font-medium group-hover:underline">View Portfolio</span>
                </Link>
                <div className="flex flex-wrap gap-2 mt-3">
                  {[
                    { label: "🚀 Product Portfolio", hash: "#product" },
                    { label: "🎓 Career Mentoring", hash: "#mentoring" },
                    { label: "💰 Sales Portfolio", hash: "#sales" },
                    { label: "🤝 Partnerships", hash: "#partnerships" },
                  ].map((p) => (
                    <Link
                      key={p.hash}
                      to={`/career/portfolio${p.hash}`}
                      className="px-3 py-1.5 rounded-full border border-[#4A9EFF]/20 text-[#4A9EFF] text-[10px] font-bold uppercase tracking-wider hover:bg-[#4A9EFF]/10 transition-colors"
                    >
                      {p.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* GROUP B */}
            <div className="space-y-5">
              <DimLabel>WHO I WORK WITH</DimLabel>
              <h3 className="text-lg text-white/50 font-medium" style={dmSans}>
                Is this you?
              </h3>
              <Link to="/career/icp#human" className="block rounded-xl border border-white/10 bg-white/[0.02] p-6 hover:border-[#4A9EFF]/40 transition-all">
                <h4 className="text-base font-bold text-white mb-1" style={playfair}>The Human Side 🤝</h4>
                <p className="text-sm text-white/40 mb-2" style={dmSans}>
                  Early-career talents navigating growth. Humans building something real.
                </p>
                <span className="text-[#4A9EFF] text-sm font-medium hover:underline">Learn more →</span>
              </Link>
              <Link to="/career/icp#tech" className="block rounded-xl border border-white/10 bg-white/[0.02] p-6 hover:border-[#4A9EFF]/40 transition-all">
                <h4 className="text-base font-bold text-white mb-1" style={playfair}>The Tech Side ⚡</h4>
                <p className="text-sm text-white/40 mb-2" style={dmSans}>
                  Talents · Entrepreneurs · VCs · Startups
                </p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {["Talents", "Entrepreneurs", "VCs", "Startups"].map((p) => (
                    <span key={p} className="px-2 py-1 rounded-full border border-white/10 text-white/30 text-[10px] font-bold uppercase">{p}</span>
                  ))}
                </div>
                <span className="text-[#4A9EFF] text-sm font-medium hover:underline">Learn more →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BLOCK 4 — Key Numbers ═══ */}
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

      {/* ═══ BLOCK 5 — Vision Teaser ═══ */}
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

export default CareerLanding;
