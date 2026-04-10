import React from "react";
import { Heart, Linkedin, Mail, Youtube, Rss } from "lucide-react";
import { Link } from "react-router-dom";
import { useRSSFeed } from "@/lib/rss";

const Footer = () => {
  const { downloadRSS } = useRSSFeed();

  return (
    <footer className="py-10 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="text-sm font-black italic uppercase tracking-tighter text-green-500 mb-1">Ahmad Abdelaziz</p>
            <p className="text-white/20 text-xs font-medium italic">AI-enabled Product Manager</p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/ahmad96abdelaziz/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 glass-sm flex items-center justify-center text-white/40 hover:text-green-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all duration-300"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:ahmad@alientalents.com"
              className="w-10 h-10 glass-sm flex items-center justify-center text-white/40 hover:text-green-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all duration-300"
            >
              <Mail size={18} />
            </a>
            <a
              href="https://www.youtube.com/@ALIEN.Talents"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 glass-sm flex items-center justify-center text-white/40 hover:text-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all duration-300"
            >
              <Youtube size={18} />
            </a>
            <button
              onClick={downloadRSS}
              className="w-10 h-10 glass-sm flex items-center justify-center text-white/40 hover:text-orange-500 hover:shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all duration-300"
              title="Subscribe to RSS Feed"
            >
              <Rss size={18} />
            </button>
          </div>

          {/* Copyright + Sweet Spice */}
          <div className="text-center md:text-right">
            <p className="text-white/20 text-xs font-medium italic flex items-center gap-1 justify-center md:justify-end">
              Made with <Heart size={12} className="text-red-500" /> by Ahmad
            </p>
            <p className="text-white/10 text-[10px] mt-1">
              © {new Date().getFullYear()} All rights reserved
            </p>
            <Link 
              to="/sweet-spice" 
              className="text-[10px] text-pink-400/40 hover:text-pink-400 transition-colors mt-2 inline-block"
            >
              🌶️ Sweet Spice
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
