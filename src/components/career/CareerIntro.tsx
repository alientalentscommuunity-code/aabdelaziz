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
  const introBlock = getBlock("intro");
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

        {/* Skills Tags */}
        <div className="mt-4 mb-4">
          <EditableTags
            items={getTags("skills")}
            blockId={skillsBlock?.id}
            accentColor="primary"
            onAdd={addTag}
            onDelete={deleteTag}
          />
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

      {/* ── INTRO BLOCK ── */}
      <div className="glass p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-4">
          <InlineEdit
            sectionId="career"
            blockKey="intro"
            field="icon"
            content={introBlock?.icon || "💼"}
            className="text-2xl"
          />
          <InlineEdit
            sectionId="career"
            blockKey="intro"
            field="title"
            content={introBlock?.title || "Career Galaxy"}
            className="text-xl sm:text-2xl font-black italic uppercase tracking-tighter text-white"
            as="h3"
          />
        </div>
        <InlineEdit
          sectionId="career"
          blockKey="intro"
          field="subtitle"
          content={introBlock?.subtitle || "My professional journey"}
          className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-5"
        />
        <InlineEdit
          sectionId="career"
          blockKey="intro"
          field="content"
          content={introBlock?.content || "Product Manager with experience building 0-to-1 products. Obsessed with user experience, growth, and building things that matter."}
          className="text-white/40 font-medium italic mb-6"
          multiline
        />
        
        {/* Skills Section */}
        <div className="border-t border-white/10 pt-6">
          <InlineEdit
            sectionId="career"
            blockKey="skills"
            field="title"
            content={skillsBlock?.title || "Skills & Tools"}
            className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-3"
          />
          <EditableTags
            items={getTags("skills")}
            blockId={skillsBlock?.id}
            accentColor="purple"
            onAdd={addTag}
            onDelete={deleteTag}
          />
        </div>
      </div>

      {/* ── EXPERTISE SECTIONS (Dynamic from CMS) ── */}
      <div className="space-y-8">
        {getList("expertise").map((item, i) => (
          <div key={item.id} className="glass p-6 sm:p-8 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] transition-all duration-500">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{item.icon || "⚡"}</span>
              <EditableList
                items={[{...item, content: item.content}]}
                blockId={introBlock?.id}
                accentColor="primary"
                onUpdate={updateListItem}
                onDelete={deleteListItem}
                onAdd={addListItem}
              />
            </div>
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
