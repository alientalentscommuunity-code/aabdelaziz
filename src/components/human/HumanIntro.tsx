import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useContent, ContentBlock } from "@/hooks/useContent";
import { InlineEdit, EditableList, EditableTags } from "@/components/admin/InlineEdit";

const HumanIntro = () => {
  const { blocks, listItems, tags, loading, updateListItem, deleteListItem, addListItem, addTag, deleteTag } = useContent("human");

  const getBlock = (key: string) => blocks.find((b: ContentBlock) => b.block_key === key);
  const getList = (key: string) => listItems[key] || [];
  const getTags = (key: string) => tags[key] || [];

  if (loading) {
    return <div className="space-y-8 animate-pulse">Loading...</div>;
  }

  const heroBlock = getBlock("hero");
  const taglineBlock = getBlock("tagline");
  const handbookBlock = getBlock("handbook_quotes");
  const snacksBlock = getBlock("vanilla_snacks");
  const sweetSpiceBlock = getBlock("sweet_spice_cta");
  const palestineBlock = getBlock("palestand_message");

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div>
        <InlineEdit
          sectionId="human"
          blockKey="hero"
          field="title"
          content={heroBlock?.title || "Ahmad Abdelaziz"}
          className="text-4xl sm:text-5xl md:text-6xl font-black italic uppercase tracking-tighter mb-4 animate-fade-in text-white"
          as="h1"
        />
        <InlineEdit
          sectionId="human"
          blockKey="hero"
          field="subtitle"
          content={heroBlock?.subtitle || "Human being · Product Management · Community Growth"}
          className="text-lg sm:text-xl font-medium italic text-white/40 mb-1"
        />
        <InlineEdit
          sectionId="human"
          blockKey="hero"
          field="content"
          content={heroBlock?.content || "Shipped AI Sr. Recruiter w/ psychometrics (MVP) · $2K ROI · AI Hackathon Winner"}
          className="text-sm font-medium italic text-white/25"
        />
      </div>

      {/* Tagline */}
      <div>
        <InlineEdit
          sectionId="human"
          blockKey="tagline"
          field="title"
          content={taglineBlock?.title || "Non-Linear · Good Taste · Relentless · Documenting"}
          className="text-lg sm:text-xl font-medium italic text-white/40"
        />
      </div>

      {/* Handbook quote */}
      <div className="glass p-6 sm:p-8 hover:border-pink-400/30 transition-all duration-500">
        <div className="flex items-center gap-2 mb-2">
          <InlineEdit
            sectionId="human"
            blockKey="handbook_quotes"
            field="icon"
            content={handbookBlock?.icon || "📓"}
            className="text-2xl"
          />
          <InlineEdit
            sectionId="human"
            blockKey="handbook_quotes"
            field="title"
            content={handbookBlock?.title || "My ALIEN-Style Handbook"}
            className="text-xl sm:text-2xl font-black italic uppercase tracking-tighter text-white"
            as="h3"
          />
        </div>
        <InlineEdit
          sectionId="human"
          blockKey="handbook_quotes"
          field="subtitle"
          content={handbookBlock?.subtitle || "Non-Linear | Good Taste | High Standards"}
          className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-5"
        />
        
        {/* Editable List */}
        <EditableList
          items={getList("handbook_quotes")}
          blockId={handbookBlock?.id}
          accentColor="text-pink-400"
          onUpdate={updateListItem}
          onDelete={deleteListItem}
          onAdd={addListItem}
        />
      </div>

      {/* Vanilla snacks */}
      <div>
        <InlineEdit
          sectionId="human"
          blockKey="vanilla_snacks"
          field="title"
          content={snacksBlock?.title || "Vanilla Snacks"}
          className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-3"
        />
        <EditableTags
          items={getTags("vanilla_snacks")}
          blockId={snacksBlock?.id}
          onAdd={addTag}
          onDelete={deleteTag}
        />
      </div>

      {/* Sweet Spice Easter Egg */}
      <Link to="/sweet-spice" className="block">
        <div className="glass border-pink-500/20 hover:border-pink-500/50 hover:shadow-[0_0_30px_rgba(244,114,182,0.15)] transition-all duration-300 p-4 rounded-xl cursor-pointer group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <InlineEdit
                sectionId="human"
                blockKey="sweet_spice_cta"
                field="icon"
                content={sweetSpiceBlock?.icon || "🌶️"}
                className="text-xl"
              />
              <InlineEdit
                sectionId="human"
                blockKey="sweet_spice_cta"
                field="content"
                content={sweetSpiceBlock?.content || "There's one more dimension"}
                className="text-sm font-medium italic text-white/60 group-hover:text-pink-400 transition-colors"
              />
            </div>
            <ArrowRight className="w-4 h-4 text-pink-400/60 group-hover:text-pink-400 group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </Link>

      {/* Stand */}
      <div className="border-t border-white/10 pt-6">
        <InlineEdit
          sectionId="human"
          blockKey="palestand_message"
          field="content"
          content={palestineBlock?.content || "🇵🇸 Stand for Humanity · My people · Palestine 𓂆 · Exploring diverse lives & universes."}
          className="text-white/20 text-sm font-medium italic"
        />
      </div>
    </div>
  );
};

export default HumanIntro;
