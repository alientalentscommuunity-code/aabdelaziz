import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CareerLayout from "@/components/career/CareerLayout";
import DimLabel from "@/components/career/DimLabel";
import { ExternalLink } from "lucide-react";

const playfair = { fontFamily: "'Playfair Display', serif" };
const dmSans = { fontFamily: "'DM Sans', sans-serif" };
const spaceMono = { fontFamily: "'Space Mono', monospace" };

const anchors = ["Product", "Mentoring", "Sales", "Partnerships", "Community"] as const;

const CareerPortfolio = () => {
  useEffect(() => {
    document.title = "Portfolio — Ahmad Abdelaziz";
    // scroll to hash
    if (window.location.hash) {
      setTimeout(() => {
        document.querySelector(window.location.hash)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);

  return (
    <CareerLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-16">
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-2" style={playfair}>Selected Work</h1>
        <p className="text-white/40 mb-8" style={dmSans}>Products shipped. Communities built. Results delivered.</p>

        {/* Anchor nav */}
        <div className="flex gap-2 overflow-x-auto mb-12 pb-2 sticky top-14 z-30 bg-black/90 backdrop-blur-lg py-3 -mx-4 px-4">
          {anchors.map((a) => (
            <a
              key={a}
              href={`#${a.toLowerCase()}`}
              className="px-4 py-2 rounded-full border border-white/10 text-white/40 text-[10px] font-bold uppercase tracking-widest hover:border-[#4A9EFF]/40 hover:text-[#4A9EFF] transition-all whitespace-nowrap"
            >
              {a}
            </a>
          ))}
        </div>

        {/* ── Product ── */}
        <section id="product" className="mb-20">
          <DimLabel>PRODUCT</DimLabel>
          <div className="rounded-xl border border-[#4A9EFF]/30 bg-white/[0.02] p-8">
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-2xl font-bold text-white" style={playfair}>ALIENs Venture</h2>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold uppercase">Featured</span>
            </div>
            <div className="w-full h-40 rounded-lg bg-gradient-to-r from-[#4A9EFF]/20 to-purple-500/20 mb-4" />
            <p className="text-sm text-white/40 mb-4" style={dmSans}>
              AI-enabled talent & hiring platform built from 0→1. Jobs board, companies board, talent marketplace, Mini ATS, and 2 MVPs in progress.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              {[
                { v: "30K+", l: "Visits" },
                { v: "3K+", l: "Applies" },
                { v: "500+", l: "Signups" },
                { v: "$2K+", l: "Monetized" },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <p className="text-xl font-bold text-[#4A9EFF]" style={playfair}>{s.v}</p>
                  <p className="text-[10px] text-white/30 uppercase" style={spaceMono}>{s.l}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {["Product Management", "AI", "Vibe Coding", "Supabase", "Lovable"].map((t) => (
                <span key={t} className="px-2 py-0.5 rounded-full border border-[#4A9EFF]/20 text-[#4A9EFF] text-[10px] font-bold">{t}</span>
              ))}
            </div>
            <div className="flex gap-3">
              <a href="https://dev-site-craftsman.lovable.app" target="_blank" rel="noopener noreferrer" className="text-[#4A9EFF] text-sm font-medium hover:underline flex items-center gap-1">
                Visit Platform → <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </section>

        {/* ── Mentoring ── */}
        <section id="mentoring" className="mb-20">
          <DimLabel>CAREER MENTORING</DimLabel>
          <p className="text-sm text-white/40 mb-6" style={dmSans}>
            Supporting talents in navigating their career paths, landing interviews, and breaking into global opportunities.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { v: "16+", l: "Talents secured multiple interviews" },
              { v: "50+", l: "Total interviews secured" },
              { v: "2", l: "Talents placed in USD jobs ($1K/month avg)" },
              { v: "100+", l: "Hours of 1-to-1 calls & meetups" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl border border-white/10 bg-white/[0.02] p-5 text-center">
                <p className="text-2xl font-bold text-[#4A9EFF]" style={playfair}>{s.v}</p>
                <p className="text-xs text-white/40 mt-1" style={dmSans}>{s.l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Sales ── */}
        <section id="sales" className="mb-20">
          <DimLabel>SALES & GTM</DimLabel>
          <div className="space-y-4">
            {[
              { company: "Soleek Lab", role: "Account Executive", dates: "Mar–Oct 2022", highlight: "$240K pipeline from 40 SQOs in 6 months. $120K closed. $5K MRR renewal portfolio. 120+ daily touchpoints. One-person GTM team." },
              { company: "OTO Courses", role: "Sales Executive", dates: "Sep 2020–May 2021", highlight: "4,800 clients managed. $10.8K pipeline. 90%+ CSAT. 60% net new / 25% upsell / 15% referrals." },
              { company: "MRSOOL", role: "Customer Success Manager", dates: "Jun–Jan 2022", highlight: "127 partners onboarded in 3 months. 200 accounts managed. 9,000+ items. 90%+ CSAT." },
            ].map((e) => (
              <div key={e.company} className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <h3 className="text-lg font-bold text-white" style={playfair}>{e.company}</h3>
                <p className="text-xs text-white/30 mb-2" style={spaceMono}>{e.role} · {e.dates}</p>
                <p className="text-sm text-white/40" style={dmSans}>{e.highlight}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Partnerships ── */}
        <section id="partnerships" className="mb-20">
          <DimLabel>PARTNERSHIPS</DimLabel>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: "nsave.co", body: "Partnership closed — financial services collaboration" },
              { title: "Athar Accelerator", body: "Formal partnership + Cairo AI Hackathon win" },
              { title: "$5K Inbound MRR Pipeline", body: "3 leads, closed-lost — valuable learning experience" },
            ].map((p) => (
              <div key={p.title} className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <h3 className="text-base font-bold text-white mb-1" style={playfair}>{p.title}</h3>
                <p className="text-sm text-white/40" style={dmSans}>{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Community ── */}
        <section id="community" className="mb-10">
          <DimLabel>COMMUNITY & CONTENT</DimLabel>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            {[
              { v: "70+", l: "Weeks of Newsletter & Blog" },
              { v: "36K", l: "Reddit Members moderated" },
              { v: "308", l: "YouTube Subscribers" },
              { v: "11.5K", l: "YouTube Views" },
              { v: "90", l: "Videos published" },
              { v: "100+", l: "Hours of weekly meetups" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center">
                <p className="text-xl font-bold text-[#4A9EFF]" style={playfair}>{s.v}</p>
                <p className="text-[10px] text-white/40 mt-1" style={dmSans}>{s.l}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="https://www.youtube.com/@ALIEN.Talents" target="_blank" rel="noopener noreferrer" className="text-[#4A9EFF] text-sm hover:underline">YouTube →</a>
            <a href="https://www.reddit.com/r/ALIENTalents/" target="_blank" rel="noopener noreferrer" className="text-[#4A9EFF] text-sm hover:underline">Reddit →</a>
          </div>
        </section>
      </div>
    </CareerLayout>
  );
};

export default CareerPortfolio;
