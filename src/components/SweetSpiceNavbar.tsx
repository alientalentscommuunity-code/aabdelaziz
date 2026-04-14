import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, ArrowRight, ArrowLeft, Lock, CheckCircle, XCircle, Phone, BookOpen } from 'lucide-react';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { path: '/sweet-spice', label: 'Home', icon: <Heart className="w-3 h-3" /> },
  { path: '/sweet-spice/her', label: 'The One', icon: <ArrowRight className="w-3 h-3" /> },
  { path: '/sweet-spice/gate', label: 'Gate', icon: <Lock className="w-3 h-3" /> },
  { path: '/sweet-spice/assessment', label: 'Assessment', icon: <CheckCircle className="w-3 h-3" /> },
  { path: '/sweet-spice/vibe-check', label: 'Vibe Check', icon: <ArrowRight className="w-3 h-3" /> },
  { path: '/sweet-spice/contact', label: 'Contact', icon: <Phone className="w-3 h-3" /> },
  { path: '/sweet-spice/access', label: 'Access', icon: <Lock className="w-3 h-3" /> },
  { path: '/sweet-spice/open', label: 'Open Book', icon: <BookOpen className="w-3 h-3" /> },
];

export default function SweetSpiceNavbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === '/sweet-spice') {
      return currentPath === path;
    }
    return currentPath.startsWith(path);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-4xl">
      <div className="glass border-pink-500/20 px-2 py-2 rounded-full shadow-[0_10px_40px_rgba(244,114,182,0.15)]">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                isActive(item.path)
                  ? 'bg-pink-500 text-black'
                  : 'text-pink-400/60 hover:text-pink-400 hover:bg-pink-500/10'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
