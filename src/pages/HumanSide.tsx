import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubNav from "@/components/shared/SubNav";
import HumanIntro from "@/components/human/HumanIntro";
import HumanBeingAlien from "@/components/human/HumanBeingAlien";
import HumanConnection from "@/components/human/HumanConnection";
import HumanUniverse from "@/components/human/HumanUniverse";

const HumanSide = () => {
  const [sub, setSub] = useState("intro");
  const subs = ["intro", "being alien", "connection", "universe"];

  useEffect(() => {
    document.title = "Human Side — Ahmad Abdelaziz";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="section-container !py-0">
          <SubNav items={subs} active={sub} onSelect={setSub} accentColor="text-pink-400" />

          {sub === "intro" && <HumanIntro />}
          {sub === "being alien" && <HumanBeingAlien />}
          {sub === "connection" && <HumanConnection />}
          {sub === "universe" && <HumanUniverse />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HumanSide;
