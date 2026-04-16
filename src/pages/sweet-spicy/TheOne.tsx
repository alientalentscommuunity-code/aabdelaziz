import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SweetSpiceNavbar from '@/components/SweetSpiceNavbar';
import { useContent } from '@/hooks/useContent';
import { InlineEdit, EditableList } from '@/components/admin/InlineEdit';

export default function TheOne() {
  const { blocks, listItems, loading, updateListItem, deleteListItem, addListItem } = useContent("sweet_spice");
  
  const getBlock = (key: string) => blocks.find((b: any) => b.block_key === key);
  const getList = (key: string) => listItems[key] || [];
  
  if (loading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
  }
  
  const paradoxBlock = getBlock("her_paradox");
  const physicalBlock = getBlock("her_physical");
  const traitsBlock = getBlock("her_traits");
  
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
        <div className="max-w-4xl mx-auto space-y-24">

          {/* SECTION A — HER PORTRAIT */}
          <section className="space-y-8">
            <p className="text-[10px] font-black uppercase tracking-widest text-pink-400">
              THE ONE
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.9]">
              Her <span className="text-pink-400" style={{ textShadow: '0 0 30px rgba(244,114,182,0.4)' }}>Portrait</span>
            </h1>

            {/* The Paradox */}
            <div className="glass border-pink-500/20 p-8 rounded-2xl space-y-6">
              <InlineEdit
                sectionId="sweet_spice"
                blockKey="her_paradox"
                field="title"
                content={paradoxBlock?.title || "The Paradox She Lives In"}
                className="text-2xl font-black italic uppercase tracking-tight text-white"
                as="h2"
              />
              <InlineEdit
                sectionId="sweet_spice"
                blockKey="her_paradox"
                field="content"
                content={paradoxBlock?.content || "She is not one thing. That is exactly what makes her rare and exactly what has made her invisible to the wrong men. She is a baby girl and a deep feminine lioness lady — soft and ferocious, devoted and wild, intellectually dominant and physically surrendered. She lives in her own private universe — not disconnected from the real world, but she has her own private era that belongs only to her."}
                className="text-lg font-medium italic text-white/60 leading-relaxed"
                multiline
              />
            </div>

            {/* Physical & Origin */}
            <div className="glass border-pink-500/20 p-8 rounded-2xl">
              <InlineEdit
                sectionId="sweet_spice"
                blockKey="her_physical"
                field="title"
                content={physicalBlock?.title || "Physical & Origin"}
                className="text-xl font-black italic uppercase tracking-tight text-white mb-4"
                as="h3"
              />
              <InlineEdit
                sectionId="sweet_spice"
                blockKey="her_physical"
                field="content"
                content={physicalBlock?.content || "Petite. Under 160cm preferred. 163cm accepted as maximum. I am 158cm. I want closeness — eye-level intimacy. A world you are inside when you are together. Minya — or rooted in that warmth, that particular Egyptian depth — is a bonus signal. Not a requirement. A resonance."}
                className="text-sm text-white/60 font-medium italic leading-relaxed"
                multiline
              />
            </div>

            {/* Her Traits */}
            <div className="space-y-8">
              <InlineEdit
                sectionId="sweet_spice"
                blockKey="her_traits"
                field="title"
                content={traitsBlock?.title || "Her Traits — In Threes"}
                className="text-xl font-black uppercase tracking-widest text-white/40 text-center"
                as="h2"
              />
              
              <EditableList
                items={getList("her_traits")}
                blockId={traitsBlock?.id}
                accentColor="pink"
                onUpdate={updateListItem}
                onDelete={deleteListItem}
                onAdd={addListItem}
              />
            </div>

            {/* Her Energy */}
            <div className="space-y-8">
              <InlineEdit
                sectionId="sweet_spice"
                blockKey="her_energy"
                field="title"
                content="Her Energy"
                className="text-xl font-black uppercase tracking-widest text-white/40 text-center block"
                as="h2"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass border-pink-500/10 p-6 rounded-2xl space-y-3">
                  <InlineEdit
                    sectionId="sweet_spice"
                    blockKey="her_energy_warmth"
                    field="title"
                    content="Warmth"
                    className="text-sm font-black uppercase tracking-widest text-pink-400 block"
                    as="h3"
                  />
                  <InlineEdit
                    sectionId="sweet_spice"
                    blockKey="her_energy_warmth"
                    field="content"
                    content="She radiates a particular kind of warmth — not performative, not transactional. It is the warmth of someone who actually cares, who pays attention, who brings softness into a room without losing her edge."
                    className="text-sm text-white/50 font-medium italic"
                    multiline
                  />
                </div>

                <div className="glass border-pink-500/10 p-6 rounded-2xl space-y-3">
                  <InlineEdit
                    sectionId="sweet_spice"
                    blockKey="her_energy_surrender"
                    field="title"
                    content="Surrender"
                    className="text-sm font-black uppercase tracking-widest text-pink-400 block"
                    as="h3"
                  />
                  <InlineEdit
                    sectionId="sweet_spice"
                    blockKey="her_energy_surrender"
                    field="content"
                    content="She knows how to let go — but only with someone who has earned it. Her surrender is not weakness. It is a gift she gives deliberately, completely, to someone worthy."
                    className="text-sm text-white/50 font-medium italic"
                    multiline
                  />
                </div>

                <div className="glass border-pink-500/10 p-6 rounded-2xl space-y-3">
                  <InlineEdit
                    sectionId="sweet_spice"
                    blockKey="her_energy_strength"
                    field="title"
                    content="Soft but not weak"
                    className="text-sm font-black uppercase tracking-widest text-pink-400 block"
                    as="h3"
                  />
                  <InlineEdit
                    sectionId="sweet_spice"
                    blockKey="her_energy_strength"
                    field="content"
                    content="She can be gentle, accommodating, even yielding — but never at the cost of her core. She knows where her line is. She is soft because she chooses to be, not because she has to be."
                    className="text-sm text-white/50 font-medium italic"
                    multiline
                  />
                </div>
              </div>
            </div>

            {/* Her Traits — In Threes */}
            <div className="space-y-8">
              <h2 className="text-xl font-black uppercase tracking-widest text-white/40 text-center">
                Her Traits — In Threes
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass border-pink-500/10 p-6 rounded-2xl space-y-3">
                  <h3 className="text-sm font-black uppercase tracking-widest text-pink-400">She leads, she feels, she surrenders</h3>
                  <p className="text-sm text-white/50 font-medium italic">
                    Mentally dominant — she has a point of view and she defends it with grace. Emotionally present — when she trusts, she arrives fully. Physically surrendered — she gives that gift deliberately to someone worthy.
                  </p>
                </div>

                <div className="glass border-pink-500/10 p-6 rounded-2xl space-y-3">
                  <h3 className="text-sm font-black uppercase tracking-widest text-pink-400">She is warm, devoted, and family-rooted</h3>
                  <p className="text-sm text-white/50 font-medium italic">
                    Caring. Attentive. Soft in the way that costs something to maintain and she maintains it anyway. Family is sacred to her — not an obligation, a core. She brings that same warmth into a relationship.
                  </p>
                </div>

                <div className="glass border-pink-500/10 p-6 rounded-2xl space-y-3">
                  <h3 className="text-sm font-black uppercase tracking-widest text-pink-400">She is ambitious, curious, and wild</h3>
                  <p className="text-sm text-white/50 font-medium italic">
                    The bare minimum is not a concept she understands. She sees more — in herself, in life, in a partner. She experiments. She explores. She wants a life worth talking about at 70.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass border-pink-500/10 p-6 rounded-2xl space-y-3">
                  <h3 className="text-sm font-black uppercase tracking-widest text-pink-400">She teases, she challenges, she plays</h3>
                  <p className="text-sm text-white/50 font-medium italic">
                    She baits. She watches you react. She loves to be teased right back. She challenges not to win but because she is genuinely curious if you can match her.
                  </p>
                </div>

                <div className="glass border-pink-500/10 p-6 rounded-2xl space-y-3">
                  <h3 className="text-sm font-black uppercase tracking-widest text-pink-400">She is jealous in the right way</h3>
                  <p className="text-sm text-white/50 font-medium italic">
                    Not insecure. Not controlling. She knows what is hers and she moves for it. She competes with grace and she wins without cruelty.
                  </p>
                </div>

                <div className="glass border-pink-500/10 p-6 rounded-2xl space-y-3">
                  <h3 className="text-sm font-black uppercase tracking-widest text-pink-400">She chooses to surrender</h3>
                  <p className="text-sm text-white/50 font-medium italic">
                    When she has found the right person — someone who has earned it — she lets go completely. Not because she lost. Because she chose. That distinction is everything she is.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION B — WHAT IS IN IT FOR HER */}
          <section className="space-y-8">
            <p className="text-[10px] font-black uppercase tracking-widest text-pink-400">
              WHAT SHE GETS
            </p>
            <h2 className="text-3xl sm:text-4xl font-black italic uppercase tracking-tighter">
              What Is In It For <span className="text-pink-400">Her</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass border-pink-500/20 p-8 rounded-2xl space-y-4">
                <Sparkles className="w-6 h-6 text-pink-400" />
                <h3 className="text-lg font-black uppercase tracking-tight text-white">All of Her — Held</h3>
                <p className="text-sm text-white/50 font-medium italic leading-relaxed">
                  She gets a man who can hold <strong>all of her</strong> — every version, every mode — without flinching, without asking her to pick one.
                </p>
              </div>

              <div className="glass border-pink-500/20 p-8 rounded-2xl space-y-4">
                <Sparkles className="w-6 h-6 text-pink-400" />
                <h3 className="text-lg font-black uppercase tracking-tight text-white">Matched Intensity</h3>
                <p className="text-sm text-white/50 font-medium italic leading-relaxed">
                  She gets someone who <strong>matches her intensity</strong> — the ambition, the wildness, the depth, the play. She will not outgrow him.
                </p>
              </div>

              <div className="glass border-pink-500/20 p-8 rounded-2xl space-y-4">
                <Sparkles className="w-6 h-6 text-pink-400" />
                <h3 className="text-lg font-black uppercase tracking-tight text-white">Safety to Surrender</h3>
                <p className="text-sm text-white/50 font-medium italic leading-relaxed">
                  She gets <strong>safety to surrender</strong> — she has probably been the strong one her whole life. With him she does not have to be.
                </p>
              </div>
            </div>

            <div className="glass border-pink-500/10 p-8 rounded-2xl space-y-4">
              <h3 className="text-lg font-black uppercase tracking-widest text-pink-400 text-center">And Also</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <p className="text-sm text-white/50 font-medium italic">
                  She gets a <strong>builder</strong> — someone who architects a life, not just lives one. Someone who documents, creates, grows with intention.
                </p>
                <p className="text-sm text-white/50 font-medium italic">
                  She gets a man who is <strong>more emotionally present than most men admit to being</strong> — who wants to hold and be held, who will meet her devotion completely.
                </p>
                <p className="text-sm text-white/50 font-medium italic">
                  She gets <strong>seen</strong> — fully, specifically, without performance.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION C — THE INVITATION */}
          <section className="space-y-8 text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-pink-400">
              THE INVITATION
            </p>
            <div className="glass border-pink-500/30 p-8 md:p-12 rounded-2xl space-y-6">
              <p className="text-xl sm:text-2xl font-medium italic text-white/70 leading-relaxed">
                The deeper version of this — and the deeper version of him — is one step further.
              </p>
              <p className="text-base font-medium italic text-white/50">
                If you read this and felt something move — not curiosity, recognition — then you are who this is for.
              </p>
              <div className="pt-4">
                <Link to="/sweet-spice/gate">
                  <button className="group inline-flex items-center gap-3 px-8 py-4 bg-pink-500 text-black font-black uppercase tracking-widest text-xs italic rounded-none hover:bg-pink-400 transition-all duration-300 hover:shadow-[0_0_40px_rgba(244,114,182,0.4)]">
                    <span>I want in</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
              <p className="text-xs text-white/30 italic">
                This leads to a short assessment. Not a test — just a way to protect the space for the right energy.
              </p>
            </div>
          </section>

        </div>
      </main>

      <SweetSpiceNavbar />
      <Footer />
    </div>
  );
}
