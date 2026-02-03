import { useEffect, useState } from 'react';

export function Preloader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-charcoal flex flex-col items-center justify-center">
      {/* Logo */}
      <div className="mb-12">
        <div className="relative">
          <div className="w-20 h-20 rounded-[28px] bg-gradient-to-br from-hope-blue to-blue-600 flex items-center justify-center shadow-2xl shadow-hope-blue/30">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-10 h-10 text-white"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </div>
          {/* Glow effect */}
          <div className="absolute inset-0 w-20 h-20 rounded-[28px] bg-hope-blue/50 blur-2xl -z-10" />
        </div>
      </div>

      {/* Text */}
      <h1 className="text-white text-3xl font-semibold tracking-tight mb-2" style={{ fontFamily: 'SF Pro Display, Poppins, sans-serif' }}>
        INkosinam
      </h1>
      <p className="text-white/50 text-sm mb-12">Restoring Hope, One Child at a Time</p>

      {/* Progress bar */}
      <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-hope-blue to-warm-orange rounded-full transition-all duration-300 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  );
}
