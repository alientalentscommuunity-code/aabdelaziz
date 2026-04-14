import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Sparkles, Lock, Unlock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SweetSpiceNavbar from '@/components/SweetSpiceNavbar';
import { useAuth } from '@/hooks/useSupabase';

export default function OpenBook() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = !!user;

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
              <span className="text-xs font-black uppercase tracking-widest text-pink-400">Private</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.9]">
              The <span className="text-pink-400">Open</span> Book
            </h1>
            <p className="text-lg font-medium italic text-white/50 max-w-2xl mx-auto">
              Everything. Written for you.
            </p>
          </section>

          {/* Section A — I */}
          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <span className="text-4xl font-black text-pink-400/40">Ⅰ</span>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-pink-400">Universe I</p>
                <h2 className="text-2xl font-black italic uppercase tracking-tight text-white">I</h2>
              </div>
            </div>

            <div className="glass border-pink-500/20 p-8 rounded-2xl space-y-6">
              <h3 className="text-lg font-black uppercase tracking-widest text-white/60">How He Thinks</h3>
              <p className="text-base text-white/50 font-medium italic leading-relaxed">
                Fast and deep — and those two things do not always play nice. He is obsessively focused and completely unavailable at the same time — not checked out, just in. Ideas arrive at 2am. He processes the world by making things. He has high standards and low patience for carelessness — his own first.
              </p>

              <h3 className="text-lg font-black uppercase tracking-widest text-white/60 pt-4">How He Loves</h3>
              <p className="text-base text-white/50 font-medium italic leading-relaxed">
                More emotionally present than most men admit to being. He feels things loudly and does not apologize. He wants to be someone's safe place — fully. But he needs to be held sometimes, not just to hold. He wants a woman who is emotionally needy with him — not draining, but present. He will meet that energy completely.
              </p>

              <h3 className="text-lg font-black uppercase tracking-widest text-white/60 pt-4">How He Plays</h3>
              <p className="text-base text-white/50 font-medium italic leading-relaxed">
                He leads without dominating. He teases without cruelty. He holds space for the full spectrum — babygirl to goddess — with care, attention, and full presence. He is the sadist who protects what he takes. He is the dominant who never forgets he was chosen.
              </p>
            </div>
          </section>

          {/* Section B — Wifey */}
          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <span className="text-4xl font-black text-pink-400/40">Ⅱ</span>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-pink-400">Universe II</p>
                <h2 className="text-2xl font-black italic uppercase tracking-tight text-white">Wifey</h2>
              </div>
            </div>

            <div className="glass border-pink-500/20 p-8 rounded-2xl space-y-6">
              <h3 className="text-lg font-black uppercase tracking-widest text-white/60">What Partnership Means</h3>
              <p className="text-base text-white/50 font-medium italic leading-relaxed">
                Not a relationship. A life. Built on purpose. Not a role — a decision. Not a title — a daily act.
              </p>
              <p className="text-base text-white/50 font-medium italic leading-relaxed">
                Devotion and ownership — chosen, not assumed. Act of service — love expressed in action. Care, kindness, softness. Family as sacred. Attention — giving and receiving fully. The long game — building a life worth talking about at 70.
              </p>

              <div className="border-t border-white/10 pt-6 mt-6">
                <h3 className="text-lg font-black uppercase tracking-widest text-white/60 mb-4">What He Is Actually Looking For</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-black uppercase tracking-widest text-pink-400/60">The Foundation</p>
                    <p className="text-sm text-white/50 italic">Two whole people. Separate universes. One collision.</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-black uppercase tracking-widest text-pink-400/60">The Daily</p>
                    <p className="text-sm text-white/50 italic">Chosen devotion. Active care. Attention as love language.</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-black uppercase tracking-widest text-pink-400/60">The Vision</p>
                    <p className="text-sm text-white/50 italic">A home that feels like a world. A family to be proud of.</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-black uppercase tracking-widest text-pink-400/60">The Long Game</p>
                    <p className="text-sm text-white/50 italic">Stories worth telling at 70. Built, not found.</p>
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
                <h2 className="text-2xl font-black italic uppercase tracking-tight text-white">My Lil Baby Lady Goddess</h2>
              </div>
            </div>

            <div className="glass border-pink-500/20 p-8 rounded-2xl space-y-8">
              
              {/* Talk Play */}
              <div className="space-y-3">
                <h3 className="text-lg font-black uppercase tracking-widest text-white/60">Talk Play</h3>
                <p className="text-base text-white/50 font-medium italic leading-relaxed">
                  Thinking loudly together. Raw unfiltered discussion. Affirmation. Flirting. Dirty talk. The kind of conversation that goes from philosophy to filth in four minutes and both feel natural.
                </p>
              </div>

              {/* Behaviour Play */}
              <div className="space-y-3">
                <h3 className="text-lg font-black uppercase tracking-widest text-white/60">Behaviour Play</h3>
                <p className="text-base text-white/50 font-medium italic leading-relaxed">
                  Obey. Stubborn brat energy. Leading and controlling. Submitting. Dominating. Act of service as intimacy. The push and pull that keeps both of them awake and alive.
                </p>
              </div>

              {/* Character Play */}
              <div className="space-y-3">
                <h3 className="text-lg font-black uppercase tracking-widest text-white/60">Character Play</h3>
                <p className="text-base text-white/50 font-medium italic leading-relaxed">
                  Princess. Queen. Goddess and demon. Kitten. Baby girl. Lady. She moves between all of them — and he can hold every version without flinching. Most men ask her to pick one. He does not.
                </p>
              </div>

              {/* Attitude Play */}
              <div className="space-y-3">
                <h3 className="text-lg font-black uppercase tracking-widest text-white/60">Attitude Play</h3>
                <p className="text-base text-white/50 font-medium italic leading-relaxed">
                  Caring and giving. Caretaker energy. Attention — needing it, giving it, weaponizing it playfully. Ownership that goes both ways. Devotion that is active, not passive.
                </p>
              </div>

              {/* The Dynamic */}
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-lg font-black uppercase tracking-widest text-white/60 mb-4">The Dynamic</h3>
                <p className="text-base text-white/50 font-medium italic leading-relaxed">
                  She is mentally leading — sharp, decisive, a point of view she defends. She is emotionally present — when safe, she arrives fully. She is physically surrendered — the masochist who gives the gift of surrender to someone who has earned it. He holds all three without confusing them.
                </p>
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
