import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Heart, ArrowRight, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SweetSpiceNavbar from '@/components/SweetSpiceNavbar';
import { useAuth } from '@/hooks/useSupabase';

export default function VibeCheck() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const isAdmin = !!user;
  const [showVibeQuestion, setShowVibeQuestion] = useState(false);
  const [showMatchMessage, setShowMatchMessage] = useState(false);
  const [evaluation, setEvaluation] = useState<any>(null);

  useEffect(() => {
    // Admin bypass - can access everything, show with mock data
    if (isAdmin) {
      setEvaluation({ score: 100, passed: true, strong_match: true, isAdmin: true });
      setShowVibeQuestion(true);
      return;
    }

    // Get evaluation from navigation state or sessionStorage
    const evalData = location.state?.evaluation || 
      JSON.parse(sessionStorage.getItem('sweet_spice_evaluation') || '{}');
    
    if (evalData && evalData.score) {
      setEvaluation(evalData);
      
      if (evalData.strong_match) {
        // Show the nice match message first
        setShowMatchMessage(true);
        setTimeout(() => {
          setShowMatchMessage(false);
          setShowVibeQuestion(true);
        }, 4000); // Show match message for 4 seconds
      } else if (evalData.passed) {
        // Regular pass - go straight to vibe question
        setShowVibeQuestion(true);
      } else {
        // Didn't pass - go to rejected
        navigate('/sweet-spice/rejected', { state: { evaluation: evalData } });
      }
    } else {
      // No evaluation data - redirect to assessment
      navigate('/sweet-spice/assessment');
    }
  }, [location, navigate, isAdmin]);

  const handleVibeResponse = (wantsToConnect: boolean) => {
    if (wantsToConnect) {
      // She wants to connect - go to contact form
      navigate('/sweet-spice/contact', { state: { evaluation } });
    } else {
      // She doesn't want to connect - return to home
      navigate('/');
    }
  };

  if (showMatchMessage && evaluation?.strong_match) {
    return (
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        {/* Pink ambient glow */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(244,114,182,0.2), transparent 70%)'
            }}
          />
        </div>

        <Navbar />

        <main className="relative z-10 pt-28 pb-16 px-6">
          <div className="max-w-xl mx-auto text-center space-y-8">
            <div className="animate-pulse">
              <Sparkles className="w-16 h-16 text-pink-400 mx-auto" />
            </div>
            
            <div className="glass border-pink-500/30 p-8 rounded-2xl space-y-6">
              <p className="text-2xl font-black italic text-pink-400 leading-relaxed">
                Something here feels right.
              </p>
              <p className="text-lg text-white/70 leading-relaxed">
                Your answers — they hit. In a way that makes me want to know the person behind them.
              </p>
              <p className="text-base text-white/50 italic">
                Not a perfect match on paper. Something better than that.
              </p>
              <div className="pt-4">
                <Heart className="w-8 h-8 text-pink-400 mx-auto animate-pulse" />
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  if (!showVibeQuestion) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full" />
      </div>
    );
  }

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
        <div className="max-w-xl mx-auto text-center space-y-8">
          
          <div className="text-center space-y-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-pink-400">
              One Last Question
            </p>
            <h1 className="text-3xl sm:text-4xl font-black italic uppercase tracking-tighter">
              Do You Feel It <span className="text-pink-400">Too</span>?
            </h1>
          </div>

          <div className="glass border-pink-500/20 p-8 rounded-2xl space-y-6">
            <p className="text-lg text-white/70 leading-relaxed">
              Based on what you shared, there might be something here. A resonance. A vibe.
            </p>
            <p className="text-base text-white/50 leading-relaxed">
              If we matched and the energy feels right to you too — would you want to explore this? Maybe a coffee chat, a conversation, seeing where this could go?
            </p>
            
            <div className="pt-4 space-y-3">
              <p className="text-sm text-white/40 italic">
                No pressure. Just honesty.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => handleVibeResponse(true)}
              className="group w-full flex items-center justify-center gap-3 px-8 py-5 bg-pink-500 text-black font-black uppercase tracking-widest text-sm italic rounded-xl hover:bg-pink-400 transition-all duration-300 hover:shadow-[0_0_40px_rgba(244,114,182,0.4)]"
            >
              <span>Yes, I want to explore this</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleVibeResponse(false)}
              className="w-full px-8 py-4 border border-white/20 text-white/60 font-black uppercase tracking-widest text-xs italic rounded-xl hover:border-pink-500/30 hover:text-pink-400 transition-all"
            >
              Not feeling it — take me home
            </button>
          </div>

          <p className="text-xs text-white/30 italic">
            Either answer is perfect. Only truth matters here.
          </p>

        </div>
      </main>

      <SweetSpiceNavbar />
      <Footer />
    </div>
  );
}
