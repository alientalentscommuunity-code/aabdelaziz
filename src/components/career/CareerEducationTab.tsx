import React from "react";

const EDUCATION = [
  {
    title: "Autodidact — Self-learner",
    period: "2014 – Now",
    detail: "RVE approach: Research → Validate → Execute",
    tags: ["Entrepreneurship", "Sales & BD", "Product Management"],
    icon: "🌱",
  },
  {
    title: "Faculty of Commerce — Beni Suef University",
    period: "2016 – 2019",
    detail: "Dropped out",
    icon: "📚",
  },
  {
    title: "High School Diploma",
    period: "2011 – 2016",
    detail: "",
    icon: "🎓",
  },
];

const CareerEducationTab = () => (
  <div className="glass p-6 sm:p-8 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] transition-all duration-500">
    <h3 className="text-xl font-black italic uppercase tracking-tighter mb-6 text-white">Education</h3>

    <div className="space-y-4 text-white/40 font-medium italic">
      {EDUCATION.map((e) => (
        <div key={e.title}>
          <p className="flex items-start gap-2">
            <span className={e.icon === "🌱" ? "text-secondary" : "text-primary"}>{e.icon}</span>
            <span>
              {e.tags ? (
                <span className="font-bold text-white not-italic">{e.title}:</span>
              ) : (
                e.title
              )}
              {e.detail && ` ${e.detail}`}
              {e.period && ` (${e.period})`}
            </span>
          </p>
          {e.tags && (
            <div className="ml-6 flex flex-wrap gap-2 mt-2">
              {e.tags.map((t) => (
                <span key={t} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold not-italic">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default CareerEducationTab;
