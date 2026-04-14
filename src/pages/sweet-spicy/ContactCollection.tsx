import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Phone, Mail, Instagram, Facebook, Linkedin, Loader2, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SweetSpiceNavbar from '@/components/SweetSpiceNavbar';
import { useAuth } from '@/hooks/useSupabase';

interface ContactMethod {
  type: 'phone' | 'email' | 'instagram' | 'facebook' | 'linkedin';
  value: string;
  label: string;
}

export default function ContactCollection() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const isAdmin = !!user;
  
  // Admin bypass - use mock evaluation
  const evaluation = isAdmin 
    ? { score: 100, passed: true, strong_match: true, isAdmin: true }
    : (location.state?.evaluation || JSON.parse(sessionStorage.getItem('sweet_spice_evaluation') || '{}'));
  
  const [name, setName] = useState('');
  const [contactMethods, setContactMethods] = useState<ContactMethod[]>([
    { type: 'phone', value: '', label: 'Phone Number' },
    { type: 'email', value: '', label: 'Email Address' },
    { type: 'instagram', value: '', label: 'Instagram' },
    { type: 'facebook', value: '', label: 'Facebook' },
    { type: 'linkedin', value: '', label: 'LinkedIn' },
  ]);
  const [preferredMethod, setPreferredMethod] = useState<string>('phone');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [note, setNote] = useState('');

  const updateContactMethod = (type: string, value: string) => {
    setContactMethods(prev => 
      prev.map(method => 
        method.type === type ? { ...method, value } : method
      )
    );
  };

  const hasAtLeastOneContact = () => {
    return contactMethods.some(method => method.value.trim() !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !hasAtLeastOneContact()) return;

    setIsSubmitting(true);

    try {
      // Get request ID from session storage
      const requestId = sessionStorage.getItem('sweet_spice_request_id');
      
      // Build contact data
      const contactData: any = {
        name: name.trim(),
        preferred_contact_method: preferredMethod,
        contact_shared: true,
        contact_note: note.trim()
      };
      
      // Add all provided contact methods
      contactMethods.forEach(method => {
        if (method.value.trim()) {
          contactData[method.type] = method.value.trim();
        }
      });
      
      if (requestId) {
        const { error } = await supabase
          .from('sweet_spice_requests')
          .update(contactData)
          .eq('id', requestId);
          
        if (error) {
          console.error('Error updating contact:', error);
        }
      } else {
        // Fallback: create new record with contact info
        const { error } = await supabase
          .from('sweet_spice_requests')
          .insert({
            ...contactData,
            status: 'pending'
          });
          
        if (error) {
          console.error('Error creating contact:', error);
        }
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
              Final Step
            </p>
            <h1 className="text-3xl sm:text-4xl font-black italic uppercase tracking-tighter">
              Let's <span className="text-pink-400">Connect</span>
            </h1>
            {evaluation?.strong_match && (
              <p className="text-base text-pink-400/80 italic">
                There's something real here. I want to explore it with you.
              </p>
            )}
          </div>

          <div className="glass border-pink-500/20 p-8 rounded-2xl space-y-6">
            <p className="text-base text-white/60 leading-relaxed text-center">
              Your answers showed alignment, and that matters. Now — how can Ahmad reach you?
            </p>
            <p className="text-sm text-white/50 leading-relaxed text-center">
              Share however you're most comfortable. Phone is great, but Instagram, email, LinkedIn — whatever feels right for you.
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

              <div className="space-y-3">
                <label className="block text-[10px] font-black uppercase tracking-widest text-white/40">
                  Your Contact Info (share any or all)
                </label>
                
                {/* Phone */}
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input
                    type="tel"
                    value={contactMethods.find(m => m.type === 'phone')?.value || ''}
                    onChange={(e) => updateContactMethod('phone', e.target.value)}
                    className="w-full p-4 pl-12 bg-black/50 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-pink-500/50 focus:outline-none transition-colors"
                    placeholder="Phone Number (e.g., +20 1XX XXX XXXX)"
                  />
                </div>

                {/* Instagram */}
                <div className="relative">
                  <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input
                    type="text"
                    value={contactMethods.find(m => m.type === 'instagram')?.value || ''}
                    onChange={(e) => updateContactMethod('instagram', e.target.value)}
                    className="w-full p-4 pl-12 bg-black/50 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-pink-500/50 focus:outline-none transition-colors"
                    placeholder="Instagram username"
                  />
                </div>

                {/* Facebook */}
                <div className="relative">
                  <Facebook className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input
                    type="text"
                    value={contactMethods.find(m => m.type === 'facebook')?.value || ''}
                    onChange={(e) => updateContactMethod('facebook', e.target.value)}
                    className="w-full p-4 pl-12 bg-black/50 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-pink-500/50 focus:outline-none transition-colors"
                    placeholder="Facebook profile or name"
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input
                    type="email"
                    value={contactMethods.find(m => m.type === 'email')?.value || ''}
                    onChange={(e) => updateContactMethod('email', e.target.value)}
                    className="w-full p-4 pl-12 bg-black/50 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-pink-500/50 focus:outline-none transition-colors"
                    placeholder="Email address"
                  />
                </div>

                {/* LinkedIn */}
                <div className="relative">
                  <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input
                    type="text"
                    value={contactMethods.find(m => m.type === 'linkedin')?.value || ''}
                    onChange={(e) => updateContactMethod('linkedin', e.target.value)}
                    className="w-full p-4 pl-12 bg-black/50 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-pink-500/50 focus:outline-none transition-colors"
                    placeholder="LinkedIn profile URL or name"
                  />
                </div>
              </div>

              {/* Preferred Method */}
              {hasAtLeastOneContact() && (
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">
                    Preferred way to connect
                  </label>
                  <select
                    value={preferredMethod}
                    onChange={(e) => setPreferredMethod(e.target.value)}
                    className="w-full p-3 bg-black/50 border border-white/10 rounded-xl text-white focus:border-pink-500/50 focus:outline-none"
                  >
                    {contactMethods
                      .filter(m => m.value.trim())
                      .map(m => (
                        <option key={m.type} value={m.type}>{m.label}</option>
                      ))}
                  </select>
                </div>
              )}

              {/* Note to Ahmad */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">
                  Anything else you want to say? (optional)
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full p-4 bg-black/50 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-pink-500/50 focus:outline-none transition-colors h-24 resize-none"
                  placeholder="Best time to call? Something specific you want to share?"
                />
              </div>

              <button
                type="submit"
                disabled={!name.trim() || !hasAtLeastOneContact() || isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-pink-500 text-black rounded-xl font-black uppercase tracking-widest text-xs italic hover:bg-pink-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    Share & Connect
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <p className="text-xs text-white/30 italic text-center">
              Your information is private and will only be seen by Ahmad.
            </p>
          </div>
        </div>
      </main>

      <SweetSpiceNavbar />
      <Footer />
    </div>
  );
}
