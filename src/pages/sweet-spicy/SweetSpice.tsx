import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Brain, Sprout, MessageCircle, Target, Globe, ChefHat, Users, Flag, Shield, XCircle, CheckCircle2, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RequestFormDialog } from '@/components/RequestFormDialog';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SweetSpice() {
  const [isRequestOpen, setIsRequestOpen] = useState(false);

  // Who I Am data
  const whoIAmItems = [
    { icon: MapPin, label: 'Based', content: 'Minya, Egypt → Cairo → Anywhere, honestly' },
    { icon: Brain, label: 'Type', content: 'Overthinker who takes action anyway. Multipotentialite. Non-linear.' },
    { icon: Sprout, label: 'How I got here', content: 'Dropped out. Started over from 0. Figured it out by doing it.' },
    { icon: MessageCircle, label: 'Communication', content: "Direct, curious, warm. I'll ask real questions. I'll answer real ones too." },
    { icon: Target, label: 'Values', content: 'Authenticity · Kindness · Curiosity · High Standards' },
    { icon: Globe, label: 'World View', content: 'Obsessed with knowledge, history, architecture, art, adventures.' },
    { icon: ChefHat, label: 'Off-hours', content: 'Cooking, gaming, coffee, connecting people, weekly community meetups.' },
    { icon: Shield, label: 'Spirit', content: "House Stark energy. Loyal to the end. Winter doesn't scare me." },
    { icon: Flag, label: 'Stands for', content: 'Humanity, always. My people. Palestine. No exceptions.' },
  ];

  // Red flags
  const redFlags = [
    "Will absolutely talk about his startup at dinner. Sorry in advance.",
    "Texts back immediately or in 6 hours. No in between.",
    "Has a lot of thoughts. At all times.",
    "Still figuring out the non-linear path. Comfortable with it.",
    "Weekly community meetups are non-negotiable. They are family.",
  ];

  // Green flags
  const greenFlags = [
    "Will also listen to yours — actually listen, not just wait to talk",
    "Loyal to people he chooses. Ride or die energy.",
    "Cooks. Not just instant noodles.",
    "Cries at good storytelling. House Stark. You know why.",
    "Will hype you up more than you hype yourself.",
    "Palestine, Sudan, humanity. Not up for debate.",
  ];

  // Vibe check items
  const vibeCheckItems = [
    "You know what you want — or you are brave enough to figure it out",
    "You are curious. About the world, about people, about ideas at odd hours.",
    "You can sit in silence and also talk for 4 hours straight",
    "You have your own ambitions. Your own thing. I would never want to be your whole world.",
    "You believe kindness is a strength, not a weakness",
    "You are from Minya, or you will not hold it against him 😉",
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Pink ambient glow at top */}
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
        <div className="max-w-4xl mx-auto space-y-20">

          {/* HERO SECTION */}
          <section className="text-center space-y-6 pt-8">
            <p className="text-[10px] font-black uppercase tracking-widest text-pink-400">
              🌶️ SWEET SPICE
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.9]">
              Looking for my<br />
              non-existent-yet<br />
              <span className="text-pink-400" style={{ textShadow: '0 0 30px rgba(244,114,182,0.4)' }}>
                wife.
              </span>
            </h1>
            <p className="text-lg sm:text-xl font-medium italic text-white/40 max-w-xl mx-auto">
              Because even ALIENs fall in love. And this one isn't afraid to say it out loud.
            </p>
          </section>

          {/* WHO I AM SECTION */}
          <section className="space-y-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-pink-400/60">
              THE HUMAN BEHIND THE ALIEN
            </p>
            <div className="glass border-pink-500/20 p-6 md:p-8 rounded-2xl space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {whoIAmItems.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-pink-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">{item.label}</p>
                      <p className="text-sm text-white/70 font-medium italic">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FLAGS SECTION */}
          <section className="grid md:grid-cols-2 gap-6">
            <div className="glass border-red-500/20 p-6 rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="w-5 h-5 text-red-400" />
                <h3 className="text-sm font-black uppercase tracking-widest text-red-400">Red Flags</h3>
              </div>
              <ul className="space-y-3">
                {redFlags.map((flag, idx) => (
                  <li key={idx} className="text-sm text-white/50 font-medium italic flex gap-2">
                    <span className="text-red-400/60">•</span>
                    {flag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass border-green-500/20 p-6 rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <h3 className="text-sm font-black uppercase tracking-widest text-green-400">Green Flags</h3>
              </div>
              <ul className="space-y-3">
                {greenFlags.map((flag, idx) => (
                  <li key={idx} className="text-sm text-white/50 font-medium italic flex gap-2">
                    <span className="text-green-400/60">•</span>
                    {flag}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* VIBE CHECK */}
          <section className="space-y-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-pink-400/60">
              THE VIBE CHECK
            </p>
            <div className="glass border-pink-500/20 p-6 md:p-8 rounded-2xl">
              <p className="text-sm text-white/60 font-medium italic mb-6 text-center">
                This might work if:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {vibeCheckItems.map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <Heart className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-white/50 font-medium italic">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* WHAT I'M BUILDING SECTION */}
          <section className="space-y-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-pink-400/60">
              BEYOND THE STARTUP
            </p>
            <div className="glass border-pink-500/20 p-6 md:p-8 rounded-2xl">
              <p className="text-lg font-medium italic text-white/60 leading-relaxed space-y-4">
                <span className="block">
                  I've spent the last few years building ALIENs Venture from scratch — a talent platform, a community, a weekly newsletter, 100+ hours of meetups, and a space for 36,000 people to belong.
                </span>
                <span className="block">
                  Not because it was the plan. Because I believe in showing up for people and figuring it out as you go.
                </span>
                <span className="block">
                  That's how I want to build a life too.
                </span>
                <span className="block">
                  With someone who gets that the journey isn't linear. Who doesn't need everything figured out to take the next step. Who values real over perfect, and depth over surface.
                </span>
                <span className="block text-pink-400 font-black" style={{ textShadow: '0 0 20px rgba(244,114,182,0.3)' }}>
                  I'm not looking for a companion to join my story. I'm looking for a co-founder for life.
                </span>
              </p>
            </div>
          </section>

          {/* LETTER TO MY FUTURE WIFE */}
          <section className="space-y-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-pink-400/60">
              A LETTER TO YOU
            </p>
            <div className="glass border-pink-500/30 p-6 md:p-8 rounded-2xl border-l-2">
              <div className="space-y-6 text-lg font-medium italic text-white/60 leading-loose">
                <p>Hey, you.</p>
                <p>I don't know when or where yet — but I think about you more than I'd admit.</p>
                <p>You probably have your own thing going on. Your own ambitions, your own chaos, your own quiet. I hope you do, honestly.</p>
                <p>I'm someone who's always figuring things out out loud — building, learning, connecting, questioning. A little chaotic. Deeply loyal. Obsessively curious about everything.</p>
                <p>I want to know what makes you excited at 2am. What you believe in that most people don't. What you're building — even if it's just yourself.</p>
                <p>I want a partner, not just a companion. Someone serious who knows what she wants. Someone kind enough to be honest with me.</p>
                <p>If any of this resonates — maybe it's not a coincidence.</p>
                <p>Minya is small. The world is not. I'll find you.</p>
                <p className="text-pink-400 font-black text-xl pt-4">— Ahmad 🤍</p>
              </div>
            </div>
          </section>

          {/* ARE YOU THE ONE SECTION */}
          <section className="space-y-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-pink-400/60">
              ARE YOU THE ONE?
            </p>
            <p className="text-sm italic text-white/30 -mt-4">
              Not a checklist. Just a vibe.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {vibeCheckItems.map((item, idx) => (
                <div 
                  key={idx}
                  className="glass-sm p-5 rounded-xl border border-white/5 hover:border-pink-500/50 hover:shadow-[0_0_20px_rgba(244,114,182,0.15)] transition-all duration-300"
                >
                  <p className="text-pink-400 font-black text-lg mb-2">✦</p>
                  <p className="text-sm font-medium text-white/70">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* RED FLAGS & GREEN FLAGS */}
          <section className="space-y-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-pink-400/60">
              NO PRETENDING
            </p>
            <p className="text-sm italic text-white/30 -mt-4">
              Full transparency. You deserve to know what you're getting into.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Red Flags */}
              <div className="glass border-orange-500/20 p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="w-5 h-5 text-orange-500" />
                  <h3 className="text-sm font-black uppercase tracking-widest text-orange-500">
                    Red Flags
                  </h3>
                </div>
                <ul className="space-y-3">
                  {redFlags.map((flag, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-white/60">
                      <span className="text-orange-500/60 font-black">{idx + 1}.</span>
                      <span className="italic">{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Green Flags */}
              <div className="glass border-green-500/20 p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <h3 className="text-sm font-black uppercase tracking-widest text-green-500">
                    Green Flags
                  </h3>
                </div>
                <ul className="space-y-3">
                  {greenFlags.map((flag, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-white/60">
                      <span className="text-green-500/60 font-black">✓</span>
                      <span className="italic">{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* CTA SECTION */}
          <section className="text-center space-y-6 py-8">
            <h2 className="text-3xl sm:text-4xl font-black italic uppercase tracking-tighter">
              Think we might be a{' '}
              <span className="text-pink-400" style={{ textShadow: '0 0 30px rgba(244,114,182,0.4)' }}>
                match?
              </span>
            </h2>
            <p className="text-lg italic text-white/40">
              No apps. No algorithms. Just say hi.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                onClick={() => setIsRequestOpen(true)}
                className="h-12 px-8 bg-pink-500 text-black font-black uppercase tracking-widest text-xs italic hover:bg-pink-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(244,114,182,0.4)] active:scale-95"
              >
                Say Hello 🌶️
              </Button>
              <Link to="/human">
                <Button
                  variant="outline"
                  className="h-12 px-8 border-pink-500/30 text-pink-400 font-black uppercase tracking-widest text-xs italic hover:bg-pink-500/10 hover:border-pink-500/50 transition-all duration-300"
                >
                  Meet the Human
                </Button>
              </Link>
            </div>
            <p className="text-xs italic text-white/20 pt-4">
              Or just share this page with someone you think should see it 🌶️
            </p>
          </section>
        </div>
      </main>

      <Footer />
      <RequestFormDialog open={isRequestOpen} onOpenChange={setIsRequestOpen} />
    </div>
  );
}
