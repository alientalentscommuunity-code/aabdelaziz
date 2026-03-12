import React from "react";

interface DimLabelProps {
  children: React.ReactNode;
  className?: string;
}

const DimLabel = ({ children, className = "" }: DimLabelProps) => (
  <p
    className={`text-[10px] font-bold uppercase tracking-[0.2em] text-[#4A9EFF] mb-3 ${className}`}
    style={{ fontFamily: "'Space Mono', monospace" }}
  >
    {children}
  </p>
);

export default DimLabel;
