import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubNav from "@/components/shared/SubNav";
import CareerIntro from "@/components/career/CareerIntro";
import CareerExperienceTab from "@/components/career/CareerExperienceTab";
import CareerEducationTab from "@/components/career/CareerEducationTab";
import { EXPERIENCE } from "@/lib/data";

const CareerLanding = () => {
  const [sub, setSub] = useState("intro");
  const [cvOpen, setCvOpen] = useState(false);
  const subs = ["intro", "experience", "education"];

  useEffect(() => {
    document.title = "Career Side — Ahmad Abdelaziz";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="section-container !py-0">
          <SubNav items={subs} active={sub} onSelect={setSub} />

          {sub === "intro" && (
            <CareerIntro cvOpen={cvOpen} setCvOpen={setCvOpen} />
          )}

          {sub === "experience" && <CareerExperienceTab />}

          {sub === "education" && <CareerEducationTab />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CareerLanding;
