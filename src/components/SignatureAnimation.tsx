import React, { useEffect, useState } from 'react';

interface SignatureAnimationProps {
  className?: string;
}

export const SignatureAnimation: React.FC<SignatureAnimationProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // SVG path for "Ahmad Abdelaziz" stylized signature
  // This creates an elegant flowing signature effect
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 400 100"
        className="w-full max-w-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background glow */}
        <defs>
          <filter id="signature-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="signature-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00FFA3" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#00FFA3" />
          </linearGradient>
        </defs>

        {/* "Ahmad" - First name */}
        <path
          d="M20 70 
             C20 70, 25 30, 35 35
             C45 40, 40 60, 50 65
             C60 70, 65 40, 70 45
             C75 50, 70 70, 80 65
             M55 50 L75 50
             M95 35 
             C85 35, 80 55, 85 65
             C90 75, 105 70, 105 50
             C105 35, 90 40, 95 50
             C100 60, 110 55, 115 45
             C120 35, 115 65, 125 65
             C135 65, 130 45, 135 50
             C140 55, 135 70, 145 65
             C155 60, 150 40, 160 45
             C170 50, 165 70, 175 65"
          stroke="url(#signature-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#signature-glow)"
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            strokeDasharray: 1000,
            strokeDashoffset: isVisible ? 0 : 1000,
            transition: 'stroke-dashoffset 2s ease-out, opacity 0.5s ease-out',
          }}
        />

        {/* Space between names */}
        
        {/* "Abdelaziz" - Last name with flourish */}
        <path
          d="M200 65
             C195 65, 190 45, 200 40
             C210 35, 215 55, 210 65
             C205 75, 195 70, 200 60
             C205 50, 220 45, 225 55
             C230 65, 220 75, 230 70
             C240 65, 235 45, 245 50
             C255 55, 250 70, 260 65
             C270 60, 265 40, 275 45
             C285 50, 280 70, 290 65
             M295 40
             C290 40, 285 60, 295 70
             C305 80, 315 65, 310 55
             C305 45, 295 50, 300 60
             C305 70, 320 65, 325 55
             C330 45, 325 70, 335 65
             C345 60, 340 40, 350 45
             C360 50, 355 70, 370 60
             C385 50, 375 30, 380 35
             C385 40, 375 45, 380 50
             C385 55, 375 60, 380 65
             C385 70, 375 75, 380 80"
          stroke="url(#signature-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#signature-glow)"
          className={`transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            strokeDasharray: 1000,
            strokeDashoffset: isVisible ? 0 : 1000,
            transition: 'stroke-dashoffset 2s ease-out 0.8s, opacity 0.5s ease-out 0.8s',
          }}
        />

        {/* Decorative flourish underline */}
        <path
          d="M20 85 
             Q200 95, 380 85
             Q390 84, 385 82"
          stroke="#00FFA3"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-40' : 'opacity-0'
          }`}
          style={{
            strokeDasharray: 500,
            strokeDashoffset: isVisible ? 0 : 500,
            transition: 'stroke-dashoffset 1.5s ease-out 2s, opacity 0.5s ease-out 2s',
          }}
        />
      </svg>
    </div>
  );
};

// Alternative: Simple text-based signature with typewriter effect
export const TypewriterSignature: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [text, setText] = useState('');
  const fullText = 'Ahmad Abdelaziz';
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
        // Blink cursor after typing
        setInterval(() => {
          setShowCursor(prev => !prev);
        }, 530);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`font-light text-2xl tracking-wider ${className}`}>
      <span className="bg-gradient-to-r from-[#00FFA3] via-[#8B5CF6] to-[#00FFA3] bg-clip-text text-transparent">
        {text}
      </span>
      <span 
        className={`inline-block w-0.5 h-6 bg-[#00FFA3] ml-1 transition-opacity duration-100 ${
          showCursor ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};

export default SignatureAnimation;
