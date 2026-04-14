import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SweetSpiceNavbar from '@/components/SweetSpiceNavbar';
import { useAuth } from '@/hooks/useSupabase';

export default function AccessCode() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = !!user;
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Admin bypass - auto grant access
  useEffect(() => {
    if (isAdmin) {
      sessionStorage.setItem('sweet_spice_access', 'admin');
      sessionStorage.setItem('sweet_spice_access_time', Date.now().toString());
      navigate('/sweet-spice/open');
    }
  }, [isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setIsVerifying(true);
    setError('');

    try {
      // Check if code exists and is valid
      const { data, error: fetchError } = await supabase
        .from('sweet_spice_requests')
        .select('*')
        .eq('access_code', code.trim())
        .eq('status', 'approved')
        .gt('code_expires_at', new Date().toISOString())
        .is('code_used_at', null)
        .single();

      if (fetchError || !data) {
        setError('This code is invalid or has expired. Please check with Ahmad for a new code.');
        setIsVerifying(false);
        return;
      }

      // Mark code as used
      await supabase
        .from('sweet_spice_requests')
        .update({
          code_used_at: new Date().toISOString(),
          status: 'accessed'
        })
        .eq('id', data.id);

      // Store access in session
      sessionStorage.setItem('sweet_spice_access', 'granted');
      sessionStorage.setItem('sweet_spice_access_time', Date.now().toString());

      setSuccess(true);
      setTimeout(() => {
        navigate('/sweet-spice/open');
      }, 1500);

    } catch (err) {
      console.error('Verification error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
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
            <div className="glass border-pink-500/20 p-8 rounded-2xl space-y-6">
              <p className="text-2xl font-black italic text-pink-400">
                Welcome.
              </p>
              <p className="text-base text-white/60 leading-relaxed">
                You now have access to the Open Book. Redirecting...
              </p>
            </div>
          </div>
        </main>

        <Footer />
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
        <div className="max-w-xl mx-auto">
          <div className="text-center space-y-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-pink-500/10 flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8 text-pink-400" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-pink-400">
              Private Access
            </p>
            <h1 className="text-3xl sm:text-4xl font-black italic uppercase tracking-tighter">
              Enter Your <span className="text-pink-400">Code</span>
            </h1>
          </div>

          <div className="glass border-pink-500/20 p-8 rounded-2xl space-y-6">
            <p className="text-base text-white/60 leading-relaxed text-center">
              If Ahmad has sent you a code, enter it here. Codes are valid for 24 hours and can only be used once.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="w-full p-4 bg-black/50 border border-white/10 rounded-xl text-center text-2xl font-black tracking-widest text-white placeholder-white/20 focus:border-pink-500/50 focus:outline-none transition-colors uppercase"
                  placeholder="XXXXXX"
                  maxLength={10}
                  required
                />
              </div>

              {error && (
                <p className="text-sm text-red-400 text-center">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={!code.trim() || isVerifying}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-pink-500 text-black rounded-xl font-black uppercase tracking-widest text-xs italic hover:bg-pink-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    Enter
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <p className="text-xs text-white/30 italic text-center">
              Do not have a code? This space is by invitation only.
            </p>
          </div>
        </div>
      </main>

      <SweetSpiceNavbar />
      <Footer />
    </div>
  );
}
