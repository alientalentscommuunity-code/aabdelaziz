import React, { useEffect, useState } from "react";
import CareerLayout from "@/components/career/CareerLayout";
import DimLabel from "@/components/career/DimLabel";

const playfair = { fontFamily: "'Playfair Display', serif" };
const dmSans = { fontFamily: "'DM Sans', sans-serif" };
const spaceMono = { fontFamily: "'Space Mono', monospace" };

const horizons = ["1 Year", "3 Years", "5 Years"] as const;
type Horizon = (typeof horizons)[number];

const visionItems: Record<Horizon, { title: string; description: string }[]> = {
  "1 Year": [
    { title: "Ship AI Recruiter MVP", description: "Complete the AI-powered screening and matching product within ALIENs." },
    { title: "100 Talents Placed", description: "Scale the career mentoring pipeline to 100+ successful job placements." },
    { title: "$10K MRR", description: "Achieve sustainable recurring revenue from the platform." },
  ],
  "3 Years": [
    { title: "ALIENs as the MENA Talent Hub", description: "Become the go-to platform for remote hiring in Egypt and MENA." },
    { title: "Product Leadership Role", description: "Transition into a senior product role at a global company or grow ALIENs." },
    { title: "Community of 100K+", description: "Scale the community across Reddit, YouTube, and the platform." },
  ],
  "5 Years": [
    { title: "Global Talent Ecosystem", description: "Build a cross-border talent ecosystem connecting MENA with the world." },
    { title: "Venture Building", description: "Launch or co-found multiple ventures in the talent/education space." },
    { title: "Thought Leadership", description: "Become a recognized voice in AI-enabled product management and community-led growth." },
  ],
};

const CareerVision = () => {
  const [activeHorizon, setActiveHorizon] = useState<Horizon>("1 Year");

  useEffect(() => {
    document.title = "Career Vision — Ahmad Abdelaziz";
  }, []);

  return (
    <CareerLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 py-16">
        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-8" style={playfair}>Where It's Going</h1>

        {/* Horizon toggle */}
        <div className="flex gap-2 mb-10">
          {horizons.map((h) => (
            <button
              key={h}
              onClick={() => setActiveHorizon(h)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeHorizon === h
                  ? "bg-[#4A9EFF]/20 text-[#4A9EFF] border border-[#4A9EFF]/30"
                  : "text-white/30 border border-white/10 hover:text-white hover:bg-white/5"
              }`}
            >
              {h}
            </button>
          ))}
        </div>

        {/* Vision grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {visionItems[activeHorizon].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-6 hover:border-[#4A9EFF]/30 transition-all"
            >
              <h3 className="text-base font-bold text-white mb-2" style={playfair}>{item.title}</h3>
              <p className="text-sm text-white/40" style={dmSans}>{item.description}</p>
            </div>
          ))}
        </div>

        {/* Written vision */}
        <div className="border-t border-white/10 pt-10">
          <DimLabel>THE WRITTEN VISION</DimLabel>
          <div className="prose prose-invert max-w-none">
            <p className="text-white/40 leading-relaxed" style={dmSans}>
              I believe the future of work is remote, AI-enabled, and human-centered. My vision is to build the infrastructure that connects talented people — regardless of geography — with meaningful opportunities. 
              Through ALIENs Venture and my own career journey, I'm proving that you can build real things from scratch, monetize them sustainably, and create genuine impact along the way. 
              The career dimension is not just about titles — it's about building capacity, creating value, and growing with every iteration.
            </p>
          </div>
        </div>
      </div>
    </CareerLayout>
  );
};

export default CareerVision;
