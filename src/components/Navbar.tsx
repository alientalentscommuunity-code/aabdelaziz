import React, { useState, useEffect } from "react";
import { Menu, X, Mail } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { RequestFormDialog } from "./RequestFormDialog";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [requestFormOpen, setRequestFormOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Human Side", href: "/human" },
    { name: "Career Side", href: "/career" },
    { name: "Work With Me", href: "/partners" },
    { name: "Sweet Spice", href: "/sweet-spice", accent: "pink" },
    { name: "Startup Handbook", href: "/handbook", accent: "orange" },
  ];

  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + "/");

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-5xl">
        {/* Desktop Navigation Pill */}
        <div className={`hidden md:flex items-center gap-1 glass px-3 py-2 shadow-[0_30px_60px_rgba(0,0,0,0.5)] transition-all duration-300 ${isScrolled ? 'border-white/20' : ''}`}>
          <Link to="/" className="text-sm font-mono font-bold text-white/60 px-3 tracking-[0.1em] shrink-0">
            ALIEN<span className="text-primary">S</span>
          </Link>
          <div className="w-px h-5 bg-white/10 shrink-0" />
          <div className="flex items-center gap-1 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-[10px] font-bold uppercase tracking-widest px-3 py-2 rounded-full transition-all duration-300 font-mono whitespace-nowrap ${
                  isActive(link.href)
                    ? link.accent === "orange"
                      ? "bg-secondary/[0.12] text-secondary border border-secondary/35"
                      : link.accent === "pink"
                      ? "bg-pink-500/10 text-pink-400 border border-pink-500/30"
                      : "bg-white/[0.07] text-white/90 border border-white/15"
                    : link.accent === "pink"
                    ? "text-pink-400/60 hover:text-pink-400 hover:bg-pink-500/5 border border-transparent"
                    : "text-white/35 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="w-px h-5 bg-white/10 shrink-0" />
          <button
            onClick={() => setRequestFormOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full text-[10px] font-black uppercase tracking-widest italic hover:opacity-90 hover:shadow-[0_0_20px_hsl(var(--primary)/0.6)] transition-all duration-300 active:scale-95 shrink-0"
          >
            <Mail size={14} />
            Request Form
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-between glass px-4 py-2.5">
          <Link to="/" className="text-sm font-mono font-bold text-white/60 tracking-[0.1em]">
            ALIEN<span className="text-primary">S</span>
          </Link>
          <button
            className="text-white/60 hover:text-white transition-colors p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[99] bg-black/98 backdrop-blur-2xl animate-fade-in">
          <div className="flex flex-col items-center justify-center h-full gap-5 px-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-xl font-bold uppercase tracking-wider font-cairo transition-all duration-300 ${
                  isActive(link.href) 
                    ? link.accent === "pink" 
                      ? "text-pink-400" 
                      : "text-primary" 
                    : "text-white/30 hover:text-white/70"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="w-16 h-px bg-white/10 my-2" />
            <button
              className="btn btn-primary flex items-center gap-2 mt-2"
              onClick={() => {
                setMobileMenuOpen(false);
                setRequestFormOpen(true);
              }}
            >
              <Mail size={14} />
              Request Form
            </button>
          </div>
        </div>
      )}

      {/* Request Form Dialog */}
      <RequestFormDialog open={requestFormOpen} onOpenChange={setRequestFormOpen} />
    </>
  );
};

export default Navbar;
