import React, { useState, useEffect } from "react";
import { Menu, X, Mail } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Human Side", href: "/human" },
    { name: "Career Side", href: "/career" },
    { name: "Friends & Partners", href: "/partners" },
  ];

  const isActive = (href: string) => location.pathname.startsWith(href);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100]">
      {/* Desktop Navigation Pill */}
      <div className={`hidden md:flex items-center gap-1 glass px-2 py-2 shadow-[0_30px_60px_rgba(0,0,0,0.5)] transition-all duration-300 ${isScrolled ? 'border-white/20' : ''}`}>
        <Link to="/" className="text-sm font-black italic uppercase tracking-tighter text-green-500 px-4">
          Ahmad
        </Link>
        <div className="w-px h-5 bg-white/10" />
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            className={`text-[10px] font-bold uppercase tracking-widest px-3 py-2 rounded-full transition-all duration-300 ${
              isActive(link.href)
                ? "bg-[#4A9EFF]/20 text-[#4A9EFF]"
                : "text-white/40 hover:text-white hover:bg-white/5"
            }`}
          >
            {link.name}
          </Link>
        ))}
        <div className="w-px h-5 bg-white/10" />
        <a
          href="mailto:ahmad@alientalents.com"
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-black rounded-full text-[10px] font-black uppercase tracking-widest italic hover:bg-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.6)] transition-all duration-300 active:scale-95"
        >
          <Mail size={14} />
          Hire Me
        </a>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center gap-3">
        <Link to="/" className="glass-sm px-4 py-2 text-sm font-black italic uppercase tracking-tighter text-green-500">
          Ahmad
        </Link>
        <button
          className="glass-sm px-3 py-2 text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-20 bg-black/95 backdrop-blur-2xl z-[1000] animate-fade-in">
          <div className="flex flex-col items-center justify-center h-full gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-2xl font-black italic uppercase tracking-tighter transition-colors ${
                  isActive(link.href) ? "text-[#4A9EFF]" : "text-white/40 hover:text-white"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="mailto:ahmad@alientalents.com"
              className="btn btn-primary mt-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Mail size={14} />
              Hire Me
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
