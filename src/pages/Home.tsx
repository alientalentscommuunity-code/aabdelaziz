import React, { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import { ArrowRight, Briefcase, Users, GraduationCap, Heart, Rocket, Handshake, Target, Sparkles, Globe, Mail, Linkedin, Menu, X, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { RequestFormDialog } from "@/components/RequestFormDialog";

const BottomNav = ({ onOpenRequestForm }: { onOpenRequestForm: () => void }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Career", href: "/career" },
    { name: "Human", href: "/human" },
    { name: "Partners", href: "/partners" },
    { name: "Handbook", href: "/handbook" },
  ];

  return (
    <>
      {/* Desktop Bottom Nav */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] hidden md:block">
        <div className="glass px-4 py-3 flex items-center gap-2 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full transition-all duration-300 font-mono whitespace-nowrap text-white/60 hover:text-white hover:bg-white/10"
            >
              {link.name}
            </Link>
          ))}
          <div className="w-px h-4 bg-white/20 mx-1" />
          <button
            onClick={() => onOpenRequestForm()}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-black rounded-full text-[10px] font-black uppercase tracking-widest italic hover:opacity-90 hover:shadow-[0_0_20px_hsla(142,71%,45%,0.6)] transition-all duration-300 active:scale-95"
          >
            <Briefcase size={12} />
            Request Form
          </button>
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-4 left-4 right-4 z-[100] md:hidden">
        <div className="glass px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-sm font-mono font-bold text-white/60 tracking-[0.1em]">
            ALIEN<span className="text-green-500">S</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white/60 hover:text-white transition-colors p-1"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bottom-20 z-[99] bg-black/98 backdrop-blur-2xl animate-fade-in">
            <div className="flex flex-col items-center justify-center h-full gap-5 px-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-xl font-bold uppercase tracking-wider font-cairo text-white/30 hover:text-green-500 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="w-16 h-px bg-white/10 my-2" />
              <button
                className="btn btn-primary flex items-center gap-2"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRequestForm();
                }}
              >
                <Briefcase size={14} />
                Request Form
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

const personaCards = [{
    id: "hiring",
    icon: Briefcase,
    title: "Hiring Managers & Recruiters",
    description: "Looking for an AI-enabled Product Manager with proven MVP shipping experience?",
    cta: "View My Work",
    link: "/career",
    color: "green",
  },
  {
    id: "partners",
    icon: Rocket,
    title: "Startups, VCs & Incubators",
    description: "Seeking a technical co-founder or product partner for your next venture?",
    cta: "Let's Partner",
    link: "/partners",
    color: "orange",
  },
  {
    id: "mentors",
    icon: GraduationCap,
    title: "Mentors & Educators",
    description: "Want to connect, mentor, or collaborate on educational initiatives?",
    cta: "Connect",
    link: "/human",
    color: "green",
  },
  {
    id: "community",
    icon: Heart,
    title: "Community & Peers",
    description: "Fellow builders, PMs, or curious minds who resonate with the ALIEN journey.",
    cta: "Meet the Human",
    link: "/human",
    color: "orange",
  },
];

