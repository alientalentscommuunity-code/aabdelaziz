import React from "react";
import { Mail, Linkedin, Youtube, Phone, Briefcase, TrendingUp, Award, Users } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import { InlineEdit, EditableList, EditableTags } from "@/components/admin/InlineEdit";
import { DOMAINS, GEOS, SUB_ROLES, EXPERTISE_SECTIONS, EXPERIENCE } from "@/lib/data";

interface CareerIntroProps {
  cvOpen: boolean;
  setCvOpen: (v: boolean | ((o: boolean) => boolean)) => void;
}

const CareerIntro = ({ cvOpen, setCvOpen }: CareerIntroProps) => {
  const { blocks, listItems, tags, loading, updateListItem, deleteListItem, addListItem, addTag, deleteTag } = useContent("career");
  
  const getBlock = (key: string) => blocks.find((b: any) => b.block_key === key);
  const getList = (key: string) => listItems[key] || [];
  const getTags = (key: string) => tags[key] || [];
  
  if (loading) {
    return <div className="space-y-8 animate-pulse">Loading...</div>;
  }
  
  const heroBlock = getBlock("hero");
  const skillsBlock = getBlock("skills");
  return (
    <div className="space-y-10">
      {/* ── HERO BLOCK ── */}
      <div>
        <InlineEdit
          sectionId="career"
          blockKey="hero"
          field="title"
          content={heroBlock?.title || "Ahmad Abdelaziz"}
          className="text-4xl sm:text-5xl md:text-6xl font-black italic uppercase tracking-tighter mb-4 animate-fade-in text-white"
          as="h1"
        />
        <InlineEdit
          sectionId="career"
          blockKey="hero"
          field="subtitle"
          content={heroBlock?.subtitle || "AI Product Manager | Founder & Entrepreneur in Residence"}
          className="text-lg sm:text-xl font-medium italic text-white/40 mb-2"
        />

        {/* Sub-role chips */}
        <div className="flex flex-wrap gap-2 mt-4 mb-4">
          {SUB_ROLES.map((r) => (
            <span key={r} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold">
              {r}
            </span>
          ))}
        </div>

        {/* Sub-tagged headlines */}
        <p className="text-sm font-medium italic text-white/40">
          AI Product Manager | Community Growth | Entrepreneur In Residence
        </p>
        <p className="text-sm font-medium italic text-white/25 mt-1">
          Learning by doing → Curious • Kind • Wild
        </p>

        {/* Contact row */}
        <div className="flex flex-wrap gap-4 mt-6 text-white/40">
          <a href="mailto:ahmad@alientalents.com" className="flex items-center gap-2 hover:text-primary transition-colors text-sm">
            <Mail size={16} /> ahmad@alientalents.com
          </a>
          <a href="https://www.linkedin.com/in/ahmad96abdelaziz/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors text-sm">
            <Linkedin size={16} /> LinkedIn
          </a>
          <a href="https://www.youtube.com/@ALIENs.venture" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors text-sm">
            <Youtube size={16} /> YouTube
          </a>
          <a href="tel:+201067156747" className="flex items-center gap-2 hover:text-primary transition-colors text-sm">
            <Phone size={16} /> (+20) 1067156747
          </a>
        </div>
      </div>

      {/* ── EXPERTISE SUMMARY MAP ── */}
      <div className="glass p-6 sm:p-8">
        <div className="flex flex-wrap gap-8 items-start">
          <div>
            <p className="text-3xl sm:text-4xl font-black text-primary">+12</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mt-1">Years of Experience</p>
          </div>
          <div className="w-px h-12 bg-white/10 hidden sm:block" />
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-2">Domains</p>
            <div className="flex flex-wrap gap-2">
              {DOMAINS.map((d) => (
                <span key={d} className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-bold">{d}</span>
              ))}
            </div>
          </div>
          <div className="w-px h-12 bg-white/10 hidden sm:block" />
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-2">Markets</p>
            <div className="flex flex-wrap gap-2">
              {GEOS.map((g) => (
                <span key={g} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold">{g}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── EXPERTISE SECTIONS ── */}
      <div className="space-y-8">
        {EXPERTISE_SECTIONS.map((sec, i) => (
          <div key={i} className="glass p-6 sm:p-8 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] transition-all duration-500">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-black italic uppercase tracking-tighter text-white flex items-center gap-2">
                  <span>{sec.icon}</span> {sec.title}
                </h3>
              </div>
            </div>

            <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-5">{sec.subtitle}</p>

            <div className="space-y-3 text-white/40 font-medium italic">
              {sec.bullets.map((b, j) => (
                <p key={j} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  {b}
                </p>
              ))}
            </div>

            {/* Metric cards for Product section */}
            {i === 0 && (
              <div className="grid sm:grid-cols-2 gap-4 mt-5">
                <div className="glass-sm p-4 flex items-center gap-3 hover:border-primary/50 transition-all">
                  <TrendingUp className="text-primary" size={20} />
                  <div>
                    <p className="text-primary font-bold not-italic">20K+ visits</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20 not-italic">500+ signups · $2K revenue</p>
                  </div>
                </div>
                <div className="glass-sm p-4 flex items-center gap-3 hover:border-secondary/50 transition-all">
                  <Award className="text-secondary" size={20} />
                  <div>
                    <p className="text-secondary font-bold not-italic">$5K MRR Pipeline</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20 not-italic">100% Profit margin</p>
                  </div>
                </div>
              </div>
            )}

            {sec.highlight && (
              <p className="flex items-start gap-2 mt-4 text-white/40 font-medium italic">
                <span className="text-secondary mt-1">•</span>
                <span className="text-secondary font-bold not-italic">{sec.highlight}</span>
              </p>
            )}

            {sec.stack && (
              <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mt-4">{sec.stack}</p>
            )}

            {/* Commercial section metric cards */}
            {i === 2 && (
              <>
                <div className="grid sm:grid-cols-2 gap-4 mt-5">
                  <div className="glass-sm p-4 hover:border-primary/50 transition-all">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">B2B Pipeline</p>
                    <p className="text-2xl font-black text-primary">$240K</p>
                    <p className="text-xs text-white/20 not-italic">40+ SQOs delivered</p>
                  </div>
                  <div className="glass-sm p-4 hover:border-secondary/50 transition-all">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">B2C Revenue</p>
                    <p className="text-2xl font-black text-secondary">$10K</p>
                    <p className="text-xs text-white/20 not-italic">60% new | 25% retention | 15% referrals</p>
                  </div>
                </div>
                <p className="mt-3 text-white/40 font-medium italic flex items-center gap-2">
                  <Award className="text-primary" size={16} />
                  90%+ CSAT scores
                </p>
              </>
            )}

            {sec.extra && (
              <div className="pt-6 mt-6 border-t border-white/10">
                <h4 className="text-base font-bold text-secondary mb-2">
                  {sec.extra.subtitle?.split("|")[0]}
                </h4>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-3">
                  {sec.extra.subtitle?.includes("|") ? sec.extra.subtitle.split("|").slice(1).join("|").trim() : ""}
                </p>
                <div className="space-y-2 text-white/40 font-medium italic">
                  {sec.extra.bullets.map((b, j) => (
                    <p key={j} className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      {b}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 🔒 FULL CV VIEW — DO NOT EDIT */}
      <div>
        <button onClick={() => setCvOpen((o: boolean) => !o)}
          className={`btn btn-outline flex items-center gap-2 ${
            cvOpen ? "text-white/90 bg-white/[0.06]" : ""
          }`}>
          <span className={`inline-block transition-transform duration-300 ${cvOpen ? "rotate-45" : ""}`}>+</span>
          {cvOpen ? "Collapse full CV" : "View full CV"}
        </button>

        {cvOpen && (
          <div className="mt-8 glass p-6 sm:p-8">
            {EXPERIENCE.map((exp, i) => (
              <div key={i} className="border-l-2 border-primary/30 pl-5 mb-7">
                <div className="flex justify-between items-start flex-wrap gap-1 mb-2.5">
                  <span className="text-base font-bold text-white">{exp.company}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/20">{exp.period}</span>
                </div>
                {exp.roles.map((role, j) => (
                  <div key={j} className="mb-3">
                    {role.title && <div className="text-sm font-bold text-primary mb-1.5">{role.title}</div>}
                    {role.bullets.map((b, k) => (
                      <div key={k} className="flex gap-2 items-start mb-1">
                        <span className="text-white/20 text-[10px] mt-1 shrink-0">–</span>
                        <span className="text-sm text-white/40 font-medium italic leading-[1.6]">{b}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerIntro;
