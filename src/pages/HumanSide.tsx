import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DimLabel from "@/components/career/DimLabel";

const playfair = { fontFamily: "'Playfair Display', serif" };
const dmSans = { fontFamily: "'DM Sans', sans-serif" };

const HumanSide = () => {
  useEffect(() => {
    document.title = "Human Side — Ahmad Abdelaziz";
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <DimLabel className="text-center">THE HUMAN SIDE</DimLabel>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6" style={playfair}>
            Coming Soon
          </h1>
          <p className="text-lg text-white/40 mb-8" style={dmSans}>
            This is where the human story lives — values, philosophy, and the journey beyond the resume.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 text-green-500 text-sm" style={dmSans}>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Under construction
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HumanSide;
