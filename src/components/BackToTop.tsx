import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      
      setScrollProgress(progress);
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const circumference = 2 * Math.PI * 20; // radius = 20
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-black/80 backdrop-blur-xl border border-[#00FFA3]/30 flex items-center justify-center transition-all duration-500 hover:scale-110 hover:border-[#00FFA3]/60 hover:shadow-[0_0_30px_rgba(0,255,163,0.3)] ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
      }`}
      aria-label="Back to top"
    >
      {/* Progress Ring SVG */}
      <svg
        className="absolute inset-0 w-full h-full -rotate-90"
        viewBox="0 0 44 44"
      >
        {/* Background circle */}
        <circle
          cx="22"
          cy="22"
          r="20"
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="2"
        />
        {/* Progress circle */}
        <circle
          cx="22"
          cy="22"
          r="20"
          fill="none"
          stroke="#00FFA3"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-150"
        />
      </svg>
      
      {/* Arrow Icon */}
      <ArrowUp className="w-5 h-5 text-[#00FFA3] relative z-10" />
    </button>
  );
};

export default BackToTop;
