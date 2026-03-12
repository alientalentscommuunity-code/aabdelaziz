import React from "react";

interface InfoCardProps {
  title?: string;
  accentColor?: string;
  children: React.ReactNode;
}

const InfoCard = ({ title, accentColor = "text-amber-400", children }: InfoCardProps) => (
  <div className="bg-white/[0.025] border border-white/[0.07] rounded-lg p-4">
    {title && (
      <div className={`font-mono text-[10px] ${accentColor} uppercase tracking-[0.12em] mb-2.5`}>
        {title}
      </div>
    )}
    {children}
  </div>
);

export default InfoCard;
