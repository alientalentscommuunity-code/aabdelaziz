import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SweetSpiceNavbar from '@/components/SweetSpiceNavbar';

export default function SweetSpice() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Pink ambient glow at top */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(244,114,182,0.12), transparent 70%)'
          }}
        />
      </div>

      <Navbar />

      <main className="relative z-10 pt-28 pb-16 px-6">
        <div className="max-w-4xl mx-auto space-y-24">

          {/* SECTION A — WHY THIS EXISTS (Hero) */}
          <section className="text-center space-y-8 pt-8">
            <p className="text-[10px] font-black uppercase tracking-widest text-pink-400">
              🌶️ SWEET SPICE
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.9] text-white">
              Not Just Business.<br/>
              <span className="text-pink-400">A way of living.</span><br/>
              A space for connection.<br/>
              Intentional. Private. Real.
            </h1>
            <div className="max-w-2xl mx-auto space-y-6">
              <p className="text-lg sm:text-xl font-medium italic text-white/60 leading-relaxed whitespace-pre-line">
                I am a builder. A product manager. A founder. Someone who has spent years getting clear — financially, professionally, personally. I have been intentional about not rushing into marriage before I was ready.

That time is over.

I am ready. Mentally. Emotionally. And instead of leaving the search to chance, apps, or social circles that keep delivering the wrong people — I am doing what I do best: architecting the thing I want with intention and craft.
              </p>
            </div>
            <p className="text-base font-bold italic text-pink-400/80 max-w-xl mx-auto">
              The right woman is not found in an algorithm. She is found when she stumbles across something real and thinks — wait, this is actually me.
            </p>
          </section>

          {/* SECTION B — THE THREE UNIVERSES */}
          <section className="space-y-12">
            <p className="text-[10px] font-black uppercase tracking-widest text-pink-400/60 text-center">
              THE THREE UNIVERSES
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Aliens Career */}
              <Link to="/career-galaxy" className="group">
                <div className="glass border-green-500/20 p-8 rounded-2xl h-full hover:border-green-500/40 transition-all duration-300">
                  <div className="space-y-4">
                    <h3 className="text-lg font-black uppercase tracking-tight text-green-400 block">
                      🚀 Aliens Career Galaxy
                    </h3>
                    <p className="text-sm text-white/50 font-medium italic">
                      Career galaxy for talents, hiring managers, and institutions across MENA and emerging markets.
                    </p>
                  </div>
                </div>
              </Link>

              {/* Sweet & Spicy */}
              <Link to="/sweet-spice" className="group">
                <div className="glass border-pink-500/20 p-8 rounded-2xl h-full hover:border-pink-500/40 transition-all duration-300">
                  <div className="space-y-4">
                    <h3 className="text-lg font-black uppercase tracking-tight text-pink-400 block">
                      🌶️ Sweet & Spicy
                    </h3>
                    <p className="text-sm text-white/50 font-medium italic">
                      Intentional connection space. A private universe for the right woman to find something real.
                    </p>
                  </div>
                </div>
              </Link>

              {/* Human Angel */}
              <Link to="/human-angel" className="group">
                <div className="glass border-violet-500/20 p-8 rounded-2xl h-full hover:border-violet-500/40 transition-all duration-300">
                  <div className="space-y-4">
                    <h3 className="text-lg font-black uppercase tracking-tight text-violet-400 block">
                      👼 Human Angel
                    </h3>
                    <p className="text-sm text-white/50 font-medium italic">
                      Coming soon. A space for meaningful human connection and support.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* SECTION C — HOW THIS WORKS */}
          <section className="space-y-12">
            <p className="text-[10px] font-black uppercase tracking-widest text-pink-400/60 text-center">
              HOW THIS WORKS
            </p>
            
            <div className="space-y-6">
              <div className="glass border-pink-500/10 p-6 rounded-2xl">
                <p className="text-white/80 font-medium">
                  <span className="text-pink-400 font-black">1.</span> Browse the spaces — Each universe has its own energy, purpose, and invitation.
                </p>
              </div>
              <div className="glass border-pink-500/10 p-6 rounded-2xl">
                <p className="text-white/80 font-medium">
                  <span className="text-pink-400 font-black">2.</span> Feel the resonance — If something calls to you, trust that. This is built for alignment, not conversion.
                </p>
              </div>
              <div className="glass border-pink-500/10 p-6 rounded-2xl">
                <p className="text-white/80 font-medium">
                  <span className="text-pink-400 font-black">3.</span> Enter with intention — Whether you are here for career, connection, or curiosity — show up fully.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION D — CTA */}
          <section className="text-center space-y-8">
            <h2 className="text-3xl sm:text-4xl font-black italic uppercase tracking-tighter text-white">
              Ready to explore?
            </h2>
            <p className="text-lg font-medium italic text-white/60 max-w-xl mx-auto">
              The doors are open. The question is: which universe calls to you?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/sweet-spice/the-one"
                className="inline-flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-400 text-black font-black uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
              >
                <span>Meet The One</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/sweet-spice/open-book"
                className="inline-flex items-center justify-center gap-2 border border-pink-500/50 hover:border-pink-400 text-pink-400 font-bold uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-300"
              >
                <span>Read The Open Book</span>
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

          {/* SECTION B — THE THREE UNIVERSES */}
          <section className="space-y-12">
            <InlineEdit
              sectionId="sweet"
              blockKey="landing_three_universes"
              field="title"
              content={universesBlock?.title || "THE THREE UNIVERSES"}
              className="text-[10px] font-black uppercase tracking-widest text-pink-400/60 text-center"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Universe I — I */}
              <div className="glass border-pink-500/20 p-8 rounded-2xl space-y-4 hover:border-pink-500/40 transition-all duration-500">
                <InlineEdit
                  sectionId="sweet"
                  blockKey="universe_i"
                  field="icon"
                  content="Ⅰ"
                  className="text-4xl block mb-2"
                />
                <InlineEdit
                  sectionId="sweet"
                  blockKey="universe_i"
                  field="title"
                  content="I"
                  className="text-xl font-black italic uppercase tracking-tight text-pink-400 block"
                  as="h3"
                />
                <InlineEdit
                  sectionId="sweet"
                  blockKey="universe_i"
                  field="subtitle"
                  content="Who we each are. Separately. Fully."
                  className="text-sm font-black uppercase tracking-widest text-white/40 block"
                />
                <InlineEdit
                  sectionId="sweet"
                  blockKey="universe_i"
                  field="content"
                  content="Two whole people. Separate universes. One collision. Before partnership, before dynamic — there is the self. My self. Her self. Two whole people who choose each other not out of need but out of recognition."
                  className="text-sm text-white/50 font-medium italic leading-relaxed"
                  multiline
                />
              </div>

              {/* Universe II — Wifey */}
              <div className="glass border-pink-500/20 p-8 rounded-2xl space-y-4 hover:border-pink-500/40 transition-all duration-500">
                <InlineEdit
                  sectionId="sweet"
                  blockKey="universe_ii"
                  field="icon"
                  content="Ⅱ"
                  className="text-4xl block mb-2"
                />
                <InlineEdit
                  sectionId="sweet"
                  blockKey="universe_ii"
                  field="title"
                  content="Wifey"
                  className="text-xl font-black italic uppercase tracking-tight text-pink-400 block"
                  as="h3"
                />
                <InlineEdit
                  sectionId="sweet"
                  blockKey="universe_ii"
                  field="subtitle"
                  content="What we build together."
                  className="text-sm font-black uppercase tracking-widest text-white/40 block"
                />
                <InlineEdit
                  sectionId="sweet"
                  blockKey="universe_ii"
                  field="content"
                  content="Not a relationship. A life. Built on purpose. Not a role — a decision. Not a title — a daily act. Devotion and ownership — chosen, not assumed. Building a life worth talking about at 70."
                  className="text-sm text-white/50 font-medium italic leading-relaxed"
                  multiline
                />
              </div>

              {/* Universe III — My Lil Baby Lady Goddess */}
              <div className="glass border-pink-500/20 p-8 rounded-2xl space-y-4 hover:border-pink-500/40 transition-all duration-500">
                <InlineEdit
                  sectionId="sweet"
                  blockKey="universe_iii"
                  field="icon"
                  content="Ⅲ"
                  className="text-4xl block mb-2"
                />
                <InlineEdit
                  sectionId="sweet"
                  blockKey="universe_iii"
                  field="title"
                  content="My Lil Baby Lady Goddess"
                  className="text-xl font-black italic uppercase tracking-tight text-pink-400 block"
                  as="h3"
                />
                <InlineEdit
                  sectionId="sweet"
                  blockKey="universe_iii"
                  field="subtitle"
                  content="The full spectrum. The dynamic."
                  className="text-sm font-black uppercase tracking-widest text-white/40 block"
                />
                <InlineEdit
                  sectionId="sweet"
              </div>
            </div>

            {/* CTA */}
            <div className="text-center pt-8">
              <Link to="/sweet-spice/her">
                <button className="group inline-flex items-center gap-3 px-8 py-4 bg-pink-500 text-black font-black uppercase tracking-widest text-xs italic rounded-none hover:bg-pink-400 transition-all duration-300 hover:shadow-[0_0_40px_rgba(244,114,182,0.4)]">
                  <InlineEdit
                    sectionId="sweet"
                    blockKey="landing_cta"
                    field="title"
                    content={ctaBlock?.title || "If something here moves you — keep going"}
                    className="font-black uppercase tracking-widest text-xs italic"
                  />
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </section>

        </div>
      </main>

      <SweetSpiceNavbar />
      <Footer />
    </div>
  );
}
