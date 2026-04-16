import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Sparkles, Lock, Unlock } from 'lucide-react';
import { useContent } from '@/hooks/useContent';
import { InlineEdit } from '@/components/admin/InlineEdit';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SweetSpiceNavbar from '@/components/SweetSpiceNavbar';
import { useAuth } from '@/hooks/useSupabase';

export default function OpenBook() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { blocks, loading } = useContent('sweet_spice');
  const isAdmin = !!user;
  
  const getBlock = (key: string) => blocks.find((b: any) => b.block_key === key);
  
  const headerBlock = getBlock('openbook_header');
  const universe1Block = getBlock('universe_i');
  const universe2Block = getBlock('universe_ii');
  const universe3Block = getBlock('universe_iii');

  useEffect(() => {
    // Admin bypass - can access everything
    if (isAdmin) return;

    // Check if user has access
    const access = sessionStorage.getItem('sweet_spice_access');
    const accessTime = sessionStorage.getItem('sweet_spice_access_time');
    
    if (!access || !accessTime) {
      navigate('/sweet-spice/access');
      return;
    }

    // Check if access is still valid (24 hours)
    const hoursElapsed = (Date.now() - parseInt(accessTime)) / (1000 * 60 * 60);
    if (hoursElapsed > 24) {
      sessionStorage.removeItem('sweet_spice_access');
      sessionStorage.removeItem('sweet_spice_access_time');
      navigate('/sweet-spice/access');
    }
  }, [navigate, isAdmin]);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Pink ambient glow */}
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

          {/* Header */}
          <section className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20">
              <Lock className="w-4 h-4 text-pink-400" />
              <InlineEdit
                sectionId="sweet_spice"
                blockKey="openbook_header"
                field="subtitle"
                content={headerBlock?.subtitle || "Private"}
                className="text-xs font-black uppercase tracking-widest text-pink-400"
              />
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.9]">
              <InlineEdit
                sectionId="sweet_spice"
                blockKey="openbook_header"
                field="title"
                content={headerBlock?.title || "The Open Book"}
                className="text-pink-400"
              />
            </h1>
            <InlineEdit
              sectionId="sweet_spice"
              blockKey="openbook_header"
              field="content"
              content={headerBlock?.content || "Everything. Written for you."}
              className="text-lg font-medium italic text-white/50 max-w-2xl mx-auto"
            />
          </section>

          {/* Section A — I */}
          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <span className="text-4xl font-black text-pink-400/40">Ⅰ</span>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-pink-400">Universe I</p>
                <InlineEdit
                  sectionId="sweet_spice"
                  blockKey="universe_i"
                  field="title"
                  content={universe1Block?.title || "I"}
                  className="text-2xl font-black italic uppercase tracking-tight text-white block"
                  as="h2"
                />
              </div>
            </div>

            <div className="glass border-pink-500/20 p-8 rounded-2xl space-y-6">
              <InlineEdit
                sectionId="sweet_spice"
                blockKey="universe_i_thinks"
                field="title"
                content="How He Thinks"
                className="text-lg font-black uppercase tracking-widest text-white/60 block"
                as="h3"
              />
              <InlineEdit
                sectionId="sweet_spice"
                blockKey="universe_i_thinks"
                field="content"
                content="Fast and deep — and those two things do not always play nice. He is obsessively focused and completely unavailable at the same time — not checked out, just in. Ideas arrive at 2am. He processes the world by making things. He has high standards and low patience for carelessness — his own first."
                className="text-base text-white/50 font-medium italic leading-relaxed"
                multiline
              />

              <InlineEdit
                sectionId="sweet_spice"
                blockKey="universe_i_loves"
                field="title"
                content="How He Loves"
                className="text-lg font-black uppercase tracking-widest text-white/60 pt-4 block"
                as="h3"
              />
              <InlineEdit
                sectionId="sweet_spice"
                blockKey="universe_i_loves"
                field="content"
                content="More emotionally present than most men admit to being. He feels things loudly and does not apologize. He wants to be someone's safe place — fully. But he needs to be held sometimes, not just to hold. He wants a woman who is emotionally needy with him — not draining, but present. He will meet that energy completely."
                className="text-base text-white/50 font-medium italic leading-relaxed"
                multiline
              />

              <InlineEdit
                sectionId="sweet_spice"
                blockKey="universe_i_plays"
                field="title"
                content="How He Plays"
                className="text-lg font-black uppercase tracking-widest text-white/60 pt-4 block"
                as="h3"
              />
              <InlineEdit
                sectionId="sweet_spice"
                blockKey="universe_i_plays"
                field="content"
                content="He leads without dominating. He teases without cruelty. He holds space for the full spectrum — babygirl to goddess — with care, attention, and full presence. He is the sadist who protects what he takes. He is the dominant who never forgets he was chosen."
                className="text-base text-white/50 font-medium italic leading-relaxed"
                multiline
              />
            </div>
          </section>

          {/* Section B — Wifey */}
          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <span className="text-4xl font-black text-pink-400/40">Ⅱ</span>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-pink-400">Universe II</p>
                <InlineEdit
                  sectionId="sweet_spice"
                  blockKey="universe_ii"
                  field="title"
                  content={universe2Block?.title || "Wifey"}
                  className="text-2xl font-black italic uppercase tracking-tight text-white block"
                  as="h2"
                />
              </div>
            </div>

            <div className="glass border-pink-500/20 p-8 rounded-2xl space-y-6">
              <InlineEdit
                sectionId="sweet_spice"
                blockKey="universe_ii_partnership"
                field="title"
                content="What Partnership Means"
                className="text-lg font-black uppercase tracking-widest text-white/60 block"
                as="h3"
              />
              <InlineEdit
                sectionId="sweet_spice"
                blockKey="universe_ii_partnership"
                field="content"
                content="Not a relationship. A life. Built on purpose. Not a role — a decision. Not a title — a daily act."
                className="text-base text-white/50 font-medium italic leading-relaxed"
                multiline
              />
              <InlineEdit
                sectionId="sweet_spice"
                blockKey="universe_ii_partnership"
                field="subtitle"
                content="Devotion and ownership — chosen, not assumed. Act of service — love expressed in action. Care, kindness, softness. Family as sacred. Attention — giving and receiving fully. The long game — building a life worth talking about at 70."
                className="text-base text-white/50 font-medium italic leading-relaxed"
                multiline
              />

              <div className="border-t border-white/10 pt-6 mt-6">
                <InlineEdit
                  sectionId="sweet_spice"
                  blockKey="universe_ii_looking"
                  field="title"
                  content="What He Is Actually Looking For"
                  className="text-lg font-black uppercase tracking-widest text-white/60 mb-4 block"
                  as="h3"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <InlineEdit
                      sectionId="sweet_spice"
                      blockKey="universe_ii_foundation"
                      field="title"
                      content="The Foundation"
                      className="text-sm font-black uppercase tracking-widest text-pink-400/60 block"
                    />
                    <InlineEdit
                      sectionId="sweet_spice"
                      blockKey="universe_ii_foundation"
                      field="content"
                      content="Two whole people. Separate universes. One collision."
                      className="text-sm text-white/50 italic"
                    />
                  </div>
                  <div className="space-y-2">
                    <InlineEdit
                      sectionId="sweet_spice"
                      blockKey="universe_ii_daily"
                      field="title"
                      content="The Daily"
                      className="text-sm font-black uppercase tracking-widest text-pink-400/60 block"
                    />
                    <InlineEdit
                      sectionId="sweet_spice"
                      blockKey="universe_ii_daily"
                      field="content"
                      content="Chosen devotion. Active care. Attention as love language."
                      className="text-sm text-white/50 italic"
                    />
                  </div>
                  <div className="space-y-2">
                    <InlineEdit
                      sectionId="sweet_spice"
                      blockKey="universe_ii_vision"
                      field="title"
                      content="The Vision"
                      className="text-sm font-black uppercase tracking-widest text-pink-400/60 block"
                    />
                    <InlineEdit
                      sectionId="sweet_spice"
                      blockKey="universe_ii_vision"
                      field="content"
                      content="A home that feels like a world. A family to be proud of."
                      className="text-sm text-white/50 italic"
                    />
                  </div>
                  <div className="space-y-2">
                    <InlineEdit
                      sectionId="sweet_spice"
                      blockKey="universe_ii_longgame"
                      field="title"
                      content="The Long Game"
                      className="text-sm font-black uppercase tracking-widest text-pink-400/60 block"
                    />
                    <InlineEdit
                      sectionId="sweet_spice"
                      blockKey="universe_ii_longgame"
                      field="content"
                      content="Stories worth telling at 70. Built, not found."
                      className="text-sm text-white/50 italic"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section C — My Lil Baby Lady Goddess */}
          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <span className="text-4xl font-black text-pink-400/40">Ⅲ</span>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-pink-400">Universe III</p>
                <InlineEdit
                  sectionId="sweet_spice"
                  blockKey="universe_iii"
                  field="title"
                  content={universe3Block?.title || "My Lil Baby Lady Goddess"}
                  className="text-2xl font-black italic uppercase tracking-tight text-white block"
                  as="h2"
                />
              </div>
            </div>

            <div className="glass border-pink-500/20 p-8 rounded-2xl space-y-8">
              
              {/* Talk Play */}
              <div className="space-y-3">
                <InlineEdit
                  sectionId="sweet_spice"
                  blockKey="universe_iii_talk"
                  field="title"
                  content="Talk Play"
                  className="text-lg font-black uppercase tracking-widest text-white/60 block"
                  as="h3"
                />
                <InlineEdit
                  sectionId="sweet_spice"
                  blockKey="universe_iii_talk"
                  field="content"
                  content="Thinking loudly together. Raw unfiltered discussion. Affirmation. Flirting. Dirty talk. The kind of conversation that goes from philosophy to filth in four minutes and both feel natural."
                  className="text-base text-white/50 font-medium italic leading-relaxed"
                  multiline
                />
              </div>

              {/* Behaviour Play */}
              <div className="space-y-3">
                <InlineEdit
                  sectionId="sweet_spice"
                  blockKey="universe_iii_behaviour"
                  field="title"
                  content="Behaviour Play"
                  className="text-lg font-black uppercase tracking-widest text-white/60 block"
                  as="h3"
                />
                <InlineEdit
                  sectionId="sweet_spice"
                  blockKey="universe_iii_behaviour"
                  field="content"
                  content="Obey. Stubborn brat energy. Leading and controlling. Submitting. Dominating. Act of service as intimacy. The push and pull that keeps both of them awake and alive."
                  className="text-base text-white/50 font-medium italic leading-relaxed"
                  multiline
                />
              </div>

              {/* Sensation Play */}
              <div className="space-y-3">
                <InlineEdit
                  sectionId="sweet_spice"
                  blockKey="universe_iii_sensation"
                  field="title"
                  content="Sensation Play"
                  className="text-lg font-black uppercase tracking-widest text-white/60 block"
                  as="h3"
                />
                <InlineEdit
                  sectionId="sweet_spice"
                  blockKey="universe_iii_sensation"
                  field="content"
                  content="Touch that commands. Restraint that liberates. The entire body as a conversation. Pain that grounds. Pleasure that rewards. The full range — from tender to intense — held with complete presence."
                  className="text-base text-white/50 font-medium italic leading-relaxed"
                  multiline
                />
              </div>

              {/* The Arc */}
              <div className="space-y-3">
                <InlineEdit
                  sectionId="sweet_spice"
                  blockKey="universe_iii_arc"
                  field="title"
                  content="The Arc"
                  className="text-lg font-black uppercase tracking-widest text-white/60 block"
                  as="h3"
                />
                <InlineEdit
                  sectionId="sweet_spice"
                  blockKey="universe_iii_arc"
                  field="content"
                  content="From playful to profound. From light to deep. From kitten to goddess. From babygirl to queen. He holds all of it. He wants all of it. The full spectrum, fully inhabited."
                  className="text-base text-white/50 font-medium italic leading-relaxed"
                  multiline
                />
              </div>

              {/* Sadist / Masochist */}
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-lg font-black uppercase tracking-widest text-white/60 mb-4">Sadist / Masochist</h3>
                <p className="text-base text-white/50 font-medium italic leading-relaxed">
                  She is masochistic — not because she is weak, but because surrender is the highest form of trust and she knows it. He meets that with care, with presence, with full attention. Always.
                </p>
              </div>

              {/* The Final Hook */}
              <div className="border-t border-pink-500/30 pt-8 mt-8">
                <p className="text-xl font-black italic text-pink-400 text-center leading-relaxed">
                  She has never found a man who could hold all of her.<br />
                  <span className="text-white/70">Until now.</span>
                </p>
              </div>

            </div>
          </section>

          {/* Closing */}
          <section className="text-center space-y-6 pt-8">
            <div className="glass border-pink-500/20 p-8 rounded-2xl max-w-2xl mx-auto">
              <p className="text-lg font-medium italic text-white/60 leading-relaxed">
                This is everything. The full architecture of what he is looking for, who he is, and what could exist between two people who choose each other with intention.
              </p>
              <p className="text-base text-white/40 italic mt-4">
                If you read this and felt recognized — in the deepest, most specific way — then you are who this is for.
              </p>
              <p className="text-2xl font-black italic text-pink-400 pt-6">
                — Ahmad 🤍
              </p>
            </div>
          </section>

        </div>
      </main>

      <SweetSpiceNavbar />
      <Footer />
    </div>
  );
}
