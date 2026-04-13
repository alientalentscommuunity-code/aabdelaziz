import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Rejected() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Pink ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(244,114,182,0.08), transparent 70%)'
          }}
        />
      </div>

      <Navbar />

      <main className="relative z-10 pt-28 pb-16 px-6">
        <div className="max-w-xl mx-auto text-center space-y-8">
          
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto">
            <Heart className="w-10 h-10 text-white/40" />
          </div>

          <div className="glass border-white/10 p-8 rounded-2xl space-y-6">
            <p className="text-lg font-medium italic text-white/70 leading-relaxed">
              Thank you for taking the time to be honest here — that takes something.
            </p>
            <p className="text-base text-white/50 leading-relaxed">
              This is not a judgment on who you are. It just means this particular match is probably not the right fit — and that is okay. The right connection needs to be right for both people.
            </p>
            <p className="text-lg font-black italic text-white/70 pt-4">
              Wishing you something real. You deserve that.
            </p>
          </div>

          <div className="space-y-4">
            <Link to="/sweet-spice">
              <button className="px-8 py-4 border border-white/20 text-white/60 font-black uppercase tracking-widest text-xs italic rounded-none hover:border-pink-500/30 hover:text-pink-400 transition-all">
                Back to Sweet Spice
              </button>
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
