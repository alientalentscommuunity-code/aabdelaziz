import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CareerLayout from "@/components/career/CareerLayout";
import DimLabel from "@/components/career/DimLabel";
import { Mail, Linkedin, Phone, Globe, ExternalLink, ArrowRight } from "lucide-react";

const playfair = { fontFamily: "'Playfair Display', serif" };
const dmSans = { fontFamily: "'DM Sans', sans-serif" };
const spaceMono = { fontFamily: "'Space Mono', monospace" };

const domains = [
  { emoji: "🎓", label: "EdTech" },
  { emoji: "💻", label: "SW House" },
  { emoji: "📢", label: "Marketing Agency" },
  { emoji: "👥", label: "HR Tech" },
  { emoji: "💳", label: "FinTech" },
];

const stats = [
  { value: "12+", label: "Years Experience" },
  { value: "SMEs", label: "& Tech Startups" },
  { value: "MENA", label: "US & UK Markets" },
  { value: "5", label: "Industry Domains" },
];

const CareerLanding = () => {
  useEffect(() => {
    document.title = "Career Side — Ahmad Abdelaziz";
  }, []);

  return (
    <CareerLayout>
      {/* ═══ HERO — Intro & Summary ═══ */}
      <section className="min-h-[80vh] flex items-center py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
          <DimLabel>CAREER SIDE</DimLabel>

          <div className="space-y-1 mb-6">
            {["AI-Enabled Product Manager", "Community Builder", "Vibe Coder"].map((t, i) => (
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
            GTM Strategist · Revenue Growth · Customer Success · Account Management
          </p>
          <p className="text-sm text-white/30 italic mb-8" style={{ ...dmSans, fontWeight: 300 }}>
            Building from 0→1. Human ventures. AI-enabled. Learning by doing.
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

      {/* ═══ Summary & Stats ═══ */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-8 mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6" style={playfair}>
              Professional Summary
            </h2>
            <div className="space-y-4 text-white/50 text-base leading-relaxed" style={dmSans}>
              <p>
                AI-enabled Product Manager with <span className="text-[#4A9EFF] font-bold">12+ years</span> of experience across
                SMEs and tech/SaaS startups in <span className="text-[#4A9EFF] font-bold">MENA, US & UK</span> markets.
              </p>
              <p>
                1+ year prototyping with LLMs & vibe coding. Shipped multiple MVPs achieving 30K+ visits, $2K+ monetized.
                Cairo AI Hackathon winner. Background spanning sales, GTM, customer success, community building, and product management.
              </p>
              <p>
                Operated as a one-person GTM team, managed full sales cycles, built community programs from scratch,
                and shipped AI-enabled products — always from 0→1.
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {stats.map((s) => (
                <div key={s.label} className="text-center py-4 rounded-lg border border-white/5 bg-white/[0.02]">
                  <p className="text-3xl font-bold text-[#4A9EFF]" style={playfair}>{s.value}</p>
                  <p className="text-xs text-white/40 mt-1" style={dmSans}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Domains */}
          <DimLabel>INDUSTRY DOMAINS</DimLabel>
          <div className="flex flex-wrap gap-3 mt-4">
            {domains.map((d) => (
              <span
                key={d.label}
                className="px-4 py-2 rounded-full border border-[#4A9EFF]/20 text-white/60 text-sm font-medium hover:border-[#4A9EFF]/50 hover:text-white transition-all"
                style={dmSans}
              >
                {d.emoji} {d.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA — View Full CV ═══ */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              to="/career/cv"
              className="group block rounded-xl border border-[#4A9EFF]/30 bg-white/[0.02] p-8 hover:border-[#4A9EFF]/60 hover:bg-[#4A9EFF]/5 transition-all"
            >
              <span className="text-3xl mb-3 block">📄</span>
              <h3 className="text-xl font-bold text-white mb-2" style={playfair}>Full CV →</h3>
              <p className="text-sm text-white/40 mb-4" style={dmSans}>
                12+ years across sales, GTM, customer success, and product. The complete timeline.
              </p>
              <span className="text-[#4A9EFF] text-sm font-medium group-hover:underline flex items-center gap-2">
                View Full CV <ArrowRight size={14} />
              </span>
            </Link>

            <Link
              to="/career/portfolio"
              className="group block rounded-xl border border-[#4A9EFF]/30 bg-white/[0.02] p-8 hover:border-[#4A9EFF]/60 hover:bg-[#4A9EFF]/5 transition-all"
            >
              <span className="text-3xl mb-3 block">🗂️</span>
              <h3 className="text-xl font-bold text-white mb-2" style={playfair}>Full Portfolio →</h3>
              <p className="text-sm text-white/40 mb-4" style={dmSans}>
                Products shipped. Projects built. Results delivered.
              </p>
              <span className="text-[#4A9EFF] text-sm font-medium group-hover:underline flex items-center gap-2">
                View Portfolio <ArrowRight size={14} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ Who I Work With — Friends & Partners Preview ═══ */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
          <DimLabel>WHO I WORK WITH</DimLabel>
          <h2 className="text-2xl sm:text-[32px] font-bold text-white mb-3" style={playfair}>
            Friends & Partners
          </h2>
          <p className="text-white/40 text-base mb-8" style={dmSans}>
            The people and organizations I collaborate with — from early-career talents to VCs and startups.
          </p>

          <div className="grid md:grid-cols-2 gap-5">
            <Link
              to="/partners#human"
              className="block rounded-xl border border-white/10 bg-white/[0.02] p-6 hover:border-[#4A9EFF]/40 transition-all"
            >
              <h4 className="text-base font-bold text-white mb-1" style={playfair}>The Human Side 🤝</h4>
              <p className="text-sm text-white/40 mb-2" style={dmSans}>
                Early-career talents navigating growth. Humans building something real.
              </p>
              <span className="text-[#4A9EFF] text-sm font-medium hover:underline">Learn more →</span>
            </Link>
            <Link
              to="/partners#tech"
              className="block rounded-xl border border-white/10 bg-white/[0.02] p-6 hover:border-[#4A9EFF]/40 transition-all"
            >
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

          <div className="mt-8 text-center">
            <Link
              to="/partners"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#4A9EFF]/30 text-[#4A9EFF] text-sm font-medium hover:bg-[#4A9EFF]/10 transition-colors"
            >
              Explore Friends & Partners <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </CareerLayout>
  );
};

export default CareerLanding;
