import React from "react";

interface SubNavProps {
  items: string[];
  active: string;
  onSelect: (item: string) => void;
}

const SubNav = ({ items, active, onSelect }: SubNavProps) => (
  <div className="flex gap-1.5 flex-wrap mb-8">
    {items.map((s) => (
      <button
        key={s}
        onClick={() => onSelect(s)}
        className={`font-mono text-[11px] rounded-full px-3.5 py-1.5 transition-all duration-200 whitespace-nowrap border ${
          active === s
            ? "bg-white/[0.08] text-white/90 border-white/[0.18]"
            : "bg-transparent text-white/35 border-transparent hover:text-white/60"
        }`}
      >
        {s}
      </button>
    ))}
  </div>
);

export default SubNav;
