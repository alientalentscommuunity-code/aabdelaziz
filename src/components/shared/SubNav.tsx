import React from "react";

export type SubNavItem =
  | string
  | {
      id: string;
      label: string;
      className?: string;
    };

interface SubNavProps {
  items: SubNavItem[];
  active: string;
  onSelect: (item: string) => void;
  accentColor?: string;
}

const SubNav = ({ items, active, onSelect, accentColor }: SubNavProps) => (
  <div className="flex gap-1.5 flex-wrap mb-10 glass px-3 py-2.5 w-fit max-w-full">
    {items.map((s) => {
      const id = typeof s === "string" ? s : s.id;
      const label = typeof s === "string" ? s : s.label;
      const extraClassName = typeof s === "string" ? "" : s.className ?? "";

      return (
      <button
        key={id}
        onClick={() => onSelect(id)}
        className={`font-mono text-[10px] font-bold uppercase tracking-widest rounded-full px-4 py-2 transition-all duration-200 whitespace-nowrap border ${extraClassName} ${
          active === id
            ? accentColor
              ? `border-current bg-current/10 ${accentColor}`
              : "bg-primary/10 text-primary border-primary/30"
            : "bg-transparent text-white/30 border-transparent hover:text-white/60 hover:bg-white/[0.03]"
        }`}
      >
        {label}
      </button>
      );
    })}
  </div>
);

export default SubNav;
