import React from "react";

interface SubNavProps {
  items: string[];
  active: string;
  onSelect: (item: string) => void;
  accentColor?: string;
}

const SubNav = ({ items, active, onSelect, accentColor }: SubNavProps) => (
  <div className="flex gap-1.5 flex-wrap mb-10 glass px-3 py-2.5 w-fit max-w-full">
    {items.map((s) => (
      <button
        key={s}
        onClick={() => onSelect(s)}
        className={`font-mono text-[10px] font-bold uppercase tracking-widest rounded-full px-4 py-2 transition-all duration-200 whitespace-nowrap border ${
          active === s
            ? accentColor
              ? `border-current bg-current/10 ${accentColor}`
              : "bg-primary/10 text-primary border-primary/30"
            : "bg-transparent text-white/30 border-transparent hover:text-white/60 hover:bg-white/[0.03]"
        }`}
      >
        {s}
      </button>
    ))}
  </div>
);

export default SubNav;
