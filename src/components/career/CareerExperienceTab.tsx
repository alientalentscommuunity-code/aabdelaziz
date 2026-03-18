import React from "react";
import { EXPERIENCE } from "@/lib/data";

const CareerExperienceTab = () => (
  <div className="space-y-6">
    {EXPERIENCE.map((exp, i) => (
      <div key={i} className="glass p-6 sm:p-8 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] transition-all duration-500">
        <div className="flex justify-between flex-wrap gap-2 mb-4">
          <h3 className="text-lg sm:text-xl font-black italic uppercase tracking-tighter text-white">{exp.company}</h3>
          <span className="text-[10px] font-black uppercase tracking-widest text-white/20">{exp.period}</span>
        </div>
        {exp.roles.map((role, j) => (
          <div key={j} className="mb-4">
            {role.title && <div className="text-sm font-bold text-primary mb-2">{role.title}</div>}
            <div className="space-y-2 text-white/40 font-medium italic">
              {role.bullets.map((b, k) => (
                <p key={k} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  {b}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default CareerExperienceTab;
