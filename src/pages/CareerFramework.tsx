import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CareerFramework = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <div className="section-container pt-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-4">
            <span className="text-green-500 neon-glow">ALIEN</span> Careers Framework
          </h1>
          <p className="text-xl font-medium italic text-white/40 mb-12">
            Remote Mastery for Multipotentialites
          </p>

          <div className="mb-16">
            <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-6 text-white flex items-center">
              <span className="text-green-500 mr-3">🎯</span> Core Track: Product & Strategy
            </h2>
            
            <div className="glass p-8 mb-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-green-500 mb-4">Entry Roles to Start With:</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {["Associate Product Manager", "Product Operations", "Product Analyst", "Junior Product Manager"].map((role, index) => (
                  <li key={index} className="flex items-center text-white/40 font-medium italic">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 shadow-[0_0_6px_rgba(34,197,94,0.6)]"></span>
                    {role}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="glass p-8 mb-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-green-500 mb-4">Core Skills to Develop:</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Product Discovery",
                  "Writing PRDs & Specs",
                  "Problem Solving",
                  "Prioritization (RICE, MoSCoW)",
                  "Customer Interviews & Feedback Loops",
                  "Cross-functional Communication"
                ].map((skill, index) => (
                  <li key={index} className="flex items-center text-white/40 font-medium italic">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 shadow-[0_0_6px_rgba(34,197,94,0.6)]"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="glass p-8 mb-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-green-500 mb-4">Tools to Learn and Use:</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Notion / Confluence",
                  "Figma (for wireframing)",
                  "Jira / Linear",
                  "Productboard",
                  "Miro"
                ].map((tool, index) => (
                  <li key={index} className="flex items-center text-white/40 font-medium italic">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 shadow-[0_0_6px_rgba(34,197,94,0.6)]"></span>
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="glass p-8">
              <h3 className="text-sm font-black uppercase tracking-widest text-green-500 mb-4">Top Learning Resources:</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Product School",
                  "Marty Cagan – SVPG Articles",
                  "Reforge (advanced level)",
                  "YouTube Channels: Lewis C. Lin, Product Alliance",
                  "Books: Inspired and Lean Product Playbook"
                ].map((resource, index) => (
                  <li key={index} className="flex items-center text-white/40 font-medium italic">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 shadow-[0_0_6px_rgba(34,197,94,0.6)]"></span>
                    {resource}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-6 text-white">
              <span className="text-orange-500 mr-3">🧱</span> Supporting Tracks
            </h2>
            
            <div className="space-y-6">
              {[
                { icon: "🧩", title: "Business & Sales", roles: "SDR, CSM, AE", helps: ["Understanding real customers", "Handling market objections", "Developing product vision based on customer pain points"] },
                { icon: "📣", title: "Marketing & Growth", roles: "Content Marketer, Growth Marketer", helps: ["Testing product messaging before building", "Learning acquisition loops", "Building demand and go-to-market strategies"] },
                { icon: "🎥", title: "Content Creation & Storytelling", roles: "Podcast Host, YouTube Creator, Knowledge Sharer", helps: ["Building a personal brand as a PM", "Sharing learnings to attract new opportunities", "Documenting your journey as a living case study"] },
                { icon: "🌐", title: "Remote Career Design", roles: "Community Ops, Knowledge Manager, Async Work Systems Specialist", helps: ["Building your workflows using Notion as a system", "Automating operations and documentation", "Positioning yourself as an async-native remote builder"] },
              ].map((track, i) => (
                <div key={i} className="glass p-8 hover:border-orange-500/50 hover:shadow-[0_0_30px_rgba(249,115,22,0.2)] transition-all duration-500">
                  <h3 className="text-lg font-black italic uppercase tracking-tighter mb-2 flex items-center text-white">
                    <span className="mr-3">{track.icon}</span> {i + 1}. {track.title}
                  </h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-4">Suggested Roles: {track.roles}</p>
                  
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-2">How it Helps:</h4>
                  <ul className="space-y-2">
                    {track.helps.map((help, j) => (
                      <li key={j} className="flex items-start text-white/40 font-medium italic">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 shadow-[0_0_6px_rgba(249,115,22,0.6)]"></span>
                        <span>{help}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="glass p-8 mb-12 hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] transition-all duration-500">
            <h2 className="text-xl font-black italic uppercase tracking-tighter mb-4 flex items-center text-white">
              <span className="text-green-500 mr-3">💬</span> Final Vision
            </h2>
            <p className="text-lg font-medium italic text-white/40 mb-6">
              I'm building my career with a core focus on Product Management & Strategy — this is my main track.
              Around it, I'm developing complementary skill sets in:
            </p>
            <ul className="space-y-4 mb-6">
              {[
                { label: "Business & Sales", desc: "to understand real customer pains and market dynamics" },
                { label: "Marketing & Growth", desc: "to craft go-to-market strategies and test product messaging" },
                { label: "Content Creation & Storytelling", desc: "to document my journey, share insights, and build a strong personal brand" },
                { label: "Remote Career Systems", desc: "to work efficiently, asynchronously, and from anywhere in the world" },
              ].map((item, i) => (
                <li key={i} className="flex items-start text-white/40 font-medium italic">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 shadow-[0_0_6px_rgba(34,197,94,0.6)]"></span>
                  <span><span className="text-white font-bold not-italic">{item.label}</span> – {item.desc}</span>
                </li>
              ))}
            </ul>
            <p className="text-lg font-medium italic text-white/40">
              My ultimate goal is to become a skilled Product Strategist, multipotentialite, async-native, remote-first, 
              building a meaningful and impactful career around my knowledge, creativity, and human connection.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CareerFramework;
