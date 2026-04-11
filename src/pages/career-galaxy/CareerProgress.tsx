import React, { useEffect, useState } from "react";
import CareerLayout from "@/components/career/CareerLayout";
import DimLabel from "@/components/career/DimLabel";

const playfair = { fontFamily: "'Playfair Display', serif" };
const dmSans = { fontFamily: "'DM Sans', sans-serif" };
const spaceMono = { fontFamily: "'Space Mono', monospace" };

type Category = "All" | "Building" | "Learning" | "Studying" | "Reading";
const categories: Category[] = ["All", "Building", "Learning", "Studying", "Reading"];

interface ProgressItem {
  id: string;
  title: string;
  category: string;
  description: string;
  startDate: string;
  status: "active" | "completed";
  link?: string;
}

const items: ProgressItem[] = [
  { id: "1", title: "ALIENs Venture Platform v3", category: "Building", description: "Shipping career hub, advanced ATS, and AI recruiter features.", startDate: "Jul 2024", status: "active", link: "https://dev-site-craftsman.lovable.app" },
  { id: "2", title: "Vibe Coding with Lovable & Claude", category: "Learning", description: "Deep-diving into full-stack vibe coding workflows and prompt engineering.", startDate: "Jan 2025", status: "active" },
  { id: "3", title: "Product Management (SVPG)", category: "Studying", description: "Re-reading Inspired & Empowered by Marty Cagan.", startDate: "Feb 2025", status: "active" },
  { id: "4", title: "The Mom Test", category: "Reading", description: "Customer discovery framework by Rob Fitzpatrick.", startDate: "Mar 2025", status: "active" },
  { id: "5", title: "ALIENs Venture v2 Launch", category: "Building", description: "Shipped jobs board, companies board, and community features.", startDate: "Jul 2024", status: "completed" },
  { id: "6", title: "Cairo AI Hackathon", category: "Building", description: "Won the hackathon with AI-enabled hiring prototype.", startDate: "Dec 2024", status: "completed" },
];

const CareerProgress = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    document.title = "Progress Tracker — Ahmad Abdelaziz";
  }, []);

  const activeItems = items.filter((i) => i.status === "active" && (activeCategory === "All" || i.category === activeCategory));
  const completedItems = items.filter((i) => i.status === "completed" && (activeCategory === "All" || i.category === activeCategory));

  return (
    <CareerLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 py-16">
        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-2" style={playfair}>Current Transmissions</h1>
        <p className="text-white/40 mb-1" style={dmSans}>What I'm actively building, learning, and exploring.</p>
        <p className="text-xs text-white/20 mb-8" style={spaceMono}>Last updated: Mar 2025</p>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto mb-8 pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all ${
                activeCategory === cat ? "bg-[#4A9EFF]/20 text-[#4A9EFF]" : "text-white/30 hover:text-white hover:bg-white/5"
              }`}
              style={spaceMono}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Active items */}
        <div className="space-y-4 mb-10">
          {activeItems.map((item) => (
            <div key={item.id} className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#4A9EFF]/20 text-[#4A9EFF] text-[10px] font-bold uppercase">
                  <span className="w-1.5 h-1.5 bg-[#4A9EFF] rounded-full animate-pulse" />Active
                </span>
                <span className="text-[10px] text-white/20 uppercase" style={spaceMono}>{item.category}</span>
              </div>
              <h3 className="text-base font-bold text-white mb-1" style={playfair}>{item.title}</h3>
              <p className="text-sm text-white/40 mb-2" style={dmSans}>{item.description}</p>
              <div className="flex items-center gap-4">
                <span className="text-[10px] text-white/20" style={spaceMono}>Started {item.startDate}</span>
                {item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-[#4A9EFF] text-xs hover:underline">Visit →</a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Completed */}
        {completedItems.length > 0 && (
          <div>
            <button
              onClick={() => setShowCompleted(!showCompleted)}
              className="text-sm text-white/30 hover:text-white transition-colors mb-4"
              style={dmSans}
            >
              {showCompleted ? "Hide completed ↑" : "Show completed →"}
            </button>
            {showCompleted && (
              <div className="space-y-3 opacity-60">
                {completedItems.map((item) => (
                  <div key={item.id} className="rounded-xl border border-white/5 bg-white/[0.01] p-4">
                    <h3 className="text-sm font-bold text-white/50 mb-1" style={playfair}>{item.title}</h3>
                    <p className="text-xs text-white/30" style={dmSans}>{item.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </CareerLayout>
  );
};

export default CareerProgress;
