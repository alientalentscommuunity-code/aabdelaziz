import React from "react";
import { Briefcase, TrendingUp, Users, Award, Youtube, ExternalLink } from "lucide-react";
import AliensDeepDive from "@/components/career/AliensDeepDive";

const Experience = () => {
  return (
    <section id="journey" className="py-20 bg-black ambient-glow">
      <div className="section-container">
        <h2 className="section-title">
          My <span className="highlight">Journey</span>
        </h2>

        <div className="space-y-8">
          {/* ALIENs Venture */}
          <div className="scroll-animation">
            <div className="glass p-8 hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] transition-all duration-500">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter text-green-500">ALIENs Venture</h3>
                  <p className="text-white/40 font-medium italic text-sm">July 2024 – Current</p>
                </div>
                <span className="px-4 py-1 bg-green-500/10 text-green-500 rounded-full text-[10px] font-black uppercase tracking-widest animate-neon-pulse">
                  Current
                </span>
              </div>

              {/* Product Manager Role */}
              <div className="mb-8">
                <h4 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
                  <Briefcase size={20} className="text-green-500" />
                  Product Manager | Entrepreneur in Residence "Learning"
                </h4>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-4">January 2024 – Current</p>
                
                <div className="space-y-3 text-white/40 font-medium italic">
                  <p className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    Skilled in 0 → MVP: Ideate, Discovery, Research, PRD, Strategy, Prototyping with LLMs & Vibe coding tools.
                  </p>
                  
                  <div className="ml-4 space-y-2">
                    <p className="flex items-start gap-2">
                      <span className="text-orange-500">→</span>
                      Shipped Jobs & companies boards, talent marketplace, Mini ATS, and +2 in-progress MVPs
                    </p>
                    <div className="ml-4 grid sm:grid-cols-2 gap-3">
                      <div className="glass-sm p-4 flex items-center gap-3 hover:border-green-500/50 transition-all">
                        <TrendingUp className="text-green-500" size={20} />
                        <div>
                          <p className="text-green-500 font-bold not-italic">20k+ visits</p>
                          <p className="text-[10px] font-black uppercase tracking-widest text-white/20 not-italic">3k+ applies, 500 Signups</p>
                        </div>
                      </div>
                      <div className="glass-sm p-4 flex items-center gap-3 hover:border-green-500/50 transition-all">
                        <Award className="text-green-500" size={20} />
                        <div>
                          <p className="text-green-500 font-bold not-italic">$2k+ ROI</p>
                          <p className="text-[10px] font-black uppercase tracking-widest text-white/20 not-italic">100% Profit margin</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    2 Closed-won partnerships with nsave.co, Athar Accelerator, and $5K inbound MRR Pipeline
                  </p>
                  
                  <p className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span className="text-orange-500 font-bold not-italic">Winner in Cairo AI Hackathon by Athar Accelerator</span>
                  </p>
                  
                  <p className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    1 talent secured a $1.5k/month full-time job, 1 talent earned $1.8K in a 3-month gig.
                  </p>
                  
                  <p className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    +16 talents secured one or multiple interviews, and +50 in total interviews secured.
                  </p>
                  
                  <p className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    Leveraged diverse tech stacks: Claude, Lovable.dev, Supabase, Airtable, Softr, Notion, Lark.
                  </p>
                </div>
              </div>

              {/* Community & Program Role */}
              <div className="pt-6 border-t border-white/10">
                <h4 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
                  <Users size={20} className="text-orange-500" />
                  Community & Program
                </h4>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-4">July 2024 – December 2024</p>
                
                <div className="space-y-3 text-white/40 font-medium italic">
                  <p className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    Managing end-to-end programs, ops, design, content.
                  </p>
                  <div className="ml-4 space-y-2">
                    <p className="flex items-start gap-2">
                      <span className="text-green-500">→</span>
                      70+ weeks of newsletter, Blog, and Meetups.
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-green-500">→</span>
                      100+ hours of weekly meetups & 1-to-1 calls
                    </p>
                  </div>
                  
                  <p className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    Host & Creator @ ALIENs Talks Podcast.
                  </p>
                  <div className="ml-4 flex flex-wrap gap-4 mt-2">
                    <span className="flex items-center gap-2 glass-sm px-3 py-2 text-sm not-italic">
                      <Youtube className="text-red-500" size={18} />
                      <span className="text-white/40">250 subs | 6.3K views | 50 videos</span>
                    </span>
                    <a 
                      href="https://www.youtube.com/@ALIEN.Talents" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-green-500 hover:text-green-400 transition-colors text-sm not-italic"
                    >
                      <ExternalLink size={16} />
                      Watch on YouTube
                    </a>
                  </div>
                  
                  <p className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    🛡️ Moderate 36k SubReddit members
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Commercial Experience */}
          <div className="scroll-animation delay-100">
            <div className="glass p-8 hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] transition-all duration-500">
              <h3 className="text-xl font-black italic uppercase tracking-tighter mb-6 text-white">Commercial Experience (Pre-Product Career)</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-base font-bold text-green-500 mb-2">
                    Customer Lifecycle & GTM Roles | Tech & SaaS
                  </h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-3">Egypt, GCC, EMEA (2020–2024)</p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="glass-sm p-4 hover:border-green-500/50 transition-all">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">B2B Pipeline</p>
                      <p className="text-2xl font-black text-green-500">$240K</p>
                      <p className="text-xs text-white/20 not-italic">40+ SQOs delivered</p>
                    </div>
                    <div className="glass-sm p-4 hover:border-orange-500/50 transition-all">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">B2C Revenue</p>
                      <p className="text-2xl font-black text-orange-500">$10K</p>
                      <p className="text-xs text-white/20 not-italic">60% new | 25% retention | 15% referrals</p>
                    </div>
                  </div>
                  <p className="mt-3 text-white/40 font-medium italic flex items-center gap-2">
                    <Award className="text-green-500" size={16} />
                    90%+ CSAT scores
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <h4 className="text-base font-bold text-orange-500 mb-2">
                    Early Career in SMEs & Startups
                  </h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-3">2014–2020</p>
                  
                  <div className="space-y-2 text-white/40 font-medium italic">
                    <p className="flex items-start gap-2">
                      <span className="text-green-500">•</span>
                      Validated MVPs (AI/Bot therapist, VR Montessori), built internal processes, and secured partnerships.
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-green-500">•</span>
                      Hands-on experience in sales, support, ops, and stakeholder management.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="scroll-animation delay-200">
            <div className="glass p-8 hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] transition-all duration-500">
              <h3 className="text-xl font-black italic uppercase tracking-tighter mb-6 text-white">Education</h3>
              
              <div className="space-y-4 text-white/40 font-medium italic">
                <p className="flex items-start gap-2">
                  <span className="text-green-500">📚</span>
                  Faculty of Commerce - Beni Suef University - Dropped Out (2016–2019)
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-green-500">🎓</span>
                  High School Diploma (2011–2016)
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-orange-500">🌱</span>
                  <span>
                    <span className="font-bold text-white not-italic">Autodidact:</span> Self-learner with RVE/Learning by doing Approach (2014–Now)
                  </span>
                </p>
                <div className="ml-6 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-bold not-italic">Entrepreneurship</span>
                  <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-bold not-italic">Sales & BD</span>
                  <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-bold not-italic">Product Management</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
