import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { XCircle, Heart, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SweetSpiceNavbar from '@/components/SweetSpiceNavbar';

export default function Rejected() {
  const location = useLocation();
  const evaluation = location.state?.evaluation || 
    JSON.parse(sessionStorage.getItem('sweet_spice_evaluation') || '{}');
  
  const score = evaluation?.score || 0;
  const isHighScore = score >= 75;

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Pink ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]"
          style={{
            background: isHighScore 
              ? 'radial-gradient(ellipse at 50% 0%, rgba(244,114,182,0.15), transparent 70%)'
              : 'radial-gradient(ellipse at 50% 0%, rgba(244,114,182,0.08), transparent 70%)'
          }}
        />
      </div>

      <Navbar />

      <main className="relative z-10 pt-28 pb-16 px-6">
        <div className="max-w-xl mx-auto text-center space-y-8">
          
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${isHighScore ? 'bg-pink-500/10' : 'bg-white/5'}`}>
            {isHighScore ? (
              <Sparkles className="w-10 h-10 text-pink-400" />
            ) : (
              <Heart className="w-10 h-10 text-white/40" />
            )}
          </div>

          <div className={`glass p-8 rounded-2xl space-y-6 ${isHighScore ? 'border-pink-500/20' : 'border-white/10'}`}>
            {isHighScore ? (
              // High score - gentle letdown with appreciation
              <>
                <p className="text-2xl font-black italic text-pink-400 leading-relaxed">
                  We almost had it.
                </p>
                <p className="text-lg text-white/70 leading-relaxed">
                  Your score was {score}% — which means there's a lot here that aligns. You're thoughtful, self-aware, and open in ways that matter.
                </p>
                <p className="text-base text-white/50 leading-relaxed">
                  But "almost" is the key word. Sometimes two good people don't create the right chemistry — not because anything is wrong, but because the specific spark isn't there.
                </p>
                <p className="text-lg font-medium text-white/70 pt-4">
                  This isn't about you not being enough. You clearly are. It's just about fit.
                </p>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-base text-pink-400/80 italic">
                    Wishing you someone who sees all of this in you — and matches it completely.
                  </p>
                </div>
              </>
            ) : (
              // Regular score - standard message
              <>
                <p className="text-lg font-medium italic text-white/70 leading-relaxed">
                  Thank you for taking the time to be honest here — that takes something.
                </p>
                <p className="text-base text-white/50 leading-relaxed">
                  This is not a judgment on who you are. It just means this particular match is probably not the right fit — and that is okay. The right connection needs to be right for both people.
                </p>
                <p className="text-lg font-black italic text-white/70 pt-4">
                  Wishing you something real. You deserve that.
                </p>
              </>
            )}
          </div>

          <div className="space-y-4">
            <Link to="/">
              <button className="px-8 py-4 border border-white/20 text-white/60 font-black uppercase tracking-widest text-xs italic rounded-none hover:border-pink-500/30 hover:text-pink-400 transition-all">
                Back to Home
              </button>
            </Link>
          </div>

          {score > 0 && (
            <p className="text-xs text-white/20">
              Match score: {score}%
            </p>
          )}

        </div>
      </main>

      <SweetSpiceNavbar />
      <Footer />
    </div>
  );
}
