import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const careerLinks = [
  { name: "Overview", path: "/career" },
  { name: "CV", path: "/career/cv" },
  { name: "Portfolio", path: "/career/portfolio" },
];

const partnerLinks = [
  { name: "Overview", path: "/partners" },
  { name: "ICP", path: "/career/icp" },
  { name: "Progress", path: "/career/progress" },
  { name: "Vision", path: "/career/vision" },
];

const CareerNav = () => {
  const location = useLocation();
  const isPartners = location.pathname === "/partners" || location.pathname.startsWith("/career/icp") || location.pathname.startsWith("/career/progress") || location.pathname.startsWith("/career/vision");
  const links = isPartners ? partnerLinks : careerLinks;
  const label = isPartners ? "Friends & Partners" : "Career Side";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center h-14 gap-4">
          <Link
            to="/"
            className="text-white/40 hover:text-white transition-colors flex items-center gap-1 text-xs font-bold uppercase tracking-widest shrink-0"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <div className="w-px h-6 bg-white/10 shrink-0" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#4A9EFF] shrink-0">{label}</span>
          <div className="w-px h-6 bg-white/10 shrink-0" />
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? "bg-[#4A9EFF]/20 text-[#4A9EFF]"
                      : "text-white/40 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default CareerNav;
