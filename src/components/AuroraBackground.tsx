import React from 'react';

export const AuroraBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Primary aurora gradient */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 50% -20%, rgba(0, 255, 163, 0.15), rgba(139, 92, 246, 0.1), transparent 60%)',
          animation: 'aurora-shift 15s infinite ease-in-out',
        }}
      />
      
      {/* Secondary subtle glow */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at 80% 80%, rgba(0, 255, 163, 0.08), transparent 40%)',
          animation: 'aurora-pulse 20s infinite ease-in-out',
        }}
      />
      
      {/* Bottom left accent */}
      <div 
        className="absolute bottom-0 left-0 w-1/2 h-1/2 opacity-10"
        style={{
          background: 'radial-gradient(circle at 0% 100%, rgba(139, 92, 246, 0.15), transparent 50%)',
        }}
      />
    </div>
  );
};

export default AuroraBackground;
