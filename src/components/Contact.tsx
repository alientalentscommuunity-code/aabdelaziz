import React from "react";
import { Mail, Linkedin, Phone, MapPin, ExternalLink } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-black ambient-glow">
      <div className="section-container">
        <h2 className="section-title text-center">
          Get In <span className="highlight">Touch</span>
        </h2>

        <div className="max-w-2xl mx-auto">
          <p className="text-center text-white/40 font-medium italic text-lg mb-10">
            Curious? Aligned? Resonate with my journey? Let's connect and explore how we can work together.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            <a
              href="mailto:ahmad@alientalents.com"
              className="scroll-animation glass p-6 hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] transition-all duration-500 flex items-center gap-4 group"
            >
              <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center group-hover:bg-green-500/20 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all">
                <Mail className="text-green-500" size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Email</p>
                <p className="text-white font-medium text-sm">ahmad@alientalents.com</p>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/ahmad96abdelaziz/"
              target="_blank"
              rel="noopener noreferrer"
              className="scroll-animation delay-100 glass p-6 hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] transition-all duration-500 flex items-center gap-4 group"
            >
              <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center group-hover:bg-green-500/20 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all">
                <Linkedin className="text-green-500" size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/20">LinkedIn</p>
                <p className="text-white font-medium flex items-center gap-1 text-sm">
                  Connect <ExternalLink size={14} />
                </p>
              </div>
            </a>

            <a
              href="tel:+201067156747"
              className="scroll-animation delay-200 glass p-6 hover:border-orange-500/50 hover:shadow-[0_0_30px_rgba(249,115,22,0.2)] transition-all duration-500 flex items-center gap-4 group"
            >
              <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center group-hover:bg-orange-500/20 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all">
                <Phone className="text-orange-500" size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Phone</p>
                <p className="text-white font-medium text-sm">(+20) 106 715 6747</p>
              </div>
            </a>

            <div className="scroll-animation delay-300 glass p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center">
                <MapPin className="text-orange-500" size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Location</p>
                <p className="text-white font-medium text-sm">Egypt • Global Remote</p>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="scroll-animation delay-400 mt-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.2)]">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-green-500 text-[10px] font-black uppercase tracking-widest">Open to opportunities</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
