import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Lock, Heart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Gate() {
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
        <div className="max-w-2xl mx-auto text-center space-y-8">
          
          <div className="w-20 h-20 rounded-full bg-pink-500/10 flex items-center justify-center mx-auto">
            <Lock className="w-10 h-10 text-pink-400" />
          </div>

          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-pink-400">
              The Gate
            </p>
            <h1 className="text-4xl sm:text-5xl font-black italic uppercase tracking-tighter leading-[0.9]">
              What Comes <span className="text-pink-400">Next</span>
            </h1>
          </div>

          <div className="glass border-pink-500/20 p-8 rounded-2xl space-y-6 text-left">
            <p className="text-lg font-medium italic text-white/60 leading-relaxed">
              There is a deeper version of this. A section written for the woman who recognizes herself in these pages.
            </p>
            
            <p className="text-base text-white/50 leading-relaxed">
              It is not public. It is gated for a reason — to protect the space, and to honor the courage it takes to step through.
            </p>

            <div className="space-y-4 py-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-black text-pink-400">1</span>
                </div>
                <div>
                  <h3 className="font-black uppercase tracking-widest text-white text-sm">The Assessment</h3>
                  <p className="text-sm text-white/50 italic">10 questions. One at a time. Honesty over performance.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-black text-pink-400">2</span>
                </div>
                <div>
                  <h3 className="font-black uppercase tracking-widest text-white text-sm">The Review</h3>
                  <p className="text-sm text-white/50 italic">Ahmad reviews personally. Not algorithms — presence.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-black text-pink-400">3</span>
                </div>
                <div>
                  <h3 className="font-black uppercase tracking-widest text-white text-sm">The Access</h3>
                  <p className="text-sm text-white/50 italic">If it feels right on both sides, a code is sent. 24 hours to enter.</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-white/40 italic text-center border-t border-white/10 pt-6">
              This is not about exclusion. It is about intention.
            </p>
          </div>

          <Link to="/sweet-spice/assessment">
            <button className="group inline-flex items-center gap-3 px-8 py-4 bg-pink-500 text-black font-black uppercase tracking-widest text-xs italic rounded-none hover:bg-pink-400 transition-all duration-300 hover:shadow-[0_0_40px_rgba(244,114,182,0.4)]">
              <span>I want in</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>

          <p className="text-xs text-white/30 italic">
            Or <Link to="/sweet-spice" className="text-pink-400 hover:underline">go back</Link> if you need more time.
          </p>

        </div>
      </main>

      <Footer />
    </div>
  );
}
