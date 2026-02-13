import React from "react";
import { ExternalLink, Eye } from "lucide-react";

interface Project {
  title: string;
  category: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  demoUrl?: string;
  status: "live" | "demo";
  credentials?: {
    learner?: string;
    startup?: string;
    password?: string;
  };
}

const projects: Project[] = [
  {
    title: "ALIEN Talents Platform",
    category: "Platform",
    description: "Complete talent marketplace connecting AI-enabled professionals with opportunities. Features job board, CRM, and community platform.",
    tags: ["React", "Community", "Job Board", "MVP"],
    liveUrl: "https://guileless-daifuku-9c29b0.netlify.app/",
    status: "live",
  },
  {
    title: "Remote $$ Job Board",
    category: "Job Board",
    description: "Helping MENA talent land global remote USD-paying jobs.",
    tags: ["Remote", "Job Board", "MENA", "USD", "Global"],
    liveUrl: "https://alientalents.com",
    status: "live",
  },
  {
    title: "ATOS Hiring Platform",
    category: "Enterprise",
    description: "Comprehensive hiring management system for startups to streamline their recruitment process from posting to onboarding.",
    tags: ["Enterprise", "Recruitment", "Management", "B2B"],
    demoUrl: "https://ubiquitous-custard-6d2ece.netlify.app/",
    status: "demo",
  },
  {
    title: "Career Hub CRM",
    category: "SaaS Tool",
    description: "Job-seeking CRM to help professionals manage their career journey, track applications, and optimize their job search strategy.",
    tags: ["CRM", "Career", "Job Search", "Productivity"],
    demoUrl: "https://preview--alien-career-hub.lovable.app/",
    status: "demo",
  },
  {
    title: "AALN | AI Personal Mentor",
    category: "AI Product",
    description: "AI-powered mentoring platform with personalized learning paths for both individual learners and startup teams.",
    tags: ["AI", "Mentoring", "Education", "Personalized"],
    demoUrl: "https://tubular-melba-fade64.netlify.app/",
    status: "demo",
    credentials: {
      learner: "learner@demo.com",
      startup: "startup@demo.com",
      password: "any password",
    },
  },
  {
    title: "ALIEN ATS",
    category: "HR Tech",
    description: "Applicant Tracking System with CV evaluation and mentoring features for both candidates and hiring teams.",
    tags: ["ATS", "HR", "CV Analysis", "Hiring"],
    demoUrl: "https://alien-ats.lovable.app",
    status: "demo",
  },
];

const ProjectCard = ({ project }: { project: Project }) => {
  const isLive = project.status === "live";
  return (
    <div className={`glass p-6 hover:shadow-[0_0_30px_${isLive ? 'rgba(34,197,94,0.2)' : 'rgba(249,115,22,0.2)'}] transition-all duration-500 flex flex-col h-full ${isLive ? 'hover:border-green-500/50' : 'hover:border-orange-500/50'}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <span className="text-[10px] font-black uppercase tracking-widest text-white/20">
          {project.category}
        </span>
        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${
          isLive
            ? "bg-green-500/10 text-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]"
            : "bg-orange-500/10 text-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.3)]"
        }`}>
          {isLive ? (
            <>
              <ExternalLink size={10} />
              live
            </>
          ) : (
            <>
              <Eye size={10} />
              demo
            </>
          )}
        </span>
      </div>

      {/* Title & Description */}
      <h3 className="text-lg font-black italic uppercase tracking-tighter mb-2 text-white">{project.title}</h3>
      <p className="text-white/40 font-medium italic text-sm mb-4 flex-grow">{project.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <span 
            key={tag} 
            className="px-2 py-1 bg-green-500/10 text-green-500 rounded-full text-[10px] font-bold uppercase tracking-wider"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Credentials if any */}
      {project.credentials && (
        <div className="glass-sm p-3 mb-4 text-xs">
          <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">Demo Credentials:</p>
          <p className="text-white/40 font-medium italic">
            Username: {project.credentials.learner} / {project.credentials.startup}
          </p>
          <p className="text-white/40 font-medium italic">Password: {project.credentials.password}</p>
        </div>
      )}

      {/* Actions */}
      <div className="mt-auto">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-full border border-green-500/30 text-green-500 hover:bg-green-500 hover:text-black hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all duration-300 text-[10px] font-black uppercase tracking-widest"
          >
            <ExternalLink size={14} />
            View Live
          </a>
        )}
        {project.demoUrl && !project.liveUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-full border border-orange-500/30 text-orange-500 hover:bg-orange-500 hover:text-black hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all duration-300 text-[10px] font-black uppercase tracking-widest"
          >
            <Eye size={14} />
            Try Demo
          </a>
        )}
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-black">
      <div className="section-container">
        <h2 className="section-title">
          Shipped <span className="highlight">Products</span>
        </h2>
        
        <p className="text-white/40 font-medium italic text-lg mb-10 max-w-2xl">
          100% Human-Made, AI Delivered (Vibe Coding) at $0 — Shipped Jobs & companies boards, talent marketplace, Mini ATS, and +2 in-progress MVPs.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={project.title} className="scroll-animation" style={{ transitionDelay: `${index * 100}ms` }}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
