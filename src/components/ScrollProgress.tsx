import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / scrollHeight) * 100;
      setProgress(progress);
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <>
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-gray-200/30 z-[100]">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-orange-500 transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Side progress indicator */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col items-center gap-2">
        <div className="w-[2px] h-32 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="w-full bg-gradient-to-b from-blue-500 to-orange-500 rounded-full transition-all duration-100"
            style={{ height: `${progress}%` }}
          />
        </div>
        <span className="text-xs font-medium text-gray-400 tabular-nums">
          {Math.round(progress)}%
        </span>
      </div>
    </>
  );
}
