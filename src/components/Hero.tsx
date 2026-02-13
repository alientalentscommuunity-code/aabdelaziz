import React from "react";
import { Mail, Linkedin, MapPin, ExternalLink, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-20 bg-black ambient-glow">
      <div className="section-container w-full">
        <div className="max-w-4xl">
          {/* Name & Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black italic uppercase tracking-tighter mb-4 animate-fade-in text-white">
            Ahmad<br />
            <span className="text-green-500 neon-glow">Abdelaziz</span>
          </h1>
          
          <p className="text-lg sm:text-xl font-medium italic text-white/40 mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            AI-enabled Product Manager | Community-Led Growth
          </p>
          
          {/* Contact Row */}
          <div className="flex flex-wrap gap-4 mb-8 text-white/40 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <a href="mailto:ahmad@alientalents.com" className="flex items-center gap-2 hover:text-green-500 transition-colors">
              <Mail size={18} />
              <span className="text-sm">ahmad@alientalents.com</span>
            </a>
            <a href="https://www.linkedin.com/in/ahmad96abdelaziz/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-green-500 transition-colors">
              <Linkedin size={18} />
              <span className="text-sm">LinkedIn</span>
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={18} />
              <span className="text-sm">Egypt • Global Remote</span>
            </span>
          </div>

          {/* Summary */}
          <div className="space-y-4 text-base font-medium italic text-white/40 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-start gap-3">
              <span className="text-green-500">•</span>
              <p>1+ Year prototyping with LLMs & Vibe coding building AI copilot for global talent & hiring managers.</p>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-green-500">•</span>
              <div>
                <p className="mb-2">Shipped Jobs & companies boards, talent marketplace, Mini ATS, and +2 in-progress MVPs</p>
                <ul className="ml-4 space-y-1 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">→</span>
                    <span>Achieving <span className="text-green-500 font-bold not-italic">20k+ visits</span>, <span className="text-green-500 font-bold not-italic">3k+ applies</span>, <span className="text-green-500 font-bold not-italic">500 Signups</span>, and <span className="text-green-500 font-bold not-italic">$2k+</span> Monetized with 100% Profit margin</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">→</span>
                    <span>2 Closed-won partnerships with nsave.co, Athar Accelerator, and $5K inbound MRR Pipeline</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">→</span>
                    <span className="text-orange-500 font-bold not-italic">Winner in Cairo AI Hackathon by Athar Accelerator</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-green-500">•</span>
              <p>Leveraged diverse tech stacks and AI tools: Lovable.dev, Antigravity, Cursor, Supabase, Airtable.</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mt-10 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <a 
              href="#projects" 
              className="btn btn-primary flex items-center gap-2"
            >
              View Projects
              <ExternalLink size={14} />
            </a>
            <Link 
              to="/career-framework" 
              className="btn btn-secondary flex items-center gap-2"
            >
              <Rocket size={14} />
              Career Framework
            </Link>
            <a 
              href="#contact" 
              className="btn btn-outline"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
