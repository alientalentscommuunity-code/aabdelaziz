import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useContent } from '@/hooks/useContent';
import { InlineEdit } from '@/components/admin/InlineEdit';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SweetSpiceNavbar from '@/components/SweetSpiceNavbar';

export default function SweetSpice() {
  const { blocks, loading } = useContent('sweet');
  
  const getBlock = (key: string) => blocks.find((b: any) => b.block_key === key);
  
  const heroBlock = getBlock('landing_hero');
  const whyBlock = getBlock('landing_why');
  const universesBlock = getBlock('landing_three_universes');
  const howBlock = getBlock('landing_how_works');
  const ctaBlock = getBlock('landing_cta');
  
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-pulse text-pink-400">Loading...</div>
      </div>
    );
  }

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
            <InlineEdit
              sectionId="sweet"
              blockKey="landing_hero"
              field="title"
              content={heroBlock?.title || "🌶️ SWEET SPICE"}
              className="text-[10px] font-black uppercase tracking-widest text-pink-400"
            />
            <InlineEdit
              sectionId="sweet"
              blockKey="landing_hero"
              field="content"
              content={heroBlock?.content || "Not Just Business. A way of living. A space for connection. Intentional. Private. Real."}
              className="text-5xl sm:text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.9]"
              as="h1"
            />
            <div className="max-w-2xl mx-auto space-y-6">
              <InlineEdit
                sectionId="sweet"
                blockKey="landing_why"
                field="content"
                content={whyBlock?.content || "I am a builder. A product manager. A founder. Someone who has spent years getting clear — financially, professionally, personally. I have been intentional about not rushing into marriage before I was ready.\n\nThat time is over.\n\nI am ready. Mentally. Emotionally. And instead of leaving the search to chance, apps, or social circles that keep delivering the wrong people — I am doing what I do best: architecting the thing I want with intention and craft."}
                className="text-lg sm:text-xl font-medium italic text-white/60 leading-relaxed whitespace-pre-line"
                multiline
              />
            </div>
            <InlineEdit
              sectionId="sweet"
              blockKey="landing_hero"
              field="subtitle"
              content={heroBlock?.subtitle || "The right woman is not found in an algorithm. She is found when she stumbles across something real and thinks — wait, this is actually me."}
              className="text-base font-bold italic text-pink-400/80 max-w-xl mx-auto"
            />
          </section>

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
                  blockKey="universe_iii"
                  field="content"
                  content="The play. The surrender. The worship. The entire range of who she is — from babygirl to goddess, from kitten to queen. She has never found a man who could hold all of her. Until now."
                  className="text-sm text-white/50 font-medium italic leading-relaxed"
                  multiline
                />
              </div>
            </div>
          </section>

          {/* SECTION C — HOW THIS WORKS */}
          <section className="space-y-12">
            <InlineEdit
              sectionId="sweet"
              blockKey="landing_how_works"
              field="title"
              content={howBlock?.title || "HOW THIS WORKS"}
              className="text-[10px] font-black uppercase tracking-widest text-pink-400/60 text-center"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1 */}
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-pink-500/10 flex items-center justify-center mx-auto">
                  <InlineEdit
                    sectionId="sweet"
                    blockKey="how_step_1"
                    field="icon"
                    content="1"
                    className="text-2xl font-black text-pink-400"
                  />
                </div>
                <InlineEdit
                  sectionId="sweet"
                  blockKey="how_step_1"
                  field="title"
                  content="Read"
                  className="text-lg font-black uppercase tracking-tight text-white block"
                  as="h4"
                />
                <InlineEdit
                  sectionId="sweet"
                  blockKey="how_step_1"
                  field="content"
                  content="Start here. Read the Three Universes. See if something moves you."
                  className="text-sm text-white/50 font-medium italic"
                  multiline
                />
              </div>

              {/* Step 2 */}
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-pink-500/10 flex items-center justify-center mx-auto">
                  <InlineEdit
                    sectionId="sweet"
                    blockKey="how_step_2"
                    field="icon"
                    content="2"
                    className="text-2xl font-black text-pink-400"
                  />
                </div>
                <InlineEdit
                  sectionId="sweet"
                  blockKey="how_step_2"
                  field="title"
                  content="Feel"
                  className="text-lg font-black uppercase tracking-tight text-white block"
                  as="h4"
                />
                <InlineEdit
                  sectionId="sweet"
                  blockKey="how_step_2"
                  field="content"
                  content="Go deeper. Read about her — the paradox, the portrait, what she gets."
                  className="text-sm text-white/50 font-medium italic"
                  multiline
                />
              </div>

              {/* Step 3 */}
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-pink-500/10 flex items-center justify-center mx-auto">
                  <InlineEdit
                    sectionId="sweet"
                    blockKey="how_step_3"
                    field="icon"
                    content="3"
                    className="text-2xl font-black text-pink-400"
                  />
                </div>
                <InlineEdit
                  sectionId="sweet"
                  blockKey="how_step_3"
                  field="title"
                  content="Go Further"
                  className="text-lg font-black uppercase tracking-tight text-white block"
                  as="h4"
                />
                <InlineEdit
                  sectionId="sweet"
                  blockKey="how_step_3"
                  field="content"
                  content="If something here moves you — keep going. The deeper version awaits."
                  className="text-sm text-white/50 font-medium italic"
                  multiline
                />
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
