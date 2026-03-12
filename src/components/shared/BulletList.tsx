import React from "react";

interface BulletListProps {
  items: string[];
  accentColor?: string;
}

const BulletList = ({ items, accentColor = "text-white/30" }: BulletListProps) => (
  <div className="flex flex-col gap-1.5">
    {items.map((item, i) => (
      <div key={i} className="flex gap-2 items-start">
        <span className={`${accentColor} text-[11px] mt-[3px] shrink-0 opacity-60`}>→</span>
        <span className="font-cairo text-[13px] text-white/[0.52] leading-[1.7]">{item}</span>
      </div>
    ))}
  </div>
);

export default BulletList;
