import React from "react";
import { Heart, Sparkles, Globe, Gamepad2, ChefHat, Coffee } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-black">
      <div className="section-container">
        <h2 className="section-title">
          About <span className="highlight">Me</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* LinkedIn Bio */}
          <div className="scroll-animation">
            <div className="glass p-8 hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] transition-all duration-500">
              <p className="text-xl font-medium italic text-white/40 mb-6">
                Hey, curious stalker—I'm Ahmad • Human being.
              </p>
              
              <div className="space-y-4 text-white/40 font-medium italic">
                <p className="flex items-center gap-2">
                  <span className="text-green-500">✌🏻</span>
                  Doing Product Management • Community Growth
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-green-500">🏇</span>
                  Shipped AI Sr. Recruiter w/ psychometrics (MVP)
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-orange-500">🎖</span>
                  $2K ROI (Partnerships & AI Hackathon Winner)
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <h3 className="text-sm font-black uppercase tracking-widest text-green-500 mb-4">My ALIEN-Style Handbook</h3>
                <p className="text-white/40 font-medium italic mb-4">"Non-Linear | Good Taste | High Standards"</p>
                
                <div className="space-y-3 text-white/40 font-medium italic">
                  <p className="flex items-start gap-2">
                    <span className="text-green-500">🌵</span>
                    Starting over.. from 0. But like an ALIEN.
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-orange-500">🎖</span>
                    Surviving uncertainty w/ unstoppable resilience
                  </p>
                  <p className="flex items-start gap-2 ml-4">
                    <span className="text-orange-500">✧</span>
                    like a Porsche with no brakes. (Sia 🩷).
                  </p>
                  <p className="flex items-start gap-2 ml-4">
                    <span className="text-green-500">✧</span>
                    Learning by doing → Curious • Kind • Wild
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="space-y-3 text-white/40 font-medium italic">
                  <p className="flex items-start gap-2">
                    <Heart className="text-red-500 mt-1" size={16} />
                    Obsessed with Knowledge • Trying things out
                  </p>
                  <p className="flex items-start gap-2 ml-4">
                    <span className="text-orange-500">✧</span>
                    + Any kind of: Art • Architecture • Adventures
                  </p>
                  <p className="flex items-start gap-2 ml-4">
                    <span className="text-green-500">✧</span>
                    24/7 active to Connect & initiate talks/activities.
                  </p>
                  <p className="flex items-start gap-2">
                    <span>🇵🇸</span>
                    Stand for Humanity • My ppl • Palestine
                  </p>
                  <p className="flex items-start gap-2">
                    <Sparkles className="text-orange-500 mt-1" size={16} />
                    Exploring diverse lives & universe(s).
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-3 mt-4 text-sm text-white/20">
                  <span className="flex items-center gap-1"><Globe size={14} /> Hangouts</span>
                  <span className="flex items-center gap-1"><ChefHat size={14} /> Cooking</span>
                  <span className="flex items-center gap-1"><Gamepad2 size={14} /> Gaming</span>
                  <span className="flex items-center gap-1"><Coffee size={14} /> Coffee</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 text-center">
                <p className="text-green-500 text-lg font-bold">🦄 Would it help? Yep.</p>
                <p className="text-white/40 font-medium italic mt-2">Curious? Aligned? Resonate with my journey? 🙃</p>
              </div>
            </div>
          </div>

          {/* Working Style */}
          <div className="scroll-animation delay-200">
            <div className="glass p-8 hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] transition-all duration-500">
              <h3 className="text-sm font-black uppercase tracking-widest text-white mb-6 flex items-center gap-2">
                <span className="text-2xl">💼</span> Working Style
              </h3>

              <div className="space-y-6">
                <div className="glass-sm p-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-2 pl-4">Commute</h4>
                  <p className="text-white/40 font-medium italic pl-4">Global Remote / Open to Relocation</p>
                </div>

                <div className="glass-sm p-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-2 pl-4">Employment</h4>
                  <div className="flex flex-wrap gap-2 pl-4">
                    <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-bold">EOR</span>
                    <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-bold">Direct</span>
                    <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-bold">B2B Contractor</span>
                  </div>
                </div>

                <div className="glass-sm p-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-2 pl-4">Commitment</h4>
                  <div className="flex flex-wrap gap-2 pl-4">
                    <span className="px-3 py-1 bg-orange-500/10 text-orange-500 rounded-full text-xs font-bold">Full-Time</span>
                    <span className="px-3 py-1 bg-orange-500/10 text-orange-500 rounded-full text-xs font-bold">Project-Based</span>
                  </div>
                </div>

                <div className="glass-sm p-4">
                  <h4 className="text-sm font-black uppercase tracking-widest text-white mb-4 pl-4 flex items-center gap-2">
                    <span>💰</span> Compensation Ask
                  </h4>
                  <div className="space-y-3 pl-4">
                    <p className="flex items-center gap-3 text-white/40 font-medium italic">
                      <span className="text-xl">💵</span>
                      <span><span className="text-green-500 font-bold not-italic">$1K – $1.5K</span> / month + package</span>
                    </p>
                    <p className="flex items-center gap-3 text-white/40 font-medium italic">
                      <span className="text-xl">⏱️</span>
                      <span><span className="text-green-500 font-bold not-italic">$25</span> / hour</span>
                    </p>
                    <p className="flex items-center gap-3 text-white/40 font-medium italic">
                      <span className="text-xl">🤝</span>
                      <span><span className="text-orange-500 font-bold not-italic">$0</span> for my peers (learning by doing together)</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
