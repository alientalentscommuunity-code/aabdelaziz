import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Phone, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactCollection() {
  const navigate = useNavigate();
  const location = useLocation();
  const evaluation = location.state?.evaluation;
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSubmitting(true);

    try {
      // Get the most recent request (we need to link contact to it)
      const { data: recentRequest } = await supabase
        .from('sweet_spice_requests')
        .select('id')
        .eq('passed', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (recentRequest) {
        await supabase
          .from('sweet_spice_requests')
          .update({
            name: name.trim(),
            phone: phone.trim(),
            contact_shared: true
          })
          .eq('id', recentRequest.id);
      }

      setSubmitted(true);
    } catch (error) {
      console.error('Error saving contact:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
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
              <p className="text-lg font-medium italic text-white/70 leading-relaxed">
                I read your answers properly. Not a skim.
              </p>
              <p className="text-base text-white/50 leading-relaxed">
                Ahmad will reach out to you personally — to thank you, and to share what comes next. Expect to hear from him within 24 to 48 hours.
              </p>
              <p className="text-xl font-black italic text-pink-400 pt-4">
                Until then.
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
            <p className="text-[10px] font-black uppercase tracking-widest text-pink-400">
              One More Step
            </p>
            <h1 className="text-3xl sm:text-4xl font-black italic uppercase tracking-tighter">
              How Can He Reach <span className="text-pink-400">You</span>?
            </h1>
          </div>

          <div className="glass border-pink-500/20 p-8 rounded-2xl space-y-6">
            <p className="text-base text-white/60 leading-relaxed text-center">
              Your answers were honest and that means something.
            </p>
            <p className="text-sm text-white/50 leading-relaxed text-center">
              To continue, he needs a way to reach you — a phone number is enough. Without that, he cannot take this further. That is the only ask.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-4 bg-black/50 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-pink-500/50 focus:outline-none transition-colors"
                  placeholder="What should he call you?"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-4 pl-12 bg-black/50 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-pink-500/50 focus:outline-none transition-colors"
                    placeholder="+20 1XX XXX XXXX"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!name.trim() || !phone.trim() || isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-pink-500 text-black rounded-xl font-black uppercase tracking-widest text-xs italic hover:bg-pink-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <p className="text-xs text-white/30 italic text-center">
              If you change your mind, you are welcome to try again.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
