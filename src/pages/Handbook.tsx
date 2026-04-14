import React, { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubNav, { type SubNavItem } from "@/components/shared/SubNav";
import BulletList from "@/components/shared/BulletList";
import InfoCard from "@/components/shared/InfoCard";
import { useContent } from "@/hooks/useContent";
import { InlineEdit, EditableList, EditableTags } from "@/components/admin/InlineEdit";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";

const GlassBullets = ({ accentColor, items }: { accentColor: string; items: string[] }) => (
  <div className="space-y-2 text-white/40 font-medium italic">
    {items.map((b, j) => (
      <p key={j} className="flex items-start gap-2">
        <span className={`${accentColor} mt-1`}>•</span>
        {b}
      </p>
    ))}
  </div>
);

const GlassCard = ({ title, accentColor, subtitle, children }: { title: string; accentColor: string; subtitle?: string; children: React.ReactNode }) => (
  <div className="glass p-6 sm:p-8 hover:border-white/20 transition-all duration-500">
    <h3 className={`text-xl sm:text-2xl font-black italic uppercase tracking-tighter ${accentColor} mb-2`}>{title}</h3>
    {subtitle && <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-5">{subtitle}</p>}
    {children}
  </div>
);

const HiringCoFounder = ({ onBackToHandbook }: { onBackToHandbook: () => void }) => {
  const sections = useMemo(
    () => [
      { id: "looking-for", label: "🚀 Looking for a CO-FOUNDER" },
      { id: "who-we-are", label: "🌍 Who We Are" },
      { id: "what-were-building", label: "🤖 What We're Building" },
      { id: "the-role", label: "🎯 The Role: Backend & AI Co-Founder" },
      { id: "technology", label: "🔧 Technology" },
      { id: "ai-tools", label: "🤖 AI Tools & Platforms" },
      { id: "what-youll-build", label: "🌍 What You'll Actually Build" },
      { id: "who-you-are", label: "💫 Who You Are" },
      { id: "tools-we-use", label: "🧰 Tools We Use" },
      { id: "revenue-equity", label: "💰 Revenue & Equity" },
      { id: "commitment", label: "⏱ Commitment & Work Style" },
      { id: "bonus-points", label: "🎁 Bonus Points" },
      { id: "what-we-promise", label: "🚀 What We Promise" },
      { id: "how-to-apply", label: "📝 How to Apply" },
    ],
    []
  );

  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const activeIndex = useMemo(() => sections.findIndex((s) => s.id === activeId), [activeId, sections]);
  const [stickyTop, setStickyTop] = useState(120);

  useEffect(() => {
    const measure = () => {
      const nav = document.querySelector("nav");
      if (!nav) return;
      const rect = nav.getBoundingClientRect();
      const next = Math.max(88, Math.ceil(rect.bottom + 12));
      setStickyTop(next);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    let raf = 0;

    const updateActiveFromScroll = () => {
      const y = window.scrollY + stickyTop + 24;
      let currentId = sections[0]?.id ?? "";

      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        if (el.offsetTop <= y) currentId = s.id;
      }

      setActiveId((prev) => (prev === currentId ? prev : currentId));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateActiveFromScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateActiveFromScroll();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [sections, stickyTop]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    setActiveId(id);
    const y = el.getBoundingClientRect().top + window.scrollY - (stickyTop + 24);
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  };

  const goPrev = () => {
    const prev = sections[Math.max(0, activeIndex - 1)];
    if (prev) scrollTo(prev.id);
  };

  const goNext = () => {
    const next = sections[Math.min(sections.length - 1, activeIndex + 1)];
    if (next) scrollTo(next.id);
  };

  return (
    <div className="space-y-6">
      <div className="md:hidden sticky z-40" style={{ top: stickyTop }}>
        <div className="glass-sm p-3 space-y-2">
          <Select value={activeId} onValueChange={scrollTo}>
            <SelectTrigger className="bg-white/[0.03] border-white/10 text-white/80 focus:ring-secondary/40">
              <SelectValue placeholder="Jump to section" />
            </SelectTrigger>
            <SelectContent className="bg-black border-white/10">
              <SelectGroup>
                {sections.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={goPrev}
              disabled={activeIndex <= 0}
              className="flex-1 glass-sm px-3 py-2 rounded-full text-[10px] font-black tracking-widest italic text-white/70 disabled:opacity-30 disabled:cursor-not-allowed hover:text-white transition-colors"
            >
              ← Prev
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={activeIndex < 0 || activeIndex >= sections.length - 1}
              className="flex-1 glass-sm px-3 py-2 rounded-full text-[10px] font-black tracking-widest italic text-white/70 disabled:opacity-30 disabled:cursor-not-allowed hover:text-white transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-[280px,1fr] gap-6 items-start">
        <aside className="hidden md:block self-stretch">
          <div
            className="glass-sm p-4 sticky overflow-auto"
            style={{ top: stickyTop, maxHeight: `calc(100vh - ${stickyTop}px - 1.5rem)` }}
          >
            <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-3">🚀 Hiring Co-Founder</p>
            <div className="space-y-1">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`w-full text-left px-3 py-2 rounded-2xl text-xs font-bold italic transition-all border focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 ${
                    activeId === s.id
                      ? "bg-secondary/10 text-secondary border-secondary/30"
                      : "bg-transparent text-white/40 border-transparent hover:text-white/70 hover:bg-white/[0.03]"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2">
              <button
                type="button"
                onClick={goPrev}
                disabled={activeIndex <= 0}
                className="flex-1 bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/30 rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-widest italic transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ← Prev
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={activeIndex < 0 || activeIndex >= sections.length - 1}
                className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-widest italic transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </div>
          </div>
        </aside>

        <div className="space-y-6 min-w-0">
          {/* 🚀 Looking for a CO-FOUNDER */}
          <section id="looking-for" className="scroll-mt-32">
            <div className="glass p-6 sm:p-8 hover:border-white/20 transition-all duration-500 space-y-5">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-black italic tracking-tighter text-white">🚀 Looking for a CO-FOUNDER</h2>
                <p className="text-white/40 font-medium italic">
                  <strong>Partner in Crime to ARCHITECT LIVES & Communities with ART OF HUMANITY</strong>
                </p>
              </div>

              <div className="border-t border-white/10 pt-5 space-y-3">
                <h3 className="text-lg sm:text-xl font-black italic tracking-tighter text-white">🎯 Someone who brings:</h3>
                <p className="text-white/40 font-medium italic leading-relaxed">
                  Curiosity, wildness, kindness — and comes with <strong>Backend & AI competencies</strong>.
                  <br />
                  💡 Feel free to reach out if you own a different gift/craft but you think it's awesome.
                </p>
              </div>

              <div className="border-t border-white/10 pt-5 space-y-3">
                <h3 className="text-lg sm:text-xl font-black italic tracking-tighter text-white">🧪 Joining us means you wanna try something out</h3>
                <p className="text-white/40 font-medium italic leading-relaxed">
                  Learn it, validate it, or execute it. It's a space for trial & error, learning by doing.
                </p>
                <ul className="space-y-2 text-white/40 font-medium italic">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-0.5">•</span> 🎭 Me, myself, tried this out because I enjoy it — doing it Heisenberg style.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-0.5">•</span> 🔄 I do this as a learning-by-doing approach, breaking into product management.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-0.5">•</span> 🌟 Likewise, starting over my life with something unique and aligned.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-0.5">•</span> 🌍 Same time we (me & you) have the opportunity to change people's lives — FOR REAL. Making people happy, find gratitude, and make money — much more of it.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 🌍 Who We Are — ALIENs Venture */}
          <section id="who-we-are" className="scroll-mt-32">
            <div className="glass p-6 sm:p-8 hover:border-white/20 transition-all duration-500 space-y-5">
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-black italic tracking-tighter text-white">🌍 Who We Are — ALIENs Venture</h2>
                <p className="text-white/40 font-medium italic">
                  <strong>We're prototyping thoughts, emotions, and chaos using Code × AI × No-Code tools.</strong>
                </p>
              </div>
              
              <p className="text-white/40 font-medium italic leading-relaxed">
                Our mission: turn uncertainty in global employment, wealth, and wellbeing into clear wins for talents and hiring managers across MENA and emerging markets.
              </p>

              <div className="border-t border-white/10 pt-5 space-y-3">
                <h3 className="text-lg font-black italic tracking-tighter text-white">The Problem We Exist to Solve</h3>
                <p className="text-white/40 font-medium italic"><strong>Across MENA, both talent and hiring managers face:</strong></p>
                <ul className="space-y-2 text-white/40 font-medium italic">
                  <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">•</span> Hidden job markets — opportunities never see daylight</li>
                  <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">•</span> Fragmented information — scattered across 20+ platforms</li>
                  <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">•</span> Low trust — resumes lie, interviews are theatrical, ghosting is standard</li>
                  <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">•</span> Unclear growth paths — no guidance on what to learn or where to go</li>
                </ul>
              </div>

              <div className="border-t border-white/10 pt-5 space-y-3">
                <p className="text-white/40 font-medium italic"><strong>The psychological reality:</strong></p>
                <p className="text-white/40 font-medium italic leading-relaxed">
                  Chaos, self-doubt, uncertainty about learning paths, ineffective techniques, and the constant question: "Am I doing the right thing?"
                </p>
              </div>

              <div className="border-t border-white/10 pt-5 space-y-3">
                <p className="text-white/40 font-medium italic"><strong>Who we serve:</strong></p>
                <ul className="space-y-2 text-white/40 font-medium italic">
                  <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">•</span> <strong>Talents (B2C):</strong> Emerging, unseen, multi-potential humanity — early to mid-career professionals across MENA, emerging markets, and global remote workers seeking growth, income, and wellbeing</li>
                  <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">•</span> <strong>Hiring Managers (B2B):</strong> Startups, SMEs, and remote-first teams hiring from MENA and emerging markets</li>
                  <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">•</span> <strong>Institutions (B2B/B2G):</strong> Universities, academies, innovation hubs, NGOs, and government employment programs</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 🤖 What We're Building */}
          <section id="what-were-building" className="scroll-mt-32">
            <div className="glass p-6 sm:p-8 hover:border-white/20 transition-all duration-500 space-y-5">
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-black italic tracking-tighter text-white">🤖 What We're Building</h2>
                <p className="text-white/40 font-medium italic">
                  An <strong>AI-enabled, Human-First Venture Hub</strong> powered by ALIEN AI — a bestie-style AI for employment, wealth, and wellbeing.
                </p>
              </div>

              <div className="border-t border-white/10 pt-5 space-y-4">
                <h3 className="text-lg font-black italic tracking-tighter text-violet-300">For Talents — ALIEN Career Universe</h3>
                <ul className="space-y-2 text-white/40 font-medium italic">
                  <li className="flex items-start gap-2"><span className="text-violet-300 mt-0.5">•</span> 🌍 <strong>Global Jobs Board</strong> — Remote opportunities, AI-analyzed and matched</li>
                  <li className="flex items-start gap-2"><span className="text-violet-300 mt-0.5">•</span> 📝 <strong>AI-Powered Tools</strong> — Smart CV builder, cover letter generator, job summaries</li>
                  <li className="flex items-start gap-2"><span className="text-violet-300 mt-0.5">•</span> 🎯 <strong>Interview Practice</strong> — Voice AI conversations with real-time scoring</li>
                  <li className="flex items-start gap-2"><span className="text-violet-300 mt-0.5">•</span> 🏆 <strong>ALIEN Trophies</strong> — Referral requests, employment contracts, legacy building</li>
                  <li className="flex items-start gap-2"><span className="text-violet-300 mt-0.5">•</span> 📚 <strong>Career Academy</strong> — AI-guided courses with progress tracking and rewards</li>
                  <li className="flex items-start gap-2"><span className="text-violet-300 mt-0.5">•</span> 🌌 <strong>Universe Handbook</strong> — Rituals, meetups, talks, and peer mentorship</li>
                  <li className="flex items-start gap-2"><span className="text-violet-300 mt-0.5">•</span> 🤖 <strong>Mentor AI</strong> — Career, wealth, and wellbeing guidance</li>
                </ul>
              </div>

              <div className="border-t border-white/10 pt-5 space-y-4">
                <h3 className="text-lg font-black italic tracking-tighter text-emerald-400">For Hiring Managers — ALIEN OS</h3>
                <ul className="space-y-2 text-white/40 font-medium italic">
                  <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">•</span> 🎯 <strong>Hunt Platform</strong> — AI-analyzed job postings, referral-based hiring</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">•</span> 🌟 <strong>Top 1% Humanity</strong> — Pre-vetted, scored talent pool</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">•</span> 📉 <strong>90% Cost Reduction</strong> — Cut time-to-hire and acquisition costs</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">•</span> 🤝 <strong>Community & Referrals</strong> — Coffee chats with fellow hunters, referral exchanges</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">•</span> 📊 <strong>Evaluation Suite</strong> — Company profiling, candidate scoring, pipeline management</li>
                </ul>
              </div>

              <div className="border-t border-white/10 pt-5 space-y-3">
                <h3 className="text-lg font-black italic tracking-tighter text-white">The Architecture You'll Build</h3>
                <p className="text-white/40 font-medium italic leading-relaxed">
                  <strong>You're building the brain and nervous system:</strong>
                </p>
                <ul className="space-y-2 text-white/40 font-medium italic">
                  <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">•</span> Vector search infrastructure for semantic talent-job matching</li>
                  <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">•</span> Real-time systems for community chat, coffee chats, and referrals</li>
                  <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">•</span> AI pipelines that analyze, score, and predict (not just respond)</li>
                  <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">•</span> Data architecture that learns from every interaction</li>
                </ul>
                <p className="text-white/40 font-medium italic leading-relaxed mt-3">
                  <strong>This isn't prompt engineering.</strong> This is production-grade AI systems: RAG pipelines, embedding stores, scoring algorithms, and multi-agent orchestration.
                </p>
              </div>
            </div>
          </section>

          {/* 🎯 The Role: Backend & AI Co-Founder */}
          <section id="the-role" className="scroll-mt-32">
            <div className="glass p-6 sm:p-8 hover:border-white/20 transition-all duration-500 space-y-4">
              <h2 className="text-xl sm:text-2xl font-black italic tracking-tighter text-white">🎯 The Role: Backend & AI Co-Founder</h2>
              <p className="text-white/40 font-medium italic leading-relaxed">
                We're looking for a Tech Co-Founder who is curious, kind, and grounded in humanity. Someone who enjoys building, experimenting, and turning chaos into systems that actually help people.
              </p>
              <p className="text-white/40 font-medium italic leading-relaxed">
                You don't need to be perfect at everything — but you should be strong in at least one area and excited to grow into more.
              </p>

              <div className="border-t border-white/10 pt-4 space-y-2">
                <p className="text-white/40 font-medium italic"><strong>The Engineer (Must-Haves):</strong></p>
                <ul className="space-y-2 text-white/40 font-medium italic">
                  <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">•</span> You've built production RAG systems (not just toy demos)</li>
                  <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">•</span> You understand vector search, not just "used Pinecone once"</li>
                  <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">•</span> You've worked with real-time systems (WebSockets, not just REST)</li>
                  <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">•</span> You can design data architectures that scale</li>
                  <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">•</span> You've integrated AI APIs at scale (handling rate limits, costs, fallbacks)</li>
                </ul>
              </div>

              <div className="border-t border-white/10 pt-4 space-y-2">
                <p className="text-white/40 font-medium italic"><strong>You're not:</strong></p>
                <ul className="space-y-2 text-white/40 font-medium italic">
                  <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">•</span> A frontend developer who "does backend sometimes"</li>
                  <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">•</span> A prompt engineer who calls it "AI engineering"</li>
                  <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">•</span> Looking for a quick exit or passive income</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 🔧 Technology (Core Competencies) */}
          <section id="technology" className="scroll-mt-32">
            <div className="glass p-6 sm:p-8 hover:border-white/20 transition-all duration-500 space-y-5">
              <h2 className="text-xl sm:text-2xl font-black italic tracking-tighter text-white">🔧 Technology (Core Competencies)</h2>

              <div className="space-y-4">
                <h3 className="text-lg font-black italic tracking-tighter text-sky-400">Backend Architecture</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { cat: "Database", skills: "PostgreSQL (advanced), pgvector extension, Redis caching" },
                    { cat: "Real-time", skills: "WebSockets, Server-Sent Events, Supabase Realtime" },
                    { cat: "Serverless", skills: "Netlify Functions, Deno Edge Functions, Vercel Edge" },
                    { cat: "API Design", skills: "RESTful APIs, GraphQL, Webhook handlers, Rate limiting" },
                    { cat: "Search", skills: "Vector similarity search, Full-text search (tsvector), Semantic matching" },
                    { cat: "Storage", skills: "Object storage (PDFs, audio), File processing pipelines" },
                  ].map((item) => (
                    <div key={item.cat} className="glass-sm p-3">
                      <p className="text-xs font-black uppercase tracking-wider text-sky-400 mb-1">{item.cat}</p>
                      <p className="text-white/40 text-sm font-medium italic">{item.skills}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/10 pt-5 space-y-4">
                <h3 className="text-lg font-black italic tracking-tighter text-violet-300">AI/ML Infrastructure</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { cat: "LLM Integration", skills: "OpenAI API, Claude API, Prompt engineering at scale" },
                    { cat: "RAG Systems", skills: "LangChain or LlamaIndex, Vector retrieval, Context augmentation" },
                    { cat: "Embeddings", skills: "OpenAI Embeddings, Vector storage (pgvector/Pinecone), Similarity algorithms" },
                    { cat: "Voice AI", skills: "Whisper (STT), TTS integration (ElevenLabs), Audio streaming" },
                    { cat: "Scoring Models", skills: "Custom match scoring, Hunter/talent quality algorithms" },
                    { cat: "Automation", skills: "Background job queues, Cron systems, n8n/Make workflows" },
                    { cat: "Multi-agent", skills: "CrewAI/AutoGen for recruitment workflow automation" },
                  ].map((item) => (
                    <div key={item.cat} className="glass-sm p-3">
                      <p className="text-xs font-black uppercase tracking-wider text-violet-300 mb-1">{item.cat}</p>
                      <p className="text-white/40 text-sm font-medium italic">{item.skills}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <h3 className="text-lg font-black italic tracking-tighter text-white mb-3">System Design</h3>
                <ul className="space-y-2 text-white/40 font-medium italic">
                  <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">•</span> Event-driven architecture (webhooks, triggers)</li>
                  <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">•</span> Microservices / Serverless patterns</li>
                  <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">•</span> ETL pipelines for data sync</li>
                  <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">•</span> Content moderation AI</li>
                  <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">•</span> Recommendation engines</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 🤖 AI Tools & Platforms */}
          <section id="ai-tools" className="scroll-mt-32">
            <div className="glass p-6 sm:p-8 hover:border-white/20 transition-all duration-500 space-y-5">
              <h2 className="text-xl sm:text-2xl font-black italic tracking-tighter text-white">🤖 AI Tools & Platforms</h2>

              <div className="space-y-4">
                <h3 className="text-lg font-black italic tracking-tighter text-emerald-400">Core LLM Stack</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { tool: "OpenAI (GPT-4o)", use: "Job analysis, profile evaluation, report generation" },
                    { tool: "Claude 3.5 Sonnet", use: "Long-context CV parsing, detailed evaluation reports" },
                    { tool: "Ollama", use: "Local models for cost reduction and data privacy" },
                    { tool: "Whisper API", use: "Interview practice transcription" },
                    { tool: "ElevenLabs", use: "AI interviewer voice synthesis" },
                  ].map((item) => (
                    <div key={item.tool} className="glass-sm p-3">
                      <p className="text-xs font-black uppercase tracking-wider text-emerald-400 mb-1">{item.tool}</p>
                      <p className="text-white/40 text-sm font-medium italic">{item.use}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/10 pt-5 space-y-4">
                <h3 className="text-lg font-black italic tracking-tighter text-orange-400">AI Orchestration</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { tool: "LangChain", use: "RAG pipelines for talent-job matching" },
                    { tool: "LlamaIndex", use: "Company review indexing, talent profile retrieval" },
                    { tool: "CrewAI / AutoGen", use: "Multi-agent recruitment workflows" },
                    { tool: "n8n", use: "Referral request → search → score → notify automation" },
                    { tool: "pgvector", use: "Postgres-native vector storage" },
                  ].map((item) => (
                    <div key={item.tool} className="glass-sm p-3">
                      <p className="text-xs font-black uppercase tracking-wider text-orange-400 mb-1">{item.tool}</p>
                      <p className="text-white/40 text-sm font-medium italic">{item.use}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 🌍 What You'll Actually Build */}
          <section id="what-youll-build" className="scroll-mt-32">
            <div className="glass p-6 sm:p-8 hover:border-white/20 transition-all duration-500 space-y-5">
              <h2 className="text-xl sm:text-2xl font-black italic tracking-tighter text-white">🌍 What You'll Actually Build</h2>

              <div className="space-y-4">
                <h3 className="text-lg font-black italic tracking-tighter text-secondary">1. AI Matching Engine</h3>
                <div className="glass-sm p-4 font-mono text-xs text-white/40">
                  Input: Job description + Hunter requirements<br />
                  ↓<br />
                  Vector embedding + semantic analysis<br />
                  ↓<br />
                  Query talent database (500+ profiles)<br />
                  ↓<br />
                  Score matches (skills × culture × growth)<br />
                  ↓<br />
                  Return top 10 with reasoning
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 space-y-3">
                <h3 className="text-lg font-black italic tracking-tighter text-violet-300">2. Real-Time Referral System</h3>
                <ul className="space-y-2 text-white/40 font-medium italic">
                  <li className="flex items-start gap-2"><span className="text-violet-300 mt-0.5">•</span> WebSocket chat between referrer and talent</li>
                  <li className="flex items-start gap-2"><span className="text-violet-300 mt-0.5">•</span> AI analysis of referral request</li>
                  <li className="flex items-start gap-2"><span className="text-violet-300 mt-0.5">•</span> Automated talent database search</li>
                  <li className="flex items-start gap-2"><span className="text-violet-300 mt-0.5">•</span> Match scoring and notification pipeline</li>
                </ul>
              </div>

              <div className="border-t border-white/10 pt-4 space-y-3">
                <h3 className="text-lg font-black italic tracking-tighter text-emerald-400">3. Interview Practice AI</h3>
                <ul className="space-y-2 text-white/40 font-medium italic">
                  <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">•</span> Voice AI: Speech-to-text transcription (Whisper)</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">•</span> GPT-4 evaluation of answers</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">•</span> Scoring: Communication, content, confidence</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">•</span> TTS feedback with ElevenLabs voice</li>
                </ul>
              </div>

              <div className="border-t border-white/10 pt-4 space-y-3">
                <h3 className="text-lg font-black italic tracking-tighter text-sky-400">4. Community Intelligence</h3>
                <ul className="space-y-2 text-white/40 font-medium italic">
                  <li className="flex items-start gap-2"><span className="text-sky-400 mt-0.5">•</span> Content moderation (toxic post detection)</li>
                  <li className="flex items-start gap-2"><span className="text-sky-400 mt-0.5">•</span> Post/comment recommendation engine</li>
                  <li className="flex items-start gap-2"><span className="text-sky-400 mt-0.5">•</span> Coffee chat partner suggestions (vector similarity)</li>
                  <li className="flex items-start gap-2"><span className="text-sky-400 mt-0.5">•</span> Hunter community trust scoring</li>
                </ul>
              </div>

              <div className="border-t border-white/10 pt-4 space-y-3">
                <h3 className="text-lg font-black italic tracking-tighter text-orange-400">5. Automated Evaluation Pipeline</h3>
                <div className="glass-sm p-4 font-mono text-xs text-white/40">
                  Talent submits profile<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;↓<br />
                  CV parsing + vectorization<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;↓<br />
                  AI analysis (skills, gaps, potential)<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;↓<br />
                  Generate structured report + alien traits<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;↓<br />
                  Score and route (Top 1%, 10%, etc.)
                </div>
              </div>
            </div>
          </section>

          {/* 💫 Who You Are */}
          <section id="who-you-are" className="scroll-mt-32">
            <div className="glass p-6 sm:p-8 hover:border-white/20 transition-all duration-500 space-y-5">
              <h2 className="text-xl sm:text-2xl font-black italic tracking-tighter text-white">💫 Who You Are</h2>

              <div className="space-y-4">
                <h3 className="text-lg font-black italic tracking-tighter text-secondary">You're the kind of human being who:</h3>
                <ul className="space-y-2 text-white/40 font-medium italic">
                  <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">•</span> ✨ Has a purpose / intention</li>
                  <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">•</span> 💚 Loves yourself & kinda does for others too</li>
                  <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">•</span> 🎨 Has an obsession with building ARCHITECTURE & ART</li>
                </ul>
                <p className="text-white/40 font-medium italic leading-relaxed">
                  (Both obsessions could be in paintings, buildings, systems, designs, tech, and human minds. Or whatever — how do you perceive it?)
                </p>
              </div>

              <div className="border-t border-white/10 pt-5 space-y-3">
                <h3 className="text-lg font-black italic tracking-tighter text-white">🧑‍🚀 Co-Founder — Junior to Senior (Seniority Agnostic)</h3>
                <p className="text-white/40 font-medium italic leading-relaxed">
                  We're looking for a Tech Co-Founder who is curious, kind, and grounded in humanity. Someone who enjoys building, experimenting, and turning chaos into systems that actually help people.
                </p>
                <p className="text-white/40 font-medium italic leading-relaxed">
                  You don't need to be perfect at everything — but you should be strong in at least one area and excited to grow into more.
                </p>
              </div>
            </div>
          </section>

          {/* 🧰 Tools We Use (Vibe Coding Stack) */}
          <section id="tools-we-use" className="scroll-mt-32">
            <div className="glass p-6 sm:p-8 hover:border-white/20 transition-all duration-500 space-y-5">
              <h2 className="text-xl sm:text-2xl font-black italic tracking-tighter text-white">🧰 Tools We Use (Vibe Coding Stack)</h2>

              <div className="space-y-4">
                <h3 className="text-lg font-black italic tracking-tighter text-sky-400">Primary Development</h3>
                <ul className="space-y-2 text-white/40 font-medium italic">
                  <li className="flex items-start gap-2"><span className="text-sky-400 mt-0.5">•</span> <strong>Cursor</strong> — AI coding IDE (our main environment)</li>
                  <li className="flex items-start gap-2"><span className="text-sky-400 mt-0.5">•</span> <strong>Supabase</strong> — Database, Auth, Realtime, Edge Functions</li>
                  <li className="flex items-start gap-2"><span className="text-sky-400 mt-0.5">•</span> <strong>Netlify</strong> — Hosting, Serverless functions</li>
                  <li className="flex items-start gap-2"><span className="text-sky-400 mt-0.5">•</span> <strong>TypeScript</strong> — Everything</li>
                </ul>
              </div>

              <div className="border-t border-white/10 pt-5 space-y-4">
                <h3 className="text-lg font-black italic tracking-tighter text-violet-300">AI & Automation</h3>
                <ul className="space-y-2 text-white/40 font-medium italic">
                  <li className="flex items-start gap-2"><span className="text-violet-300 mt-0.5">•</span> OpenAI API, Claude API, Ollama</li>
                  <li className="flex items-start gap-2"><span className="text-violet-300 mt-0.5">•</span> LangChain / LlamaIndex</li>
                  <li className="flex items-start gap-2"><span className="text-violet-300 mt-0.5">•</span> n8n for workflow automation</li>
                  <li className="flex items-start gap-2"><span className="text-violet-300 mt-0.5">•</span> Whisper, ElevenLabs for voice</li>
                </ul>
              </div>

              <div className="border-t border-white/10 pt-5 space-y-4">
                <h3 className="text-lg font-black italic tracking-tighter text-emerald-400">Collaboration</h3>
                <ul className="space-y-2 text-white/40 font-medium italic">
                  <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">•</span> Notion (docs, specs)</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">•</span> Airtable (admin, data ops)</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">•</span> GitHub (obviously)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 💰 Revenue & Equity */}
          <section id="revenue-equity" className="scroll-mt-32">
            <div className="glass p-6 sm:p-8 hover:border-white/20 transition-all duration-500 space-y-5">
              <h2 className="text-xl sm:text-2xl font-black italic tracking-tighter text-white">💰 Revenue & Equity</h2>

              <div className="space-y-3">
                <h3 className="text-lg font-black italic tracking-tighter text-secondary">Ownership Model: Contribution-Based</h3>
                <p className="text-white/40 font-medium italic">
                  You estimate hours → Define hourly rate → Compare with 2 active peers → Split percentages
                </p>
              </div>

              <div className="border-t border-white/10 pt-4">
                <p className="text-white/40 font-medium italic mb-3"><strong>Ownership covers:</strong></p>
                <ul className="space-y-2 text-white/40 font-medium italic">
                  <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">•</span> 💰 Revenue share</li>
                  <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">•</span> 📈 Equity (vesting)</li>
                  <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">•</span> 🏢 Asset rights</li>
                  <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">•</span> ⚖️ Decision rights</li>
                </ul>
                <p className="text-white/40 font-medium italic mt-3">
                  Everything is based on <strong>real contribution</strong> — not titles or seniority.
                </p>
              </div>
            </div>
          </section>

          {/* ⏱ Commitment & Work Style */}
          <section id="commitment" className="scroll-mt-32">
            <div className="glass p-6 sm:p-8 hover:border-white/20 transition-all duration-500 space-y-4">
              <h2 className="text-xl sm:text-2xl font-black italic tracking-tighter text-white">⏱ Commitment & Work Style</h2>

              <div className="space-y-2 text-white/40 font-medium italic">
                <p><strong>📅 Commitment:</strong> Minimum 10 hours per week</p>
                <p><strong>💬 Communication:</strong> Async | Sync — flexible, outcome-driven</p>
                <p><strong>🌐 Commute Model:</strong> Hybrid (mainly remote)</p>
                <p><strong>☕ On-site:</strong> Coffee chats from time to time are preferred</p>
                <p><strong>📍 Location:</strong> Anywhere in MENA (Minya & Cairo - Egypt preferred)</p>
              </div>
            </div>
          </section>

          {/* 🎁 Bonus Points */}
          <section id="bonus-points" className="scroll-mt-32">
            <div className="glass p-6 sm:p-8 hover:border-white/20 transition-all duration-500 space-y-4">
              <h2 className="text-xl sm:text-2xl font-black italic tracking-tighter text-white">🎁 Bonus Points</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { points: "+5", desc: "Based in Egypt" },
                  { points: "+10", desc: "Live in Cairo" },
                  { points: "+25", desc: "Live in Minia / Samalout (1hr radius)" },
                  { points: "+25", desc: "Top 25% AALN Assessment score" },
                  { points: "+25", desc: "Genuine interest in education / employment / wealth / wellbeing" },
                ].map((item) => (
                  <div key={item.desc} className="glass-sm p-3 flex items-center gap-3">
                    <span className="text-lg font-black text-secondary">{item.points}</span>
                    <span className="text-white/40 text-sm font-medium italic">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 🚀 What We Promise */}
          <section id="what-we-promise" className="scroll-mt-32">
            <div className="glass p-6 sm:p-8 hover:border-white/20 transition-all duration-500 space-y-4">
              <h2 className="text-xl sm:text-2xl font-black italic tracking-tighter text-white">🚀 What We Promise</h2>
              <ol className="space-y-3 text-white/40 font-medium italic">
                <li className="flex items-start gap-2"><span className="text-secondary mt-0.5 font-black">1.</span> <strong>Real ownership</strong> — Not employee equity, co-founder equity</li>
                <li className="flex items-start gap-2"><span className="text-secondary mt-0.5 font-black">2.</span> <strong>Learning by doing</strong> — You'll build things you haven't built before</li>
                <li className="flex items-start gap-2"><span className="text-secondary mt-0.5 font-black">3.</span> <strong>Human-first culture</strong> — We care about the people we serve</li>
                <li className="flex items-start gap-2"><span className="text-secondary mt-0.5 font-black">4.</span> <strong>Revenue from day one</strong> — We're not "pre-revenue hoping for VC"</li>
                <li className="flex items-start gap-2"><span className="text-secondary mt-0.5 font-black">5.</span> <strong>Chaos with purpose</strong> — You'll have autonomy to architect solutions</li>
              </ol>
            </div>
          </section>

          {/* 📝 How to Apply */}
          <section id="how-to-apply" className="scroll-mt-32">
            <div className="glass p-6 sm:p-8 hover:border-white/20 transition-all duration-500 space-y-5">
              <h2 className="text-xl sm:text-2xl font-black italic tracking-tighter text-white">📝 How to Apply</h2>

              <div className="space-y-3">
                <h3 className="text-lg font-black italic tracking-tighter text-secondary">Application Form (Complete All):</h3>
                <a 
                  href="https://tally.so/r/1AWrkL" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-black uppercase tracking-widest text-xs italic hover:bg-secondary/80 transition-all"
                >
                  🔗 Submit here: https://tally.so/r/1AWrkL
                </a>
              </div>

              <div className="border-t border-white/10 pt-5 space-y-4">
                <h3 className="text-lg font-black italic tracking-tighter text-white">If you passed the application stage, expect to share and talk about:</h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-white/40 font-medium italic mb-2"><strong>1. Build & Share Something (Required)</strong></p>
                    <ul className="space-y-1 text-white/40 font-medium italic text-sm pl-4">
                      <li>• A link to one backend system you've built (GitHub, demo, or documentation)</li>
                      <li>• What problem did it solve?</li>
                      <li>• What technologies did you use?</li>
                      <li>• How did it scale?</li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-white/40 font-medium italic mb-2"><strong>2. AI Feature Deep Dive (Required)</strong></p>
                    <ul className="space-y-1 text-white/40 font-medium italic text-sm pl-4">
                      <li>• Describe one AI feature you built end-to-end</li>
                      <li>• Architecture diagram or explanation</li>
                      <li>• Tools and APIs used</li>
                      <li>• Outcomes: metrics, impact, lessons learned</li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-white/40 font-medium italic mb-2"><strong>3. Your Commitment (Required)</strong></p>
                    <ul className="space-y-1 text-white/40 font-medium italic text-sm pl-4">
                      <li>• Weekly hours you can commit</li>
                      <li>• Your hourly rate (USD)</li>
                      <li>• Preferred work schedule</li>
                      <li>• Time zone</li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-white/40 font-medium italic mb-2"><strong>4. The Human Questions (Required)</strong></p>
                    <ul className="space-y-1 text-white/40 font-medium italic text-sm pl-4">
                      <li>• Why do you give a damn about fixing employment?</li>
                      <li>• What does "architecture as art" mean to you?</li>
                      <li>• One thing you've built that made someone's life better (doesn't have to be code)</li>
                      <li>• Link to your portfolio, GitHub, or anything that shows your craft</li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-white/40 font-medium italic mb-2"><strong>5. Quick Technical Assessment (Optional but Recommended)</strong></p>
                    <ul className="space-y-1 text-white/40 font-medium italic text-sm pl-4">
                      <li>• How would you design a vector search system to match 500 talent profiles with 3,000 job postings in under 100ms?</li>
                      <li>• How would you handle real-time chat with 100+ concurrent users on a serverless architecture?</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-5">
                <p className="text-white/60 font-medium italic text-center">
                  💫 <strong>"We're not building a job board. We're building the infrastructure that makes human potential visible, measurable, and matched. Join us if you want to architect lives, not just databases."</strong>
                </p>
                <p className="text-center text-white/40 font-medium italic mt-3">
                  <strong>ALIENs Venture</strong> — <em>Code × AI × No-Code</em>
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 pt-4">
                <Link to="/human" className="btn btn-outline w-full text-center">Meet Ahmad (Human)</Link>
                <Link to="/career" className="btn btn-outline w-full text-center">Career Journey</Link>
                <Link to="/handbook" onClick={onBackToHandbook} className="btn btn-outline w-full text-center sm:col-span-2">
                  ← Back to ALIENs Venture Handbook
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const Handbook = () => {
  const { blocks, listItems, tags, loading, updateListItem, deleteListItem, addListItem, addTag, deleteTag } = useContent("handbook");
  
  const getBlock = (key: string) => blocks.find((b: any) => b.block_key === key);
  const getList = (key: string) => listItems[key] || [];
  const getTags = (key: string) => tags[key] || [];
  
  if (loading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
  }
  
  const heroBlock = getBlock("hero");
  const principlesBlock = getBlock("principles");
  const mentalModelsBlock = getBlock("mental_models");
  const [sub, setSub] = useState("intro");
  const subs: SubNavItem[] = [
    "intro",
    "what we do",
    "how it started",
    "where we are",
    "where we're going",
    "the product",
    { id: "hiring-co-founder", label: "🚀 Hiring Co-Founder", className: "normal-case" },
  ];

  useEffect(() => {
    document.title = "Startup Handbook — Ahmad Abdelaziz";
  }, []);

  const backToHandbook = () => {
    setSub("intro");
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="section-container !py-0">
          {/* Header */}
          <div className="mb-6">
            <InlineEdit
              sectionId="handbook"
              blockKey="hero"
              field="title"
              content={heroBlock?.title || "Handbook"}
              className="text-3xl sm:text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white mb-3"
              as="h1"
            />
            <InlineEdit
              sectionId="handbook"
              blockKey="hero"
              field="content"
              content={heroBlock?.content || "Operating principles, mental models, and the frameworks I use to navigate life and build products."}
              className="text-white/30 font-medium italic"
            />
          </div>

          <SubNav items={subs} active={sub} onSelect={setSub} accentColor="text-secondary" />

          {/* INTRO */}
          {sub === "intro" && (
            <div className="space-y-6">
              <GlassCard title="Why we make it public" accentColor="text-secondary">
                <GlassBullets accentColor="text-secondary" items={[
                  "On a quest to build an authentic & thriving ecosystem for humanity — global talents & hiring managers, worldwide, MENA focused.",
                  "Help, inspire, and encourage everyone to build upon this or learn from our experiments.",
                  "We welcome any kind of contribution — feedback, suggestions, or raising your hand to build with us.",
                  "Kind of an open-source thing (to be updated).",
                  "You are welcome as a member, partner, shareholder, or co-founder.",
                ]} />
              </GlassCard>

              {/* Principles */}
              <div className="glass border-orange-500/20 overflow-hidden">
                <div className="px-6 sm:px-8 py-4 border-b border-white/10 flex items-center gap-2">
                  <InlineEdit
                    sectionId="handbook"
                    blockKey="principles"
                    field="icon"
                    content={principlesBlock?.icon || "📋"}
                    className="text-xl"
                  />
                  <InlineEdit
                    sectionId="handbook"
                    blockKey="principles"
                    field="title"
                    content={principlesBlock?.title || "Core Principles"}
                    className="text-xl font-black italic uppercase tracking-tighter text-white"
                    as="h3"
                  />
                </div>
                <div className="px-6 sm:px-8 py-5">
                  <EditableList
                    items={getList("principles")}
                    blockId={principlesBlock?.id}
                    accentColor="orange"
                    onUpdate={updateListItem}
                    onDelete={deleteListItem}
                    onAdd={addListItem}
                  />
                </div>
              </div>

              {/* Mental Models */}
              <div className="glass border-orange-500/20 overflow-hidden">
                <div className="px-6 sm:px-8 py-4 border-b border-white/10">
                  <InlineEdit
                    sectionId="handbook"
                    blockKey="mental_models"
                    field="title"
                    content={mentalModelsBlock?.title || "Mental Models"}
                    className="text-xl font-black italic uppercase tracking-tighter text-white"
                    as="h3"
                  />
                </div>
                <div className="px-6 sm:px-8 py-5">
                  <EditableTags
                    items={getTags("mental_models")}
                    blockId={mentalModelsBlock?.id}
                    accentColor="orange"
                    onAdd={addTag}
                    onDelete={deleteTag}
                  />
                </div>
              </div>

              {/* Ahmad */}
              <div className="glass overflow-hidden hover:border-violet-300/30 transition-all duration-500">
                <div className="px-6 sm:px-8 py-4 border-b border-white/10">
                  <h3 className="text-xl font-black italic uppercase tracking-tighter text-violet-300">Ahmad Abdelaziz</h3>
                  <p className="text-white/30 text-sm font-medium italic mt-0.5">Founder · Product & Community Manager · Started 29 July 2024</p>
                </div>
                <div className="px-6 sm:px-8 py-5 space-y-4">
                  <p className="text-white/40 font-medium italic border-l-2 border-violet-300/30 pl-4">
                    "Desperate, scarred but never surrendered — back to the battlefield over and over."
                  </p>
                  <GlassBullets accentColor="text-violet-300" items={[
                    "Started this to break into product management — the first time choosing my own path.",
                    "Building a portfolio, connections, and a network of peers for my own growth — and for yours.",
                    "Solving real problems, making people happy, finding gratitude, and making more $$ (me and you too).",
                    "I do it for me ✖️🧪 — Heisenberg. And I'd do it every day — for myself & my people.",
                    "Today it feels like home 🏠 — and even better, like king in the north 👑❄️",
                    "I want to: Learn 📚 · Earn 💸 · Survive 💪 · Thrive 🌱 — finding financial stability & wellbeing together.",
                  ]} />
                </div>
              </div>

              {/* Hussien */}
              <div className="glass overflow-hidden hover:border-emerald-400/30 transition-all duration-500">
                <div className="px-6 sm:px-8 py-4 border-b border-white/10">
                  <h3 className="text-xl font-black italic uppercase tracking-tighter text-emerald-400">Hussien M Almahdy</h3>
                  <p className="text-white/30 text-sm font-medium italic mt-0.5">Front-End Developer & Designer · Joined 3 Oct 2025</p>
                </div>
                <div className="px-6 sm:px-8 py-5 space-y-4">
                  <p className="text-white/40 font-medium italic border-l-2 border-emerald-400/30 pl-4">
                    "Human at the first stage — loves to go on adventures and wants to change the world."
                  </p>
                  <GlassBullets accentColor="text-emerald-400" items={[
                    "Joined ALIENs Venture to learn at the first stage.",
                    "By the time — why not earn?",
                    "Realized there's a connection between learn, earn, thrive, and survive — no matter how you arrange it.",
                  ]} />
                </div>
              </div>

              {/* One-liner */}
              <GlassCard title="ALIENs Venture" accentColor="text-secondary" subtitle="In 3 seconds">
                <p className="text-xl sm:text-2xl font-black italic text-white mb-2">"Y Combinator for Humanity."</p>
                <p className="text-white/40 font-medium italic leading-relaxed">
                  A community-led, AI Human Venture combining knowledge and humanity principles with AI — to architect concepts that turn humanity's chaos and uncertainty into victories.
                </p>
              </GlassCard>

              <GlassCard title="Our Style" accentColor="text-pink-400">
                <p className="text-white/40 font-medium italic leading-relaxed">
                  "Crafting with good taste & high standards — like the blood of House Targaryen and the honor of House Stark."
                </p>
              </GlassCard>
            </div>
          )}

          {/* WHAT WE DO */}
          {sub === "what we do" && (
            <div className="space-y-6">
              <GlassCard title="3-Second Brief" accentColor="text-secondary">
                <p className="text-white/90 font-bold italic text-lg mb-2">
                  Prototyping in Employment and Wellbeing — building AALN and AALN OS.
                </p>
                <p className="text-white/40 font-medium italic leading-relaxed">
                  AI Copilot for Authentic · Curious · Kind humanity (talents & hiring managers) — worldwide.<br />
                  Imagine ChatGPT being your bestie as a Sr. Recruiter with psychometric competencies.
                </p>
              </GlassCard>

              <GlassCard title="Problem" accentColor="text-pink-400">
                <GlassBullets accentColor="text-pink-400" items={[
                  "Across MENA, both talent and hiring managers face hidden job markets, fragmented information, low trust, and unclear growth paths.",
                  "Constant uncertainty in employment, financial stability, and wellbeing.",
                  "No unified, human-centered system that guides people or companies with clarity and depth.",
                  "Psychological layer: chaos, uncertainty, self-doubt, unclear learning paths, authenticity gaps — for both B2C and B2B.",
                ]} />
              </GlassCard>

              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-4">Value</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Talents (B2C)", accent: "text-violet-300",
                      items: ["Learn: Personal AI Tutor — research & execution approach","Earn: Match and apply to USD-paying jobs, gigs, and paid learning","Survive: AI-matched peer-to-peer mentorship with verified humanity","Thrive: Custom value creation, roadmaps, rituals, meetups"],
                    },
                    {
                      title: "Hunters (B2B)", accent: "text-emerald-400",
                      items: ["Hunt: Top 1% psychometrically vetted talent referrals","Onboard: New hire in 3 clicks, totally compliant anywhere","Pay: Pay remote employees in USD in seconds","Accelerate: AI Sr. Recruiter — better JDs, faster hiring, global employer branding"],
                    },
                  ].map((v) => (
                    <GlassCard key={v.title} title={v.title} accentColor={v.accent}>
                      <GlassBullets accentColor={v.accent} items={v.items} />
                    </GlassCard>
                  ))}
                </div>
              </div>

              <GlassCard title="Institutions & Stakeholders (B2B/B2G)" accentColor="text-sky-400">
                <GlassBullets accentColor="text-sky-400" items={[
                  "Structured AI evaluation framework (AALN) for universities, academies, NGOs, and innovation hubs.",
                  "Talent readiness and employability insights dashboards.",
                  "API / integration into existing institutional systems and programs.",
                ]} />
              </GlassCard>

              <GlassCard title="Positioning — A new blend of:" accentColor="text-secondary">
                <div className="flex flex-wrap gap-2">
                  {["LinkedIn","Toptal","Contra","Andela","Upwork","Remote.com"].map((p) => (
                    <span key={p} className="px-3 py-1 bg-white/5 text-white/40 rounded-full text-xs font-bold border border-white/10">{p}</span>
                  ))}
                </div>
              </GlassCard>
            </div>
          )}

          {/* HOW IT STARTED */}
          {sub === "how it started" && (
            <div className="space-y-6">
              <GlassCard title="Community first — not platform first" accentColor="text-emerald-400">
                <GlassBullets accentColor="text-emerald-400" items={[
                  "Before writing a single line of code, the first iterations were validated using Notion, YouTube, Canva, and Google Meet.",
                  "$0 CAC strategy — continuous market research, real early validation, zero artificial growth.",
                ]} />
              </GlassCard>

              <div className="grid sm:grid-cols-2 gap-4">
                <GlassCard title="Talents connect for" accentColor="text-violet-300">
                  <GlassBullets accentColor="text-violet-300" items={["Clarity","Skill refinement","Career growth","Emotional & professional support"]} />
                </GlassCard>
                <GlassCard title="Startups connect for" accentColor="text-secondary">
                  <GlassBullets accentColor="text-secondary" items={["Hiring support","Market feedback","Talent access"]} />
                </GlassCard>
              </div>

              <GlassCard title="Phase 01 · Lean Community Stack" accentColor="text-orange-400" subtitle="Tools: Notion · YouTube · Canva · Google Meet">
                <div className="grid sm:grid-cols-2 gap-2 mb-3">
                  {["Career Hub","Job Board","Human Evaluation System","Hiring Referral Engine"].map((f) => (
                    <p key={f} className="flex items-center gap-2 text-white/40 font-medium italic">
                      <span className="text-primary">✓</span> {f}
                    </p>
                  ))}
                </div>
                <p className="text-white/25 text-sm font-medium italic">500 members · 5 global startups · authentic, trusted community</p>
              </GlassCard>

              <GlassCard title="Phase 02 · AALN AI Prototypes" accentColor="text-secondary">
                <p className="text-white/40 font-medium italic leading-relaxed">
                  Automated, AI-powered versions of the same four pillars — built on deeply understood, real human problems. 6 months of research & iteration.
                </p>
              </GlassCard>
            </div>
          )}

          {/* WHERE WE ARE */}
          {sub === "where we are" && (
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-4">Traction & Validation</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { v: "$2K", l: "Monetized · 100% margin" },
                    { v: "500+", l: "Signups (100+ top-tier)" },
                    { v: "30K+", l: "Platform visits" },
                    { v: "4.5K+", l: "Job applies" },
                    { v: "3K+", l: "Jobs sourced" },
                    { v: "2K+", l: "Companies sourced" },
                  ].map((m) => (
                    <div key={m.l} className="glass p-5 hover:border-primary/30 transition-all duration-500">
                      <div className="text-2xl sm:text-3xl font-black text-primary">{m.v}</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-white/20 mt-1.5 leading-[1.4]">{m.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              <GlassCard title="ROI Breakdown" accentColor="text-secondary">
                <div className="space-y-2 text-white/40 font-medium italic">
                  {[
                    "$1K — Closed-won partnerships: nsave.co + Athar Accelerator + stealth startup consultation",
                    "$1K — Winner prize @ Cairo AI Hackathon by Athar",
                    "$5K MRR pipeline (closed-lost): talent referrals $1.5K/mo · one-time $2K · academy program $1K + AALN AI subscription $2K",
                  ].map((line, i) => (
                    <p key={i} className="flex items-start gap-2">
                      <span className="text-secondary mt-1">$</span>
                      {line}
                    </p>
                  ))}
                </div>
              </GlassCard>

              <div className="grid sm:grid-cols-2 gap-4">
                <GlassCard title="Talents" accentColor="text-violet-300">
                  <GlassBullets accentColor="text-violet-300" items={["2 job placements · avg. $1K/mo · $8K total earnings","50+ interview replacements","20–50 talents secured 100+ interviews"]} />
                </GlassCard>
                <GlassCard title="Hunters" accentColor="text-emerald-400">
                  <GlassBullets accentColor="text-emerald-400" items={["10+ referral requests supported","5+ startups consulted on global remote hiring"]} />
                </GlassCard>
              </div>

              <GlassCard title="Working Prototype Stack" accentColor="text-sky-400">
                <div className="grid sm:grid-cols-3 gap-2">
                  {["Airtable","OpenAI","Softr","Lovable","n8n & Make","Claude"].map((t) => (
                    <span key={t} className="px-3 py-1.5 bg-sky-400/10 text-sky-400 rounded-full text-xs font-bold text-center">{t}</span>
                  ))}
                </div>
              </GlassCard>
            </div>
          )}

          {/* WHERE WE'RE GOING */}
          {sub === "where we're going" && (
            <div className="space-y-6">
              <GlassCard title="Next" accentColor="text-secondary">
                <GlassBullets accentColor="text-secondary" items={[
                  "Turning the working prototype into a fully functional MVP.",
                  "Scaling validated features and functionality.",
                ]} />
              </GlassCard>

              <GlassCard title="Market Positioning" accentColor="text-pink-400" subtitle="We compete with">
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Upwork","Andela","Manara","Glassdoor","Remote.com","LinkedIn","HireEZ","Eightfold"].map((c) => (
                    <span key={c} className="px-3 py-1 bg-white/5 text-white/35 border border-white/10 rounded-full text-xs font-bold">{c}</span>
                  ))}
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-pink-400 mb-3">We differ because</p>
                <GlassBullets accentColor="text-pink-400" items={[
                  "We evaluate humans before resumes.",
                  "We offer a real AI mentor, not just job matching.",
                  "Community-led · Zero paid CAC.",
                  "We merge employment, mental wellbeing, and financial enablement into one ecosystem.",
                ]} />
              </GlassCard>

              <GlassCard title="Growth Strategy" accentColor="text-emerald-400" subtitle="Lean & Community-Led">
                <GlassBullets accentColor="text-emerald-400" items={[
                  "Content-first education.",
                  "Community-driven hiring.",
                  "Zero paid ads.",
                  "Real human relationships.",
                  "Shareholder model: pay talents who secure interviews a percentage · enable talents to monetize expertise.",
                  "Continuous loop: Test → Improve → Repeat.",
                ]} />
              </GlassCard>

              <GlassCard title="90-Day Execution Focus" accentColor="text-secondary">
                <p className="text-white/40 font-medium italic leading-relaxed">
                  Refine AI evaluation prototypes · close 3+ partnerships · reach $5K MRR · ship the MVP version of AALN OS for hunters.
                </p>
              </GlassCard>
            </div>
          )}

          {/* THE PRODUCT */}
          {sub === "the product" && (
            <div className="space-y-6">
              {/* ALIEN AI — Talent Hub */}
              <div className="glass overflow-hidden hover:border-violet-300/30 transition-all duration-500">
                <div className="px-6 sm:px-8 py-5 border-b border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-violet-300 mb-1">01 · ALIEN AI</p>
                  <h3 className="text-xl sm:text-2xl font-black italic uppercase tracking-tighter text-white">The Talent Hub 👽</h3>
                  <p className="text-white/30 text-sm font-medium italic mt-0.5">Immersive, multi-layered environment for career development, mental wellbeing, and financial growth</p>
                </div>
                <div className="px-6 sm:px-8 py-6 space-y-5">
                  {[
                    { title: "Intelligent Career Board & Hub", accent: "text-violet-300", items: ["Jobs & Companies Board — vetted jobs and company profiles","Job Hunting Hub — centralized space for active hunting ops"] },
                    { title: "AI Career Mentor Suite", accent: "text-pink-400", items: ["Pre-Interview Prep — specialized flows for upcoming interviews","Practice Interviews — mock interview environment","Interview & Offers Trackers — track progress, compare offers"] },
                    { title: "Virtual Identity", accent: "text-sky-400", items: ["CV Dashboard — create, manage, and preview optimized resumes","Portfolio Builder — Virtual Portfolio beyond a standard resume"] },
                    { title: "Career Academy", accent: "text-emerald-400", items: ["Internal LMS — tutorials, insights, course details, and interactive lesson views"] },
                    { title: "Mentor Ecosystem", accent: "text-secondary", items: ["Talents can transition into mentors — Mentor Handbook, public/private handbooks, mentor reports"] },
                    { title: "Community Rituals & Wellbeing", accent: "text-orange-400", items: ["Community Meetups · Find a Peer · P2P Chat · Coffee Chat Requests · Talks · Diaries · Newsletters"] },
                    { title: "Alien Squad — Financial Tools", accent: "text-secondary", items: ["Interview Referrals — manage community referrals","Employment Contracts & Earnings — contracts, account cards, personal earnings tracker"] },
                    { title: "AI Mode — Deep Psychological Integration", accent: "text-violet-300", items: ["AI coach for Learning Strategies · Emotions & Thoughts · Tasks & Responsibilities"] },
                  ].map((group) => (
                    <div key={group.title}>
                      <p className={`text-[10px] font-black uppercase tracking-widest ${group.accent} mb-2`}>{group.title}</p>
                      <GlassBullets accentColor={group.accent} items={group.items} />
                    </div>
                  ))}
                </div>
              </div>

              {/* ALIEN OS — Hunter Dashboard */}
              <div className="glass overflow-hidden hover:border-emerald-400/30 transition-all duration-500">
                <div className="px-6 sm:px-8 py-5 border-b border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1">02 · ALIEN OS</p>
                  <h3 className="text-xl sm:text-2xl font-black italic uppercase tracking-tighter text-white">The Hunter Dashboard 🎯</h3>
                  <p className="text-white/30 text-sm font-medium italic mt-0.5">ATS + sourcing tool + HR suite — powerhouse OS for startups and B2B users</p>
                </div>
                <div className="px-6 sm:px-8 py-6 space-y-5">
                  {[
                    { title: "Applicant Tracking System (ATS)", accent: "text-emerald-400", items: ["Job Pipelines & Kanban Boards — track candidate flows","Candidate Profiles & Hired Trackers","Evaluation Queue — manage pending assessments"] },
                    { title: "Advanced Evaluation Engine", accent: "text-sky-400", items: ["Scenario 01 (Intake) — upload CVs and run initial AI analysis","Scenario 02 (Deep Assessment) — deep analytics, evaluation kanban, AI-driven actions"] },
                    { title: "Company Management", accent: "text-secondary", items: ["Company Board & Profiles — internal + public-facing employer branding profile","Internal Feedback Loop — data and feedback before going to market"] },
                    { title: "Active Sourcing — Hunt & Accelerate", accent: "text-orange-400", items: ["Accelerate Handbook & Squad Viewer — verified talent pools","Referral Requests — request referrals from Alien Squad directly"] },
                    { title: "Global HR Operations — Onboard & Pay", accent: "text-violet-300", items: ["Add & Manage Contractors — integrated global view","Add & Manage Global Payments — financial portals"] },
                    { title: "Hunter AI Mode", accent: "text-emerald-400", items: ["B2B AI copilots: Company Mentor · Hunter Mentor · Market Intelligence"] },
                  ].map((group) => (
                    <div key={group.title}>
                      <p className={`text-[10px] font-black uppercase tracking-widest ${group.accent} mb-2`}>{group.title}</p>
                      <GlassBullets accentColor={group.accent} items={group.items} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Infrastructure */}
              <div className="glass overflow-hidden hover:border-secondary/30 transition-all duration-500">
                <div className="px-6 sm:px-8 py-5 border-b border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-1">03 · Infrastructure</p>
                  <h3 className="text-xl sm:text-2xl font-black italic uppercase tracking-tighter text-white">Core Infrastructure & Onboarding 🏗️</h3>
                </div>
                <div className="px-6 sm:px-8 py-6">
                  <GlassBullets accentColor="text-secondary" items={[
                    "Split Onboarding — separate funnels for OnboardingAlien vs. OnboardingHunter.",
                    "Quick Setup Flows — frictionless paths to get verified talents and hunters into the app immediately.",
                    "Deep Integrations — specialized sub-pages including dedicated nsave.co integration.",
                  ]} />
                </div>
              </div>
            </div>
          )}

          {/* HIRING CO-FOUNDER */}
          {sub === "hiring-co-founder" && <HiringCoFounder onBackToHandbook={backToHandbook} />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Handbook;