const Home = () => {
  const [requestFormOpen, setRequestFormOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  useEffect(() => {
    document.title = "Ahmad Abdelaziz | AI Product Manager & Builder";
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden pb-24">
      {/* Hero Section - Redesigned */}
      <section className="pt-4 pb-8 bg-black">
        <div className="section-container w-full !py-8">
          <div className="max-w-6xl mx-auto">
            
            {/* Clean Two Column Layout */}
            <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-center">
              
              {/* Left: Content (7 cols) */}
              <div className="lg:col-span-7 order-2 lg:order-1">
                {/* Name - Big and Bold */}
                <h1 className="scroll-animation delay-100 text-6xl sm:text-7xl lg:text-8xl font-black italic uppercase tracking-tighter mb-4 text-white">
                  Ahmad Abdelaziz
                </h1>

                {/* Tagline - 3 Lines */}
                <div className="scroll-animation delay-150 mb-4 space-y-1.5">
                  {/* Line 01 */}
                  <p className="text-base md:text-lg font-bold text-white/80 tracking-wide">
                    <span className="text-green-500">0→1</span> • <span className="text-green-400">AI Products</span> • <span className="text-orange-400">Vibe Coding Craft</span> • <span className="text-green-500">Community-Led</span>
                  </p>
                  {/* Line 02 */}
                  <p className="text-sm md:text-base font-medium italic text-white/60 animate-pulse">
                    ✧ Learning by doing → <span className="text-green-400">Curious</span> • <span className="text-orange-400">Kind</span> • <span className="text-green-400">Wild</span> ✧
                  </p>
                  {/* Line 03 - Countries & Symbols */}
                  <p className="text-sm md:text-base font-medium text-white/50 tracking-wider flex items-center gap-2">
                    <span className="inline-flex items-center gap-1">Palestine ⚖ 🇵🇸</span>
                    <span className="text-white/30">|</span>
                    <span className="text-green-500/80">⏣</span>
                    <span className="text-orange-500/80">⦿</span>
                    <span className="text-green-500/80">⌬</span>
                    <span className="text-white/60">⌖</span>
                    <span className="text-green-500/80">⌘</span>
                    <span className="text-orange-500/80">⧉</span>
                    <span className="text-green-500/80">⚘</span>
                    <span className="text-white/60">✺</span>
                    <span className="text-green-500/80">⚚</span>
                  </p>
                </div>

                {/* Quote Card with Video */}
                <div 
                  onClick={() => setVideoModalOpen(true)}
                  className="scroll-animation delay-200 glass p-4 mb-6 cursor-pointer group hover:border-orange-500/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]"
                >
                  <div className="flex items-start gap-3">
                    {/* Play Button */}
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center shrink-0 group-hover:from-orange-500/30 group-hover:to-red-500/30 transition-all duration-500">
                      <Play className="w-5 h-5 text-orange-400 fill-orange-400 group-hover:scale-110 transition-transform" />
                    </div>
                    
                    {/* Quote Content */}
                    <div className="flex-1">
                      <p className="text-sm md:text-base font-medium italic text-white/50 group-hover:text-white/70 transition-colors leading-relaxed">
                        <span className="text-orange-400">🔥 Crafting</span> with <span className="text-orange-300 font-semibold">taste</span> & <span className="text-green-400 font-semibold">high standards</span> — <span className="text-white/60">like the fire of</span> <span className="text-orange-400">House Targaryen</span> <span className="text-xl">🐉</span> <span className="text-white/60">and honor of</span> <span className="text-white/80">House Stark</span> <span className="text-xl">🐺</span> <span className="text-xl">❄️</span>
                      </p>
                      <p className="text-xs text-white/20 mt-2 flex items-center gap-1 group-hover:text-white/40 transition-colors">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                        Click to watch the video
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTAs - Row */}
                <div className="scroll-animation delay-500 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setRequestFormOpen(true)}
                    className="btn btn-primary inline-flex items-center gap-2"
                  >
                    <Briefcase size={14} />
                    Request Form
                  </button>
                  <Link
                    to="/partners"
                    className="btn btn-secondary inline-flex items-center gap-2"
                  >
                    <Handshake size={14} />
                    Partner
                  </Link>
                  <Link
                    to="/handbook"
                    className="text-white/40 hover:text-white text-xs font-bold uppercase tracking-widest italic transition-colors"
                  >
                    Co-founder? →
                  </Link>
                </div>
              </div>

              {/* Right: Photo (5 cols) */}
              <div className="lg:col-span-5 order-1 lg:order-2">
                <div className="scroll-animation delay-200 relative max-w-sm mx-auto lg:max-w-none">
                  {/* Photo with gradient border */}
                  <div className="relative p-[3px] rounded-3xl bg-gradient-to-br from-green-500/30 via-white/10 to-orange-500/30">
                    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-black">
                      {/* Replace src with your photo path */}
                      <img 
                        src="/ahmad-photo.jpg" 
                        alt="Ahmad Abdelaziz"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Show placeholder if image fails
                          const target = e.currentTarget;
                          target.style.display = 'none';
                          const placeholder = target.nextElementSibling as HTMLElement;
                          if (placeholder) placeholder.style.display = 'flex';
                        }}
                      />
                      {/* Placeholder (shown if image fails) */}
                      <div 
                        className="absolute inset-0 hidden items-center justify-center bg-white/5"
                        style={{ display: 'none' }}
                      >
                        <div className="text-center">
                          <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-green-500/10 flex items-center justify-center">
                            <Users className="w-8 h-8 text-green-500" />
                          </div>
                          <p className="text-white/40 text-sm">Add your photo</p>
                          <p className="text-white/20 text-xs">/public/ahmad-photo.jpg</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating tag */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 glass px-4 py-2 whitespace-nowrap">
                    <span className="text-xs font-black uppercase tracking-widest text-white/80">ALIENs Entrepreneur</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rest of content continues below... */}

            {/* About Me Summary Box */}
            <div className="scroll-animation delay-200 glass p-6 md:p-8 mb-8 hover:border-green-500/30 transition-all duration-500">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center shrink-0">
                  <Sparkles className="text-green-500" size={22} />
                </div>
                <div>
                  <h2 className="text-lg font-black uppercase tracking-wider text-white mb-1">About Me</h2>
                  <p className="text-white/40 text-sm font-medium italic">
                    Non-Linear • Good Taste • High Standards
                  </p>
                </div>
              </div>
              
              <p className="text-white/40 font-medium italic mb-6 leading-relaxed">
                I build <span className="text-white not-italic font-bold">AI-enabled products</span> from 0 → MVP using LLMs & vibe coding tools. 
                I run <span className="text-white not-italic font-bold">ALIENs Venture</span> — a talent platform with 20k+ visits, 3k+ applies, and $2K+ ROI. 
                Winner of Cairo AI Hackathon. Currently seeking my next challenge — whether that&apos;s
                <span className="text-green-500 not-italic font-bold"> joining your team</span>, 
                <span className="text-orange-500 not-italic font-bold"> partnering on a venture</span>, or 
                <span className="text-green-500 not-italic font-bold"> co-founding something new</span>.
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setRequestFormOpen(true)}
                  className="btn btn-primary inline-flex items-center gap-2"
                >
                  <Briefcase size={14} />
                  Request Form
                </button>
                <Link
                  to="/partners"
                  className="btn btn-secondary inline-flex items-center gap-2"
                >
                  <Handshake size={14} />
                  Partner with Me
                </Link>
                <Link
                  to="/handbook"
                  className="btn btn-outline inline-flex items-center gap-2"
                >
                  <Rocket size={14} />
                  Join as Co-founder
                </Link>
              </div>
            </div>

            {/* Why This Site Exists */}
            <div className="scroll-animation delay-300 glass p-6 md:p-8 mb-8">
              <h2 className="text-xl font-black italic uppercase tracking-tighter mb-6 text-white flex items-center gap-3">
                <Target className="text-green-500" size={24} />
                Why This Space Exists
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="glass-sm p-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-green-500 mb-2">For Hiring</h3>
                  <p className="text-white/40 text-sm font-medium italic">
                    Showcase my product work and achievements beyond a traditional CV.
                  </p>
                </div>
                <div className="glass-sm p-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-orange-500 mb-2">For Partnership</h3>
                  <p className="text-white/40 text-sm font-medium italic">
                    Find the right collaborators, co-founders, and mentors for new ventures.
                  </p>
                </div>
                <div className="glass-sm p-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-green-500 mb-2">For Connection</h3>
                  <p className="text-white/40 text-sm font-medium italic">
                    Authentically share who I am — professionally and humanly.
                  </p>
                </div>
              </div>
            </div>

            {/* Join My Team CTA */}
            <div className="scroll-animation delay-400 glass p-6 md:p-8 mb-8 border-orange-500/30 hover:border-orange-500/50 hover:shadow-[0_0_30px_rgba(249,115,22,0.2)] transition-all duration-500">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center shrink-0">
                    <Users className="text-orange-500" size={22} />
                  </div>
                  <div>
                    <h2 className="text-lg font-black uppercase tracking-wider text-white mb-1">Join My Team</h2>
                    <p className="text-white/40 font-medium italic">
                      I&apos;m also building my own startup and actively looking for talented people to join me. 
                      Engineers, designers, marketers — if you&apos;re ALIEN-minded, let&apos;s talk.
                    </p>
                  </div>
                </div>
                <a
                  href="mailto:ahmad@alientalents.com?subject=Join Your Team"
                  className="btn btn-secondary inline-flex items-center gap-2 shrink-0"
                >
                  Apply to Join
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* Persona Cards */}
            <div className="scroll-animation delay-400 mb-8">
              <h2 className="text-xl font-black italic uppercase tracking-tighter mb-6 text-center text-white">
                Who are <span className="text-green-500">you</span>? I&apos;ll guide you.
              </h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {personaCards.map((persona) => {
                  const Icon = persona.icon;
                  const isGreen = persona.color === "green";
                  return (
                    <Link
                      key={persona.id}
                      to={persona.link}
                      className={`glass p-5 hover:shadow-[0_0_30px_${isGreen ? 'rgba(34,197,94,0.2)' : 'rgba(249,115,22,0.2)'}] transition-all duration-500 group ${isGreen ? 'hover:border-green-500/50' : 'hover:border-orange-500/50'}`}
                    >
                      <div className={`w-10 h-10 ${isGreen ? 'bg-green-500/10' : 'bg-orange-500/10'} rounded-xl flex items-center justify-center mb-3 transition-all`}>
                        <Icon className={isGreen ? "text-green-500" : "text-orange-500"} size={18} />
                      </div>
                      <h3 className="text-xs font-black uppercase tracking-wider mb-2 text-white">
                        {persona.title}
                      </h3>
                      <p className="text-white/40 text-xs font-medium italic mb-3">
                        {persona.description}
                      </p>
                      <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${isGreen ? 'text-green-500' : 'text-orange-500'} group-hover:gap-3 transition-all`}>
                        {persona.cta}
                        <ArrowRight size={10} />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Quick Stats Row */}
            <div className="scroll-animation grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {[
                { value: "6+", label: "MVPs Shipped" },
                { value: "20K+", label: "Platform Visits" },
                { value: "$2K+", label: "ROI Generated" },
                { value: "Winner", label: "AI Hackathon" },
              ].map((stat) => (
                <div key={stat.label} className="glass-sm p-4 text-center">
                  <p className="text-2xl font-black text-green-500 mb-1">{stat.value}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Contact Links */}
            <div className="scroll-animation flex flex-wrap justify-center gap-4 text-white/40 text-sm pb-8">
              <a href="mailto:ahmad@alientalents.com" className="flex items-center gap-2 hover:text-green-500 transition-colors">
                <Mail size={16} />
                ahmad@alientalents.com
              </a>
              <span className="hidden sm:inline">•</span>
              <a href="https://www.linkedin.com/in/ahmad96abdelaziz/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-green-500 transition-colors">
                <Linkedin size={16} />
                LinkedIn
              </a>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-2">
                <Globe size={16} />
                Egypt • Global Remote
              </span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <BottomNav onOpenRequestForm={() => setRequestFormOpen(true)} />
      <RequestFormDialog open={requestFormOpen} onOpenChange={setRequestFormOpen} />
      
      {/* Video Modal */}
      {videoModalOpen && (
        <div 
          className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setVideoModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            
            {/* YouTube Embed */}
            <iframe
              src="https://www.youtube.com/embed/UyWTDmDjNy4?autoplay=1"
              title="House Targaryen & Stark"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
